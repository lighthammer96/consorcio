<?php

namespace App\Http\Controllers;

use App\Http\Recopro\RegisterOrdenCompra\RegisterOrdenCompraInterface;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportPurchaseOrderController extends Controller
{
    public function generate($id, Request $request, RegisterOrdenCompraInterface $ocRepo)
    {
        ini_set('max_execution_time', 6000);
        try {
            $filter = $request->all();
            $data = $this->getDataReportPurchaseOrder($filter, $ocRepo);
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

    public function getDataReportPurchaseOrder($filter, RegisterOrdenCompraInterface $ocRepo)
    {
        $type_ = $filter['type'];
        $state_ = $filter['state'];
        $category_ = $filter['category'];
        $product_ = $filter['product'];
        $pending_ = $filter['pending'];
        $data = [];
        foreach ($ocRepo->getDataByReport($filter) as $d) {
            $state = 'Registrado';
            if ($d->iEstado == 2) {
                $state = 'Por Aprobar';
            } elseif ($d->iEstado == 3) {
                $state = 'Aprobado';
            } elseif ($d->iEstado == 4) {
                $state = 'Recibido';
            } elseif ($d->iEstado == 5) {
                $state = 'Backorder';
            } elseif ($d->iEstado == 6) {
                $state = 'Cerrado';
            } elseif ($d->iEstado == 7) {
                $state = 'Cancelado';
            } elseif ($d->iEstado == 8) {
                $state = 'Rechazado';
            }
            $detail_ = [];
            foreach ($d->detailArticle as $det) {
                $article = $det->article;
                if ($type_ == 2) {
                    if ($state_ != '' && $state_ != $det->iEstado) {
                        continue;
                    }
                    if ($category_ != '' && $category_ != $article->idCategoria) {
                        continue;
                    }
                    if ($product_ != '' && $product_ != $det->idArticulo) {
                        continue;
                    }
                    if ($pending_ == '1' && (float)$det->cantidadPendiente <= 0) {
                        continue;
                    }
                }
                $state_det = 'Registrado';
                if ($det->iEstado == 2) {
                    $state_det = 'Por Aprobar';
                } elseif ($det->iEstado == 3) {
                    $state_det = 'Aprobado';
                } elseif ($det->iEstado == 4) {
                    $state_det = 'Recibido';
                } elseif ($det->iEstado == 5) {
                    $state_det = 'Backorder';
                } elseif ($det->iEstado == 6) {
                    $state_det = 'Cerrado';
                } elseif ($det->iEstado == 7) {
                    $state_det = 'Cancelado';
                } elseif ($det->iEstado == 8) {
                    $state_det = 'Rechazado';
                }
                $detail_[] = [
                    'text' => $article->description,
                    'category' => ($article->categoria) ? $article->categoria->descripcion : '',
                    'code' => $article->code_article,
                    'total' => formatNumberTotal($det->total, 2),
                    'q_pen' => formatNumberTotal($det->cantidadPendiente, 2),
                    'q_rec' => formatNumberTotal($det->cantidadRecibida, 2),
                    'state' => $state_det,
                ];
            }
            $data[] = [
                'code' => $d->cCodConsecutivo . '-' . $d->nConsecutivo,
                'date_reg' => Carbon::parse($d->dFecRegistro)->format('d/m/Y'),
                'date_req' => Carbon::parse($d->dFecRequerida)->format('d/m/Y'),
                'provider' => ($d->provider) ? $d->provider->razonsocial : '',
                'payment_condition' => ($d->paymentCondition) ? $d->paymentCondition->description : '',
                'buyer' => ($d->buyer) ? $d->buyer->description : '',
                'currency' => ($d->currency) ? $d->currency->Descripcion : '',
                'total' => formatNumberTotal($d->total, 2),
                'state' => $state,
                'detail' => $detail_
            ];
        }
        return $data;
    }

    public function excel(Request $request, RegisterOrdenCompraInterface $ocRepo)
    {
        ini_set('max_execution_time', 6000);
        try {
            $filter = $request->all();
            $info = $this->getDataReportPurchaseOrder($filter, $ocRepo);
            $data = [
                'type' => $filter['type'],
                'data' => $info,
            ];
            return generateExcel($data, 'REPORTE ORDEN DE COMPRA', 'Orden Compra', 'purchase_order');
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}