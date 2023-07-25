<?php

namespace App\Http\Controllers;

use App\Http\Recopro\Bancos\BancosInterface;
use App\Http\Recopro\CuentasBancarias\CuentasBancariasInterface;
use App\Http\Recopro\Currency\CurrencyInterface;
use App\Http\Recopro\Periodo\PeriodoInterface;
use App\Http\Recopro\Petty_cash\Petty_cashInterface;
use App\Http\Recopro\PettyCashExpense\PettyCashExpenseInterface;
use App\Http\Recopro\ReplenishmentPettyCash\ReplenishmentPettyCashInterface;
use App\Http\Recopro\TypeChange\TypeChangeInterface;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;

class ReplenishmentCashController extends Controller
{
    public function all(Request $request, ReplenishmentPettyCashInterface $repo)
    {
        try {
            $filter = $request->all();
            $params = ['id', 'date', 'petty_cash_id', 'concept', 'total', 'state_id', 'number', 'payment_method_id',
                'liable_id'];
            $data = $repo->search($filter);
            $info = parseDataList($data, $request, 'id', $params);
            $data = $info[1];

            foreach ($data as $d) {
                $d->payment_method_ = ($d->payment_method) ? $d->payment_method->descripcion_subtipo : '';
                $d->petty_cash_ = ($d->petty_cash) ? $d->petty_cash->description : '';
                $d->liable_ = ($d->liable) ? $d->liable->name : '';
                $d->date = Carbon::parse($d->date)->format('d/m/Y');
                $d->total = formatNumberTotal($d->total, 2);
                $d->state_ = ($d->state_id == 1) ? 'REGISTRADO' : 'PROCESADO';
                unset($d->petty_cash_id, $d->petty_cash, $d->payment_method, $d->payment_method_id, $d->state_id,
                    $d->liable_id, $d->liable);
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

    public function data_form(CurrencyInterface $cuRepo, BancosInterface $baRepo, CuentasBancariasInterface $bacRepo)
    {
        try {
            $currency = parseSelectOnly($cuRepo->all(), 'IdMoneda', 'Descripcion');
            $bank = parseSelectOnly($baRepo->all(), 'idbanco', 'descripcion');
            $bankAccount = parseSelectOnly($bacRepo->all(), 'id_cuentabancaria', 'descripcion_cuenta');

            return response()->json([
                'status' => true,
                'currency' => $currency,
                'bank' => $bank,
                'bankAccount' => $bankAccount
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function createUpdate($id, Request $request, ReplenishmentPettyCashInterface $rpcRepo,
                                 Petty_cashInterface $pcRepo, PeriodoInterface $peRepo,
                                 TypeChangeInterface $tcRepo, PettyCashExpenseInterface $pceRepo)
    {
        DB::beginTransaction();
        try {
            if ($id != 0) {
                $rc = $rpcRepo->find($id);
                if ($rc->state_id != 1) {
                    throw new \Exception('No puede modificar esta reposición');
                }
            }
            $data = $request->except(['option']);
            $option = $request->input('option', 1);
            $data['total'] = (float)str_replace(",", "", $data['total']);
            $pc_id = $request->input('petty_cash_id', '');
            $pc = $pcRepo->find($pc_id);
            if (!$pc) {
                throw new \Exception('La caja chica no existe');
            }
            $data['liable_id'] = $pc->liable_id;
            $data['date'] = Carbon::createFromFormat('d/m/Y', $data['date']);
            $data['type_change_id'] = $data['date']->toDateString();
            $tc_date = $data['type_change_id'];
            $tc = $tcRepo->getByDate($tc_date);
            if ($tc->Fecha != $tc_date) {
                throw new \Exception('No existe un tipo de cambio para la fecha');
            }
            $type_change_sale = (float)$tc->Venta;
            $period = $peRepo->findDate($tc_date);
            if (!$period) {
                throw new \Exception('Periodo cerrado o no existe');
            }
            $data['accounting_period'] = $period->periodo;
            $data['period_id'] = $period->periodo;
            $data['state_id'] = $option;

            $currency = $data['currency_id'];
            $amount_ = $data['total'];
            $amount_sol_ = ($currency == 1) ? $amount_ : $amount_ * $type_change_sale;

            if ($id != 0) {
                $rc_ = $rpcRepo->update($id, $data);
            } else {
                $rc_ = $rpcRepo->create($data);
                $id = $rc_->id;
            }

            if ($option == 2) {
                $pce_register = $pceRepo->findByPCState($pc_id, 1);
                if (count($pce_register) > 0) {
                    throw new \Exception('No se puede procesar la reposición, primero se debe terminar la ' .
                        'rendición pendiente');
                }
                $pce_last = $pceRepo->lastByPCState($pc_id, '');
                $rpc_last = $rpcRepo->lastByPCState($pc_id, '', [$id]);
                $valid = true;
                if ($rpc_last && !$pce_last) {
                    $valid = false;
                }
                if ($pce_last && $rpc_last) {
                    $pce_date = Carbon::parse($pce_last->date);
                    $rpc_date = Carbon::parse($rpc_last->date);
                    if ($rpc_date->gt($pce_date)) {
                        $valid = false;
                    }
                }
                if (!$valid) {
                    throw new \Exception('No se puede procesar la reposición porque no existe ninguna ' .
                        'rendición después de la última reposición');
                }

                $pcRepo->update($pc->id, [
                    'total' => $pc->total + $amount_sol_
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

    public function find($id, ReplenishmentPettyCashInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $pc_ = $data->petty_cash;
            $data->petty_cash_ = ($pc_) ? $pc_->description : '';
            $data->liable_ = ($data->liable) ? $data->liable->name : '';
            $data->date = Carbon::parse($data->date)->format('d/m/Y');
            $tc_ = $data->type_change;
            $data->type_change_ = ($tc_) ? $tc_->Venta : '';
            $currency_ = $data->currency;
            $data->currency_ = ($currency_) ? $currency_->Descripcion : '';
            $payment_method_ = $data->payment_method;
            $data->payment_method_ = ($payment_method_) ? $payment_method_->descripcion_subtipo : '';
            $data->total = (float)$data->total;

            unset($data->id, $data->petty_cash, $data->liable, $data->type_change,
                $data->current_account, $data->payment_method, $data->currency, $data->bank);

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

    public function findBankAccount($id, CuentasBancariasInterface $baRepo)
    {
        try {
            $bankAccount = parseSelectOnly($baRepo->findByBank($id), 'id_cuentabancaria', 'descripcion_cuenta');
            return response()->json([
                'status' => true,
                'bankAccount' => $bankAccount
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function destroy(ReplenishmentPettyCashInterface $repo, Request $request)
    {
        DB::beginTransaction();
        try {
            $id = $request->input('id');
            $data = $repo->find($id);
            if ((int)$data->state_id > 1) {
                throw new \Exception('No se puede eliminar esta reposición de caja chica');
            }
            $repo->destroy($id);
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