<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 22/06/2017
 * Time: 04:57 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Approval_autonomy\Approval_autonomyInterface;
use App\Http\Recopro\ContestAutonomyApproval\ContestAutonomyApprovalInterface;
use App\Http\Recopro\ContestConsolidated\ContestConsolidatedInterface;
use App\Http\Recopro\ContestProvider\ContestProviderInterface;
use App\Http\Recopro\ContestProviderDetail\ContestProviderDetail;
use App\Http\Recopro\ContestProviderDetail\ContestProviderDetailInterface;
use App\Http\Recopro\ContestRequirement\ContestRequirementInterface;
use App\Http\Recopro\Currency\CurrencyInterface;
use App\Http\Recopro\Param\ParamInterface;
use App\Http\Recopro\PaymentCondition\PaymentConditionInterface;
use App\Http\Recopro\ProjectConsolidated\ProjectConsolidatedInterface;
use App\Http\Recopro\Quotation\CompareQuotationTrait;
use App\Http\Recopro\Quotation\QuotationInterface;
use App\Http\Recopro\QuotationState\QuotationStateInterface;
use App\Http\Recopro\Requirement\RequirementInterface;
use App\Http\Recopro\TypeChange\TypeChangeInterface;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;

class QuotationController extends Controller
{
    use CompareQuotationTrait;
    private static $_REQUIREMENT_APPROVED = 3;

    private static $_REQUIREMENT_ASSIGNED = 6;

    private static $_REQUIREMENT_REGISTERED = 1;


    private static $_QUOTATION_REGISTERED = 1;

    private static $_QUOTATION_SENT_TO_APPROVAL = 2;

    private static $_QUOTATION_APPROVED = 3;

    private static $_QUOTATION_CANCELED = 4;

    private static $_QUOTATION_REJECTED = 5;

    private static $_QUOTATION_WITH_OC = 6;

    public function __construct()
    {
        $this->middleware('ajax', ['only' => ['all']]);
    }

    public function all(Request $request, QuotationInterface $repo)
    {
        try {
            $filter = $request->all();
            $params = ['id', 'code', 'description', 'user_created', 'created_at', 'quotation_state_id'];

            $info = parseDataList($repo->search($filter), $request, 'id', $params);

            $data = $info[1];

            foreach ($data as $d) {
                $d->requested_by = $d->user_created;
                $d->date = Carbon::parse($d->created_at)->format('d/m/Y');
                $d->state_desc = $d->quotation_state->description;
                unset($d->user_c, $d->user_created, $d->created_at, $d->quotation_state, $d->quotation_state_id);
            }

            return response()->json([
                'Result' => 'OK',
                'TotalRecordCount' => $info[0],
                'Records' => $data
            ]);

        } catch (\Exception $e) {
            throw new \Exception($e);
        }
    }

