<?php

namespace App\Http\Controllers;

use App\Http\Recopro\ConformanceServices\ConformanceServicesInterface;
use App\Http\Recopro\ConformanceServicesDetail\ConformanceServicesDetailInterface;
use App\Http\Recopro\Register_movement\Register_movementInterface;
use App\Http\Recopro\Register_movement\Register_movementTrait;
use App\Http\Recopro\Register_movement_Articulo\Register_movement_ArticuloInterface;
use App\Http\Recopro\RegisterOrdenCompra\RegisterOrdenCompraInterface;
use App\Http\Recopro\RegisterOrdenCompraArticulo\RegisterOrdenCompraArticuloInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Recopro\Currency\CurrencyInterface;
use App\Http\Recopro\View_Movimiento_Conformidad_Compra\View_Movimiento_Conformidad_CompraInterface;
use App\Http\Recopro\Operation\OperationInterface;
use DB;

class ConformidadServicioController extends Controller
{
    use Register_movementTrait;

    public function __construct()
    {
        $this->middleware('ajax', ['only' => ['all']]);
    }

    public function all(Request $request, ConformanceServicesInterface $cRepo)
    {
        try {
            $filter = $request->all();
            $params = ['id', 'state_id', 'code', 'date', 'purchase_order_id', 'currency_id', 'total'];
            $info = parseDataList($cRepo->search($filter), $request, 'id', $params, 'DESC');

            $data = $info[1];

            foreach ($data as $d) {
                $d->date = Carbon::parse($d->date)->format('d/m/Y');
                $d->state = ($d->state_id == 1) ? 'REGISTRADO' : 'PROCESADO';
                $po_ = $d->purchaseOrder;
                $d->oc = $po_->cCodConsecutivo . ' ' . $po_->nConsecutivo;
                $d->currency_ = $d->currency->Descripcion;
                $d->total = formatNumberTotal($d->total, 2);
                if ($request->has('showDetail')) {
                    $detail_ = [];
                    foreach ($d->detail as $cd) {
                        if ($cd->balance <= 0) {
                            continue;
                        }
                        $article = $cd->product;
                        $detail_[] = [
                            'cd_id' => $cd->id,
                            'product_id' => $cd->product_id,
                            'description' => $article->description,
                            'price' => (float)$cd->price,
                            'reception' => (float)$cd->reception,
                            'pending' => (float)$cd->balance,
                            'motive' => ''
                        ];
                    }
                    $d->detail_ = $detail_;
                }
                unset($d->purchaseOrder, $d->currency);
            }
            return response()->json([
                'Result' => 'OK',
                'TotalRecordCount' => $info[0],
                'Records' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'Result' => 'ERROR',
                'Message' => [$e->getMessage()]
            ]);
        }
    }

