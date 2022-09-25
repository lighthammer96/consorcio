<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 07/09/2017
 * Time: 04:31 PM
 */

namespace App\Http\Recopro\ProjectConsolidated;

use App\Http\Controllers\AnalysisUnitaryPriceController;
use App\Http\Controllers\ProjectConsolidatedController;

trait ProjectConsolidatedTrait
{
    public function verifyArticlePrice($price, $type, $object)
    {
        if ($type == 1) {
            $spl = $object;
            $id = $spl->id;
            $level_id = $spl->level_id;
            $project = $spl->subProject->project;
        } else {
            $apu = $object;
            $id = $apu->id;
            $level_id = $apu->level_id;
            $project = $apu->subProjectLevel->subProject->project;
        }
        $valid = true; $message = '';
        foreach ($project->subProjects as $sp) {
            foreach ($sp->sub_project_levels as $spl) {
                if ($spl->level_id == $level_id) {
                    if ($type == 1 && $spl->id == $id) {
                        continue;
                    }
                    if ($price != $spl->me_price) {
                        $price_1 = number_format($price, 2, '.', '');
                        $price_2 = number_format($spl->me_price, 2, '.', '');
                        $message = 'El articulo '.$spl->description.' con código de matriz '.$spl->level_id.
                            ' ya tiene registrado el precio '.$price_2.', ¿Desea reemplazar todos los 
                            articulos que tienen este código de matriz con el precio: '.$price_1.'?';
                        $valid = false;
                        break;
                    }
                }
                foreach ($spl->apu as $apu) {
                    if ($apu->level_id == $level_id) {
                        if ($type == 2 && $apu->id == $id) {
                            continue;
                        } elseif ($apu->is_del) {
                            continue;
                        }
                        if ($price != $apu->me_price) {
                            $price_1 = number_format($price, 2, '.', '');
                            $price_2 = number_format($apu->me_price, 2, '.', '');
                            $message = $apu->level->description.' con código de matriz '.$apu->level_id.
                                ' ya tiene registrado el precio '.$price_2.', ¿Desea reemplazar todos 
                                los que tienen este código de matriz con el precio: '.$price_1.'?';
                            $valid = false;
                            break;
                        }
                    }
                }
            }
            if (!$valid) {
                break;
            }
        }
        return [$valid, $message];
    }

    public function updateArticlePrice($price, $type, $object, $repo, $is_update)
    {
        $price = (float) $price;
        if ($type == 1) {
            $spl = $object;
            $id = $spl->id;
            $level_id = $spl->level_id;
            $project = $spl->subProject->project;
        } else {
            $apu = $object;
            $id = $apu->id;
            $level_id = $apu->level_id;
            $project = $apu->subProjectLevel->subProject->project;
        }
        if ($project->sub_state_id != 5) {
            return;
        }
        $parents = []; $p_ids = [];
        $apu_ = []; $apu_ids = [];
        foreach ($project->subProjects as $sp) {
            foreach ($sp->sub_project_levels as $spl) {
                if ($spl->level_id == $level_id) {
                    if ($price != $spl->me_price) {
                        $spl->me_price = $price;
                        $spl->me_total = $price * $spl->me_quantity;
                        $spl->save();
                        if (!in_array($spl->parent_id, $p_ids)) {
                            $p_ids[] = $spl->parent_id;
                            $parents[] = $spl->parent;
                        }
                    }
                }
                foreach ($spl->apu as $apu) {
                    if ($apu->is_del) {
                        continue;
                    }
                    if ($apu->level_id == $level_id) {
                        if ($price != $apu->me_price) {
                            $type_ = (int)$apu->type;
                            if ($type_ == 1 || $type_ == 3) {
                                $partial = round((float)$apu->me_q_unity*$price, 2);
                            } else {
                                $partial = round((float)$apu->me_quantity*$price, 2);
                            }
                            $apu->me_price = $price;
                            $apu->me_partial = $partial;
                            $apu->save();
                            if (!in_array($apu->sub_project_level_id, $apu_ids)) {
                                $apu_ids[] = $apu->sub_project_level_id;
                                $apu_[] = $apu->subProjectLevel;
                            }
                        }
                    }
                }
            }
        }
        foreach ($parents as $p) {
            $total = 0;
            foreach ($p->children as $ch) {
                $total += (float) $ch->me_total;
            }
            $p->me_total = $total;
            $p->save();
        }

        $code_per_mat = AnalysisUnitaryPriceController::$_CODE_PERCENTAGE_MATERIALS;
        $code_per_eq = AnalysisUnitaryPriceController::$_CODE_PERCENTAGE_EQUIPMENT;

        $percentage_mat = (float)$project->apu_materials;
        $percentage_equ = (float)$project->apu_equipment;

        foreach ($apu_ as $spl) {
            $total_1 = 0; $total_2 = 0; $total_3 = 0; $total_4 = 0;
            $apu_per = [];
            foreach ($spl->apu as $apu) {
                $type_ = $apu->type;
                if ($apu->level_id == $code_per_mat || $apu->level_id == $code_per_eq) {
                    $apu_per[] = $apu;
                    continue;
                }
                $partial = $apu->me_partial;
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
            $spl->me_price = $total_;
            $spl->me_total = $spl->me_price*$spl->me_quantity;
            $spl->me_apu_total_mo = $total_1;
            $spl->me_apu_total_mat = $total_2;
            $spl->me_apu_total_eq = $total_3;
            $spl->me_apu_total_sc = $total_4;
            $spl->save();
        }

        if ($is_update) {
            $this->calculateTotal($project->id, $repo);

            $pc = new ProjectConsolidatedController();
            $pc->generateConsolidated($project);
        }
    }

    public function stateProject($p)
    {
        $state = '';
        $sub_state = $p->sub_state_id;
        if ($sub_state == 1) {
            $state = 'Registro';
        } elseif ($sub_state == 2) {
            $state = 'Proceso de Aprobación LB';
        } elseif ($sub_state == 3) {
            $state = 'Aprobado LB';
        } elseif ($sub_state == 4) {
            $state = 'Proceso de Aprobación PV';
        } elseif ($sub_state == 5) {
            $state = 'Aprobado PV';
        } elseif ($sub_state == 6) {
            $state = 'Proceso de Aprobación Meta';
        } elseif ($sub_state == 7) {
            $state = 'Aprobado Meta';
        }
        return $state;
    }
}