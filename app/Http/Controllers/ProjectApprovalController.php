<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 22/08/2017
 * Time: 06:04 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\ApproverProject\ApproverProjectInterface;
use App\Http\Recopro\ApproverProjectDetail\ApproverProjectDetailInterface;
use App\Http\Recopro\Level\LevelInterface;
use App\Http\Recopro\Project\ProjectInterface;
use App\Http\Recopro\Project\ProjectTrait;
use App\Http\Recopro\ProjectSubState\ProjectSubStateInterface;
use DB;
use Illuminate\Http\Request;

class ProjectApprovalController extends Controller
{
    use ProjectTrait;

    private static $_PROJECT_APPROVAL_LB = 3;

    private static $_PROJECT_APPROVAL_PV = 5;

    private static $_PROJECT_APPROVAL_META = 7;

    private static $_PROJECT_APPROVAL_DF = 9;

    private static $_PROJECT_ACTIVE = 2;

    private static $_PROJECT_INACTIVE = 4;

    public function __construct()
    {
        $this->middleware('ajax', ['only' => ['all']]);
    }

    public function all(Request $request, ProjectInterface $repo)
    {
        $filter = $request->all();
        $params = ['id', 'code', 'description', 'sub_state_id', 'client_id', 'total_lb',
            'total_pv', 'total_meta', 'created_at'];

        $info = parseDataList($repo->searchApproval($filter), $request, 'id', $params);

        $data = $info[1];

        foreach ($data as $d) {
            $d->sub_state = $d->project_sub_state->description;
            $d->client_desc = (isset($d->client)) ? $d->client->NombreEntidad : '';
            $d->total = $this->getTotalNumber($d);
            unset($d->project_sub_state, $d->client, $d->client_id, $d->project_state_id,
                $d->sub_state_id, $d->total_lb, $d->total_pv, $d->total_meta);
        }

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function getDataProject(LevelInterface $levelRepo, ProjectSubStateInterface $stateRepo)
    {
        try {
            $states = parseSelectOnly($stateRepo->find([2, 4, 6, 8]), 'id', 'description');
            array_unshift($states, ['DisplayText' => 'Todos los Estados', 'Value' => '']);

            $ggCtrl = new ProjectGeneralExpensesController();
            $gg = $ggCtrl->getListMatrix($levelRepo);

            $transportCtrl = new ProjectTransportController();
            $transport = $transportCtrl->getListMatrix($levelRepo);

            return response()->json([
                'status' => true,
                'states' => $states,
                'gg' => $gg,
                'transport' => $transport
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function approval($id, ProjectInterface $repo, ApproverProjectInterface $aProject,
                             ApproverProjectDetailInterface $aProjectDetail)
    {
        DB::beginTransaction();
        try {
            $project = $repo->find($id);
            $sub_state_id = $project->sub_state_id;

            if ($sub_state_id != 2 && $sub_state_id != 4 && $sub_state_id != 6 && $sub_state_id != 8) {
                throw new \Exception('Este proyecto no puede ser aprobado');
            }
            $user = $aProject->getByProjectUser($id, auth()->id());
            if  (!$user) {
                throw new \Exception('El usuario no tiene permisos para aprobar el proyecto');
            }
            $approval = $aProjectDetail->getByApprovalState($user->id, $sub_state_id);
            if (!$approval) {
                throw new \Exception('El usuario no tiene permisos para aprobar el proyecto');
            }

            if ($sub_state_id == 2) {
                $this->passLBToPV($project);
                $repo->update($id, [
                    'sub_state_id' => self::$_PROJECT_APPROVAL_LB,
                    'total_pv' => $project->total_lb
                ]);
            } elseif ($sub_state_id == 4) {
                $repo->update($id, [
                    'sub_state_id' => self::$_PROJECT_APPROVAL_PV
                ]);
                $this->passPVToMeta($project, $repo);
            } elseif ($sub_state_id == 6) {
                $repo->update($id, [
                    'sub_state_id' => self::$_PROJECT_APPROVAL_META
                ]);
            } elseif ($sub_state_id == 8) {
                $repo->update($id, [
                    'sub_state_id' => self::$_PROJECT_APPROVAL_DF,
                    'project_state_id' => self::$_PROJECT_ACTIVE
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

    public function reject($id, ProjectInterface $repo, ApproverProjectInterface $aProject,
                             ApproverProjectDetailInterface $aProjectDetail)
    {
        try {
            $project = $repo->find($id);
            $sub_state_id = $project->sub_state_id;

            if ($sub_state_id != 2 && $sub_state_id != 4 && $sub_state_id != 6 && $sub_state_id != 8) {
                throw new \Exception('Este proyecto no puede ser rechazado');
            }
            $user = $aProject->getByProjectUser($id, auth()->id());
            if  (!$user) {
                throw new \Exception('El usuario no tiene permisos para rechazar el proyecto');
            }
            $approval = $aProjectDetail->getByApprovalState($user->id, $sub_state_id);
            if (!$approval) {
                throw new \Exception('El usuario no tiene permisos para rechazar el proyecto');
            }

            $repo->update($id, [
                'project_state_id' => self::$_PROJECT_INACTIVE
            ]);

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

}