<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 15/09/2017
 * Time: 11:31 AM
 */

namespace App\Http\Recopro\Project;

use App\Http\Controllers\AnalysisUnitaryPriceController;

trait ProjectApprovalTrait
{
    private static $_SUB_STATE_REGISTER = 1;

    private static $_SUB_STATE_SEND_APPROVAL_LB = 2;

    private static $_SUB_STATE_APPROVAL_LB = 3;

    private static $_SUB_STATE_SEND_APPROVAL_PV = 4;

    private static $_SUB_STATE_APPROVAL_PV = 5;

    private static $_SUB_STATE_SEND_APPROVAL_ME = 6;

    private static $_SUB_STATE_APPROVAL_ME = 7;

    private static $_SUB_STATE_SEND_APPROVAL_DF = 8;

    private static $_SUB_STATE_APPROVAL_DF = 9;

    public function verifyApproval($id, ProjectInterface $repo)
    {
        $msg_approval = 'Para envíar a aprobación';

        $project = $repo->find($id);
        $sub_state = $project->sub_state_id;

        if (!$project) {
            throw new \Exception('El proyecto no existe');
        } elseif (is_null($project->client_id)) {
            throw new \Exception($msg_approval.' debe seleccionar el cliente en la Pestaña General');
        } elseif (is_null($project->gg_direct)) {
            throw new \Exception($msg_approval.' debe ingresar porcentaje de G.G.Directos en la Pestaña General');
        } elseif (is_null($project->gg_indirect)) {
            throw new \Exception($msg_approval.' debe ingresar porcentaje de G.G.Indirectos en la Pestaña General');
        } elseif (is_null($project->transport)) {
            throw new \Exception($msg_approval.' debe ingresar porcentaje de Transporte en la Pestaña General');
        } elseif (is_null($project->utils)) {
            throw new \Exception($msg_approval.' debe ingresar porcentaje de Utilidades en la Pestaña General');
        }

        if ($sub_state == 1 || $sub_state == 3) {
            $sub_projects = $project->subProjects;
            if (count($sub_projects) == 0) {
                throw new \Exception($msg_approval.' debe registrar subproyecto(s)');
            }
            foreach ($sub_projects as $sub_project) {
                $sub_project_levels = $sub_project->sub_project_levels_parents;
                if (count($sub_project_levels) == 0) {
                    throw new \Exception($msg_approval.', el subprojecto: '.
                        $sub_project->description.' debe tener nivel(es) registrado(s)');
                }
                foreach ($sub_project_levels as $sub_project_level) {
                    $sub_project_levels_2 = $sub_project_level->children;
                    if (count($sub_project_levels_2) == 0) {
                        throw new \Exception($msg_approval.', el nivel: '.
                            $sub_project_level->description.' del subproyecto: '.
                            $sub_project->description.' debe tener subnivel(es) registrado(s)');
                    }
                    foreach ($sub_project_levels_2 as $sub_project_level_2) {
                        $sub_project_levels_3 = $sub_project_level_2->children;
                        if (count($sub_project_levels_3) == 0) {
                            throw new \Exception($msg_approval.', el nivel: '.
                                $sub_project_level_2->description.' del subproyecto: '.
                                $sub_project->description.' debe tener subnivel(es) registrado(s)');
                        }
                        foreach ($sub_project_levels_3 as $sub_project_level_3) {
                            if (is_null($sub_project_level_3->level_id)) {
                                throw new \Exception($msg_approval.', el nivel: '.
                                    $sub_project_level_3->description.' del subproyecto: '.
                                    $sub_project->description.' debe estar asociado a la matriz');
                            }
                            if ($sub_project_level_3->type == 1) {
                                $p_ = ($sub_state == 1) ? $sub_project_level_3->lb_price : $sub_project_level_3->pv_price;
                                $q_ = ($sub_state == 1) ? $sub_project_level_3->lb_quantity : $sub_project_level_3->pv_quantity;
                                if (is_null($p_) || is_null($q_)) {
                                    throw new \Exception($msg_approval.', debe completar los precios y 
                                        cantidades de los materiales');
                                }
                            } elseif ($sub_project_level_3->type == 2) {
                                if (count($sub_project_level_3->apu) == 0) {
                                    throw new \Exception($msg_approval.', debe ingresar el 
                                        Análisis de Precios Unitarios de las actividades');
                                }
                                $t_ = ($sub_state == 1) ? $sub_project_level_3->lb_total : $sub_project_level_3->pv_total;
                                if ($t_ == 0) {
                                    throw new \Exception($msg_approval.', debe ingresar la 
                                        cantidad de las actividades');
                                }
                            }
                        }
                    }
                }
            }
            $s_s_ = ($sub_state == 1) ? self::$_SUB_STATE_SEND_APPROVAL_LB : self::$_SUB_STATE_SEND_APPROVAL_PV;

            $repo->update($id, [
                'sub_state_id' => $s_s_
            ]);
        } elseif ($sub_state == 5) {
            $code_per_mat = AnalysisUnitaryPriceController::$_CODE_PERCENTAGE_MATERIALS;
            $code_per_eq = AnalysisUnitaryPriceController::$_CODE_PERCENTAGE_EQUIPMENT;
            foreach ($project->subProjects as $sub_project) {
                foreach ($sub_project->sub_project_levels_parents as $sub_project_level) {
                    foreach ($sub_project_level->children as $sub_project_level_2) {
                        foreach ($sub_project_level_2->children as $sub_project_level_3) {
                            if ($sub_project_level_3->type == 1) {
                                if ($sub_project_level_3->me_price == 0) {
                                    throw new \Exception($msg_approval . ', debe completar los precios 
                                    de los materiales');
                                }
                            } elseif ($sub_project_level_3->type == 2) {
                                foreach ($sub_project_level_3->apu as $apu) {
                                    if ($apu->level_id == $code_per_mat || $apu->level_id == $code_per_eq) {
                                        continue;
                                    }
                                    if ($apu->me_price == 0) {
                                        throw new \Exception($msg_approval . ', debe completar los precios 
                                        del Análisis de Precios Unitarios de las actividades');
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (count($project->projectGGT->where('type', 1)) == 0) {
                throw new \Exception($msg_approval . ', debe ingresar Gastos Generales');
            }
            foreach ($project->projectGGT->where('type', 1) as $ggt) {
                if ($ggt->total == 0) {
                    throw new \Exception($msg_approval . ', debe ingresar el porcentaje de participación, meses, 
                    precios y cantidades de los Gastos Generales');
                }
            }
            if (count($project->projectGGT->where('type', 2)) == 0) {
                throw new \Exception($msg_approval . ', debe ingresar Transportes');
            }
            foreach ($project->projectGGT->where('type', 2) as $ggt) {
                if ($ggt->total == 0) {
                    throw new \Exception($msg_approval . ', debe ingresar el precio y cantidad de los Transportes');
                }
            }
            $repo->update($id, [
                'sub_state_id' => self::$_SUB_STATE_SEND_APPROVAL_ME
            ]);
        } elseif ($sub_state == 7) {
            foreach ($project->subProjects as $sub_project) {
                if (count($sub_project->sub_project_fronts) == 0) {
                    throw new \Exception($msg_approval . ', debe ingresar frente(s) para el subproyecto: '.
                        $sub_project->description);
                }
                foreach ($sub_project->sub_project_levels_parents as $sub_project_level) {
                    foreach ($sub_project_level->children as $sub_project_level_2) {
                        foreach ($sub_project_level_2->children as $sub_project_level_3) {
                            if ($sub_project_level_3->type == 1) {
                                if (count($sub_project_level_3->front_detail) == 0) {
                                    throw new \Exception($msg_approval . ', debe distribuir correctamente la 
                                    cantidad de los materiales');
                                }
                            } elseif ($sub_project_level_3->type == 2) {
                                $q = 0;
                                foreach ($sub_project_level_3->front_detail as $fd) {
                                    $q += (float)$fd->quantity;
                                }
                                if ($q != $sub_project_level_3->me_quantity) {
                                    throw new \Exception($msg_approval . ', debe distribuir correctamente la 
                                    cantidad de las actividades');
                                }
                            }
                        }
                    }
                }
            }
            $repo->update($id, [
                'sub_state_id' => self::$_SUB_STATE_SEND_APPROVAL_DF
            ]);
        } else {
            throw new \Exception('El proyecto está en proceso de aprobación');
        }
    }
}