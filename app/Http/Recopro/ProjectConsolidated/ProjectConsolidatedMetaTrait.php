<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 19/09/2017
 * Time: 09:58 AM
 */

namespace App\Http\Recopro\ProjectConsolidated;

use App\Http\Controllers\ProjectController;
use App\Http\Recopro\Level\LevelInterface;

trait ProjectConsolidatedMetaTrait
{
    public function generateReportMeta($p, LevelInterface $levelRepo)
    {
        $data = [];

        $levels = $levelRepo->getChildren(ProjectController::$_LEVEL_PARENT);

        foreach ($levels as $idx => $l) {
            $menu = [];
            foreach ($l->children as $idx2 => $l2) {
                $menu2 = [];
                foreach ($l2->children as $idx3 => $l3) {
                    if ($idx3 == 0) {
                        $menu2[] = [
                            'code' => '',
                            'nodes' => []
                        ];
                    }
                    $menu2[] = [
                        'text' => $l3->description,
                        'code' => $l3->code,
                        't' => 0,
                        'nodes' => []
                    ];
                }
                if ($idx2 == 0) {
                    $menu[] = [
                        'code' => '',
                        'nodes' => []
                    ];
                }
                $menu[] = [
                    'text' => $l2->description,
                    'code' => $l2->code,
                    't' => 0,
                    'nodes' => $menu2
                ];
            }
            if ($idx == 0) {
                $menu[] = [
                    'code' => '',
                    'nodes' => []
                ];
            }
            $data[] = [
                'text' => $l->description,
                'code' => $l->code,
                't' => 0,
                'nodes' => $menu
            ];
        };

        foreach ($p->consolidated as $con) {
            if ($con->is_del) {
                continue;
            }
            $article = $con->article;
            $parent = $article->level;
            $code_parent = $parent->code;
            $info = [
                'text' => $article->description,
                'code' => $con->level_id,
                't' => (float)$con->total
            ];
            $is_found = false;
            foreach ($data as $idx => $d) {
                foreach ($d['nodes'] as $idx2 => $d1) {
                    $key = array_search($code_parent, array_column($d1['nodes'], 'code'));
                    if ($key) {
                        $data[$idx]['nodes'][$idx2]['nodes'][$key]['nodes'][] = $info;
                        $data[$idx]['nodes'][$idx2]['nodes'][$key]['t'] += $info['t'];
                        $data[$idx]['nodes'][$idx2]['t'] += $info['t'];
                        $data[$idx]['t'] += $info['t'];
                        $is_found = true;
                        break;
                    }
                }
                if ($is_found) {
                    break;
                }
            }
        }

        foreach ($p->projectGGT as $ggt) {
            $l = $ggt->product;
            if ($l) {
                $code_parent = $l->matrix;
            } else {
                $l = $ggt->level;
                $code_parent = $l->parent_id;
            }
            $info = [
                'text' => $l->description,
                'code' => $ggt->level_id,
                't' => (float)$ggt->total
            ];
            $is_found = false;
            foreach ($data as $idx => $d) {
                foreach ($d['nodes'] as $idx2 => $d1) {
                    $key = array_search($code_parent, array_column($d1['nodes'], 'code'));
                    if ($key) {
                        $data[$idx]['nodes'][$idx2]['nodes'][$key]['nodes'][] = $info;
                        $data[$idx]['nodes'][$idx2]['nodes'][$key]['t'] += $info['t'];
                        $data[$idx]['nodes'][$idx2]['t'] += $info['t'];
                        $data[$idx]['t'] += $info['t'];
                        $is_found = true;
                        break;
                    }
                }
                if ($is_found) {
                    break;
                }
                $key = array_search($code_parent, array_column($d['nodes'], 'code'));
                if ($key) {
                    $data[$idx]['nodes'][$key]['nodes'][] = $info;
                    $data[$idx]['nodes'][$key]['t'] += $info['t'];
                    $data[$idx]['t'] += $info['t'];
                    break;
                }
            }
        }
        foreach ($data as $idx => $d) {
            foreach ($d['nodes'] as $idx2 => $d1) {
                foreach ($d1['nodes'] as $idx3 => $d2) {
                    if (isset($d2['nodes']) && count($d2['nodes']) == 0) {
                        unset($d1['nodes'][$idx3]);
                        unset($data[$idx]['nodes'][$idx2]['nodes'][$idx3]);
                    }
                }
                if (count($d1['nodes']) == 0) {
                    unset($d['nodes'][$idx2]);
                    unset($data[$idx]['nodes'][$idx2]);
                }
            }
            if (count($d['nodes']) == 0) {
                unset($data[$idx]);
                unset($data[$idx]);
            }
        }

        $t1 = 0;
        foreach ($data as $idx => $d) {
            foreach ($d['nodes'] as $idx2 => $d1) {
                $t = $data[$idx]['nodes'][$idx2]['t'];
                $per = ($t > 0) ? round(100*$t/$data[$idx]['t'], 2) : 0;
                $data[$idx]['nodes'][$idx2]['per'] = $per;
            }
            $t1 = $data[$idx]['t'];
        }

        $t2 = (float)$p->total_pv;
        $data[] = [
            'text' => 'INGRESOS (PV-REPLANTEO)',
            'code' => '2',
            't' => (float)$p->total_pv
        ];

        $t = $t2-$t1;
        $data[] = [
            'text' => 'MARGEN',
            'code' => '3',
            't' => $t,
            'per' => ($t > 0) ? round(100*$t/$t2, 2) : 0,
            'show' => true
        ];

        return $data;
    }
}