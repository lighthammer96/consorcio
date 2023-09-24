<?php

namespace App\Http\Controllers;

use App\Http\Recopro\PettyCashExpense\PettyCashExpenseInterface;
use App\Http\Recopro\PettyCashExpenseClose\PettyCashExpenseCloseInterface;
use DB;
use Illuminate\Http\Request;

class PettyCashExpenseCloseController extends Controller
{
    public function createUpdate($id, Request $request, PettyCashExpenseCloseInterface $pceCRepo,
                                 PettyCashExpenseInterface $pceRepo)
    {
        DB::beginTransaction();
        try {
            $pce_id_ = $request->input('petty_cash_expense_id', '');
            if ($pce_id_ != '') {
                $pce_ = $pceRepo->find($pce_id_);
                if (!$pce_) {
                    throw new \Exception('La rendición no existe');
                }
                if ($pce_->state_id > 1) {
                    throw new \Exception('No puede modificar este documento');
                }
            }
            $data = $request->all();
            $data['total'] = (float)$data['total'];
            if ($id != 0) {
                $pceC = $pceCRepo->update($id, $data);
            } else {
                $data['state_id'] = 1;
                $pceC = $pceCRepo->create($data);
                $id = $pceC->id;
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

    public function find($id, PettyCashExpenseCloseInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $data->total = (float)$data->total;

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