<?php

namespace App\Http\Controllers;

use App\Http\Recopro\AccountPay\AccountPayInterface;
use App\Http\Recopro\AccountPay\AccountPayTrait;
use App\Http\Recopro\DocumentType\DocumentTypeInterface;
use App\Http\Recopro\Entity\EntityInterface;
use App\Http\Recopro\Param\ParamInterface;
use App\Http\Recopro\Periodo\PeriodoInterface;
use App\Http\Recopro\PettyCashExpense\PettyCashExpenseInterface;
use App\Http\Recopro\TypeChange\TypeChangeInterface;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;

class AccountPayController extends Controller
{
    use AccountPayTrait;

    public function createUpdate($id, Request $request, AccountPayInterface $apRepo, TypeChangeInterface $tcRepo,
                                 ParamInterface $parRepo, PeriodoInterface $peRepo, PettyCashExpenseInterface $pceRepo,
                                 DocumentTypeInterface $dtRepo, EntityInterface $entRepo)
    {
        DB::beginTransaction();
        try {
            $pce_id_ = $request->input('petty_cash_expense_id', '');
            $is_pce_ = false; $pce_ = null;
            if ($pce_id_ != '') {
                $pce_ = $pceRepo->find($pce_id_);
                if (!$pce_) {
                    throw new \Exception('La rendición no existe');
                }
                if ($pce_->state_id > 1) {
                    throw new \Exception('No puede modificar este documento');
                }
                $is_pce_ = true;
            }
            $data = $request->all();
            $data['register_date'] = Carbon::createFromFormat('d/m/Y', $data['register_date']);
            $ed_ = Carbon::createFromFormat('d/m/Y', $data['emission_date']);
            $data['emission_date'] = $ed_;
//            $data['expiration_date'] = Carbon::createFromFormat('d/m/Y', $data['expiration_date']);
            $data['expiration_date'] = $data['register_date'];
            $is_igv_ = $request->input('is_igv', 1);
            $date_ = $ed_->toDateString();
            $tc = $tcRepo->getByDate($date_);
            if ($tc->Fecha != $date_) {
                throw new \Exception('No existe un tipo de cambio para la fecha enviada: ' . $ed_);
            }
            $type_change = (float)$tc->Venta;
            $data['type_change'] = $type_change;
            $period = $peRepo->findDate($date_);
            if (!$period) {
                throw new \Exception('Periodo cerrado o no existe');
            }
            $data['accounting_period'] = $period->periodo;
            $data['is_igv'] = $is_igv_;

            $apV = $apRepo->getByDocumentAndTypeProvider($data['provider_id'], $data['document_number'],
                $data['document_type_id']);
            if ($apV && $apV->id != $id) {
                throw new \Exception('Ya existe un documento con el mismo número y proveedor');
            }

            $affection = $request->input('affection', 0);
            $unaffected = $request->input('unaffected', 0);
            $exonerated = $request->input('exonerated', 0);

            if ($is_igv_ == 1) {
                $per_igv = $parRepo->find(1);
                $per_igv_ = ($per_igv) ? (float)$per_igv->value : 0;
                $igv = ($affection > 0) ? round($affection * $per_igv_ / 100, 2) : 0;
            } else {
                $igv = 0;
                $per_igv_ = 0;
            }
            $amount = $affection + $unaffected + $exonerated + $igv;

            $param = $parRepo->find(31);
            $is_verify_ = ($param) ? $param->value : 'N';
            $dt_ = $dtRepo->find($data['document_type_id']);
            if (in_array($dt_->EquivalenciaSunat, ['01', '03']) && $is_verify_ == 'S') {
                $ent_ = $entRepo->find($data['provider_id']);
                $ruc = trim($ent_->Documento);
                $dt = trim($dt_->EquivalenciaSunat);

                $document_number = trim($data['document_number']);
                $sn = separateNSC($document_number);
                $series = trim($sn[0]); $nro_doc = trim($sn[1]);

                $date = Carbon::parse($data['emission_date'])->toDateString();

                $total = (float)$amount;
                $this->verifySunat($ruc, $dt, $series, $nro_doc, $date, $total);
            }

            if ($id != 0) {
                $ap_ = $apRepo->update($id, $data);
            } else {
                $data['state_id'] = 1;
                $ap_ = $apRepo->create($data);
                $id = $ap_->id;
            }

            $ap_ = $apRepo->update($id, [
                'affection' => $affection,
                'unaffected' => $unaffected,
                'exonerated' => $exonerated,
                'per_igv' => $per_igv_,
                'igv' => $igv,
                'amount' => $amount
            ]);

            DB::commit();
            return response()->json([
                'status' => true,
                'info' => [
                    'code' => $id
                ]
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function find($id, AccountPayInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $data->register_date = Carbon::parse($data->register_date)->format('d/m/Y');
            $data->emission_date = Carbon::parse($data->emission_date)->format('d/m/Y');
            $data->expiration_date = Carbon::parse($data->expiration_date)->format('d/m/Y');
            $data->type_change = (float)$data->type_change;

            $account = $data->account;
            $data->account_ = ($account) ? $data->IdCuenta . ' ' . $account->NombreCuenta : '';
            $data->IdCuenta = (is_null($data->IdCuenta)) ? '' : $data->IdCuenta;

            $cost_center = $data->costCenter;
            $data->cost_center_ = ($cost_center) ? $cost_center->Descripcion : '';
            $data->IdCentroCosto = (is_null($data->IdCentroCosto)) ? '' : $data->IdCentroCosto;

            $provider = $data->provider;
            $data->provider_ = ($provider) ? $provider->Documento . ' ' . $provider->NombreEntidad : '';

            $data->classification_acquisition_ = $data->classification_acquisition->Descripcion;

            $data->document_type_ = $data->documentType->Descripcion;

            $data->affection = (float)$data->affection;
            $data->unaffected = (float)$data->unaffected;
            $data->exonerated = (float)$data->exonerated;

            unset($data->provider, $data->classification_acquisition, $data->document_type);

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
}