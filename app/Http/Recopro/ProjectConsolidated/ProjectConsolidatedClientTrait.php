<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 19/09/2017
 * Time: 09:19 AM
 */

namespace App\Http\Recopro\ProjectConsolidated;

trait ProjectConsolidatedClientTrait
{
    public function generateReportClient($p)
    {
        $data = [];
        $lb_ab = 0; $pv_ab = 0; $ev_ab = 0;
        $lb_materials = 0; $pv_materials = 0; $ev_materials = 0;
        foreach ($p->subProjects as $item => $subProject) {
            $subP = [
                'code' => 'AB'.($item+1),
                'text' => $subProject->description
            ];
            $lb = 0; $pv = 0; $ev = 0;
            foreach ($subProject->sub_project_levels_parents as $item2 => $sub_project_level) {
                $subPL = [
                    'text' => $sub_project_level->code.' '.$sub_project_level->description,
                ];
                $lb_sp = 0; $pv_sp = 0; $ev_sp = 0;
                foreach ($sub_project_level->children as $item3 => $sub_project_level_2) {
                    $subPL2 = [
                        'text' => $sub_project_level_2->code.' '.$sub_project_level_2->description,
                    ];
                    $lb_sp2 = 0; $pv_sp2 = 0; $ev_sp2 = 0;
                    foreach ($sub_project_level_2->children as $item4 => $sub_project_level_3) {
                        $lb_sp3 = (float)$sub_project_level_3->lb_total;
                        $pv_sp3 = (float)$sub_project_level_3->pv_total;
                        $ev_sp3 = 0;
                        if ($sub_project_level_3->type == 2) {
                            $subPL3 = [
                                'text' => $sub_project_level_3->code.' '.$sub_project_level_3->description,
                            ];
                            $subPL3['lb'] = formatNumberTotal($lb_sp3, 2);
                            $subPL3['pv'] = formatNumberTotal($pv_sp3, 2);
                            $subPL3['ev'] = formatNumberTotal($ev_sp3, 2);
                            $subPL2['item'][$item4] = $subPL3;
                        }
                        $lb_sp2 += $lb_sp3;
                        $pv_sp2 += $pv_sp3;
                        $ev_sp2 += $ev_sp3;
                        if ($sub_project_level_3->type != 2) {
                            $lb_materials += $lb_sp3;
                            $pv_materials += $pv_sp3;
                            $ev_materials += $ev_sp3;
                        }
                    }
                    $subPL2['lb'] = formatNumberTotal($lb_sp2, 2);
                    $subPL2['pv'] = formatNumberTotal($pv_sp2, 2);
                    $subPL2['ev'] = formatNumberTotal($ev_sp2, 2);
                    $subPL['item'][$item3] = $subPL2;
                    $lb_sp += $lb_sp2;
                    $pv_sp += $pv_sp2;
                    $ev_sp += $ev_sp2;
                }
                $subPL['lb'] = formatNumberTotal($lb_sp, 2);
                $subPL['pv'] = formatNumberTotal($pv_sp, 2);
                $subPL['ev'] = formatNumberTotal($ev_sp, 2);
                $subP['item'][$item2] = $subPL;
                $lb += $lb_sp;
                $pv += $pv_sp;
                $ev += $ev_sp;
            }
            $subP['lb'] = formatNumberTotal($lb, 2);
            $subP['pv'] = formatNumberTotal($pv, 2);
            $subP['ev'] = formatNumberTotal($ev, 2);
            $per = ($pv > 0) ? $pv*100/$lb : 0;
            $subP['per'] = formatNumberTotal($per, 0);

            $data[] = $subP;
            $lb_ab += $lb;
            $pv_ab += $pv;
            $ev_ab += $ev;
        }
        $lb_c = 0; $pv_c = 0; $ev_c = 0; $per = 0;
        $transport = (is_null($p->transport)) ? 0 : (float)$p->transport;
        if ($transport > 0) {
            $lb_c = ($lb_materials == 0) ? 0 : $lb_materials / 100 * $transport;
            $pv_c = ($pv_materials == 0) ? 0 : $pv_materials / 100 * $transport;
            $ev_c = ($ev_materials == 0) ? 0 : $ev_materials / 100 * $transport;
            $per = ($pv_c > 0) ? $pv_c*100/$lb_c : 0;
        }
        $data[] = [
            'code' => 'C',
            'text' => 'TRANSPORTE DE MATERIALES ('.$transport.'%)',
            'lb' => formatNumberTotal($lb_c, 2),
            'pv' => formatNumberTotal($pv_c, 2),
            'ev' => formatNumberTotal($ev_c, 2),
            'per' => formatNumberTotal($per, 0)
        ];
        $lb_d = $lb_ab + $lb_c;
        $pv_d = $pv_ab + $pv_c;
        $ev_d = $ev_ab + $ev_c;
        $per = ($pv_d > 0) ? $pv_d*100/$lb_d : 0;
        $data[] = [
            'code' => 'D',
            'text' => 'COSTO DIRECTO (C.D.) (S/.) (A+B+C)',
            'lb' => formatNumberTotal($lb_d, 2),
            'pv' => formatNumberTotal($pv_d, 2),
            'ev' => formatNumberTotal($ev_d, 2),
            'per' => formatNumberTotal($per, 0),
            'show' => true
        ];
        $gg = ((is_null($p->gg_direct)) ? 0 : (float)$p->gg_direct) +
            ((is_null($p->gg_indirect)) ? 0 : (float)$p->gg_direct);
        $lb_e = 0; $pv_e = 0; $ev_e = 0; $per = 0;
        if ($gg > 0) {
            $lb_e = ($lb_d == 0) ? 0 : $lb_d / 100 * $gg;
            $pv_e = ($pv_d == 0) ? 0 : $pv_d / 100 * $gg;
            $ev_e = ($ev_d == 0) ? 0 : $ev_d / 100 * $gg;
            $per = ($pv_e > 0) ? $pv_e*100/$lb_e : 0;
        }
        $data[] = [
            'code' => 'E',
            'text' => 'GASTOS GENERALES ('.(float)$gg.'% D)',
            'lb' => formatNumberTotal($lb_e, 2),
            'pv' => formatNumberTotal($pv_e, 2),
            'ev' => formatNumberTotal($ev_e, 2),
            'per' => formatNumberTotal($per, 0)
        ];
        $lb_f = 0; $pv_f = 0; $ev_f = 0; $per = 0;
        $utils = (is_null($p->utils)) ? 0 : (float)$p->utils;
        if ($utils > 0) {
            $lb_f = ($lb_d == 0) ? 0 : $lb_d / 100 * $utils;
            $pv_f = ($pv_d == 0) ? 0 : $pv_d / 100 * $utils;
            $ev_f = ($ev_d == 0) ? 0 : $ev_d / 100 * $utils;
            $per = ($pv_f > 0) ? $pv_f*100/$lb_f : 0;
        }
        $data[] = [
            'code' => 'F',
            'text' => 'UTITLIDADES ('.(float)$gg.'% D)',
            'lb' => formatNumberTotal($lb_f, 2),
            'pv' => formatNumberTotal($pv_f, 2),
            'ev' => formatNumberTotal($ev_f, 2),
            'per' => formatNumberTotal($per, 0)
        ];
        $per = (($pv_d + $pv_e + $pv_f) > 0) ? ($pv_d + $pv_e + $pv_f)*100/($lb_d + $lb_e + $lb_f) : 0;
        $data[] = [
            'code' => 'G',
            'text' => 'TOTAL GENERAL (S/.) (D+E+F)',
            'lb' => formatNumberTotal($lb_d + $lb_e + $lb_f, 2),
            'pv' => formatNumberTotal($pv_d + $pv_e + $pv_f, 2),
            'ev' => formatNumberTotal($ev_d + $ev_e + $ev_f, 2),
            'per' => formatNumberTotal($per, 0),
            'show' => true
        ];
        return $data;
    }
}