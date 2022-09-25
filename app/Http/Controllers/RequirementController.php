<?php namespace App\Http\Controllers;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 08/06/2017
 * Time: 11:56 AM
 */

use App\Http\Recopro\ProjectConsolidated\ProjectConsolidatedInterface;
use App\Http\Recopro\Requirement\RequirementInterface;
use App\Http\Recopro\Requirement\RequirementTrait;
use App\Http\Recopro\RequirementDetail\RequirementDetailInterface;
use App\Http\Recopro\RequirementLineState\RequirementLineStateInterface;
use App\Http\Recopro\RequirementState\RequirementStateInterface;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;

class RequirementController extends Controller
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
//        $this->middleware('json', ['except' => ['data_form', 'createUpdate', 'find']]);
        $this->middleware('ajax', ['only' => ['all']]);
    }

    public function all(Request $request, RequirementInterface $repo)
    {
        $filter = $request->all();
        $params = ['id', 'code', 'date_registration', 'date_required', 'project_id', 'requirement_state_id',
            'requirement_line_state_id', 'requested_by', 'buyer_id'];

        $info = parseDataList($repo->search($filter), $request, 'id', $params);

        $data = $info[1];

        foreach ($data as $d) {
            $d->date_registration = Carbon::parse($d->date_registration)->format('d/m/Y');
            $d->date_required = ($d->date_required == null) ?
                '' : Carbon::parse($d->date_required)->format('d/m/Y');
            $d->project_description = $d->project->code . ' ' . $d->project->description;
            $d->requirement_state_desc = $d->requirement_state->description;
            $d->requirement_state_line_desc = $d->requirement_state_line->description;
            if (isset($filter['show_buyer']) && $filter['show_buyer'] == 'true') {
                $d->buyer_desc = ($d->buyer) ? $d->buyer->description : '';
                unset($d->buyer_id, $d->buyer);
            }
            unset($d->project_id, $d->requirement_state_id, $d->requirement_line_state_id, $d->project,
                $d->requirement_state, $d->requirement_state_line);
        }

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function createUpdate($id, Request $request, RequirementInterface $repo, RequirementDetailInterface $detailRepo,
                                 ProjectConsolidatedInterface $consolidatedRepo)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $articles_id = explode('-', $data['articles_id']);
            $articles_val = explode('-', $data['articles_val']);
            unset($data['articles_id'], $data['articles_val']);
            $data['date_required'] = ($data['date_required'] == '') ?
                null : Carbon::createFromFormat('d/m/Y', $data['date_required']);
            $data['observation'] = ($data['observation'] == null) ? '' : $data['observation'];
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $data['date_registration'] = Carbon::now('America/Lima');
                $data['requirement_state_id'] = self::$_REQUIREMENT_REGISTERED;
                $data['requirement_line_state_id'] = self::$_REQUIREMENT_LINE_NO_PURCHASE_PROCESS;
                $model = $repo->create($data);
                $id = $model->id;
            }
            $detailReq = $detailRepo->getByRequirement($id);
            foreach ($detailReq as $dr) {
                $consolidatedRepo->update($dr->project_consolidated_id, [
                    'quantity_served' => $dr->project_consolidated->quantity_served + $dr->quantity_requested,
//                    'quantity_requested' => $dr->project_consolidated->quantity_served + $dr->quantity_requested
                ]);
            }
            $detailRepo->deleteExcept($articles_id, $id);
            foreach ($articles_id as $item => $c_id) {
                $consolidated = $consolidatedRepo->find($c_id);
                $consolidatedRepo->update($c_id, [
                    'quantity_served' => $consolidated->quantity_served - $articles_val[$item]
                ]);
                $detailRepo->createUpdate([
                    'requirement_id' => $id,
                    'project_consolidated_id' => $c_id,
                    'quantity_requested' => $articles_val[$item],
                    'quantity_served' => 0
                ]);
            }
            DB::commit();
            return response()->json([
                'status' => true
            ]);
        } catch (\Exception $e) {
//            throw new \Exception($e);
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function find($id, RequirementInterface $repo)
    {
        try {
            $data = $repo->find($id);

            $data->state = $data->requirement_state->description;
            $data->date_register = Carbon::parse($data->date_register)->format('d/m/Y');
            $data->date_required = ($data->date_required == null) ?
                '' : Carbon::parse($data->date_required)->format('d/m/Y');
            $data->project_code = $data->project->code;
            $data->project_description = $data->project->description;
            $data->approved_by = ($data->approved) ? $data->approved->name : '';

            unset($data->requirement_state, $data->project, $data->approved);

            $detail = $data->detail;
            foreach ($detail as $d) {
                $pc = $d->project_consolidated;
                $d->id = $pc->id;
                $d->product = $pc->article->description_detail;
                $d->matrix = ($pc->article->level) ? $pc->article->code_matrix : '';
                $d->um = ($pc->article->unity) ? $pc->article->unity->Descripcion : '';
                $d->price = $pc->price;
                $d->project_balance = $pc->project_balance;
                $d->quantity_served = $d->quantity_requested;
                $d->quantity_requested += $pc->quantity_served;
                unset($d->project_consolidated_id, $d->project_consolidated);
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

    public function destroy(RequirementInterface $repo, Request $request, RequirementDetailInterface $detailRepo,
                            ProjectConsolidatedInterface $consolidatedRepo)
    {
        DB::beginTransaction();
        try {
            $id = $request->input('id');
            $r = $repo->find($id);
            $state = $r->requirement_state_id;
            if ($state != self::$_REQUIREMENT_REGISTERED) {
                throw new \Exception('No se puede eliminar el requerimiento');
            }
            foreach ($r->detail as $dr) {
                $consolidatedRepo->update($dr->project_consolidated_id, [
                    'quantity_served' => $dr->project_consolidated->quantity_served + $dr->quantity_requested
                ]);
            }
            $detailRepo->deleteExcept([], $id);
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

    public function sendApproval($id, RequirementInterface $repo)
    {
        DB::beginTransaction();
        try {
            $state = $repo->find($id)->requirement_state_id;
            if ($state != self::$_REQUIREMENT_REGISTERED) {
                throw new \Exception('No se puede envíar el requerimiento');
            }
            $repo->update($id, [
                'requirement_state_id' => self::$_REQUIREMENT_SENT_TO_APPROVAL
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

    public function cancelRequirement($id, RequirementInterface $repo, ProjectConsolidatedInterface $consolidatedRepo)
    {
        DB::beginTransaction();
        try {
            $r = $repo->find($id);
            $state = $r->requirement_state_id;
            if ($state != self::$_REQUIREMENT_SENT_TO_APPROVAL) {
                if ($state == self::$_REQUIREMENT_APPROVED) {
                    if (count($r->contest_requirements) > 0) {
                        throw new \Exception('No se puede cancelar el requerimiento porque tiene concursos asociados');
                    }
                } else {
                    throw new \Exception('No se puede cancelar el requerimiento');
                }
            }
            foreach ($r->detail as $dr) {
                $consolidatedRepo->update($dr->project_consolidated_id, [
                    'quantity_served' => $dr->project_consolidated->quantity_served + $dr->quantity_requested
                ]);
            }
            $repo->update($id, [
                'requirement_state_id' => self::$_REQUIREMENT_CANCELED
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

    public function data_form(RequirementStateInterface $reqState, RequirementLineStateInterface $reqLineState)
    {
        $states = parseSelectOnly($reqState->all(), 'id', 'description');
        $states_line = parseSelectOnly($reqLineState->all(), 'id', 'description');
        array_unshift($states, ['DisplayText' => 'Todos los Estados', 'Value' => '']);
        array_unshift($states_line, ['DisplayText' => 'Todos los Estados por Linea', 'Value' => '']);

        return response()->json([
            'status' => true,
            'states' => $states,
            'states_line' => $states_line,
            'user' => auth()->user()->name
        ]);
    }

    public function excel(RequirementInterface $repo, Request $request)
    { 
        $filter = $request->all();
        $data = $repo->search($filter)->get();
        return generateExcel($this->generateDataExcel($data), 'LISTA DE REQUERIMIENTOS', 'Requerimientos');
    }

    public function getQuotations($requirement_id, RequirementInterface $requirementRepo)
    {
        try {
            $requirement = $requirementRepo->find($requirement_id);

            $data = [];

            foreach ($requirement->contest_requirements as $cr) {
//                $contest = $cr->contest;
//                $data[] = [
//                    'code' => $contest->code,
//                    'document' => '',
//                    'business_name' => '',
//                    'state' => $contest->quotation_state->description
//                ];
                $contest = $cr->contest;
                foreach ($contest->contest_providers as $cot) {
                    $currency = ($cot->currency_id == 1) ? 'S/. ' : '$. ';
                    if ((int)$contest->quotation_state_id !== 4) {
                        $data[] = [
                            'number' => $cot->number,
                            'document' => $cot->provider->Documento,
                            'business_name' => $cot->provider->NombreEntidad,
                            'state' => $contest->quotation_state->description,
                            'code_contest' => $contest->code,
                            'payment_condition' => ($cot->payment_condition) ? $cot->payment_condition->description : '',
                            'total' => $currency . number_format($cot->total, 2, '.', ''),
                            'currency' => $currency,
                            'total_vs' => $cot->total
                        ];
                    }
                }
            }

            DB::commit();
            return response()->json([
                'status' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            throw new \Exception($e);
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getContests($requirement_id, RequirementInterface $requirementRepo)
    {
        try {
            $requirement = $requirementRepo->find($requirement_id);

            $data = [];

            foreach ($requirement->contest_requirements as $cr) {
                $contest = $cr->contest;
                $data[] = [
                    'code' => $contest->code,
                    'document' => '',
                    'business_name' => '',
                    'state' => $contest->quotation_state->description
                ];
            }

            DB::commit();
            return response()->json([
                'status' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getRequirement(Request $request, RequirementInterface $repo)
    {
        $filter = $request->all();
        $params = ['id', 'code', 'date_registration', 'date_required', 'project_id', 'requirement_state_id',
            'requirement_line_state_id', 'requested_by', 'buyer_id'];

        $info = parseDataList($repo->search_project($filter), $request, 'id', $params);

        $data = $info[1];

        foreach ($data as $d) {
            $d->date_registration = Carbon::parse($d->date_registration)->format('d/m/Y');
            $d->date_required = ($d->date_required == null) ?
                '' : Carbon::parse($d->date_required)->format('d/m/Y');
            $d->project_description = $d->project->code . ' ' . $d->project->description;
            $d->requirement_state_desc = $d->requirement_state->description;
            $d->requirement_state_line_desc = $d->requirement_state_line->description;
            if (isset($filter['show_buyer']) && $filter['show_buyer'] == 'true') {
                $d->buyer_desc = ($d->buyer) ? $d->buyer->description : '';
                unset($d->buyer_id, $d->buyer);
            }
            unset($d->project_id, $d->requirement_state_id, $d->requirement_line_state_id, $d->project,
                $d->requirement_state, $d->requirement_state_line);
        }

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

}