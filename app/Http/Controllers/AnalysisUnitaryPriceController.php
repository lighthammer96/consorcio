<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 16/08/2017
 * Time: 10:48 AM
 */

namespace App\Http\Controllers;

use App\Exceptions\ReplacePriceException;
use App\Http\Recopro\AnalysisUnitaryPrice\AnalysisUnitaryPriceInterface;
use App\Http\Recopro\Level\LevelInterface;
use App\Http\Recopro\Product\ProductInterface;
use App\Http\Recopro\Project\ProjectInterface;
use App\Http\Recopro\Project\ProjectTrait;
use App\Http\Recopro\ProjectConsolidated\ProjectConsolidatedTrait;
use App\Http\Recopro\SubProjectFrontDetail\SubProjectFrontDetailInterface;
use App\Http\Recopro\SubProjectFrontDetailAPU\SubProjectFrontDetailAPUInterface;
use App\Http\Recopro\SubProjectLevel\SubProjectLevelInterface;
use DB;
use Illuminate\Http\Request;

class AnalysisUnitaryPriceController extends Controller
{
    use ProjectTrait;

    use ProjectConsolidatedTrait;

    public static $_CODE_PERCENTAGE_MATERIALS = '1507071';

    public static $_CODE_PERCENTAGE_EQUIPMENT = '1602019';

    public function getListMatrix(LevelInterface $repo)
    {
        $data = [];
        $children = $repo->getChildren('1');

        foreach ($children as $ch) {
            if ($ch->type_apu != 0) {
                $menu = [];
                foreach ($ch->children as $ch2) {
                    $menu2 = [];
                    foreach ($ch2->products as $p) {
                        $u = $p->unity;
                        $menu2[] = [
                            'text' => $p->code_matrix . '-' . $p->description,
                            'description' => $p->description,
                            'code' => $p->code_matrix,
                            'type' => $ch2->type_apu,
                            'um' => (is_null($u->symbol)) ? $u->Descripcion : $u->symbol
                        ];
                    }
                    $arr2 = [
                        'text' => $ch2->code . '-' . $ch2->description,
                        'code' => $ch2->code,
                        'type' => $ch2->type_apu
                    ];
                    if (count($menu2) > 0) {
                        $arr2['nodes'] = $menu2;
                    }
                    $menu[] = $arr2;
                }
                $arr = [
                    'text' => $ch->code . '-' . $ch->description,
                    'code' => $ch->code,
                    'type' => $ch->type_apu
                ];
                if (count($menu) > 0) {
                    $arr['nodes'] = $menu;
                }
                $data[] = $arr;
            }
        }

        return $data;
    }

    public function search(Request $request, LevelInterface $repo, ProductInterface $productRepo)
    {
        $q = $request->input('q');

        $s_1 = $repo->searchChildrenAPU($q)->select('code', 'description', 'type_apu as type')->get();
        $s_2 = $productRepo->searchByMatrixAPU($q)->select('code_matrix as code', 'description')->get();
        $info = [];
        if (count($s_1) > 0) {
            $info = array_merge($info, $s_1->toArray());
        }
        if (count($s_2) > 0) {
            $info = array_merge($info, $s_2->toArray());
        }
        if (count($info) > 12) {
            $info = array_slice($info, 0, 12);
        }
        $data = [];
        foreach ($info as $i) {
            $product = $productRepo->findByAttr('code_matrix', $i['code']);
            $type = ($product) ? $product->level->type_apu : $i['type'];
            $um = '';
            if ($product) {
                $u = $product->unity;
                $um = (is_null($u->symbol)) ? $u->Descripcion : $u->symbol;
            }
            $data[] = [
                'id' => $i['code'],
                'description' => $i['description'],
                'text' => $i['code'].'-'.$i['description'],
                'type' => $type,
                'um' => $um
            ];
        }

        return response()->json([
            'status' => true,
            'items' => $data
        ]);
    }