    public function createUpdate($id, Request $request, QuotationInterface $repo, RequirementInterface $req,
                                 ContestRequirementInterface $contestRequirement,
                                 ContestConsolidatedInterface $contestConsolidated, ContestProviderInterface $repoContestProvider,
                                 ContestProviderDetailInterface $repoProviderDetail)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $requirements = explode('-', $data['requirements']);
            unset($data['requirements']);
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $data['requested_by'] = auth()->user()->name;
                $data['quotation_state_id'] = self::$_QUOTATION_REGISTERED;
                $model = $repo->create($data);
                $id = $model->id;
            }
            if ($request->input('contest_provider_id')) {
                $contest_provider = explode('-', $request->input('contest_provider_id'));
                $repoContestProvider->deleteByQuotation($id, $contest_provider);
                $repoProviderDetail->deleteByProvider($id, $contest_provider);
            }

            $contestRequirement->deleteExcept($requirements, $id);
            $contest = $repo->find($id);
            $requirements_exists = [];
            foreach ($contest->contest_requirements as $cr) {
                $requirements_exists[] = $cr->requirement_id;
//                $req->update($cr->requirement_id, [
//                    'requirement_state_id' => self::$_REQUIREMENT_APPROVED
//                ]);
            }
            $items = [];
            $articles = [];
            foreach ($requirements as $r_id) {
                $requirement = $req->find($r_id);
                if (!in_array($r_id, $requirements_exists)) {
                    if ($requirement->requirement_state_id == self::$_REQUIREMENT_ASSIGNED) {
                        throw new \Exception('El requerimiento ' . $requirement->code . ' ya ha sido asignado a un concurso');
                    }
                    $req->update($r_id, [
                        'requirement_state_id' => self::$_REQUIREMENT_ASSIGNED
                    ]);
                }
                $contestRequirement->createUpdate([
                    'contest_id' => $id,
                    'requirement_id' => $r_id
                ]);

                foreach ($requirement->detail as $d) {
                    $article_id = $d->project_consolidated->article_id;
                    $project_id = $d->project_consolidated->project_id;
                    if (in_array($article_id, $articles)) {
                        $key = array_search($article_id, array_column($items, 'article_id'));
                        $items[$key]['quantity'] += $d->quantity_requested;
                        $items[$key]['reference_project'] = $items[$key]['reference_project'] . '-' . $project_id;
                        $items[$key]['reference_quantity'] = $items[$key]['reference_quantity'] . '-' . $d->quantity_requested;
                    } else {
                        $items[] = [
                            'contest_id' => $id,
                            'article_id' => $article_id,
                            'quantity' => $d->quantity_requested,
                            'reference_project' => $project_id,
                            'reference_quantity' => $d->quantity_requested
                        ];
                        $articles[] = $article_id;
                    }

                }
            }
            foreach ($items as $i) {
                $contestConsolidated->createUpdate($i);
            }

            DB::commit();
            return response()->json([
                'status' => true,
                'id' => $id
            ]);
        } catch
        (\Exception $e) {
            throw new  \Exception($e);
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function UpdateCompare($id, Request $request, ContestProviderInterface $repo, ContestProviderDetailInterface $repoDetail,
                                  QuotationInterface $conRepo)
    {
        DB::beginTransaction();
        try {
            $contest_provider = explode('-', $request->input('contest_provider'));
            $subtotal = explode('-', $request->input('subtotal'));
            $igv = explode('-', $request->input('igv'));
            $total = explode('-', $request->input('total'));

            $subtotal_local = explode('-', $request->input('subtotal_local'));
            $igv_local = explode('-', $request->input('igv_local'));
            $total_local = explode('-', $request->input('total_local'));

            $subtotal_dollar = explode('-', $request->input('subtotal_dollar'));
            $igv_dollar = explode('-', $request->input('igv_dollar'));
            $total_dollar = explode('-', $request->input('total_dollar'));


            $a_detail = explode('-', $request->input('item_code'));
            $a_price = explode('-', $request->input('item_price'));
            $a_price_buyer = explode('-', $request->input('item_price_buyer'));
            $a_price_system = explode('-', $request->input('item_price_system'));
            $a_quantity = explode('-', $request->input('item_quantity'));
            $a_total = explode('-', $request->input('item_total'));
            $data_contest = $request->all();
            $data_contest['total'] = null;
            $conRepo->update($id, $data_contest);
//            foreach ($contest_provider as $item => $k) {
//                $repo->UpdateCompare([
//                    'id' => $contest_provider[$item],
//                    'igv' => $igv[$item],
//                    'subtotal' => $subtotal[$item],
//                    'total' => $total[$item],
//                    'igv_local' => $igv_local[$item],
//                    'subtotal_local' => $subtotal_local[$item],
//                    'total_local' => $total_local[$item],
//                    'igv_dollar' => $igv_dollar[$item],
//                    'subtotal_dollar' => $subtotal_dollar[$item],
//                    'total_dollar' => $total_dollar[$item]
//                ]);
//            }

            foreach ($a_detail as $item => $k) {
                $repoDetail->UpdateCompare([
                    'id' => $a_detail[$item],
//                    'quantity' => $a_quantity[$item],
//                    'total' => $a_total[$item],
                    'price_buyer' => $a_price_buyer[$item],
                    'price_system' => $a_price_system[$item]
                ]);
            }

            DB::commit();
            return response()->json([
                'status' => true
            ]);
        } catch (\Exception $e) {
            throw new  \Exception($e);
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }


    public function find($id, QuotationInterface $repo)
    {
        try {


            $data = $repo->find($id);
            $data->detail;
            $data->requirements = $data->contest_requirements;
            $data->providers = $data->contest_providers;
            $data->requested_by = $data->user_c->name;
            $data->date = Carbon::parse($data->created_at)->format('d/m/Y');
            unset($data->contest_requirements, $data->user_created, $data->user_c, $data->contest_providers);

            foreach ($data->requirements as $d) {
                $requirement = $d->requirement;
                $d->code = $requirement->code;
                $d->date_registration = Carbon::parse($requirement->date_registration)->format('d/m/Y');
                $d->project_description = $requirement->project->code . ' ' . $requirement->project->description;
                $d->requested_by = $requirement->requested_by;
                $d->id = $d->requirement_id;
            }
            foreach ($data->providers as $d) {
                $d->description = $d->provider->NombreEntidad;
                $d->document = $d->provider->Documento;
            }
            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
//            throw new \Exception($e);
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function findCompare($id, QuotationInterface $repo, ContestAutonomyApprovalInterface $repoContestAuto)
    {
        try {
            $data = $repo->find($id);

            $super = auth()->user()->id;
            $detailAutonomy = $repoContestAuto->findByContest($id);
//            dd($id, $detailAutonomy);
            $user_approval = $detailAutonomy->autonomy_approval->user;
            $approval_id = $user_approval->id;
            $user_name = $user_approval->name;
            if ($approval_id === $super) {
                $data->user_name = $user_name;
                $data->autonomy_user = 1;
            } else {
                $data->user_name = $user_name;
                $data->autonomy_user = 0;
            }

            $data->detail;
            $data->requirements = $data->contest_requirements;
            $data->providers = $data->contest_providers;
            $data->requested_by = $data->user_c->name;
            $data->date = Carbon::parse($data->created_at)->format('d/m/Y');
            unset($data->contest_requirements, $data->user_created, $data->user_c, $data->contest_providers);

            foreach ($data->requirements as $d) {
                $requirement = $d->requirement;
                $d->code = $requirement->code;
                $d->date_registration = Carbon::parse($requirement->date_registration)->format('d/m/Y');
                $d->project_description = $requirement->project->code . ' ' . $requirement->project->description;
                $d->requested_by = $requirement->requested_by;
                $d->id = $d->requirement_id;
            }
            foreach ($data->providers as $d) {
                $d->description = $d->provider->NombreEntidad;
                $d->document = $d->provider->Documento;
            }
            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            throw new \Exception($e);
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }


    public function destroy(QuotationInterface $repo, RequirementInterface $requirement, Request $request,
                            ContestRequirementInterface $contestRequirement)
    {
        DB::beginTransaction();
        try {
            $id = $request->input('id');
            $contest = $repo->find($id);
            if ((int)$contest->quotation_state_id === self::$_QUOTATION_REGISTERED || (int)$contest->quotation_state_id === self::$_QUOTATION_REJECTED) {
            } else {
                throw new \Exception('No se puede eliminar el concurso');
            }
            foreach ($contest->contest_requirements as $cr) {
                $requirement->update($cr->requirement_id, [
                    'requirement_state_id' => self::$_REQUIREMENT_APPROVED
                ]);
            }
            $contestRequirement->deleteExcept([], $id);
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

    public function data_form(QuotationStateInterface $quoState, PaymentConditionInterface $paymentCondition,
                              CurrencyInterface $currencyRepo, ParamInterface $paramRepo,
                              TypeChangeInterface $typeChangeRepo)
    {
        $states = parseSelectOnly($quoState->all(), 'id', 'description');
        $payment_conditions = parseSelectOnly($paymentCondition->all(), 'id', 'description');
        $currency = parseSelectOnly($currencyRepo->all(), 'IdMoneda', 'Descripcion');
        array_unshift($states, ['DisplayText' => 'Todos', 'Value' => '']);
        array_unshift($payment_conditions, ['DisplayText' => '--SELECCIONE--', 'Value' => '']);

        $now = Carbon::now('America/Lima')->toDateString();
        $date = $typeChangeRepo->getByDate($now);

        $change_status = ($date->Fecha == $now);
        $change = (float)$date->Compra;
        $type_change_id = $date->Fecha;

        return response()->json([
            'status' => true,
            'states' => $states,
            'payment_conditions' => $payment_conditions,
            'currency' => $currency,
            'igv' => $paramRepo->getByDescription('IGV', 19),
            'change' => $change,
            'type_change_id' => $type_change_id,
            'change_status' => $change_status
        ]);
    }

    public function compareConsolidated($id, QuotationInterface $repo, ContestProviderInterface $repoProvider)
    {
        try {
            $provider = [];
            $provider_name = [];
            $i = 0;
            $providerData = $repoProvider->findOrContest($id);
            foreach ($providerData as $Pro) {
                $provider[$i] = $Pro->id;
                $i++;
            }
            foreach ($providerData as $pro) {
                $pro->name_provider = $pro->provider->NombreEntidad;
            }
            $data = $this->getCompareQuotation($id, $provider, $repo, $providerData);

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

    public function sendApproval($id, Request $request, QuotationInterface $repo, ContestAutonomyApprovalInterface $repoAuto)
    {
        DB::beginTransaction();
        try {
            $state = $repo->find($id)->quotation_state_id;
            if ($state != self::$_QUOTATION_REGISTERED && $state != self::$_QUOTATION_REJECTED) {
                throw new \Exception('No se puede envíar el concurso');
            }
            // asignacion de autonomias de aprobadores al concurso
            $approval = $request->input('approval_contest');
            $amount_contest = $request->input('amount_contest');
            $repo->update($id, [
                'quotation_state_id' => self::$_QUOTATION_SENT_TO_APPROVAL,
                'total' => $amount_contest
            ]);

            $repoAuto->deleteByContestAutonomy($id, $approval);

            foreach ($approval as $item => $k) {
                $repoAuto->createUpdate([
                    'contest_id' => $id,
                    'approval_autonomy_id' => $approval[$item],
                    'state' => 0
                ]);
            }


            DB::commit();
            return response()->json([
                'status' => true
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

    public function cancelContest($id, QuotationInterface $repo, ProjectConsolidatedInterface $consolidatedRepo,
                                  RequirementInterface $requirementRepo)
    {
        DB::beginTransaction();
        try {
            $r = $repo->find($id);
            $state = $r->quotation_state_id;
            if ($state === self::$_QUOTATION_SENT_TO_APPROVAL || $state === self::$_QUOTATION_APPROVED) {
                throw new \Exception('No se puede cancelar el concurso');
            }
            $requirement_data = $r->contest_requirements;

            foreach ($requirement_data as $req) {
                $requirement = $req->requirement;
                $requirementRepo->update($requirement->id, [
                    'requirement_state_id' => self::$_REQUIREMENT_APPROVED
                ]);
//                foreach ($requirement->detail as $dr) {
//                    $consolidatedRepo->update($dr->project_consolidated_id, [
//                        'quantity_served' => $dr->project_consolidated->quantity_served + $dr->quantity_requested
//                    ]);
//                }
            }
            $repo->update($id, [
                'quotation_state_id' => self::$_QUOTATION_CANCELED
            ]);
            DB::commit();
            return response()->json([
                'status' => true
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


    public function autonomyApproval(Approval_autonomyInterface $aut)
    {
//        $warehouse = parseSelectOnly($ware->all(), 'id', 'description');
        $autonomy = parseSelectAttributesTwo($aut->all()->sortBy("to"), 'id', 'from', 'to');
        return response()->json([
            'status' => true,
            'autonomy' => $autonomy
        ]);

    }

}