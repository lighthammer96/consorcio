<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 23/08/2017
 * Time: 03:43 PM
 */

namespace App\Http\Recopro\Project;

use App\Http\Controllers\AnalysisUnitaryPriceController;
use App\Http\Controllers\ProjectConsolidatedController;

trait ProjectTrait
{
    public function calculateTotal($id, ProjectInterface $repo)
    {
        $project = $repo->find($id);
        $a_b_total = 0;
        $var_total = 'total';
        $sub_state = $project->sub_state_id;
        if ($sub_state == 1) {
            $var_total = 'lb_'.$var_total;
        } elseif ($sub_state == 3) {
            $var_total = 'pv_'.$var_total;
        } elseif ($sub_state == 5) {
            $var_total = 'me_'.$var_total;
        }
        $a_materials = 0;
        foreach ($project->subProjects as $subProject) {
            foreach ($subProject->sub_project_levels as $sub_project_level) {
                if ($sub_project_level->type == 0 && !is_null($sub_project_level->$var_total)) {
                    $a_materials += $sub_project_level->$var_total;
                    $a_b_total += $sub_project_level->$var_total;
                } elseif ($sub_project_level->type == 2) {
                    $a_b_total += $sub_project_level->$var_total;
                }
            }
        }
        $c_transport = 0;
        if (!is_null($project->transport) && $project->transport > 0) {
            $c_transport = ($a_materials == 0) ? 0 : $a_materials / 100 * $project->transport;
        }
        $d_direct_costs = $a_b_total + $c_transport;
        $e_general_expenses = 0;
        $gg = ((is_null($project->gg_direct)) ? 0 : $project->gg_direct) +
            ((is_null($project->gg_indirect)) ? 0 : $project->gg_direct);
        if ($gg > 0) {
            $e_general_expenses = ($d_direct_costs == 0) ? 0 : $d_direct_costs / 100 * $gg;
        }
        $f_utils = 0;
        if (!is_null($project->utils) && $project->utils > 0) {
            $f_utils = ($d_direct_costs == 0) ? 0 : $d_direct_costs / 100 * $project->utils;
        }
        $total = $d_direct_costs + $e_general_expenses + $f_utils;

        $total_val = '';
        if ($sub_state == 1) {
            $total_val = 'total_lb';
        } elseif ($sub_state == 3) {
            $total_val = 'total_pv';
        } elseif ($sub_state == 5) {
            $total_val = 'total_meta';
        }
        if ($total_val != '') {
            $repo->update($id, [
                $total_val => $total
            ]);
        }

        return $total;
    }

    public function getTotalNumber($p)
    {
        $total = 0;
        if ($p->sub_state_id == 1 || $p->sub_state_id == 2) {
            $total = $p->total_lb;
        } elseif ($p->sub_state_id > 2) {
            $total = $p->total_pv;
        }
        return $total;
    }

    public function passLBToPV($project)
    {
        foreach ($project->subProjects as $subProject) {
            foreach ($subProject->sub_project_levels as $slp) {
                $slp->pv_um_id = $slp->um_id;
                $slp->pv_price = $slp->lb_price;
                $slp->pv_quantity = $slp->lb_quantity;
                $slp->pv_total = $slp->lb_total;
                $slp->pv_apu_hours_day = $slp->apu_hours_day;
                $slp->pv_apu_mo = $slp->apu_mo;
                $slp->pv_apu_eq = $slp->apu_eq;
                $slp->pv_apu_hh = $slp->apu_hh;
                $slp->pv_apu_hq = $slp->apu_hq;
                $slp->pv_apu_total_mo = $slp->apu_total_mo;
                $slp->pv_apu_total_mat = $slp->apu_total_mat;
                $slp->pv_apu_total_eq = $slp->apu_total_eq;
                $slp->pv_apu_total_sc = $slp->apu_total_sc;
                $slp->save();
                foreach ($slp->apu as $apu) {
                    $apu->pv_quantity = $apu->quantity;
                    $apu->pv_q_unity = $apu->q_unity;
                    $apu->pv_price = $apu->price;
                    $apu->pv_partial = $apu->partial;
                    $apu->save();
                }
            }
        }
    }

