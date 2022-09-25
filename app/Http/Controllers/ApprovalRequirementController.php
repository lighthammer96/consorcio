<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 16/06/2017
 * Time: 06:38 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\ProjectConsolidated\ProjectConsolidatedInterface;
use App\Http\Recopro\Requirement\RequirementInterface;
use App\Http\Recopro\Requirement\RequirementTrait;
use App\Http\Recopro\RequirementDetail\RequirementDetailInterface;
use Illuminate\Http\Request;
use DB;

class ApprovalRequirementController extends Controller
{
    use RequirementTrait;

    private static $_REQUIREMENT_REGISTERED = 1;

    private static $_REQUIREMENT_SENT_TO_APPROVAL = 2;

    private static $_REQUIREMENT_APPROVED = 3;

    private static $_REQUIREMENT_CANCELED = 4;

    private static $_REQUIREMENT_REJECTED = 5;

    private static $_REQUIREMENT_ASSIGNED = 6;

    private static $_REQUIREMENT_LINE_NO_PURCHASE_PROCESS = 1;

    public function __construct()
    {
//        $this->middleware('ajax', ['only' => ['all']]);
    }

    public function approveRequirement($id, RequirementInterface $repo)
    {
        $req = $repo->find($id);
        $state = $req->requirement_state_id;
        $super = auth()->user()->id;
        if ($state != self::$_REQUIREMENT_SENT_TO_APPROVAL || $req->user_c->supervisor != $super) {
            return response()->json([
                'status' => false,
                'message' => 'No puede aprobar este requerimiento'
            ]);
        }
        $repo->update($id, [
            'approved_by' => auth()->user()->id,
            'requirement_state_id' => self::$_REQUIREMENT_APPROVED
        ]);
        return response()->json(['status' => true]);
    }

    public function rejectRequirement($id, RequirementInterface $repo, RequirementDetailInterface $detailRepo,
                                      ProjectConsolidatedInterface $consolidatedRepo)
    {
        DB::beginTransaction();
        try {
            $req = $repo->find($id);
            $state = $req->requirement_state_id;
            $super = auth()->user()->id;
            if ($state != self::$_REQUIREMENT_SENT_TO_APPROVAL || $req->user_c->supervisor != $super) {
                throw new \Exception('No puede rechazar este requerimiento');
            }
            $detailReq = $detailRepo->getByRequirement($id);
            foreach ($detailReq as $dr) {
                $consolidatedRepo->update($dr->project_consolidated_id, [
                    'quantity_served' => $dr->project_consolidated->quantity_served + $dr->quantity_requested
                ]);
            }
            $repo->update($id, [
                'requirement_state_id' => self::$_REQUIREMENT_REJECTED
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

    public function excel(RequirementInterface $repo, Request $request)
    {
        $filter = $request->all();
        $data = $repo->search($filter)->get();
        return generateExcel($this->generateDataExcel($data), 'LISTA DE REQUERIMIENTOS POR APROBAR', 'Requerimientos');
    }

}