<?php

namespace App\Http\Controllers;

use App\Http\Recopro\ConformanceServices\ConformanceServicesInterface;
use App\Http\Recopro\ConformanceServicesDetail\ConformanceServicesDetailInterface;
use App\Http\Recopro\Operation\OperationInterface;
use App\Http\Recopro\Register_movement\Register_movementInterface;
use App\Http\Recopro\Register_movement_Articulo\Register_movement_ArticuloInterface;
use App\Http\Recopro\RegisterOrdenCompra\RegisterOrdenCompraInterface;
use App\Http\Recopro\RegisterOrdenCompraArticulo\RegisterOrdenCompraArticuloInterface;
use App\Http\Recopro\ReturnConformanceServices\ReturnConformanceServicesInterface;
use App\Http\Recopro\ReturnConformanceServicesDetail\ReturnConformanceServicesDetailInterface;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;

class ReturnConformanceServicesController extends Controller
{
    public function __construct()
    {
        $this->middleware('ajax', ['only' => ['all']]);
    }

    public function all(Request $request, ReturnConformanceServicesInterface $rcsRepo)
    {
        try {
            $filter = $request->all();
            $params = ['id', 'state_id', 'code', 'date', 'cs_id', 'currency_id', 'total'];
            $info = parseDataList($rcsRepo->search($filter), $request, 'id', $params, 'DESC');
            $data = $info[1];

            foreach ($data as $d) {
                $d->date = Carbon::parse($d->date)->format('d/m/Y');
                $d->state = ($d->state_id == 1) ? 'REGISTRADO' : 'PROCESADO';
                $cs_ = $d->conformanceServices;
                $d->cs_ = $cs_->code;
                $d->currency_ = $d->currency->Descripcion;
                $d->total = formatNumberTotal($d->total, 2);
                unset($d->conformanceServices, $d->currency);
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

    public function data_form(OperationInterface $opRepo)
    {
        try {
            $user_id = auth()->id();
            $operations = $opRepo->getOperation_total_entrega($user_id);

            return response()->json([
                'status' => true,
                'operations' => $operations
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function createUpdate($id, Request $request, ReturnConformanceServicesInterface $rcsRepo,
                                 ReturnConformanceServicesDetailInterface $rcsDRepo, ConformanceServicesInterface $csRepo,
                                 ConformanceServicesDetailInterface $csdRepo, RegisterOrdenCompraInterface $poRepo,
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
            $cs = $csRepo->find($data['cs_id']);
            $data['currency_id'] = $cs->currency_id;
            $data['warehouse_id'] = $cs->warehouse_id;
            if ($id != 0) {
                $rcs = $rcsRepo->update($id, $data);
            } else {
                $rcs = $rcsRepo->create($data);
                $id = $rcs->id;
            }
            $detail_ = $request->input('detail', []);
            $total = 0; $rcsD_id = [];
            foreach ($detail_ as $d_) {
                $return_ = (float)$d_['q'];
                $csd_ = $csdRepo->find($d_['code']);
                $product_ = $csd_->product;
                $price_ = (float)$csd_->price;
                $rcsD_ = $rcsDRepo->createUpdate([
                    'return_cs_id' => $id,
                    'reception_detail_id' => $csd_->id,
                    'product_id' => $product_->id,
                    'reception' => $csd_->reception,
                    'pending' => $csd_->balance,
                    'return' => $return_,
                    'price' => $price_
                ]);
                $total += round($return_ * $price_, 5);
                $rcsD_id[] = $rcsD_->id;
            }
            $rcsDRepo->destroyExcept($id, $rcsD_id);

            $ret = $rcsRepo->update($id, [
                'total' => $total
            ]);
            if ($state == 2) {
                // Update Orden Compra and Reception
                foreach ($ret->detail as $rcsD) {
                    $csd = $rcsD->conformanceServiceDetail;
                    $pod = $csd->purchaseOrderDetail;
                    $pending_ = $pod->cantidadPendiente + $rcsD->return;
                    $return_ = $pod->cantidadDevuelta + $rcsD->return;
                    $podRepo->update($pod->id, [
                        'cantidadPendiente' => $pending_,
                        'cantidadDevuelta' => $return_,
                        'iEstado' => 5
                    ]);
                    $balance_ = $csd->balance - $rcsD->return;
                    $csdRepo->update($csd->id, [
                        'balance' => $balance_
                    ]);
                }
                $cs = $ret->conformanceServices;
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
                $operation = $ret->operation;
                $purchaseOrder = $cs->purchaseOrder;
                $nat_id = $operation->idNaturaleza;
                $mov_id = $rmRepo->get_consecutivo('ERP_Movimiento', 'idMovimiento');
                $rmRepo->create([
                    'idMovimiento' => $mov_id,
                    'fecha_registro' => $ret->date,
                    'idUsuario' => $ret->user_created,
                    'idTipoOperacion' => $ret->operation_id,
                    'naturaleza' => $nat_id,
                    'observaciones' => strtoupper($ret->observation),
                    'idMoneda' => $ret->currency_id,
                    'idAlmacen' => null,
                    'estado' => 0,
                    'cCodConsecutivo' => $purchaseOrder->cCodConsecutivo,
                    'nConsecutivo' => $purchaseOrder->nConsecutivo,
                ]);
                foreach ($ret->detail as $idx => $retD) {
                    $cons_ = $idx + 1;
                    $pod = $retD->conformanceServiceDetail->purchaseOrderDetail;
                    $cost_ = ($pod->cantidad == 0) ? 0 : round($pod->valorCompraDescuento/$pod->cantidad, 5);
                    $rmaRepo->create([
                        'idMovimiento' => $mov_id,
                        'idArticulo' => $retD->product_id,
                        'idAlmacen' => null,
                        'idLocalizacion' => null,
                        'consecutivo' =>  $cons_,
                        'idLote' => null,
                        'cantidad' =>  $retD->return,
                        'costo' => $cost_,
                        'costo_total' => round($cost_ * $retD->return, 2),
                        'precio' => $retD->price,
                        'precio_total' => round($retD->price * $retD->return, 2)
                    ]);
                }
                $rcsRepo->update($id, [
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

    public function find($id, ReturnConformanceServicesInterface $rcsRepo)
    {
        try {
            $data = $rcsRepo->find($id);
            $data->date = Carbon::parse($data->date)->format('d/m/Y');
            $cs_ = $data->conformanceServices;
            $data->cs_ = $cs_->code;
            $data->currency_ = $cs_->currency->Descripcion;
            $data->observation = (is_null($data->observation)) ? '' : $data->observation;

            $detail = [];
            foreach ($data->detail as $rCsd) {
                $cd = $rCsd->conformanceServiceDetail;
                $article = $rCsd->product;
                $detail[] = [
                    'cd_id' => $cd->id,
                    'product_id' => $rCsd->product_id,
                    'price' => (float)$rCsd->price,
                    'reception' => (float)$rCsd->reception,
                    'pending' => ($data->state_id == 1) ? (float)$cd->balance : (float)$rCsd->pending,
                    'description' => $article->description,
                    'return' => (float)$rCsd->return
                ];
            }
            $data->detail_ = $detail;

            unset($data->id, $data->conformanceServices, $data->detail,
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

    public function destroy(Request $request, ReturnConformanceServicesInterface $rcsRepo,
                            ReturnConformanceServicesDetailInterface $rCsdRepo)
    {
        DB::beginTransaction();
        try {
            $id = $request->input('id');
            $r = $rcsRepo->find($id);
            if ($r->state_id > 1) {
                throw new \Exception('No se puede eliminar la Devolución');
            }
            $rCsdRepo->destroyExcept($id, []);
            $rcsRepo->destroy($id);
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