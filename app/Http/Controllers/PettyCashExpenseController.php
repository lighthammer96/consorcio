<?php

namespace App\Http\Controllers;

use App\Http\Recopro\AccountPay\AccountPayInterface;
use App\Http\Recopro\Currency\CurrencyInterface;
use App\Http\Recopro\GasVoucher\GasVoucherInterface;
use App\Http\Recopro\OperationDestination\OperationDestinationInterface;
use App\Http\Recopro\Param\ParamInterface;
use App\Http\Recopro\PaymentCondition\PaymentConditionInterface;
use App\Http\Recopro\Periodo\PeriodoInterface;
use App\Http\Recopro\Petty_cash\Petty_cashInterface;
use App\Http\Recopro\PettyCashExpense\PettyCashExpenseInterface;
use App\Http\Recopro\PettyCashExpenseClose\PettyCashExpenseCloseInterface;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;

class PettyCashExpenseController extends Controller
{
    public function all(Request $request, PettyCashExpenseInterface $repo)
    {
        try {
            $filter = $request->all();
            $params = ['id', 'date', 'petty_cash_id', 'total', 'code', 'observation', 'accounting_period', 'state_id',
                'user_created', 'created_at as date_created'];

            $info = parseDataList($repo->search($filter), $request, 'id', $params, 'DESC');

            $data = $info[1];
            foreach ($data as $d) {
                $pc_ = $d->petty_cash;
                $d->petty_cash_ = ($pc_) ? $pc_->description : '';
                $d->liable_name = ($pc_ && $pc_->liable) ? $pc_->liable->name : '';
//                $d->pc_total = ($pc_) ? formatNumberTotal($pc_->total, 2) : 0;
                $d->date = Carbon::parse($d->date)->format('d/m/Y');
                $d->total = formatNumberTotal($d->total, 2);
                $d->state_ = ($d->state_id == 1) ? 'REGISTRADO' : 'PROCESADO';
                $total_v = 0;
                foreach ($d->vouchers as $gv) {
                    $total_v += (float)$gv->amount;
                }
                $d->total_v = formatNumberTotal($total_v, 2);
                $d->observation = (is_null($d->observation)) ? '' : $d->observation;
                unset($d->petty_cash, $d->vouchers);
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

    public function data_form(CurrencyInterface $cuRepo, PaymentConditionInterface $pcRepo,
                              OperationDestinationInterface $odRepo, ParamInterface $parRepo)
    {
        try {
            $pay_condition = parseSelectTwoOnly($pcRepo->all(), 'id', 'description', 'days');
            $currency = parseSelectOnly($cuRepo->all(), 'IdMoneda', 'Descripcion');
            $operation_destination = parseSelectTwoOnly($odRepo->findByRegister(), 'IdDestinoOperacion',
                'Descripcion', 'DescripcionCompleta');
            $per_igv = $parRepo->find(1);

            return response()->json([
                'status' => true,
                'currency' => $currency,
                'payment_condition' => $pay_condition,
                'operation_destination' => $operation_destination,
                'per_igv' => ($per_igv) ? (float)$per_igv->value : 0
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function createUpdate($id, Request $request, PettyCashExpenseInterface $pceRepo, Petty_cashInterface $pcRepo,
                                 PeriodoInterface $peRepo, AccountPayInterface $apRepo, GasVoucherInterface $gvRepo,
                                 PettyCashExpenseCloseInterface $pceCRepo)
    {
        DB::beginTransaction();
        try {
            if ($id != 0) {
                $pce_ = $pceRepo->find($id);
                if (!$pce_) {
                    throw new \Exception('La rendición no existe');
                }
                if ($pce_->state_id != 1) {
                    throw new \Exception('No puede modificar esta rendición');
                }
            }
            $data = $request->except(['type', 'documents', 'documents_close', 'vouchers']);
            $pc = $pcRepo->find($data['petty_cash_id']);
            if (!$pc) {
                throw new \Exception('La caja chica seleccionada no existe');
            }
            $pc_is_vale = (int)$pc->is_vale;
            $total_pc = (float)$pc->total;
            $type_ = $request->input('type', 1);
            if ($total_pc == 0) {
                throw new \Exception('Para guardar la rendición el Saldo en Caja debe ser mayor que 0');
            }
            $data['state_id'] = $type_;
            $date = Carbon::createFromFormat('d/m/Y', $data['date']);
            $data['date'] = $date;
            $period = $peRepo->findDate($date->toDateString());
            if (!$period) {
                throw new \Exception('Periodo cerrado o no existe');
            }
            $data['accounting_period'] = $period->periodo;
            $data['pc_balance_initial'] = $total_pc;
            if ($id != 0) {
                $pce = $pceRepo->update($id, $data);
            } else {
                $pce = $pceRepo->create($data);
                $id = $pce->id;
            }
            $documents_ = $request->input('documents', []);
            $documents_close_ = $request->input('documents_close', []);
            $total_docs = 0;
            if ($type_ == 2) {
                if (count($documents_) == 0) {
                    throw new \Exception('Se debe ingresar los gastos de la rendición');
                }
                $amount_sol_ = 0;
                foreach ($documents_ as $doc) {
                    $ap = $apRepo->update($doc, [
                        'state_id' => 2
                    ]);
                    if (is_null($ap->IdCuenta)) {
                        $number_doc = $ap->document_number;
                        throw new \Exception('Debe ingresar la cuenta contable del documento: ' . $number_doc);
                    }
                    $ap_sol = ($ap->currency_id == 1) ? (float)$ap->amount : round($ap->amount * $ap->type_change, 2);
                    $amount_sol_ += $ap_sol;
                }
                foreach ($documents_close_ as $doc_c) {
                    $docC = $pceCRepo->find($doc_c);
                    $amount_sol_ += (float)$docC->total;
                }
                $amount_sol_ = round($amount_sol_, 2);
                if ($total_pc != $amount_sol_) {
                    throw new \Exception('El monto total de los documentos (' . formatNumberTotal($amount_sol_, 2) .
                        ') debe ser igual al saldo de caja chica (' . formatNumberTotal($total_pc, 2) . ')');
                }
                $total_docs += $amount_sol_;
                $pcRepo->update($pc->id, [
                    'total' => $pc->total - $amount_sol_
                ]);
            }
            $apRepo->deleteByPettyCashExpense($id, $documents_);
            $pceCRepo->deleteByPettyCashExpense($id, $documents_close_);

            $vouchers_ = $request->input('vouchers', []);
            $voucher_ids = [];
            foreach ($vouchers_ as $doc) {
                $voucher_ids[] = $doc['id'];
                $gvRepo->update($doc['id'], [
                    'is_consumed' => $doc['is_consumed']
                ]);
            }
            if ($type_ == 2) {
                $count_consumed = 0; $total_consumed = 0;
                foreach ($vouchers_ as $doc) {
                    $gv = $gvRepo->update($doc['id'], [
                        'state_id' => 2
                    ]);
                    if ($gv->is_consumed == 1) {
                        $count_consumed++;
                        $total_consumed += (float)$gv->amount;
                    }
                }
                if ($pc_is_vale == 1 && count($vouchers_) == 0) {
                    throw new \Exception('Se debe ingresar por lo menos un vale de gasolina');
                }
//                if (count($vouchers_) > 0 && $count_consumed == 0) {
//                    throw new \Exception('Existen vales de gasolina ingresados por lo menos uno debe estar ' .
//                        'marcado como consumido.');
//                }
//                $total_docs = round($total_docs, 2);
//                $total_consumed = round($total_consumed, 2);
//                if (count($vouchers_) > 0 && $total_docs != $total_consumed) {
//                    throw new \Exception('No se puede procesar la rendición porque la sumatoria de vales ' .
//                        'consumidos no coincide con los documentos ingresados');
//                }
            }
            $gvRepo->deleteByPettyCashExpense($id, $voucher_ids);

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

    public function find($id, PettyCashExpenseInterface $repo)
    {
        try {
            $data = $repo->find($id);
            if (!$data) {
                throw new \Exception('La rendición no existe');
            }
            $data->date = Carbon::parse($data->date)->format('d/m/Y');
            $pc_ = $data->petty_cash;
            $data->pc_description = ($pc_) ? $pc_->code . ' ' . $pc_->description : '';
            $data->pc_total = formatNumberTotal($pc_->total, 2);
            $is_voucher = ($pc_) ? (int)$pc_->is_vale : 0;
            $is_voucher = ($data->state_id > 1 && $is_voucher == 0 && count($data->vouchers) > 0) ? 1 : $is_voucher;
            $data->is_voucher = $is_voucher;
            $data->total = (is_null($data->total)) ? 0 : (float)$data->total;

            $documents = [];
            foreach ($data->documents as $ap) {
                $provider_ = ($ap->provider) ? $ap->provider->NombreEntidad : '';
                $documents[] = [
                    'id' => $ap->id,
                    'date_emission_' => Carbon::parse($ap->emission_date)->toDateString(),
                    'date_emission' => Carbon::parse($ap->emission_date)->format('d/m/Y'),
                    'document_number' => $ap->document_number,
                    'provider_name' => $provider_,
                    'gloss' => (is_null($ap->gloss)) ? '' : $ap->gloss,
                    'subtotal' => $ap->affection + $ap->unaffected,
                    'igv' => $ap->igv,
                    'total' => $ap->amount,
                    'total_sol' => ($ap->currency_id == 1) ? $ap->amount : round($ap->amount * $ap->type_change),
                    'currency' => ($ap->currency) ? $ap->currency->Simbolo : '',
                    'account' => (is_null($ap->IdCuenta)) ? '' : $ap->IdCuenta
                ];
            }
            $documents = array_orderBy($documents, 'date_emission_', SORT_ASC);
            $data->documents_ = $documents;

            $documents_close = [];
            foreach ($data->pceCloses as $pceC) {
                $documents_close[] = [
                    'id' => $pceC->id,
                    'number' => $pceC->number,
                    'gloss' => (is_null($pceC->gloss)) ? '' : $pceC->gloss,
                    'responsible' => $pceC->responsible,
                    'total' => $pceC->total
                ];
            }
            $data->documents_close_ = $documents_close;

            $vouchers = [];
            foreach ($data->vouchers as $gv) {
                $vouchers[] = [
                    'id' => $gv->id,
                    'code' => $gv->code,
                    'date' => Carbon::parse($gv->date)->format('d/m/Y'),
                    'gloss' => (is_null($gv->gloss)) ? '' : $gv->gloss,
                    'responsible' => $gv->responsible,
                    'is_consumed' => ($gv->is_consumed == 1) ? 'SI' : 'NO',
                    'amount' => (float)$gv->amount,
                ];
            }
            $vouchers = array_orderBy($vouchers, 'code', SORT_ASC);
            $data->vouchers_ = $vouchers;

            unset($data->petty_cash, $data->documents, $data->vouchers, $data->pceCloses,
                $data->user_created, $data->user_deleted, $data->user_updated);

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

    public function documents($id, PettyCashExpenseInterface $repo)
    {
        try {
            $data = $repo->find($id);
            if (!$data) {
                throw new \Exception('La rendición no existe');
            }
            $documents = [];
            foreach ($data->documentsOrder as $ap) {
                $provider_ = ($ap->provider) ? $ap->provider->NombreEntidad : '';
                $documents[] = [
                    'id' => $ap->id,
                    'date_emission_' => Carbon::parse($ap->emission_date)->toDateString(),
                    'date_emission' => Carbon::parse($ap->emission_date)->format('d/m/Y'),
                    'document_number' => $ap->document_number,
                    'provider_name' => $provider_,
                    'gloss' => (is_null($ap->gloss)) ? '' : $ap->gloss,
                    'subtotal' => $ap->affection + $ap->unaffected,
                    'igv' => $ap->igv,
                    'total' => $ap->amount,
                    'total_sol' => ($ap->currency_id == 1) ? $ap->amount : round($ap->amount * $ap->type_change),
                    'currency' => ($ap->currency) ? $ap->currency->Simbolo : '',
                    'account' => (is_null($ap->IdCuenta)) ? '' : $ap->IdCuenta
                ];
            }
            $documents = array_orderBy($documents, 'date_emission_', SORT_ASC);
            $documents_close = [];
            foreach ($data->pceCloses as $pceC) {
                $documents_close[] = [
                    'id' => $pceC->id,
                    'number' => $pceC->number,
                    'gloss' => (is_null($pceC->gloss)) ? '' : $pceC->gloss,
                    'responsible' => $pceC->responsible,
                    'total' => $pceC->total
                ];
            }
            $vouchers = [];
            foreach ($data->vouchers as $gv) {
                $vouchers[] = [
                    'id' => $gv->id,
                    'code' => $gv->code,
                    'date' => Carbon::parse($gv->date)->format('d/m/Y'),
                    'gloss' => (is_null($gv->gloss)) ? '' : $gv->gloss,
                    'responsible' => $gv->responsible,
                    'is_consumed' => ($gv->is_consumed == 1) ? 'SI' : 'NO',
                    'amount' => (float)$gv->amount,
                ];
            }
            $vouchers = array_orderBy($vouchers, 'code', SORT_ASC);
            return response()->json([
                'status' => true,
                'data' => [
                    'documents' => $documents,
                    'documents_close' => $documents_close,
                    'vouchers' => $vouchers,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function destroy(Request $request, PettyCashExpenseInterface $pceRepo, AccountPayInterface $apRepo,
                            GasVoucherInterface $gvRepo)
    {
        DB::beginTransaction();
        try {
            $id = $request->input('id');
            $data = $pceRepo->find($id);
            if ($data->state_id != 1) {
                throw new \Exception('No se puede eliminar esta rendición');
            }
            $apRepo->deleteByPettyCashExpense($id, []);
            $gvRepo->deleteByPettyCashExpense($id, []);
            $pceRepo->destroy($id);
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

    public function excel($id, PettyCashExpenseInterface $pceRepo)
    {
        try {
            $pce = $pceRepo->find($id);
            $pc_ = $pce->petty_cash;
            $is_voucher = ($pc_) ? (int)$pc_->is_vale : 0;
            $is_voucher = ($pce->state_id > 1 && $is_voucher == 0 && count($pce->vouchers) > 0) ? 1 : $is_voucher;
            $detail1 = [];
            foreach ($pce->documents as $ap) {
                $provider_ = ($ap->provider) ? $ap->provider->NombreEntidad : '';
                $detail1[] = [
                    'date_' => Carbon::parse($ap->register_date)->toDateString(),
                    'date' => Carbon::parse($ap->register_date)->format('d/m/Y'),
                    'provider' => $provider_,
                    'document_type' => $ap->documentType->Descripcion,
                    'number' => $ap->document_number,
                    'gloss' => (is_null($ap->gloss)) ? '' : $ap->gloss,
                    'total' => ($ap->currency_id == 1) ? $ap->amount : round($ap->amount * $ap->type_change),
                ];
            }
            $detail1 = array_orderBy($detail1, 'date_', SORT_ASC);
            $total_v_si = 0; $total_v_no = 0; $detail2 = [];
            foreach ($pce->vouchers as $gv) {
                if ($gv->is_consumed == 1) {
                    $total_v_si += (float)$gv->amount;
                } else {
                    $total_v_no += (float)$gv->amount;
                }
                $detail2[] = [
                    'code' => $gv->code,
                    'date' => Carbon::parse($gv->date)->format('d/m/Y'),
                    'gloss' => (is_null($gv->gloss)) ? '' : $gv->gloss,
                    'responsible' => $gv->responsible,
                    'is_consumed' => ($gv->is_consumed == 1) ? 'SI' : 'NO',
                    'total' => (float)$gv->amount,
                ];
            }
            $detail2 = array_orderBy($detail2, 'code', SORT_ASC);
            $total_doc_close = 0; $detail_close = [];
            foreach ($pce->pceCloses as $pceC) {
                $detail_close[] = [
                    'number' => $pceC->number,
                    'gloss' => (is_null($pceC->gloss)) ? '' : $pceC->gloss,
                    'responsible' => $pceC->responsible,
                    'total' => (float)$pceC->total
                ];
                $total_doc_close += (float)$pceC->total;
            }
            $data = [
                'pc' => ($pc_) ? $pc_->description : '',
                'responsible' => ($pc_ && $pc_->liable) ? $pc_->liable->name : '',
                'is_voucher' => ($is_voucher == 1) ? 'SI' : 'NO',
                'balance_initial' => (float)$pce->pc_balance_initial,
                'currency' => 'SOLES',
                'total' => (float)$pce->total,
                'total_v_si' => $total_v_si,
                'total_v_no' => $total_v_no,
                'total_close' => $total_doc_close,
                'detail1' => $detail1,
                'detail2' => $detail2,
                'detail_close' => $detail_close
            ];
            return generateExcel($data, 'RENDICIÓN DE CAJA CHICA', 'Rendicion', 'pce');
        } catch (\Exception $e) {
            return response()->json([
                'Result' => 'ERROR',
                'Message' => [$e->getMessage()]
            ]);
        }
    }

}