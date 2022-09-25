<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 21/08/2017
 * Time: 05:18 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\ApproverProject\ApproverProjectInterface;
use App\Http\Recopro\ApproverProjectDetail\ApproverProjectDetailInterface;
use App\Http\Recopro\ProjectState\ProjectStateInterface;
use Illuminate\Http\Request;

class ApproverProjectController extends Controller
{
    public function createUpdate($id, Request $request, ApproverProjectInterface $aProject,
                                 ApproverProjectDetailInterface $aProjectDetail)
    {
        try {
            $users = $request->input('user');
            $states = $request->input('states');

            $aProject->deleteExcept($id, $users);
            foreach ($users as $idx => $user) {
                $state = (int)$states[$idx];
                $approval = $aProject->createUpdate([
                    'project_id' => $id,
                    'user_id' => $user,
                    'approve' => $state
                ]);
                $sub_state = [];
                if ($state == 0) {
                    $sub_state = [2, 4, 6, 8];
                } elseif ($state == 1) {
                    $sub_state = [2];
                } elseif ($state == 2) {
                    $sub_state = [4];
                } elseif ($state == 3) {
                    $sub_state = [6];
                } elseif ($state == 4) {
                    $sub_state = [8];
                }
                $aProjectDetail->deleteExcept($approval->id, $sub_state);
                foreach ($sub_state as $ss) {
                    $aProjectDetail->createUpdate([
                        'project_id' => $id,
                        'approver_project_id' => $approval->id,
                        'sub_state_id' => $ss
                    ]);
                }
            }

            return response()->json([
                'status' => true
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getDataProject(ProjectStateInterface $stateRepo)
    {
        try {

            $states = parseSelectOnly($stateRepo->all(), 'id', 'description');
            array_unshift($states, ['DisplayText' => 'Todos los Estados', 'Value' => '']);

            return response()->json([
                'status' => true,
                'states' => $states
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function project($id, ApproverProjectInterface $approverProject)
    {
        try {
            $data = [];

            foreach ($approverProject->getByProject($id) as $ap) {
                $data[] = [
                    'code' => $ap->user_id,
                    'user' => $ap->user->username,
                    'name' => $ap->user->name,
                    'approve' => $ap->approve
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
}