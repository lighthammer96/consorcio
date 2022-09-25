<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 09/06/2017
 * Time: 12:04 PM
 */

namespace App\Http\Controllers;

use App\Exceptions\ReplacePriceException;
use App\Http\Recopro\AnalysisUnitaryPrice\AnalysisUnitaryPriceInterface;
use App\Http\Recopro\Product\ProductInterface;
use App\Http\Recopro\Project\ProjectApprovalTrait;
use App\Http\Recopro\Project\ProjectInterface;
use App\Http\Recopro\Project\ProjectTrait;
use App\Http\Recopro\ProjectConsolidated\ProjectConsolidatedInterface;
use App\Http\Recopro\ProjectConsolidated\ProjectConsolidatedTrait;
use App\Http\Recopro\ProjectGGT\ProjectGGTInterface;
use App\Http\Recopro\Stock\StockInterface;
use App\Http\Recopro\Level\LevelInterface;
use App\Http\Recopro\ProjectState\ProjectStateInterface;
use App\Http\Recopro\SubProjectFront\SubProjectFrontInterface;
use App\Http\Recopro\SubProjectFrontDetail\SubProjectFrontDetailInterface;
use App\Http\Recopro\SubProjectFrontDetail\SubProjectFrontDetail;
use App\Http\Recopro\SubProjectLevel\SubProjectLevelInterface;
use App\Http\Recopro\Unity\UnityInterface;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    use ProjectTrait;

    use ProjectConsolidatedTrait;

    use ProjectApprovalTrait;

    public static $_LEVEL_PARENT = 'A';

    public function __construct()
    {
        $this->middleware('ajax', ['only' => ['all']]);
    }

    public function all(ProjectInterface $repo, Request $request)
    {
        $filter = $request->all();
        $params = ['id', 'code', 'description', 'project_state_id', 'sub_state_id', 'client_id', 'total_lb',
            'total_pv', 'total_meta', 'created_at'];

        $info = parseDataList($repo->search($filter), $request, 'id', $params);

        $data = $info[1];

        foreach ($data as $d) {
            $d->state = $d->project_state->description;
            $d->sub_state = $d->project_sub_state->description;
            $d->client_desc = (isset($d->client)) ? $d->client->NombreEntidad : '';
            $d->total = formatNumberTotal($this->getTotalNumber($d), 2);
            unset($d->project_state, $d->project_sub_state, $d->client, $d->client_id, $d->project_state_id,
                $d->sub_state_id, $d->total_lb, $d->total_pv, $d->total_meta);
        }

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function createUpdate($id, Request $request, ProjectInterface $repo, SubProjectLevelInterface $subProjectLevel,
                                 AnalysisUnitaryPriceInterface $apuRepo, ProjectGGTInterface $projectGGT,
                                 SubProjectFrontDetailInterface $subProjectFrontDetail, SubProjectFrontInterface $subProjectFront)
    {
        $code_ = $request->input('is_code');
        $is_retry = (int)$request->input('is_retry');
        if ($is_retry == 1) {
            DB::beginTransaction();
            try {
                foreach ($request->input('expense_mat') as $mat) {
                    if ($mat['id'] == $code_) {
                        $mat_ = $subProjectLevel->find($mat['id']);
                        $this->updateArticlePrice($mat['price'], 1, $mat_, $repo, true);
                    }
                }
                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                return response()->json([
                    'status' => false,
                    'message' => $e->getMessage()
                ]);
            }
        }
        DB::beginTransaction();
        try {
            $data = $request->except(['is_retry', 'is_code', 'income_mat', 'activity', 'expense_mat',
                'expense_con', 'ggt', 'front_mat', 'front_act']);
            $income_mat = $request->input('income_mat');
            $activity = $request->input('activity');
            $expense_mat = $request->input('expense_mat');
            $expense_con = $request->input('expense_con');
            $ggt = $request->input('ggt');
            $front_mat = $request->input('front_mat');
            $front_act = $request->input('front_act');
            $data['date_start'] = ($data['date_start'] != '') ?
                Carbon::createFromFormat('d/m/Y', $data['date_start'])->toDateString() : null;
            $data['date_end'] = ($data['date_end'] != '') ?
                Carbon::createFromFormat('d/m/Y', $data['date_end'])->toDateString() : null;
            if ($id != 0) {
                $project = $repo->find($id);
                $sub_state_id = $project->sub_state_id;
                if ($sub_state_id > 1) {
                    unset($data['description'], $data['cost_load'], $data['gg_direct'], $data['gg_indirect'],
                        $data['transport'], $data['utils'], $data['apu_materials'], $data['apu_equipment']);
                }
                if ($sub_state_id == 1 || $sub_state_id == 3 || $sub_state_id == 5 || $sub_state_id == 7) {
                    $project = $repo->update($id, $data);
                }
            } else {
                $project = $repo->create($data);
                $sub_state_id = $project->sub_state_id;
                $id = $project->id;
            }
            if ($sub_state_id == 2 || $sub_state_id == 4 || $sub_state_id == 6) {
                throw new \Exception('El proyecto está en proceso de verificación');
            }
            $total = ($sub_state_id > 2) ? $project->total_pv : $project->total_lb;
            $total_mat = 0;
            $parent = 0;
            if ($sub_state_id == 1 || $sub_state_id == 3) {
                $txt_ = ($sub_state_id == 1) ? 'lb' : 'pv';
                foreach ($income_mat as $item => $inc) {
                    $level_ = $subProjectLevel->find($inc['id']);
                    if (!$level_) {
                        throw new \Exception('El Material no existe en este subproyecto');
                    }
                    if ($item > 0) {
                        if ($level_->parent_id != $parent) {
                            throw new \Exception('El Material no pertenece al nivel seleccionado');
                        }
                    } else {
                        $parent = $level_->parent_id;
                    }
                    $quantity = ($inc['quantity'] == '') ? 0 : (float)$inc['quantity'];
                    if ($sub_state_id == 3 && (int)$level_->type_progress == 1) {
                        $price = (float)$level_->pv_price;
                        $p_ = $price;
                    } else {
                        $price = ($inc['price'] == '') ? 0 : (float)$inc['price'];
                        $p_ = ($inc['price'] == '') ? null : (float)$inc['price'];
                    }
                    $subProjectLevel->update($level_->id, [
                        $txt_ . '_price' => $p_,
                        $txt_ . '_quantity' => ($inc['quantity'] == '') ? null : (float)$inc['quantity'],
                        $txt_ . '_total' => (is_null($p_) && $inc['quantity'] == '') ? null : (float)$price * $quantity
                    ]);
                    $total_mat += $price * $quantity;
                }
                if ($parent != 0) {
                    $subProjectLevel->update($parent, [
                        $txt_ . '_total' => (float)$total_mat
                    ]);
                }
                foreach ($activity as $a) {
                    $sp = $subProjectLevel->find($a['code']);
                    if (!$sp) {
                        throw new \Exception('La Actividad no existe en este subproyecto');
                    }
                    if ($sp->subProject->project_id != $id) {
                        throw new \Exception('La Actividad no pertenece a este proyecto');
                    }
                    $q = ($a['q'] != '') ? (float)$a['q'] : null;
                    $price_ = ($sub_state_id == 1) ? $sp->lb_price : $sp->pv_price;
                    $um_ = ($sub_state_id == 1) ? 'um_id' : 'pv_um_id';
                    $total = (is_null($q)) ? 0 : $price_ * $q;
                    $subProjectLevel->update($sp->id, [
                        $txt_ . '_quantity' => $q,
                        $txt_ . '_total' => $total,
                        $um_ => $a['um']
                    ]);
                }
                $total = $this->calculateTotal($id, $repo);
            } elseif ($sub_state_id == 5) {
                foreach ($expense_mat as $item => $exp) {
                    $level_ = $subProjectLevel->find($exp['id']);
                    if (!$level_) {
                        throw new \Exception('El Material no existe en este subproyecto');
                    }
                    if ($item > 0) {
                        if ($level_->parent_id != $parent) {
                            throw new \Exception('El Material no pertenece al nivel seleccionado');
                        }
                    } else {
                        $parent = $level_->parent_id;
                    }
                    $price = ($exp['price'] == '') ? 0 : (float)$exp['price'];
                    if ($price > 0) {
                        $verify = $this->verifyArticlePrice($price, 1, $level_);
                        if (!$verify[0]) {
                            if ($is_retry == 0) {
                                $code_ = $level_->id;
                                throw new ReplacePriceException($verify[1]);
                            }
                        }
                    }
                    $subProjectLevel->update($level_->id, [
                        'me_price' => $price,
                        'me_total' => $price * $level_->me_quantity
                    ]);
                    $total_mat += $price * $level_->me_quantity;
                }
                if ($parent != 0) {
                    $subProjectLevel->update($parent, [
                        'me_total' => (float)$total_mat
                    ]);
                }
                foreach ($expense_con as $item => $con) {
                    $spl = $subProjectLevel->findByLevelProject($con['code'], $id);
                    if ($spl) {
                        $this->updateArticlePrice($con['price'], 1, $spl, $repo, false);
                        continue;
                    }
                    $apu = $apuRepo->findByLevelProject($con['code'], $id);
                    if ($apu) {
                        $this->updateArticlePrice($con['price'], 2, $apu, $repo, false);
                    }
                }

                $this->calculateTotal($id, $repo);

                $pc = new ProjectConsolidatedController();
                $pc->generateConsolidated($project);

                foreach ($ggt as $ggt_) {
                    $p = ($ggt_['p'] == '') ? null : (float)$ggt_['p'];
                    $p_ = (is_null($p)) ? 0 : $p;
                    $q = ($ggt_['q'] == '') ? null : (float)$ggt_['q'];
                    $q_ = (is_null($q)) ? 0 : $q;
                    $t_ = $p_*$q_;
                    $par = null;
                    $m = null;
                    if ((int)($ggt_['type']) == 1) {
                        $par = ($ggt_['par'] == '') ? null : (float)$ggt_['par'];
                        $m = ($ggt_['m'] == '') ? null : (int)$ggt_['m'];
                        $t_ = ($t_ == 0 || is_null($par) || is_null($m) || $par == 0 || $m == 0) ? 0 : (($p_*$par/100) * $q_ * $m);
                    }
                    $projectGGT->createUpdate([
                        'project_id' => $id,
                        'level_id' => $ggt_['matrix'],
                        'price' => $p,
                        'quantity' => $q,
                        'participation' => $par,
                        'months' => $m,
                        'total' => $t_
                    ]);
                }
            } elseif ($sub_state_id == 7) {
                $mat_verify = [];
                foreach ($front_mat as $fm) {
                    $spl = $subProjectLevel->findBySubPLProject($fm['a'], $project->id);
                    if (!$spl) {
                        throw new \Exception('El material ingresado no pertenece al proyecto');
                    }
                    $q = 0;
                    foreach ($fm['detail'] as $det) {
                        if (!in_array($det['f'], $mat_verify)) {
                            $f = $subProjectFront->findByProjectFront($project->id, $det['f']);
                            if (!$f) {
                                throw new \Exception('El frente ingresado no pertenece al proyecto');
                            }
                            $mat_verify[] = $det['f'];
                        }
                        $q += (float)$det['q'];
                        $subProjectFrontDetail->createUpdate([
                            'sub_project_front_id' => $det['f'],
                            'sub_project_level_id' => $fm['a'],
                            'quantity' => (float)$det['q'],
                            'total' => (float)$det['q']*$spl->me_price
                        ]);
                    }
                    if ($q != (float)$spl->me_quantity) {
                        throw new \Exception('Por favor distribuya correctamente la cantidad de los materiales');
                    }
                }
                foreach ($front_act as $fa) {
                    $spl = $subProjectLevel->findBySubPLProject($fa['a'], $project->id);
                    if (!$spl) {
                        throw new \Exception('La actividad ingresada no pertenece al proyecto');
                    }
                    $q = 0;
                    foreach ($fa['detail'] as $det) {
                        $f = $subProjectFront->findByProjectFront($project->id, $det['f']);
                        if (!$f) {
                            throw new \Exception('El frente ingresado no pertenece al proyecto');
                        }
                        $q += (float)$det['q'];
                        $f_act = $subProjectFrontDetail->createUpdate([
                            'sub_project_front_id' => $det['f'],
                            'sub_project_level_id' => $fa['a'],
                            'quantity' => (float)$det['q'],
                            'total' => (float)$det['q']*$spl->me_price
                        ]);
                        $price = (is_null($f_act->price_apu)) ? 0 : (float)$f_act->price_apu;
                        $subProjectFrontDetail->update($f_act->id, [
                            'price_apu' => $price,
                            'total_apu' => (float)$det['q']*$price
                        ]);
                    }
                    if ($q != (float)$spl->me_quantity) {
                        throw new \Exception('Por favor distribuya correctamente la cantidad de la actividad');
                    }
                }
            }

            DB::commit();
            return response()->json([
                'status' => true,
                'info' => [
                    'id' => $id,
                    'code' => $project->code,
                    'state' => $project->project_state->description,
                    'sub_state_id' => $project->sub_state_id,
                    'apu_materials' => $project->apu_materials,
                    'apu_equipment' => $project->apu_equipment,
                    'total' => $total
                ]
            ]);
        } catch (ReplacePriceException $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
                'retry' => true,
                'code' => $code_
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function find($id, ProjectInterface $repo)
    {
        try {
            $p = $repo->find($id);
            $p->state = $p->project_state->description;
            $p->client_description = ($p->client) ? $p->client->NombreEntidad : '';
            $p->client_document = ($p->client) ? $p->client->Documento : '';
            $p->date_start = ($p->date_start != null) ?
                Carbon::parse($p->date_start)->format('d/m/Y') : '';
            $p->date_end = ($p->date_end != null) ?
                Carbon::parse($p->date_end)->format('d/m/Y') : '';

            $sp = [];
            foreach ($p->subProjects as $s_p) {
                $sp[] = [
                    'id' => $s_p->id,
                    'description' => $s_p->description
                ];
            }
            $p->sp = $sp;
            $p->total = $this->getTotalNumber($p);

            $gt = [];
            foreach ($p->projectGGT as $pgt) {
                $l = $pgt->product;
                if ($l) {
                    $u = $l->unity;
                    $um = (is_null($u->symbol)) ? $u->Descripcion : $u->symbol;
                    $parent = $l->matrix;
                } else {
                    $l = $pgt->level;
                    $um = 'VJE';
                    $parent = $l->parent_id;
                }
                $gt[] = [
                    'type' => $pgt->type,
                    'matrix' => $pgt->level_id,
                    'description' => $l->description,
                    'participation' => (is_null($pgt->participation)) ? '' : $pgt->participation,
                    'months' => (is_null($pgt->months)) ? '' : $pgt->months,
                    'um' => $um,
                    'parent' => $parent,
                    'price' => (is_null($pgt->price)) ? '' : number_format($pgt->price, 2, '.', ''),
                    'quantity' => (is_null($pgt->quantity)) ? '' : number_format($pgt->quantity, 2, '.', ''),
                    'total' => number_format($pgt->total, 2, '.', ''),
                ];
            }
            $p->gt = $gt;

            unset($p->project_state, $p->project_state_id, $p->client, $p->subProjects,
                $p->total_lb, $p->total_pv, $p->total_meta, $p->projectGGT);

            return response()->json([
                'status' => true,
                'data' => $p
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getDataProject(LevelInterface $levelRepo, ProjectStateInterface $stateRepo, UnityInterface $unityRepo)
    {
        try {
            $levelCtrl = new ResourceController();
            $levels = $levelCtrl->getLevels(self::$_LEVEL_PARENT, $levelRepo);

            $apuCtrl = new AnalysisUnitaryPriceController();
            $apu = $apuCtrl->getListMatrix($levelRepo);

            $ggCtrl = new ProjectGeneralExpensesController();
            $gg = $ggCtrl->getListMatrix($levelRepo);

            $transportCtrl = new ProjectTransportController();
            $transport = $transportCtrl->getListMatrix($levelRepo);

            $states = parseSelectOnly($stateRepo->all(), 'id', 'description');
            array_unshift($states, ['DisplayText' => 'Todos los Estados', 'Value' => '']);

            $unity = parseSelectOption($unityRepo->all(), 'IdUnidadMedida', 'symbol', 'Descripcion');

            return response()->json([
                'status' => true,
                'levels' => $levels,
                'apu' => $apu,
                'states' => $states,
                'unity' => $unity,
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

    public function sendApproval($id, ProjectInterface $repo)
    {
        try {
            $this->verifyApproval($id, $repo);
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

    public function saveGT($id, Request $request, ProjectInterface $projectRepo, ProjectGGTInterface $repo)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $project = $projectRepo->find($id);
            if (!$project) {
                throw new \Exception('El proyecto no existe');
            }
            $p = ($data['p'] == '') ? null : (float)$data['p'];
            $p_ = (is_null($p)) ? 0 : $p;
            $q = ($data['q'] == '') ? null : (float)$data['q'];
            $q_ = (is_null($q)) ? 0 : $q;
            $par = null;
            $m_ = null;
            $t_ = $p_*$q_;
            if ((int)$data['type'] == 1) {
                $t_ = 0;
            }
            $repo->createUpdate([
                'project_id' => $id,
                'type' => (int)$data['type'],
                'level_id' => $data['matrix'],
                'price' => $p,
                'quantity' => $q,
                'participation' => $par,
                'months' => $m_,
                'total' => $t_
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

    public function deleteGT($id, Request $request, ProjectInterface $projectRepo, ProjectGGTInterface $repo)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $project = $projectRepo->find($id);
            if (!$project) {
                throw new \Exception('El proyecto no existe');
            }
            $repo->deleteByLevelType([
                'project_id' => $id,
                'level_id' => $data['matrix'],
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

    public function search(Request $request, ProjectInterface $repo)
    {
        $q = $request->input('q');

        $info = $repo->searchSelect($q)->take(5)->get();
        $data = [];
        foreach ($info as $i) {
            $data[] = [
                'id' => $i->id,
                'text' => $i->code . ' - ' . $i->description
            ];
        }
        return response()->json([
            'status' => true,
            'items' => $data
        ]);
    }

    public function excel(ProjectInterface $repo, Request $request)
    {
        $filter = $request->all();
        $params = ['id', 'code', 'description', 'project_state_id', 'sub_state_id', 'client_id', 'total_lb', 'total_pv',
            'total_meta', 'created_at'];
        $data = $repo->search($filter);
        $sorting = ($request->has('jtSorting')) ? explode(' ', $request->input('jtSorting')) : ['id', 'ASC'];
        $data = $data->select($params);
        $data = $data->orderBy($sorting[0], $sorting[1]);
        $data = $data->get();
        return generateExcel($this->generateDataExcel($data), 'LISTA DE PROYECTOS', 'Proyectos');
    }

}