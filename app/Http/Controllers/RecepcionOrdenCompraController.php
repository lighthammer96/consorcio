<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\ReceptionPurchaseOrder\ReceptionPurchaseOrderInterface;
use App\Http\Recopro\ReceptionPurchaseOrderDetail\ReceptionPurchaseOrderDetailInterface;
use App\Http\Recopro\ReceptionPurchaseOrderSeries\ReceptionPurchaseOrderSeriesInterface;
use App\Http\Recopro\Register_movement\Register_movementTrait;
use App\Http\Recopro\Register_movement_Articulo\Register_movement_ArticuloInterface;
use App\Http\Recopro\Register_movement_Detalle\Register_movement_DetalleInterface;
use App\Http\Recopro\RegisterOrdenCompra\RegisterOrdenCompraInterface;
use App\Http\Recopro\RegisterOrdenCompraArticulo\RegisterOrdenCompraArticuloInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Recopro\Currency\CurrencyInterface;
use App\Http\Recopro\Register_movement\Register_movementInterface;
use App\Http\Recopro\Serie\SerieInterface;
use App\Http\Recopro\Operation\OperationInterface;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use DB;

class RecepcionOrdenCompraController extends Controller
{
    use Register_movementTrait;

    public function __construct()
    {
        $this->middleware('ajax', ['only' => ['all']]);
    }

