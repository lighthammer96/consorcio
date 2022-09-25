<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 26/09/2017
 * Time: 03:26 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\AnalysisUnitaryPrice\AnalysisUnitaryPriceInterface;
use App\Http\Recopro\SubProjectFrontDetail\SubProjectFrontDetailInterface;
use App\Http\Recopro\SubProjectFrontDetailAPU\SubProjectFrontDetailAPUInterface;
use DB;
use Illuminate\Http\Request;

class APUFrontController extends Controller
{
    public function createUpdate($id, Request $request, SubProjectFrontDetailInterface $subProjectFrontDetail,
                                 AnalysisUnitaryPriceInterface $apuRepo, SubProjectFrontDetailAPUInterface $detailAPU)
    {
        DB::beginTransaction();
        try {
            $data = $request->only(['apu', 'front']);

            $sp_fd = $subProjectFrontDetail->findByFrontSP($data['front'], $id);
            if (is_null($sp_fd)) {
                $sp_fd = $subProjectFrontDetail->createUpdate([
                    'sub_project_front_id' => $data['front'],
                    'sub_project_level_id' => $id,
                    'quantity' => 0,
                    'total' => 0
                ]);
            }
            $ids = [];
            $total_ = 0;
            foreach ($data['apu'] as $apu) {
                $apu_ = $apuRepo->findBySPLLevel($id, $apu);
                if (is_null($apu_)) {
                    throw new \Exception('El APU no pertenece a la actividad');
                }
                $detail = $detailAPU->createUpdate([
                    'sub_project_front_detail_id' => $sp_fd->id,
                    'apu_id' => $apu_->id
                ]);
                $ids[] = $detail->id;
                $total_ += (float)$apu_->me_partial;
            }
            $detailAPU->deleteExcept($ids, $sp_fd->id);
            $subProjectFrontDetail->update($sp_fd->id, [
                'price_apu' => $total_,
                'total_apu' => $total_*(float)$sp_fd->quantity
            ]);
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
}