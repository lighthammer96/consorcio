<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 12/06/2017
 * Time: 09:54 AM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Approval_autonomy\Approval_autonomyInterface;
use App\Http\Requests\Approval_autonomyRequest;
use DB;
use Illuminate\Http\Request;

class ApprovalAutonomyController extends Controller
{

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function createUpdate($id, Approval_autonomyInterface $repo, Approval_autonomyRequest $request)
    { 
        DB::beginTransaction();
        try {
            $aa_id = explode(',', $request->input('approval_id'));
            $user_id = explode(',', $request->input('user_id'));
            $from = explode(',', $request->input('from'));
            $to = explode(',', $request->input('to'));

            $repo->deleteByAAutonomy($aa_id);
            
            foreach ($user_id as $item => $k) {
                $repo->create([
                    'user_id' => $user_id[$item],
                    'from' => $from[$item],
                    'to' => $to[$item]
                ]);
            }

            DB::commit();
            return response()->json(['status' => true]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function data_grid(Approval_autonomyInterface $repo)
    {
        try {
            $data = $repo->all();
            foreach ($data as $d) {
                $d->name = $d->user->name;
                $d->username = $d->user->username;
                unset($d->user);
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

}











