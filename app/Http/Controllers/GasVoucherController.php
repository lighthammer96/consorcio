<?php

namespace App\Http\Controllers;

use App\Http\Recopro\GasVoucher\GasVoucherInterface;
use App\Http\Recopro\PettyCashExpense\PettyCashExpenseInterface;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;

class GasVoucherController extends Controller
{
    public function createUpdate($id, Request $request, GasVoucherInterface $gvRepo, PettyCashExpenseInterface $pceRepo)
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
            $data['date'] = Carbon::createFromFormat('d/m/Y', $data['date']);
            $data['amount'] = (float)$data['amount'];
            if ($id != 0) {
                $gv_ = $gvRepo->update($id, $data);
            } else {
                $data['state_id'] = 1;
                $gv_ = $gvRepo->create($data);
                $id = $gv_->id;
            }

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

    public function find($id, GasVoucherInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $data->date = Carbon::parse($data->date)->format('d/m/Y');
            $data->amount = (float)$data->amount;

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