    public function getActivity($id, SubProjectLevelInterface $repo, Request $request,
                                SubProjectFrontDetailInterface $subProjectFrontDetail,
                                SubProjectFrontDetailAPUInterface $subProjectFrontDetailAPU)
    {
        try {
            $info = $repo->find($id);
            $type_sp = $request->input('type_sp');
            $front_code = $request->input('fro');
            $sub_state = $info->subProject->project->sub_state_id;
            $unity = ($sub_state < 3) ? $info->unity : $info->unity_pv;
            if ($type_sp == 'exp' || $type_sp == 'fro') {
                $unity = $info->unity_me;
            }
            $level = '';
            if ($info->level) {
                $level = $info->level->description;
            } elseif ($info->product) {
                $level = $info->product->description;
            }
            $apu = [];
            foreach ($info->apu as $item) {
                if ($type_sp == 'exp' || $type_sp == 'fro') {
                    if ($item->is_del) {
                        continue;
                    }
                } elseif ($item->type_progress == 3) {
                    continue;
                }
                if ($item->level_id != self::$_CODE_PERCENTAGE_MATERIALS &&
                    $item->level_id != self::$_CODE_PERCENTAGE_EQUIPMENT) {
                    $u = $item->level->unity;
                    $q_ = ($sub_state < 3) ? $item->quantity : $item->pv_quantity;
                    if ($type_sp == 'exp' || $type_sp == 'fro') {
                        $q_ = $item->me_quantity;
                    }
                    $q_u_ = ($sub_state < 3) ? $item->q_unity : $item->pv_q_unity;
                    if ($type_sp == 'exp' || $type_sp == 'fro') {
                        $q_u_ = $item->me_q_unity;
                    }
                    $p_ = ($sub_state < 3) ? $item->price : $item->pv_price;
                    if ($type_sp == 'exp' || $type_sp == 'fro') {
                        $p_ = $item->me_price;
                    }
                    $pa_ = ($sub_state < 3) ? $item->partial : $item->pv_partial;
                    if ($type_sp == 'exp' || $type_sp == 'fro') {
                        $pa_ = $item->me_partial;
                    }
                    $checked = 0;
                    if ($type_sp == 'fro') {
                        $sp_fd = $subProjectFrontDetail->findByFrontSP($front_code, $id);
                        if ($sp_fd) {
                            $checked = ($subProjectFrontDetailAPU->findByFrontAPU($sp_fd->id, $item->id)) ? 1 : 0;
                        }
                    }
                    $apu[] = [
                        'matrix' => $item->level_id,
                        'description' => $item->level->description,
                        'type' => (int)$item->type,
                        'type_progress' => (int)$item->type_progress,
                        'um' => (is_null($u->symbol)) ? $u->Descripcion : $u->symbol,
                        'quantity' => number_format($q_, 2),
                        'q_unity' => (is_null($q_u_)) ? '' : number_format($q_u_, 2),
                        'price' => number_format($p_, 2),
                        'partial' => number_format($pa_, 2),
                        'check' => $checked
                    ];
                }
            }
            $apu_hd_ = ($sub_state < 3) ? $info->apu_hours_day : $info->pv_apu_hours_day;
            if ($type_sp == 'exp' || $type_sp == 'fro') {
                $apu_hd_ = $info->me_apu_hours_day;
            }
            $apu_mo_ = ($sub_state < 3) ? $info->apu_mo : $info->pv_apu_mo;
            if ($type_sp == 'exp' || $type_sp == 'fro') {
                $apu_mo_ = $info->me_apu_mo;
            }
            $apu_eq_ = ($sub_state < 3) ? $info->apu_eq : $info->pv_apu_eq;
            if ($type_sp == 'exp' || $type_sp == 'fro') {
                $apu_eq_ = $info->me_apu_eq;
            }
            $data = [
                'level' => $info->level_id,
                'code' => $info->code,
                'matrix' => $level,
                'description' => $info->description,
                'um' => (is_null($unity->symbol)) ? $unity->Descripcion : $unity->symbol,
                'hours' => (is_null($apu_hd_)) ? '' : $apu_hd_,
                'mo' => (is_null($apu_mo_)) ? '' : $apu_mo_,
                'eq' => (is_null($apu_eq_)) ? '' : $apu_eq_,
                'detail' => $apu
            ];
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

    public function createUpdate($id, Request $request, SubProjectLevelInterface $subProjectLevel,
                                 AnalysisUnitaryPriceInterface $apuRepo, ProjectInterface $projectRepo)
    {
        $code_ = $request->input('is_code');
        $is_retry = (int)$request->input('is_retry');
        if ($is_retry == 1) {
            DB::beginTransaction();
            try {
                foreach ($request->input('matrix') as $idx => $matrix) {
                    $apu_ = $apuRepo->findBySPLLevel($id, $matrix);
                    if ($apu_->id == $code_) {
                        $this->updateArticlePrice($request->input('price')[$idx], 2, $apu_, $projectRepo, true);
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
            $data = $request->only('apu_hours_day', 'apu_mo', 'apu_eq', 'type', 'matrix', 'quantity', 'price');
            extract($data);

            $sub_project_level = $subProjectLevel->find($id);
            if (!$sub_project_level) {
                throw new \Exception('La actividad no existe');
            }
            $project = $sub_project_level->subProject->project;
            $sub_state = $project->sub_state_id;
            if ($sub_state != 1 && $sub_state != 3 && $sub_state != 5) {
                throw new \Exception('No puede modificar el Análisis de Precios Unitarios');
            }
            if ($sub_state == 3 && (int)$sub_project_level->type_progress == 1) {
                throw new \Exception('No puede modificar el Análisis de Precios Unitarios');
            }

            $percentage_mat = (float)$project->apu_materials;
            $percentage_equ = (float)$project->apu_equipment;
            $project_id = $project->id;
            $apu_hours_day = (float)$apu_hours_day;
            $apu_mo = (float)$apu_mo;
            $apu_eq = (float)$apu_eq;
            $apu_hh = 0;
            $apu_hq = 0;

            $total_1 = 0; $total_2 = 0; $total_3 = 0; $total_4 = 0;

            $percentages = [self::$_CODE_PERCENTAGE_MATERIALS, self::$_CODE_PERCENTAGE_EQUIPMENT];
            $exists = array_merge($matrix, $percentages);
            $except = ($sub_state == 1) ? 0 : 1;
            if ($sub_state == 1 || $sub_state == 3) {
                $apuRepo->deleteExcept($exists, $id, $except);
            } elseif ($sub_state == 5) {
                $apuRepo->deleteDelExcept($exists, $id);
            }

            $txt_ = ($sub_state < 3) ? '' : 'pv_';
            $type_progress = ($sub_state == 1) ? 1 : 2;
            if ($sub_state == 5) {
                $txt_ = 'me_';
                $type_progress = 3;
            }
            foreach ($matrix as $item => $m) {
                $price_ = (float)$price[$item];
                if ($sub_state == 5) {
                    $apu_ = $apuRepo->findBySPLLevel($id, $m);
                    if ($apu_ && $price_ > 0) {
                        $verify = $this->verifyArticlePrice($price_, 2, $apu_);
                        if (!$verify[0]) {
                            $code_ = $apu_->id;
                            throw new ReplacePriceException($verify[1]);
                        }
                    }
                }
                $type_ = (int)$type[$item];
                $quantity_ = (float)$quantity[$item];
                $q_unity_ = null;
                if ($type_ == 1 || $type_ == 3) {
                    if ($type_ == 1) {
                        $q_unity_ = ($apu_mo == 0) ? 0 : $quantity_/$apu_mo*$apu_hours_day;
                        $apu_hh += $q_unity_;
                    } else {
                        $q_unity_ = ($apu_eq == 0) ? 0 : $quantity_/$apu_eq*$apu_hours_day;
                        $apu_hq += $q_unity_;
                    }
                    $partial = round($q_unity_*$price_, 2);
                } else {
                    $partial = round($quantity_*$price_, 2);
                }
                $apu_ = $apuRepo->createUpdate([
                    'sub_project_level_id' => $id,
                    'level_id' => $m,
                    'type' => $type_,
                    $txt_.'quantity' => $quantity_,
                    $txt_.'q_unity' => $q_unity_,
                    $txt_.'price' => $price_,
                    $txt_.'partial' => $partial
                ]);
                if ($apu_[1] && $type_progress > 1) {
                    $apuRepo->update($apu_[0]->id, [
                        'type_progress' => $type_progress
                    ]);
                }
                if ($type_ == 1) {
                    $total_1 += $partial;
                } elseif ($type_ == 2) {
                    $total_2 += $partial;
                } elseif ($type_ == 3) {
                    $total_3 += $partial;
                } elseif ($type_ == 4) {
                    $total_4 += $partial;
                }
            }

            foreach ($percentages as $idx => $p) {
                $type_p_ = ($idx == 0) ? 2 : 3;
                $percentage = ($type_p_ == 2) ? $percentage_mat : $percentage_equ;
                $partial = round($percentage*$total_1/100, 2);
                $apuRepo->createUpdate([
                    'sub_project_level_id' => $id,
                    'level_id' => $p,
                    'type' => $type_p_,
                    $txt_.'quantity' => $percentage,
                    $txt_.'q_unity' => null,
                    $txt_.'price' => $total_1,
                    $txt_.'partial' => $partial
                ]);
                if ($idx == 0) {
                    $total_2 += $partial;
                } else {
                    $total_3 += $partial;
                }
            }

            $total_ = round($total_1 + $total_2 + $total_3 + $total_4, 2);
            $txt_2_ = ($sub_state < 3) ? 'lb_' : 'pv_';
            $q_ = ($sub_state < 3) ? $sub_project_level->lb_quantity : $sub_project_level->pv_quantity;
            if ($sub_state == 5) {
                $txt_2_ = 'me_';
                $q_ = $sub_project_level->me_quantity;
            }
            $subProjectLevel->update($id, [
                $txt_2_.'price' => $total_,
                $txt_2_.'total' => (is_null($q_)) ? 0 : $q_*$total_,
                $txt_.'apu_hours_day' => $apu_hours_day,
                $txt_.'apu_mo' => $apu_mo,
                $txt_.'apu_eq' => $apu_eq,
                $txt_.'apu_hh' => $apu_hh,
                $txt_.'apu_hq' => $apu_hq,
                $txt_.'apu_total_mo' => $total_1,
                $txt_.'apu_total_mat' => $total_2,
                $txt_.'apu_total_eq' => $total_3,
                $txt_.'apu_total_sc' => $total_4,
            ]);

            $total = ($sub_state > 2) ? $project->total_pv : $project->total_lb;
            if ($sub_state == 1 || $sub_state == 3) {
                $total = $this->calculateTotal($project_id, $projectRepo);
            } elseif ($sub_state == 5) {
                $this->calculateTotal($project_id, $projectRepo);

                $pc = new ProjectConsolidatedController();
                $pc->generateConsolidated($project);
            }

            DB::commit();
            return response()->json([
                'status' => true,
                'total' => $total
            ]);
        }
        catch (ReplacePriceException $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
                'retry' => true,
                'code' => $code_
            ]);
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