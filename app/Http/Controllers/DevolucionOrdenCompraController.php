<?php
namespace App\Http\Controllers;

use App\Http\Recopro\Operation\OperationInterface;
use App\Http\Recopro\ReceptionPurchaseOrder\ReceptionPurchaseOrderInterface;
use App\Http\Recopro\ReceptionPurchaseOrderDetail\ReceptionPurchaseOrderDetailInterface;
use App\Http\Recopro\ReceptionPurchaseOrderSeries\ReceptionPurchaseOrderSeriesInterface;
use App\Http\Recopro\Register_movement\Register_movementTrait;
use App\Http\Recopro\Register_movement_Articulo\Register_movement_ArticuloInterface;
use App\Http\Recopro\Register_movement_Detalle\Register_movement_DetalleInterface;
use App\Http\Recopro\RegisterOrdenCompra\RegisterOrdenCompraInterface;
use App\Http\Recopro\RegisterOrdenCompraArticulo\RegisterOrdenCompraArticuloInterface;
use App\Http\Recopro\ReturnPurchaseOrder\ReturnPurchaseOrderInterface;
use App\Http\Recopro\ReturnPurchaseOrderDetail\ReturnPurchaseOrderDetailInterface;
use App\Http\Recopro\ReturnPurchaseOrderSeries\ReturnPurchaseOrderSeriesInterface;
use App\Http\Recopro\Serie\SerieInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Recopro\Register_movement\Register_movementInterface;
use DB;

class DevolucionOrdenCompraController extends Controller
{
    use Register_movementTrait;

    public function __construct()
    {
        $this->middleware('ajax', ['only' => ['all']]);
    }