    public function passPVToMeta($project, ProjectInterface $projectRepo)
    {
        foreach ($project->subProjects as $subProject) {
            foreach ($subProject->sub_project_levels as $slp) {
                $slp->me_um_id = $slp->pv_um_id;
                $slp->me_price = $slp->pv_price;
                $slp->me_quantity = $slp->pv_quantity;
                $slp->me_total = $slp->pv_total;
                $slp->me_apu_hours_day = $slp->pv_apu_hours_day;
                $slp->me_apu_mo = $slp->pv_apu_mo;
                $slp->me_apu_eq = $slp->pv_apu_eq;
                $slp->me_apu_hh = $slp->pv_apu_hh;
                $slp->me_apu_hq = $slp->pv_apu_hq;
                $slp->me_apu_total_mo = $slp->pv_apu_total_mo;
                $slp->me_apu_total_mat = $slp->pv_apu_total_mat;
                $slp->me_apu_total_eq = $slp->pv_apu_total_eq;
                $slp->me_apu_total_sc = $slp->pv_apu_total_sc;
                $slp->save();
                foreach ($slp->apu as $apu) {
                    $apu->me_quantity = $apu->pv_quantity;
                    $apu->me_q_unity = $apu->pv_q_unity;
                    $apu->me_price = $apu->pv_price;
                    $apu->me_partial = $apu->pv_partial;
                    $apu->save();
                }
            }
        }
        $code_per_mat = AnalysisUnitaryPriceController::$_CODE_PERCENTAGE_MATERIALS;
        $code_per_eq = AnalysisUnitaryPriceController::$_CODE_PERCENTAGE_EQUIPMENT;

        $percentage_mat = (float)$project->apu_materials;
        $percentage_equ = (float)$project->apu_equipment;

        $materials_ = [];

        foreach ($project->subProjects as $subProject) {
            foreach ($subProject->sub_project_levels as $slp) {
                if (is_null($slp->me_price)) {
                    if ($slp->type == 0 && !is_null($slp->me_total)) {
                        $materials_[] = $slp;
                    }
                    continue;
                }
                $price_ = ($slp->product) ? $slp->product->average_cost : null;
                $price_ = (is_null($price_)) ? 0 : $price_;
                $apu_hh = 0;
                $apu_hq = 0;
                $total_1 = 0; $total_2 = 0; $total_3 = 0; $total_4 = 0;
                $apu_per = [];
                foreach ($slp->apu as $apu) {
                    $type_ = $apu->type;
                    if ($apu->level_id == $code_per_mat || $apu->level_id == $code_per_eq) {
                        $apu_per[] = $apu;
                        continue;
                    } else {
                        $price_2 = (is_null($apu->level->average_cost)) ? 0 : $apu->level->average_cost;
                        $apu->me_price = $price_2;
                    }
                    $quantity_ = (float) $apu->me_quantity;
                    $price_ = (float) $apu->me_price;
                    $q_unity_ = $apu->me_q_unity;
                    if ($type_ == 1 || $type_ == 3) {
                        if ($type_ == 1) {
                            $apu_hh += $q_unity_;
                        } else {
                            $apu_hq += $q_unity_;
                        }
                        $partial = round($q_unity_*$price_, 2);
                    } else {
                        $partial = round($quantity_*$price_, 2);
                    }
                    $apu->me_partial = $partial;
                    $apu->save();
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
                foreach ($apu_per as $idx => $apu) {
                    $percentage = ($idx == 0) ? $percentage_mat : $percentage_equ;
                    $partial = round($percentage*$total_1/100, 2);
                    $apu->me_price = $total_1;
                    $apu->me_partial = $partial;
                    $apu->save();
                    if ($idx == 0) {
                        $total_2 += $partial;
                    } else {
                        $total_3 += $partial;
                    }
                }
                $total_ = round($total_1 + $total_2 + $total_3 + $total_4, 2);
                $slp->me_price = (count($slp->apu) == 0) ? $price_ : $total_;
                $slp->me_total = $slp->me_price*$slp->me_quantity;
                $slp->me_apu_hh = $apu_hh;
                $slp->me_apu_hq = $apu_hq;
                $slp->me_apu_total_mo = $total_1;
                $slp->me_apu_total_mat = $total_2;
                $slp->me_apu_total_eq = $total_3;
                $slp->me_apu_total_sc = $total_4;
                $slp->save();
            }
        }

        foreach ($materials_ as $mat) {
            $total = 0;
            foreach ($mat->children as $slp) {
                $total += $slp->me_total;
            }
            $mat->me_total = $total;
            $mat->save();
        }

        $this->calculateTotal($project->id, $projectRepo);

        $pc = new ProjectConsolidatedController();
        $pc->generateConsolidated($project);
    }
}