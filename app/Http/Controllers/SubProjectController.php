<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 02/08/2017
 * Time: 11:15 AM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\AnalysisUnitaryPrice\AnalysisUnitaryPriceInterface;
use App\Http\Recopro\Level\LevelInterface;
use App\Http\Recopro\Level\LevelTrait;
use App\Http\Recopro\Product\ProductInterface;
use App\Http\Recopro\Project\ProjectInterface;
use App\Http\Recopro\Project\ProjectTrait;
use App\Http\Recopro\SubProject\SubProjectInterface;
use App\Http\Recopro\SubProjectFront\SubProjectFrontInterface;
use App\Http\Recopro\SubProjectFrontDetail\SubProjectFrontDetailInterface;
use App\Http\Recopro\SubProjectLevel\SubProjectLevelInterface;
use App\Http\Recopro\SubProjectLevel\SubProjectLevelTrait;
use DB;
use Illuminate\Http\Request;

class SubProjectController extends Controller
{
    use LevelTrait;

    use ProjectTrait;

    use SubProjectLevelTrait;

    private static $_UNITY_ID = '07';

    public function createUpdate($id, Request $request, SubProjectInterface $repo, SubProjectFrontInterface $subProjectFront,
                                 SubProjectLevelInterface $subProjectLevel, ProductInterface $productRepo)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $fronts = $data['fronts'];
            $level_id = $data['level_id'];
            $level_parent = $data['level_parent'];
            $level_code = $data['level_code'];
            $level_name = $data['level_name'];
            $level_matrix = $data['level_matrix'];
            $level_type = $data['level_type'];
            $level_ids_clean = array_filter($level_id);
            unset($data['fronts'], $data['level_id'], $data['level_parent'], $data['level_code'], $data['level_name'],
                $data['level_matrix'], $data['level_type']);
            if ($id != 0) {
                $sp = $repo->find($id);
                $sub_state_id = $sp->project->sub_state_id;
                if ($sub_state_id == 1) {
                    $sp = $repo->update($id, $data);
                }
            } else {
                $sp = $repo->create($data);
                $id = $sp->id;
            }
            $sub_state = $sp->project->sub_state_id;
            if ($sub_state == 2 || $sub_state == 4) {
                throw new \Exception('El proyecto está en proceso de verificación');
            }
            $subProjectFront->deleteExcept($fronts, $id);
            foreach ($fronts as $f) {
                $subProjectFront->createUpdate([
                    'sub_project_id' => $id,
                    'front_id' => $f
                ]);
            }
            if ($sub_state == 1) {
                $subProjectLevel->deleteExcept($level_ids_clean, $id);
                foreach ($level_code as $item => $l_code) {
                    $level_id_ = $level_id[$item];
                    $matrix = ($level_matrix[$item] == '') ? null : $level_matrix[$item];
                    $type_ = ($level_type[$item] == '') ? 0 : $level_type[$item];
                    $um_id = null;
                    if ((int)$level_type[$item] == 2 && !is_null($matrix)) {
                        $p = $productRepo->findByAttr('code_matrix', $matrix);
                        $um_id = ($p) ? $p->um_id : null;
                    }
                    if ($level_id_ == '') {
                        $level_ = $subProjectLevel->create([
                            'sub_project_id' => $id,
                            'code' => $l_code,
                            'description' => $level_name[$item],
                            'level_id' => $matrix,
                            'type' => $type_,
                            'um_id' => $um_id
                        ]);
                        $level_id_ = $level_->id;
                    } else {
                        $subProjectLevel->update($level_id_, [
                            'code' => $l_code,
                            'description' => $level_name[$item],
                            'level_id' => $matrix,
                            'type' => $type_,
                            'um_id' => $um_id
                        ]);
                    }
                    if ($level_parent[$item] != '0') {
                        $l_ = $subProjectLevel->findByCode($level_parent[$item], $id);
                        if (!$l_) {
                            throw new \Exception('El nivel requerido no tiene existencia en nuestros registros');
                        }
                        $subProjectLevel->update($level_id_, [
                            'parent_id' => $l_->id
                        ]);
                    }
                }
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

    public function find($id, SubProjectInterface $repo)
    {
        try {
            $sub_project = $repo->find($id);

            $fronts = []; $levels = [];
            foreach ($sub_project->sub_project_fronts as $f) {
                $front = $f->front;
                $entity = $front->entity;
                $e = '';
                if (count($entity) > 0) {
                    $e = (is_null($entity->NombreEntidad)) ? $entity->RazonSocial : $entity->NombreEntidad;
                }
                $fronts[] = [
                    'id' => $front->id,
                    'code' => $front->code,
                    'description' => $front->description,
                    'entity' => $e
                ];
            }
            foreach ($sub_project->sub_project_levels as $l) {
                $levels[] = [
                    'id' => $l->id,
                    'code' => $l->code,
                    'description' => $l->description,
                    'parent' => ($l->parent) ? $l->parent->code : 0,
                    'matrix' => (!is_null($l->level_id)) ? $l->level_id : '',
                    'level_id' => $l->level_id,
                    'type' => $l->type
                ];
            }
            unset($sub_project->sub_project_fronts, $sub_project->sub_project_levels);
            $sub_project->fronts = $fronts;
            $sub_project->levels = $levels;

            return response()->json([
                'status' => true,
                'data' => $sub_project
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getByProject($project_id, ProjectInterface $projectRepo)
    {
        try {
            $project = $projectRepo->find($project_id);
            $data = [];
            foreach ($project->subProjects as $s_p) {
                $data[] = [
                    'id' => $s_p->id,
                    'description' => $s_p->description
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

    public function delete($id, SubProjectInterface $repo)
    {
        try {
            $sp = $repo->find($id);
            $sub_state = $sp->project->sub_state_id;
            if ($sub_state == 2 || $sub_state == 4) {
                throw new \Exception('El proyecto está en proceso de verificación');
            }
            $repo->destroy($id);
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

    public function getLevels($id, SubProjectInterface $subProject, SubProjectLevelInterface $repo, Request $request)
    {
        try {
            $data = [];
            foreach ($repo->findByParent(null, $id) as $level) {
                $l = [];
                foreach ($level->children as $level2) {
                    $type = 0;
                    if ($level2->children) {
                        foreach ($level2->children as $level3) {
                            if ($level3->level) {
                                $type = (int) $level3->level->type;
                                break;
                            } elseif ($level3->product) {
                                $type = (int) $level3->product->level->type;
                                break;
                            }
                        }
                    }
                    $l[] = [
                        'code' => $level2->id,
                        'text' => $level2->code . ' ' . $level2->description,
                        'type' => $type
                    ];
                }
                $data[] = [
                    'code' => $level->id,
                    'text' => $level->code . ' ' . $level->description,
                    'nodes' => $l
                ];
            }
            $message = ($request->input('type_sp') == 'fro' && count($subProject->find($id)->sub_project_fronts) == 0) ?
                'Para realizar la distribución de frentes debe ingresar Frentes al Subproyecto' : '';

            return response()->json([
                'status' => true,
                'data' => $data,
                'message' => $message
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getActivityMaterialSubProject(Request $request, SubProjectInterface $subProjectRepo,
                                                  SubProjectLevelInterface $repo,
                                                  SubProjectFrontDetailInterface $subProjectFrontDetail)
    {
        try {
            $data = [];
            $sub_project_id = $request->input('sub_project_id');
            $level_id = $request->input('level_id');
            $type = (int) $request->input('type');
            $type_sp = $request->input('type_sp');
            $subProject = $subProjectRepo->find($sub_project_id);
            $sub_state = $subProject->project->sub_state_id;
            foreach ($repo->findByParent($level_id, $sub_project_id) as $p_level) {
                $info = [
                    'id' => $p_level->id,
                    'code' => $p_level->code,
                    'text' => $p_level->description,
                    'level' => (is_null($p_level->level_id)) ? '' : $p_level->level_id,
                    'type' => (int) $p_level->type,
                    'progress' => (int) $p_level->type_progress
                ];
                if ($type == 1) {
                    $u_= ($p_level->product) ? $p_level->product->unity : [];
                    $unity = '';
                    if ($u_) {
                        $unity = (is_null($u_->symbol)) ? $u_->Descripcion : $u_->symbol;
                    }
                    $info['und'] = $unity;
                    if ($type_sp != 'fro') {
                        $info['lb'] = [
                            'price' => (is_null($p_level->lb_price)) ? '' : $p_level->lb_price,
                            'quantity' => (is_null($p_level->lb_quantity)) ? '' : $p_level->lb_quantity,
                            'total' => (is_null($p_level->lb_total)) ? '' : $p_level->lb_total
                        ];
                        if ($sub_state > 2) {
                            $info['pv'] = [
                                'price' => (is_null($p_level->pv_price)) ? '' : $p_level->pv_price,
                                'quantity' => (is_null($p_level->pv_quantity)) ? '' : $p_level->pv_quantity,
                                'total' => (is_null($p_level->pv_total)) ? '' : $p_level->pv_total
                            ];
                        }
                        if ($type_sp == 'exp') {
                            $info['me'] = [
                                'price' => (is_null($p_level->me_price)) ? '' : $p_level->me_price,
                                'quantity' => (is_null($p_level->me_quantity)) ? '' : $p_level->me_quantity,
                                'total' => (is_null($p_level->me_total)) ? '' : $p_level->me_total
                            ];
                        }
                    } else {
                        $info['me'] = [
                            'id' => $p_level->id,
                            'price' => (is_null($p_level->me_price)) ? '' : $p_level->me_price,
                            'quantity' => (is_null($p_level->me_quantity)) ? '' : $p_level->me_quantity,
                            'total' => (is_null($p_level->me_total)) ? '' : $p_level->me_total
                        ];
                    }
                }
                $data[] = $info;
            }
            $fronts = [];
            if ($type_sp == 'fro') {
                foreach ($subProject->sub_project_fronts as $sp_front) {
                    $front = $sp_front->front;
                    if (is_null($front->entity_id)) {
                        $entity = $front->entity;
                        $text = (is_null($entity->NombreEntidad)) ? $entity->RazonSocial : $entity->NombreEntidad;
                    } else {
                        $text = $front->description;
                    }
                    $fronts[] = [
                        'id' => $sp_front->id,
                        'text' => $text
                    ];
                    foreach ($data as $item => $d) {
                        $fd = $subProjectFrontDetail->findByFrontSP($sp_front->id, $d['id']);
                        $data[$item]['fronts'][] = [
                            'id' => $sp_front->id,
                            'q' => ($fd) ? $fd->quantity : '0.00'
                        ];
                    }
                }
            }
            return response()->json([
                'status' => true,
                'data' => $data,
                'fronts' => $fronts
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getInfoActivity($id, SubProjectLevelInterface $repo, Request $request,
                                    SubProjectFrontDetailInterface $subProjectFrontDetail)
    {
        try {
            $type_sp = $request->input('type_sp');
            $info = $repo->find($id);
            $sub_state = $info->subProject->project->sub_state_id;
            if ($type_sp != 'fro') {
                $lb_apu_mo = (is_null($info->apu_mo)) ? 0 : $info->apu_mo;
                $pv_apu_mo = (is_null($info->pv_apu_mo)) ? 0 : $info->pv_apu_mo;
                $data = [
                    'lb' => [
                        'um' => $info->um_id,
                        'um_text' => (is_null($info->unity->symbol)) ? $info->unity->Descripcion : $info->unity->symbol,
                        'price' => (is_null($info->lb_price)) ? 0 : $info->lb_price,
                        'quantity' => (is_null($info->lb_quantity)) ? '' : $info->lb_quantity,
                        'total' => (is_null($info->lb_total)) ? 0 : $info->lb_total
                    ],
                    'apu' => [
                        'rend' => ($sub_state < 3) ? $lb_apu_mo : $pv_apu_mo,
                        'hh' => ($sub_state < 3) ? $info->apu_hh : $info->pv_apu_hh,
                        'hm' => ($sub_state < 3) ? $info->apu_hq : $info->pv_apu_hq,
                        'mo' => ($sub_state < 3) ? $info->apu_total_mo : $info->pv_apu_total_mo,
                        'mat' => ($sub_state < 3) ? $info->apu_total_mat : $info->pv_apu_total_mat,
                        'eq' => ($sub_state < 3) ? $info->apu_total_eq : $info->pv_apu_total_eq,
                        'sc' => ($sub_state < 3) ? $info->apu_total_sc : $info->pv_apu_total_sc
                    ],
                    'progress' => (int)$info->type_progress
                ];
                if ($sub_state > 2) {
                    $data['pv'] = [
                        'um' => $info->pv_um_id,
                        'um_text' => (is_null($info->unity_pv->symbol)) ? $info->unity_pv->Descripcion : $info->unity_pv->symbol,
                        'price' => (is_null($info->pv_price)) ? 0 : $info->pv_price,
                        'quantity' => (is_null($info->pv_quantity)) ? '' : $info->pv_quantity,
                        'total' => (is_null($info->pv_total)) ? 0 : $info->pv_total
                    ];
                    $data['apu_lb'] = [
                        'hh' => $info->apu_hh,
                        'hm' => $info->apu_hq
                    ];
                    if ($type_sp == 'exp') {
                        $data['me'] = [
                            'um' => $info->me_um_id,
                            'um_text' => (is_null($info->unity_me->symbol)) ? $info->unity_me->Descripcion : $info->unity_me->symbol,
                            'price' => (is_null($info->me_price)) ? 0 : $info->me_price,
                            'quantity' => (is_null($info->me_quantity)) ? '' : $info->me_quantity,
                            'total' => (is_null($info->me_total)) ? 0 : $info->me_total
                        ];
                        $data['apu'] = [
                            'rend' => (is_null($info->me_apu_mo)) ? 0 : $info->me_apu_mo,
                            'hh' => $info->me_apu_hh,
                            'hm' => $info->me_apu_hq,
                            'mo' => $info->me_apu_total_mo,
                            'mat' => $info->me_apu_total_mat,
                            'eq' => $info->me_apu_total_eq,
                            'sc' => $info->me_apu_total_sc
                        ];
                        $data['apu_pv'] = [
                            'hh' => $info->pv_apu_hh,
                            'hm' => $info->pv_apu_hq
                        ];
                    }
                }
            } else {
                $data = [
                    'um' => (is_null($info->unity_me->symbol)) ? $info->unity_me->Descripcion : $info->unity_me->symbol,
                    'price' => $info->me_price,
                    'quantity' => $info->me_quantity,
                    'total' => $info->me_total
                ];
                foreach ($info->subProject->sub_project_fronts as $sp_front) {
                    $front = $sp_front->front;
                    if (is_null($front->entity_id)) {
                        $entity = $front->entity;
                        $text = (is_null($entity->NombreEntidad)) ? $entity->RazonSocial : $entity->NombreEntidad;
                    } else {
                        $text = $front->description;
                    }
                    $fd = $subProjectFrontDetail->findByFrontSP($sp_front->id, $id);
                    $data['fronts'][] = [
                        'id' => $sp_front->id,
                        'text' => $text,
                        'q' => ($fd) ? $fd->quantity : '0.00',
                        'p' => ($fd && !is_null($fd->price_apu)) ? $fd->price_apu : '0.00',
                        't' => ($fd && !is_null($fd->total_apu)) ? $fd->total_apu : '0.00'
                    ];
                }
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

    public function saveMaterialActivityPV($id, Request $request, SubProjectLevelInterface $subProjectLevel,
                                           ProductInterface $productRepo, LevelInterface $levelRepo)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $subProjectL = $subProjectLevel->find($data['level']);
            if ($subProjectL->subProject->project->sub_state_id == 3) {
                $p = $productRepo->findByAttr('code_matrix', $data['matrix']);
                if ($p) {
                    $um_id = $p->um_id;
                } else {
                    $um_id = self::$_UNITY_ID;

                }
                if ($id != 0) {
                    $subProjectLevel->update($id, [
                        'code' => $data['code'],
                        'description' => $data['description'],
                        'level_id' => $data['matrix'],
                        'um_id' => $um_id,
                        'pv_um_id' => $um_id,
                    ]);
                } else {
                    $subProjectLevel->create([
                        'sub_project_id' => $subProjectL->sub_project_id,
                        'code' => $data['code'],
                        'description' => $data['description'],
                        'level_id' => $data['matrix'],
                        'type' => $data['type'],
                        'um_id' => $um_id,
                        'pv_um_id' => $um_id,
                        'parent_id' => $data['level'],
                        'type_progress' => 2
                    ]);
                }
            } else {
                throw new \Exception('No puede agregar niveles a este subproyecto');
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

    public function deleteMaterialActivityPV($id, SubProjectLevelInterface $repo, ProjectInterface $project,
                                             AnalysisUnitaryPriceInterface $apuRepo)
    {
        try {
            $sp = $repo->find($id);
            $sub_state = $sp->subProject->project->sub_state_id;
            if ($sub_state == 2 || $sub_state == 4) {
                throw new \Exception('El proyecto está en proceso de verificación');
            } elseif ($sub_state == 3) {
                $parent = $sp->parent;
                $apuRepo->deleteExcept([], $id, 0);
                $repo->destroy($id);
                $this->calculateTotalSPL($parent, $sub_state);
            }

            return response()->json([
                'status' => true,
                'total' => $this->calculateTotal($sp->subProject->project_id, $project)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}