    public function all(Request $request, ReturnPurchaseOrderInterface $rpoRepo)
    {
        try {
            $filter = $request->all();
            $params = ['id', 'state_id', 'code', 'date', 'reception_id', 'warehouse_id', 'currency_id', 'total'];
            $info = parseDataList($rpoRepo->search($filter), $request, 'id', $params, 'DESC');
            $data = $info[1];

            foreach ($data as $d) {
                $d->date = Carbon::parse($d->date)->format('d/m/Y');
                $d->state = ($d->state_id == 1) ? 'REGISTRADO' : 'PROCESADO';
                $rec_ = $d->reception;
                $d->reception_ = $rec_->code;
                $d->wh = $d->warehouse->description;
                $d->currency_ = $d->currency->Descripcion;
                $d->total = formatNumberTotal($d->total, 2);
                unset($d->reception, $d->warehouse, $d->currency);
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

    public function createUpdate($id, Request $request, ReturnPurchaseOrderInterface $retRepo,
                                 ReturnPurchaseOrderDetailInterface $retDRepo, ReceptionPurchaseOrderInterface $rpoRepo,
                                 ReceptionPurchaseOrderDetailInterface $rPodRepo, RegisterOrdenCompraInterface $poRepo,
                                 RegisterOrdenCompraArticuloInterface $podRepo, Register_movementInterface $rmRepo,
                                 Register_movement_ArticuloInterface $rmaRepo,
                                 Register_movement_DetalleInterface $rmdRepo,
                                 ReceptionPurchaseOrderSeriesInterface $rPosRepo,
                                 ReturnPurchaseOrderSeriesInterface $retSRepo)
    {
        ini_set('max_execution_time', 6000);
        DB::beginTransaction();
        try {
            $data = $request->except(['detail']);
            $state = $request->input('state_id', 1);
            $data['state_id'] = $state;
            $date_ = Carbon::createFromFormat('d/m/Y', $data['date']);
            $data['date'] = $date_;
            $rec = $rpoRepo->find($data['reception_id']);
            $data['currency_id'] = $rec->currency_id;
            $data['warehouse_id'] = $rec->warehouse_id;
            if ($id != 0) {
                $ret = $retRepo->update($id, $data);
            } else {
                $ret = $retRepo->create($data);
                $id = $ret->id;
            }
            $detail_ = $request->input('detail', []);
            $total = 0; $retD_id = [];
            foreach ($detail_ as $d_) {
                $return_ = (float)$d_['q'];
                $rPod_ = $rPodRepo->find($d_['code']);
                $product_ = $rPod_->product;
                $price_ = (float)$rPod_->price;
                $retD_ = $retDRepo->createUpdate([
                    'return_oc_id' => $id,
                    'reception_detail_id' => $rPod_->id,
                    'product_id' => $product_->id,
                    'localization_id' => $rPod_->localization_id,
                    'lote_id' => $rPod_->lote_id,
                    'reception' => $rPod_->reception,
                    'pending' => $rPod_->balance,
                    'return' => $return_,
                    'price' => $price_
                ]);
                $total += round($return_ * $price_, 5);
                $retD_id[] = $retD_->id;

                $series_data = (isset($d_['series'])) ? $d_['series'] : [];
                $retS_id = [];
                foreach ($series_data as $ser) {
                    $retS = $retSRepo->createUpdate([
                        'return_detail_id' => $retD_->id,
                        'product_id' => $product_->id,
                        'series_id' => $ser['idSerie']
                    ]);
                    $retS_id[] = $retS->id;
                }
                $retSRepo->destroyExcept($retD_->id, $retS_id);
            }
            foreach ($retDRepo->getExcept($id, $retD_id) as $retD_) {
                $retSRepo->destroyExcept($retD_->id, []);
            }
            $retDRepo->destroyExcept($id, $retD_id);

            $ret = $retRepo->update($id, [
                'total' => $total
            ]);
            $mov_id = '';
            if ($state == 2) {
                // Update Orden Compra and Reception
                foreach ($ret->detail as $retD) {
                    $rPod = $retD->receptionDetail;
                    $pod = $rPod->purchaseOrderDetail;
                    $pending_ = $pod->cantidadPendiente + $retD->return;
                    $return_ = $pod->cantidadDevuelta + $retD->return;
                    $podRepo->update($pod->id, [
                        'cantidadPendiente' => $pending_,
                        'cantidadDevuelta' => $return_,
                        'iEstado' => 5
                    ]);
                    $balance_ = $rPod->balance - $retD->return;
                    $rPodRepo->update($rPod->id, [
                        'balance' => $balance_
                    ]);
                }
                $rpo = $ret->reception;
                $po_ = $poRepo->find($rpo->purchase_order_id);
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
                $purchaseOrder = $rpo->purchaseOrder;
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
                    'idAlmacen' => $ret->warehouse_id,
                    'estado' => 0,
                    'cCodConsecutivo' => $purchaseOrder->cCodConsecutivo,
                    'nConsecutivo' => $purchaseOrder->nConsecutivo,
                ]);
                foreach ($ret->detail as $idx => $retD) {
                    $cons_ = $idx + 1;
                    $pod = $retD->receptionDetail->purchaseOrderDetail;
                    $cost_ = ($pod->cantidad == 0) ? 0 : round($pod->valorCompraDescuento/$pod->cantidad, 5);
                    $rmaRepo->create([
                        'idMovimiento' => $mov_id,
                        'idArticulo' => $retD->product_id,
                        'idAlmacen' => $ret->warehouse_id,
                        'idLocalizacion' => $retD->localization_id,
                        'consecutivo' =>  $cons_,
                        'idLote' => $retD->lote_id,
                        'cantidad' =>  $retD->return,
                        'costo' => $cost_,
                        'costo_total' => round($cost_ * $retD->return, 2),
                        'precio' => $retD->price,
                        'precio_total' => round($retD->price * $retD->return, 2)
                    ]);
                    foreach ($retD->retDSeries as $retDS) {
                        $rPosRepo->createUpdate([
                            'roc_detail_id' => $retD->reception_detail_id,
                            'product_id' => $retDS->product_id,
                            'series_id' => $retDS->series_id,
                            'state_rec' => '0'
                        ]);
                        $rmdRepo->create([
                            'idMovimiento' => $mov_id,
                            'idArticulo' => $retDS->product_id,
                            'consecutivo' => $cons_,
                            'serie' => $retDS->series_id
                        ]);
                    }
                }
                $retRepo->update($id, [
                    'mov_id' => $mov_id
                ]);
                $rmRepo->procesarTransferencia($mov_id);
            }
            DB::commit();
            return response()->json([
                'status' => true,
                'id' => $id,
                'mov' => $mov_id
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function find($id, ReturnPurchaseOrderInterface $rpoRepo)
    {
        try {
            $data = $rpoRepo->find($id);
            $data->date = Carbon::parse($data->date)->format('d/m/Y');
            $data->warehouse_id = (is_null($data->warehouse_id)) ? '' : $data->warehouse_id;
            $rec_ = $data->reception;
            $data->reception_ = $rec_->code;
            $data->warehouse_ = $rec_->warehouse->description;
            $data->currency_ = $rec_->currency->Descripcion;
            $data->observation = (is_null($data->observation)) ? '' : $data->observation;

            $detail = [];
            foreach ($data->detail as $rPod) {
                $rd = $rPod->receptionDetail;
                $article = $rPod->product;
                $localization_ = $rPod->localization;
                $lote_ = $rPod->lote;
                $data_series = [];
                foreach ($rPod->retDSeries as $retD) {
                    $series_ = $retD->series;
                    $data_series[] = [
                        'idSerie' => $series_->idSerie,
                        'serie' => $series_->nombreSerie,
                        'chasis' => $series_->chasis,
                        'motor' => $series_->motor,
                        'color' => $series_->color,
                        'anio_fabricacion' => $series_->anio_fabricacion,
                        'anio_modelo' => $series_->anio_modelo,
                        'tipo_compra_venta_id' => $series_->idTipoCompraVenta,
                        'tipo_compra_venta' => ($series_->type) ? $series_->type->descripcion : '',
                        'nPoliza' => $series_->nPoliza,
                        'nLoteCompra' => $series_->nLoteCompra
                    ];
                }
                $detail[] = [
                    'rd_id' => $rd->id,
                    'product_id' => $rPod->product_id,
                    'price' => (float)$rPod->price,
                    'reception' => (float)$rPod->reception,
                    'pending' => ($data->state_id == 1) ? (float)$rd->balance : (float)$rPod->pending,
                    'description' => $article->description,
                    'return' => (float)$rPod->return,
                    'localization_id' => (is_null($rPod->localization_id)) ? '' : $rPod->localization_id,
                    'localization' => ($localization_) ? $localization_->descripcion : '',
                    'lote_id' => (is_null($rPod->lote_id)) ? '' : $rPod->lote_id,
                    'lote' => ($lote_) ? $lote_->Lote : '',
                    'is_serie' => (int)$article->serie,
                    'is_lote' => (int)$article->lote,
                    'data_series' => $data_series
                ];
            }
            $data->detail_ = $detail;

            unset($data->id, $data->reception, $data->detail,
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

    public function excel(Request $request, ReturnPurchaseOrderInterface $repo)
    {
        ini_set('max_execution_time', 6000);
        try {
            $filter = $request->all();
            $info = [];
            foreach ($repo->search($filter)->orderBy('id', 'DESC')->get() as $d) {
                $detail_ = [];
                foreach ($d->detail as $rPod) {
                    $rd = $rPod->receptionDetail;
                    $article = $rPod->product;
                    $localization_ = $rPod->localization;
                    $lote_ = $rPod->lote;
                    $detail_[] = [
                        'price' => (float)$rPod->price,
                        'reception' => (float)$rPod->reception,
                        'pending' => ($d->state_id == 1) ? (float)$rd->balance : (float)$rPod->pending,
                        'description' => $article->description,
                        'return' => (float)$rPod->return,
                        'localization' => ($localization_) ? $localization_->descripcion : '',
                        'lote' => ($lote_) ? $lote_->Lote : '',
                    ];
                }
                $info[] = [
                    'code' => $d->code,
                    'rec' => $d->reception->code,
                    'date' => Carbon::parse($d->date)->format('d/m/Y'),
                    'wh' => $d->warehouse->description,
                    'currency' => $d->currency->Descripcion,
                    'total' => (float)$d->total,
                    'state' => ($d->state_id == 1) ? 'REGISTRADO' : 'PROCESADO',
                    'detail' => $detail_
                ];
            }
            $data = [
                'data' => $info,
            ];
            return generateExcel($data, 'DEVOLUCIÓN ORDEN DE COMPRA', 'Devolución OC',
                'return_purchase_order');
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function destroy(Request $request, ReturnPurchaseOrderInterface $rpoRepo,
                            ReturnPurchaseOrderDetailInterface $rPodRepo,
                            ReturnPurchaseOrderSeriesInterface $rPosRepo)
    {
        DB::beginTransaction();
        try {
            $id = $request->input('id');
            $r = $rpoRepo->find($id);
            if ($r->state_id > 1) {
                throw new \Exception('No se puede eliminar la Devolución');
            }
            foreach ($rPodRepo->getExcept($id, []) as $rPod_) {
                $rPosRepo->destroyExcept($rPod_->id, []);
            }
            $rPodRepo->destroyExcept($id, []);
            $rpoRepo->destroy($id);
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
