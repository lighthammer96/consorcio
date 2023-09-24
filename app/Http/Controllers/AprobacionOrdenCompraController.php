<?php

namespace App\Http\Controllers;

use App\Http\Recopro\OrdenCompraConformidad\OrdenCompraConformidadInterface;
use App\Http\Recopro\RegisterOrdenCompra\RegisterOrdenCompraInterface;
use App\Http\Recopro\RegisterOrdenCompraArticulo\RegisterOrdenCompraArticuloInterface;
use App\Http\Recopro\View_OrdenCompraConformidad\View_OrdenCompraConformidadTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Recopro\View_OrdenCompraConformidad\View_OrdenCompraConformidadInterface;
use DB;

class AprobacionOrdenCompraController extends Controller
{
    use View_OrdenCompraConformidadTrait;

    public function __construct()
    {
        $this->middleware('ajax', ['only' => ['all']]);
    }

    public function all(Request $request, View_OrdenCompraConformidadInterface $repo)
    {
        try {
            $filter = $request->all();
            $params = ['idOrdenCompra', 'Conformidad', 'Codigo', 'Consecutivo', 'IdUsuario', 'Usuario', 'EstadoAprob',
                'Fecha', 'FechaReq', 'TipoDoc', 'NumeroDoc', 'Proveedor', 'Moneda', 'Total', 'EstadoOC'];
            $info = parseDataList($repo->search($filter), $request, 'Codigo', $params, 'DESC');

            $data = $info[1];

            foreach ($data as $d) {
                $d->Fecha = Carbon::parse($d->Fecha)->format('d/m/Y');
                $d->FechaReq = Carbon::parse($d->FechaReq)->format('d/m/Y');
                $d->Total = formatNumberTotal($d->Total, 2);
                $state_ = 'Por Aprobar';
                $state_ = ($d->EstadoAprob == 1) ? 'Aprobado' : $state_;
                $state_ = ($d->EstadoAprob == 2) ? 'Rechazado' : $state_;
                $d->state_ = $state_;
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

    public function getApprovers($id, RegisterOrdenCompraInterface $ocRepo, OrdenCompraConformidadInterface $occRepo)
    {
        try {
            $oc = $ocRepo->find($id);
            $data = [];
            foreach ($occRepo->findBy($oc->cCodConsecutivo, $oc->nConsecutivo) as $occ) {
                $user = $occ->user;
                $state_ = 'Por Aprobar';
                $state_ = ($occ->iEstado == 1) ? 'Aprobado' : $state_;
                $state_ = ($occ->iEstado == 2) ? 'Rechazado' : $state_;
                $data[] = [
                    'name' => $user->name,
                    'comment' => (is_null($occ->cObservacion)) ? '' : $occ->cObservacion,
                    'date_reg' => Carbon::parse($occ->dFecReg)->format('d/m/Y'),
                    'date_upd' => Carbon::parse($occ->updated_at)->format('d/m/Y'),
                    'state' => $state_
                ];
            }
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

    public function approvalReject($id, Request $request, OrdenCompraConformidadInterface $occRepo,
                                   RegisterOrdenCompraInterface $ocRepo, RegisterOrdenCompraArticuloInterface $ocaRepo)
    {
        DB::beginTransaction();
        try {
            $nro_con = $request->input('nCodConformidad', '');
            $comment = $request->input('aprobaComentario', '');
            $option = $request->input('iEstado', '');

            $oc = $ocRepo->find($id);

            $occ = $occRepo->findByUser($oc->cCodConsecutivo, $oc->nConsecutivo, auth()->id());
            if (!$occ) {
                throw new \Exception('No tiene permisos para aprobar/rechazar la orden');
            }

            $occRepo->update($occ->nIdConformidad, [
                'iEstado' => $option,
                'cObservacion' => $comment
            ]);

            $oc = $ocRepo->find($id);
            $order_may = 0; $complete = true;
            foreach ($occRepo->findBy($oc->cCodConsecutivo, $oc->nConsecutivo) as $occ) {
                $order_may = ((int)$occ->nOrden > $order_may) ? (int)$occ->nOrden : $order_may;
                $complete = ((int)$occ->iEstado == 0) ? false : $complete;
            }

            $oca_state = ($option == 1) ? 3 : 8;
            foreach ($oc->detailArticle as $oca) {
                $ocaRepo->update($oca->id, [
                    'iEstado' => $oca_state
                ]);
            }
            if ($option == 1) {
                if ($order_may == 1 || $complete) {
                    $ocRepo->update($id, [
                        'iEstado' => 3
                    ]);
                }
            } else {
                $ocRepo->update($id, [
                    'iEstado' => 8
                ]);
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

    public function updateCommentApproval($id, Request $request, RegisterOrdenCompraInterface $ocRepo)
    {
        DB::beginTransaction();
        try {
            $ocRepo->update($id, [
                'comentarioAprobacion' => $request->input('comment', '')
            ]);
            DB::commit();
            return response()->json([
                'status' => true
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