    public function excel(View_Movimiento_Conformidad_CompraInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all_orden_compraConformidad()), 'LISTA DE MOVIMIENTOS DE CONFORMIDAD DE SERVICIOS', 'Lista de movimientos');
    }

    public function data_form(CurrencyInterface $curRepo, OperationInterface $opRepo)
    {
        try {
            $user_id = auth()->id();
            $currency = parseSelectOnly($curRepo->allActive(), 'IdMoneda', 'Descripcion');
            $operations = $opRepo->getOperation_total_entrega($user_id);

            return response()->json([
                'status' => true,
                'currency' => $currency,
                'operations' => $operations
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function createUpdate($id, Request $request, ConformanceServicesInterface $cRepo,
                                 ConformanceServicesDetailInterface $cdRepo, RegisterOrdenCompraInterface $poRepo,
                                 RegisterOrdenCompraArticuloInterface $podRepo, Register_movementInterface $rmRepo,
                                 Register_movement_ArticuloInterface $rmaRepo)
    {
        ini_set('max_execution_time', 6000);
        DB::beginTransaction();
        try {
            $data = $request->except(['detail']);
            $state = $request->input('state_id', 1);
            $data['state_id'] = $state;
            $date_ = Carbon::createFromFormat('d/m/Y', $data['date']);
            $data['date'] = $date_;
            $po = $poRepo->find($data['purchase_order_id']);
            $currency_ = $po->idMoneda;
            $data['currency_id'] = $currency_;
            if ($id != 0) {
                $cs = $cRepo->update($id, $data);
            } else {
                $cs = $cRepo->create($data);
                $id = $cs->id;
            }
            $detail_ = $request->input('detail', []);
            $total = 0; $csd_id = [];
            foreach ($detail_ as $d_) {
                $reception_ = (float)$d_['q'];
                $pod_ = $podRepo->find($d_['code']);
                $product_ = $pod_->article;
                $price_ = (float)$pod_->precioUnitario;
                $csd_ = $cdRepo->createUpdate([
                    'cs_id' => $id,
                    'purchase_order_detail_id' => $pod_->id,
                    'product_id' => $product_->id,
                    'quantity' => $pod_->cantidad,
                    'quantity_pending' => $pod_->cantidadPendiente,
                    'reception' => $reception_,
                    'balance' => $reception_,
                    'price' => $price_
                ]);
                $total += round($reception_ * $price_, 5);
                $csd_id[] = $csd_->id;
            }
            $cdRepo->destroyExcept($id, $csd_id);

            $cs = $cRepo->update($id, [
                'total' => $total
            ]);
            if ($state == 2) {
                // Update Orden Compra
                foreach ($cs->detail as $csd) {
                    $pod = $csd->purchaseOrderDetail;
                    $pending_ = $pod->cantidadPendiente - $csd->reception;
                    $reception_ = $pod->cantidadRecibida + $csd->reception;
                    $podRepo->update($pod->id, [
                        'cantidadPendiente' => $pending_,
                        'cantidadRecibida' => $reception_,
                        'iEstado' => ($pending_ == 0) ? 4 : 5
                    ]);
                }
                $po_ = $poRepo->find($cs->purchase_order_id);
                $po_state_id = 4;
                foreach ($po_->detailArticle as $pod) {
                    if ($pod->iEstado != 4) {
                        $po_state_id = 5;
                        break;
                    }
                }
                $poRepo->update($po_->id, [
                    'iEstado' => $po_state_id
                ]);
                // Create Movement
                $operation = $cs->operation;
                $purchaseOrder = $cs->purchaseOrder;
                $nat_id = $operation->idNaturaleza;
                $mov_id = $rmRepo->get_consecutivo('ERP_Movimiento', 'idMovimiento');
                $rmRepo->create([
                    'idMovimiento' => $mov_id,
                    'fecha_registro' => $cs->date,
                    'idUsuario' => $cs->user_created,
                    'idTipoOperacion' => $cs->operation_id,
                    'naturaleza' => $nat_id,
                    'observaciones' => strtoupper($cs->observation),
                    'idMoneda' => $cs->currency_id,
                    'idAlmacen' => null,
                    'estado' => 0,
                    'cCodConsecutivo' => $purchaseOrder->cCodConsecutivo,
                    'nConsecutivo' => $purchaseOrder->nConsecutivo,
                ]);
                foreach ($cs->detail as $idx => $csd) {
                    $cons_ = $idx + 1;
                    $pod = $csd->purchaseOrderDetail;
                    $cost_ = ($pod->cantidad == 0) ? 0 : round($pod->valorCompraDescuento/$pod->cantidad, 5);
                    $rmaRepo->create([
                        'idMovimiento' => $mov_id,
                        'idArticulo' => $csd->product_id,
                        'idAlmacen' => null,
                        'idLocalizacion' => null,
                        'consecutivo' =>  $cons_,
                        'idLote' => null,
                        'cantidad' =>  $csd->reception,
                        'costo' => $cost_,
                        'costo_total' => round($cost_ * $csd->reception, 2),
                        'precio' => $csd->price,
                        'precio_total' => round($csd->price * $csd->reception, 2)
                    ]);
                }
                $cRepo->update($id, [
                    'mov_id' => $mov_id
                ]);
                $rmRepo->procesarTransferencia($mov_id);
            }
            DB::commit();
            return response()->json([
                'status' => true
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function find($id, ConformanceServicesInterface $cRepo)
    {
        try {
            $data = $cRepo->find($id);
            $data->date = Carbon::parse($data->date)->format('d/m/Y');
            $po_ = $data->purchaseOrder;
            $data->oc_ = $po_->cCodConsecutivo . ' ' . $po_->nConsecutivo;
            $data->observation = (is_null($data->observation)) ? '' : $data->observation;

            $detail = [];
            foreach ($data->detail as $cd) {
                $pod = $cd->purchaseOrderDetail;
                $article = $pod->article;
                $detail[] = [
                    'ocd_id' => $pod->id,
                    'product_id' => $pod->idArticulo,
                    'price' => (float)$pod->precioUnitario,
                    'quantity' => (float)$pod->cantidad,
                    'pending' => ($data->state_id == 1) ? (float)$pod->cantidadPendiente : (float)$cd->quantity_pending,
                    'description' => $article->description,
                    'reception' => (float)$cd->reception
                ];
            }
            $data->detail_ = $detail;

            unset($data->id, $data->purchaseOrder, $data->detail,
                $data->created_at, $data->updated_at, $data->user_created, $data->user_updated, $data->user_deleted);

            return response()->json([
                'status' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function destroy(Request $request, ConformanceServicesInterface $cRepo,
                            ConformanceServicesDetailInterface $cdRepo)
    {
        DB::beginTransaction();
        try {
            $id = $request->input('id');
            $r = $cRepo->find($id);
            if ($r->state_id > 1) {
                throw new \Exception('No se puede eliminar la Conformidad');
            }
            $cdRepo->destroyExcept($id, []);
            $cRepo->destroy($id);
            DB::commit();
            return response()->json([
                'Result' => 'OK'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'Result' => 'ERROR',
                'Message' => [$e->getMessage()]
            ]);
        }
    }

}
