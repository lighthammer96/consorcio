<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 31/07/2017
 * Time: 10:21 AM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Level\LevelInterface;
use App\Http\Recopro\Project\ProjectInterface;
use App\Http\Recopro\ProjectConsolidated\ProjectConsolidated;
use App\Http\Recopro\ProjectConsolidated\ProjectConsolidatedInterface;
use App\Http\Recopro\ProjectConsolidated\ProjectConsolidatedRepository;
use Illuminate\Http\Request;

class ProjectConsolidatedController extends Controller
{
    public function __construct()
    {
        $this->middleware('ajax', ['only' => ['getArticlesProject']]);
    }

    public function getData(LevelInterface $repo)
    {
        try {
            $lc = new ResourceController();

            return response()->json([
                'status' => true,
                '_10' => $lc->getLevels('10', $repo)
            ]);

        } catch (\Exception $e) {
            throw new \Exception($e);
        }
    }

    public function getMatrix($project_id, ProjectConsolidatedInterface $consolidatedRepo)
    {
        try {
            $data = $consolidatedRepo->loadMatrix($project_id);

            foreach ($data as $d) {
                $u = ($d->article->unity) ? $d->article->unity : [];
                $u_ = '';
                if ($u) {
                    $u_ = (is_null($u->symbol)) ? $u->Descripcion : $u->symbol;
                }
                $d->product = $d->article->description_detail;
                $d->matrix = ($d->article->level) ? $d->article->code_matrix : '';
                $d->um = $u_;
                $d->quantity_requested = $d->quantity_served;
                unset($d->article);
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

    public function getArticlesProject(Request $request, ProjectConsolidatedInterface $repo)
    {
        $data = $request->all();

        $params = ['*'];

        $info = parseDataList($repo->search_available($data), $request, 'id', $params);

        $data = $info[1];

        foreach ($data as $d) {
            $u = ($d->article->unity) ? $d->article->unity : [];
            $u_ = '';
            if ($u) {
                $u_ = (is_null($u->symbol)) ? $u->Descripcion : $u->symbol;
            }
            $d->code = $d->article->code_article;
            $d->product = $d->article->description_detail;
            $d->matrix = ($d->article->level) ? $d->article->code_matrix : '';
            $d->um = $u_;
            unset($d->article);
        }

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function generateConsolidated($project)
    {
        $data = [];
        $articles = [];

        $code_per_mat = AnalysisUnitaryPriceController::$_CODE_PERCENTAGE_MATERIALS;
        $code_per_eq = AnalysisUnitaryPriceController::$_CODE_PERCENTAGE_EQUIPMENT;

        foreach ($project->subProjects as $sp) {
            foreach ($sp->sub_project_levels as $spl) {
                if ($spl->type == 1 && !is_null($spl->level_id)) {
                    if (in_array($spl->level_id, $articles)) {
                        $key = array_search($spl->level_id, array_column($data, 'level_id'));
                        $data[$key]['quantity'] += (float)$spl->me_quantity;
                        $data[$key]['total'] += (float)$spl->me_total;
                        $data[$key]['lb_quantity'] += (float)$spl->lb_quantity;
                        $data[$key]['lb_total'] += (float)$spl->lb_total;
                        $data[$key]['lb_price'] = $data[$key]['lb_total']/$data[$key]['lb_quantity'];
                        $data[$key]['pv_quantity'] += (float)$spl->pv_quantity;
                        $data[$key]['pv_total'] += (float)$spl->pv_total;
                        $data[$key]['pv_price'] = $data[$key]['pv_total']/$data[$key]['pv_quantity'];
                    } else {
                        $data[] = [
                            'level_id' => $spl->level_id,
                            'article_id' => ($spl->product) ? $spl->product->id : $spl->level_id,
                            'quantity' => (float)$spl->me_quantity,
                            'price' => (float)$spl->me_price,
                            'total' => (float)$spl->me_total,
                            'lb_quantity' => (float)$spl->lb_quantity,
                            'lb_price' => (float)$spl->lb_price,
                            'lb_total' => (float)$spl->lb_total,
                            'pv_quantity' => (float)$spl->pv_quantity,
                            'pv_price' => (float)$spl->pv_price,
                            'pv_total' => (float)$spl->pv_total
                        ];
                        $articles[] = $spl->level_id;
                    }
                }
                foreach ($spl->apu as $apu) {
                    if ($apu->level_id != $code_per_mat && $apu->level_id != $code_per_eq && !is_null($apu->level_id)) {
                        $q = ($apu->type == 2) ? $apu->me_quantity : $apu->me_q_unity;
                        $q_lb = ($apu->type == 2) ? $apu->quantity : $apu->q_unity;
                        $q_pv = ($apu->type == 2) ? $apu->pv_quantity : $apu->pv_q_unity;
                        $q_ = ($apu->is_del) ? 0 : (float)$q*(float)$spl->me_quantity;
                        $t_ = ($apu->is_del) ? 0 : (float)$apu->me_partial*(float)$spl->me_quantity;
                        if (in_array($apu->level_id, $articles)) {
                            $key = array_search($apu->level_id, array_column($data, 'level_id'));
                            $data[$key]['quantity'] += $q_;
                            $data[$key]['total'] += $t_;
                            $data[$key]['lb_quantity'] += (float)$q_lb*(float)$spl->lb_quantity;
                            $data[$key]['lb_total'] += (float)$apu->partial*(float)$spl->lb_quantity;
                            $data[$key]['lb_price'] = $data[$key]['lb_total']/$data[$key]['lb_quantity'];
                            $data[$key]['pv_quantity'] += (float)$q_pv*(float)$spl->pv_quantity;
                            $data[$key]['pv_total'] += (float)$apu->pv_partial*(float)$spl->pv_quantity;
                            $data[$key]['pv_price'] = $data[$key]['pv_total']/$data[$key]['pv_quantity'];
                        } else {
                            $data[] = [
                                'level_id' => $apu->level_id,
                                'article_id' => $apu->level->id,
                                'quantity' => $q_,
                                'price' => (float)$apu->me_price,
                                'total' => $t_,
                                'lb_quantity' => (float)$q_lb*(float)$spl->lb_quantity,
                                'lb_price' => (float)$apu->price,
                                'lb_total' => (float)$apu->partial*(float)$spl->lb_quantity,
                                'pv_quantity' => (float)$q_pv*(float)$spl->pv_quantity,
                                'pv_price' => (float)$apu->pv_price,
                                'pv_total' => (float)$apu->pv_partial*(float)$spl->pv_quantity
                            ];
                            $articles[] = $apu->level_id;
                        }
                    }
                }
            }
        }
        sort($data);

        $consolidatedRepo = new ProjectConsolidatedRepository(new ProjectConsolidated());
        $consolidatedRepo->deleteExcept($articles, $project->id);
        foreach ($data as $d) {
            $d['project_id'] = $project->id;
            $d['quantity_requested'] = $d['quantity'];
            $d['quantity_served'] = $d['quantity'];
            $d['is_del'] = ($d['quantity'] == 0);
            unset($d['quantity']);
            $consolidatedRepo->createUpdate($d);
        }
    }

    public function consolidatedMaterials($id, ProjectConsolidatedInterface $repo, LevelInterface $levelRepo)
    {
        try {
            $levelController = new ResourceController();

            $data = $levelController->getLevelsToConsolidated(ProjectController::$_LEVEL_PARENT, $levelRepo);

            $consolidated = $repo->getByProject($id);

            foreach ($consolidated as $con) {
                $article = $con->article;
                $parent = $article->level;
                $code_parent = $parent->code;
                $info = [
                    'text' => $article->description,
                    'code' => $con->level_id,
                    'um' => (is_null($article->unity->symbol)) ? $article->unity->Descripcion : $article->unity->symbol,
                    'lb_q' => (float)$con->lb_quantity,
                    'lb_p' => (float)$con->lb_price,
                    'lb_t' => (float)$con->lb_total,
                    'pv_q' => (float)$con->pv_quantity,
                    'pv_p' => (float)$con->pv_price,
                    'pv_t' => (float)$con->pv_total,
                    'me_q' => (float)$con->quantity_requested,
                    'me_p' => (float)$con->price,
                    'me_t' => (float)$con->total,
                    'is_del' => (int)$con->is_del
                ];
                $is_found = false;
                foreach ($data as $idx => $d) {
                    foreach ($d['nodes'] as $idx2 => $d1) {
                        $key = array_search($code_parent, array_column($d1['nodes'], 'code'));
                        if ($key) {
                            $data[$idx]['nodes'][$idx2]['nodes'][$key]['nodes'][] = $info;

                            $data[$idx]['nodes'][$idx2]['nodes'][$key]['lb_t'] += $info['lb_t'];
                            $data[$idx]['nodes'][$idx2]['nodes'][$key]['pv_t'] += $info['pv_t'];
                            $data[$idx]['nodes'][$idx2]['nodes'][$key]['me_t'] += $info['me_t'];

                            $data[$idx]['nodes'][$idx2]['lb_t'] += $info['lb_t'];
                            $data[$idx]['nodes'][$idx2]['pv_t'] += $info['pv_t'];
                            $data[$idx]['nodes'][$idx2]['me_t'] += $info['me_t'];

                            $data[$idx]['lb_t'] += $info['lb_t'];
                            $data[$idx]['pv_t'] += $info['pv_t'];
                            $data[$idx]['me_t'] += $info['me_t'];

                            $is_found = true;
                            break;
                        }
                    }
                    if ($is_found) {
                        break;
                    }
                }
            }
            $data = $levelController->cleanConsolidated($data);

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