    public function all(Request $request, ReceptionPurchaseOrderInterface $rpoRepo, Register_movementInterface $repo)
    {
        try {
            $filter = $request->all();
            $params = ['id', 'state_id', 'code', 'date', 'purchase_order_id', 'warehouse_id', 'currency_id', 'total'];
            $info = parseDataList($rpoRepo->search($filter), $request, 'id', $params, 'DESC');

            $data = $info[1];

            foreach ($data as $d) {
                $d->date = Carbon::parse($d->date)->format('d/m/Y');
                $d->state = ($d->state_id == 1) ? 'REGISTRADO' : 'PROCESADO';
                $po_ = $d->purchaseOrder;
                $d->oc = $po_->cCodConsecutivo . ' ' . $po_->nConsecutivo;
                $d->wh = $d->warehouse->description;
                $d->currency_ = $d->currency->Descripcion;
                $d->total = formatNumberTotal($d->total, 2);
                if ($request->has('showDetail')) {
                    $detail_ = [];
                    foreach ($d->detail as $rPod) {
                        if ($rPod->balance <= 0) {
                            continue;
                        }
                        $article = $rPod->product;
                        $localization_ = $rPod->localization;
                        $lote_ = $rPod->lote;
                        $data_series = [];
                        $detail_[] = [
                            'rd_id' => $rPod->id,
                            'product_id' => $rPod->product_id,
                            'description' => $article->description,
                            'price' => (float)$rPod->price,
                            'reception' => (float)$rPod->reception,
//                            'cant_return' => (float)$rPod->reception - (float)$rPod->balance,
                            'pending' => (float)$rPod->balance,
                            'localization_id' => (is_null($rPod->localization_id)) ? '' : $rPod->localization_id,
                            'localization' => ($localization_) ? $localization_->descripcion : '',
                            'lote_id' => (is_null($rPod->lote_id)) ? '' : $rPod->lote_id,
                            'lote' => ($lote_) ? $lote_->Lote : '',
                            'is_serie' => (int)$article->serie,
                            'is_lote' => (int)$article->lote,
                            'data_series' => $data_series,
                            'motive' => ''
                        ];
                    }
                    $d->detail_ = $detail_;
                }
                unset($d->purchaseOrder, $d->warehouse, $d->currency);
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

    public function excel(Request $request, ReceptionPurchaseOrderInterface $repo)
    {
        ini_set('max_execution_time', 6000);
        try {
            $filter = $request->all();
            $info = [];
            foreach ($repo->search($filter)->orderBy('id', 'DESC')->get() as $d) {
                $po_ = $d->purchaseOrder;
                $detail_ = [];
                foreach ($d->detail as $rPod) {
                    $pod = $rPod->purchaseOrderDetail;
                    $article = $pod->article;
                    $localization_ = $rPod->localization;
                    $lote_ = $rPod->lote;
                    $detail_[] = [
                        'price' => (float)$pod->precioUnitario,
                        'quantity' => (float)$pod->cantidad,
                        'pending' => ($d->state_id == 1) ? (float)$pod->cantidadPendiente : (float)$rPod->quantity_pending,
                        'description' => $article->description,
                        'reception' => (float)$rPod->reception,
                        'localization' => ($localization_) ? $localization_->descripcion : '',
                        'lote' => ($lote_) ? $lote_->Lote : '',
                    ];
                }
                $info[] = [
                    'code' => $d->code,
                    'oc' => $po_->cCodConsecutivo . ' ' . $po_->nConsecutivo,
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
            return generateExcel($data, 'RECEPCIÓN ORDEN DE COMPRA', 'Recepción OC',
                'reception_purchase_order');
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function data_form(CurrencyInterface $curRepo, WarehouseInterface $whRepo, OperationInterface $opRepo,
                              SerieInterface $seRepo)
    {
        try {
            $user_id = auth()->id();
            $currency = parseSelectOnly($curRepo->allActive(), 'IdMoneda', 'Descripcion');
            $operations = $opRepo->getOperation_total_entrega($user_id);
            $warehouses = $whRepo->getAlmacen_usuario($user_id);
            $tipocompra = $seRepo->get_tipoCompraVenta();

            return response()->json([
                'status' => true,
                'currency' => $currency,
                'warehouses' => $warehouses,
                'operations' => $operations,
                'type_comp' => $tipocompra
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function createUpdate($id, Request $request, ReceptionPurchaseOrderInterface $rpoRepo,
                                 ReceptionPurchaseOrderDetailInterface $rPodRepo, RegisterOrdenCompraInterface $poRepo,
                                 RegisterOrdenCompraArticuloInterface $podRepo, Register_movementInterface $rmRepo,
                                 Register_movement_ArticuloInterface $rmaRepo,
                                 Register_movement_DetalleInterface $rmdRepo,
                                 ReceptionPurchaseOrderSeriesInterface $rPosRepo, SerieInterface $seRepo)
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
                $roc = $rpoRepo->update($id, $data);
            } else {
                $roc = $rpoRepo->create($data);
                $id = $roc->id;
            }
            $detail_ = $request->input('detail', []);
            $total = 0; $rPod_id = [];
            foreach ($detail_ as $d_) {
                $reception_ = (float)$d_['q'];
                $pod_ = $podRepo->find($d_['code']);
                $product_ = $pod_->article;
                $price_ = (float)$pod_->precioUnitario;
                $rPod_ = $rPodRepo->createUpdate([
                    'reception_oc_id' => $id,
                    'purchase_order_detail_id' => $pod_->id,
                    'product_id' => $product_->id,
                    'localization_id' => $d_['localization'],
                    'lote_id' => $d_['lote_id'],
                    'quantity' => $pod_->cantidad,
                    'quantity_pending' => $pod_->cantidadPendiente,
                    'reception' => $reception_,
                    'balance' => $reception_,
                    'price' => $price_
                ]);
                $total += round($reception_ * $price_, 5);
                $rPod_id[] = $rPod_->id;

                $series_data = (isset($d_['series'])) ? $d_['series'] : [];
                $rPos_id = [];
                foreach ($series_data as $ser) {
                    $ser_id = $ser['idSerie'];
                    if (is_null($ser_id) || $ser_id == '') {
                        $se_ = $seRepo->findByCode($ser['serie']);
                        if ($se_) {
                            throw new \Exception('Ya existe una Serie con el código ' . $ser['serie'] .
                                '. Por favor ingrese otro código.');
                        }
                        $ser_id = $seRepo->get_consecutivo('ERP_Serie', 'idSerie');
                        $seRepo->create([
                            'idSerie' => $ser_id,
                            'idArticulo' => $product_->id,
                            'nombreSerie' => $ser['serie'],
                            'chasis' => $ser['chasis'],
                            'motor' => $ser['motor'],
                            'color' => $ser['color'],
                            'anio_fabricacion' => $ser['anio_fabricacion'],
                            'anio_modelo' => $ser['anio_modelo'],
                            'idTipoCompraVenta' => $ser['tipo_compra_venta_id'],
                            'nPoliza' => $ser['nPoliza'],
                            'nLoteCompra' => $ser['nLoteCompra']
                        ]);
                    }
                    $rPos = $rPosRepo->createUpdate([
                        'roc_detail_id' => $rPod_->id,
                        'product_id' => $product_->id,
                        'series_id' => $ser_id,
                        'state_rec' => '1'
                    ]);
                    $rPos_id[] = $rPos->id;
                }
                $rPosRepo->destroyExcept($rPod_->id, $rPos_id);
            }
            foreach ($rPodRepo->getExcept($id, $rPod_id) as $rPod_) {
                $rPosRepo->destroyExcept($rPod_->id, []);
            }
            $rPodRepo->destroyExcept($id, $rPod_id);

            $rpo = $rpoRepo->update($id, [
                'total' => $total
            ]);
            $mov_id = '';
            if ($state == 2) {
                // Update Orden Compra
                foreach ($rpo->detail as $rPod) {
                    $pod = $rPod->purchaseOrderDetail;
                    $pending_ = $pod->cantidadPendiente - $rPod->reception;
                    $reception_ = $pod->cantidadRecibida + $rPod->reception;
                    $podRepo->update($pod->id, [
                        'cantidadPendiente' => $pending_,
                        'cantidadRecibida' => $reception_,
                        'iEstado' => ($pending_ == 0) ? 4 : 5
                    ]);
                }
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
                $operation = $rpo->operation;
                $purchaseOrder = $rpo->purchaseOrder;
                $nat_id = $operation->idNaturaleza;
                $mov_id = $rmRepo->get_consecutivo('ERP_Movimiento', 'idMovimiento');
                $rmRepo->create([
                    'idMovimiento' => $mov_id,
                    'fecha_registro' => $rpo->date,
                    'idUsuario' => $rpo->user_created,
                    'idTipoOperacion' => $rpo->operation_id,
                    'naturaleza' => $nat_id,
                    'observaciones' => strtoupper($rpo->observation),
                    'idMoneda' => $rpo->currency_id,
                    'idAlmacen' => $rpo->warehouse_id,
                    'estado' => 0,
                    'cCodConsecutivo' => $purchaseOrder->cCodConsecutivo,
                    'nConsecutivo' => $purchaseOrder->nConsecutivo,
                ]);
                foreach ($rpo->detail as $idx => $rPod) {
                    $cons_ = $idx + 1;
                    $pod = $rPod->purchaseOrderDetail;
                    $cost_ = ($pod->cantidad == 0) ? 0 : round($pod->valorCompraDescuento/$pod->cantidad, 5);
                    $rmaRepo->create([
                        'idMovimiento' => $mov_id,
                        'idArticulo' => $rPod->product_id,
                        'idAlmacen' => $rpo->warehouse_id,
                        'idLocalizacion' => $rPod->localization_id,
                        'consecutivo' =>  $cons_,
                        'idLote' => $rPod->lote_id,
                        'cantidad' =>  $rPod->reception,
                        'costo' => $cost_,
                        'costo_total' => round($cost_ * $rPod->reception, 2),
                        'precio' => $rPod->price,
                        'precio_total' => round($rPod->price * $rPod->reception, 2)
                    ]);
                    foreach ($rPod->rPodSeries as $rPos) {
                        $rmdRepo->create([
                            'idMovimiento' => $mov_id,
                            'idArticulo' => $rPod->product_id,
                            'consecutivo' => $cons_,
                            'serie' => $rPos->series_id
                        ]);
                    }
                }
                $rpoRepo->update($id, [
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

    public function find($id, ReceptionPurchaseOrderInterface $rpoRepo)
    {
        try {
            $data = $rpoRepo->find($id);
            $data->date = Carbon::parse($data->date)->format('d/m/Y');
            $data->warehouse_id = (is_null($data->warehouse_id)) ? '' : $data->warehouse_id;
            $po_ = $data->purchaseOrder;
            $data->oc_ = $po_->cCodConsecutivo . ' ' . $po_->nConsecutivo;
            $data->observation = (is_null($data->observation)) ? '' : $data->observation;

            $detail = [];
            foreach ($data->detail as $rPod) {
                $pod = $rPod->purchaseOrderDetail;
                $article = $pod->article;
                $localization_ = $rPod->localization;
                $lote_ = $rPod->lote;
                $data_series = [];
                foreach ($rPod->rPodSeries as $rPos) {
                    $series_ = $rPos->series;
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
                    'ocd_id' => $pod->id,
                    'product_id' => $pod->idArticulo,
                    'price' => (float)$pod->precioUnitario,
                    'quantity' => (float)$pod->cantidad,
                    'pending' => ($data->state_id == 1) ? (float)$pod->cantidadPendiente : (float)$rPod->quantity_pending,
                    'description' => $article->description,
                    'reception' => (float)$rPod->reception,
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

    public function destroy(Request $request, ReceptionPurchaseOrderInterface $rpoRepo,
                            ReceptionPurchaseOrderDetailInterface $rPodRepo,
                            ReceptionPurchaseOrderSeriesInterface $rPosRepo)
    {
        DB::beginTransaction();
        try {
            $id = $request->input('id');
            $r = $rpoRepo->find($id);
            if ($r->state_id > 1) {
                throw new \Exception('No se puede eliminar la Recepción');
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

    public function listSeries(Request $request, ReceptionPurchaseOrderSeriesInterface $rsRepo)
    {
        try {
            $filter = $request->all();
            $params = ['id', 'series_id'];
            $info = parseDataList($rsRepo->search($filter), $request, 'id', $params);
            $data = [];
            foreach ($info[1] as $d) {
                $info_ = $d->series;
                $info_->serie = $info_->nombreSerie;
                $info_->tipo_compra_venta = ($info_->type) ? $info_->type->descripcion : '';
                unset($info_->type);
                $data[] = $info_;
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
}
