<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 20/06/2017
 * Time: 06:53 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Requirement\RequirementInterface;
use DB;
use Illuminate\Http\Request;

class AssignmentRequirementController extends Controller
{
    private static $_REQUIREMENT_REGISTERED = 1;

    private static $_REQUIREMENT_SENT_TO_APPROVAL = 2;

    private static $_REQUIREMENT_APPROVED = 3;

    private static $_REQUIREMENT_CANCELED = 4;

    private static $_REQUIREMENT_REJECTED = 5;

    private static $_REQUIREMENT_ASSIGNED = 6;

    public function assign($id, Request $request, RequirementInterface $repo)
    {
        DB::beginTransaction();
        try {
            $requirements = $request->input('requirements');
            $buyer_id = $request->input('buyer');
            foreach ($requirements as $r) {
                $req = $repo->find($r);
                $state = $req->requirement_state_id;
                if ($state != self::$_REQUIREMENT_APPROVED) {
                    throw new \Exception('No puede asignar este requerimiento');
                }
                $repo->update($r, [
                    'buyer_id' => $buyer_id
                ]);
            }
            DB::commit();
            return response()->json(['status' => true]);
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function reject($id, Request $request, RequirementInterface $repo)
    {
        DB::beginTransaction();
        try {
            $requirements = $request->input('requirements');
            foreach ($requirements as $r) {
                $req = $repo->find($r);
                $state = $req->requirement_state_id;
                if ($state != self::$_REQUIREMENT_APPROVED) {
                    throw new \Exception('No puede desasignar este requerimiento');
                }
                $repo->update($r, [
                    'buyer_id' => null
                ]);
            }
            DB::commit();
            return response()->json(['status' => true]);
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}