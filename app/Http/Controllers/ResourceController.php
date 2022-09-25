<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 27/06/2017
 * Time: 11:08 AM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Level\LevelInterface;

class ResourceController extends Controller
{
    private static $_LEVEL_PARENT = 'A';

    public function getStructure(LevelInterface $repo)
    {
        try {
            $data = $this->getLevels(self::$_LEVEL_PARENT, $repo);

            return response()->json([
                'status' => true,
                'Data' => $data
            ]);

        } catch (\Exception $e) {
            throw new \Exception($e);
        }
    }

    public function getLevels($parent_id, LevelInterface $repo)
    {
        $data = [];
        $children = $repo->getChildren($parent_id);

        foreach ($children as $ch) {
            $menu = [];
            foreach ($ch->children as $ch2) {
                $menu2 = [];
                foreach ($ch2->children as $ch3) {
                    $menu3 = [];
                    foreach ($ch3->products as $p) {
                        $menu3[] = [
                            'text' => $p->code_matrix . '-' . $p->description,
                            'code' => $p->code_matrix
                        ];
                    }
                    $arr3 = [
                        'text' => $ch3->code . '-' . $ch3->description,
                        'code' => $ch3->code,
                        'type' => $ch3->type
                    ];
                    if (count($menu3) > 0) {
                        $arr3['nodes'] = $menu3;
                    }
                    $menu2[] = $arr3;
                }
                $arr2 = [
                    'text' => $ch2->code . '-' . $ch2->description,
                    'code' => $ch2->code,
                    'type' => $ch2->type
                ];
                if (count($menu2) > 0) {
                    $arr2['nodes'] = $menu2;
                }
                $menu[] = $arr2;
            }
            $arr = [
                'text' => $ch->code . '-' . $ch->description,
                'code' => $ch->code,
                'type' => $ch->type
            ];
            if (count($menu) > 0) {
                $arr['nodes'] = $menu;
            }
            $data[] = $arr;
        };
        return $data;
    }

    public function getLevelsToConsolidated($parent_id, LevelInterface $repo)
    {
        $data = [];

        $levels = $repo->getChildren($parent_id);

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
                        'lb_t' => 0,
                        'pv_t' => 0,
                        'me_t' => 0,
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
                    'lb_t' => 0,
                    'pv_t' => 0,
                    'me_t' => 0,
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
                'lb_t' => 0,
                'pv_t' => 0,
                'me_t' => 0,
                'nodes' => $menu
            ];
        };

        return $data;

    }

    public function cleanConsolidated($data)
    {
        foreach ($data as $idx => $d) {
            foreach ($d['nodes'] as $idx2 => $d1) {
                foreach ($d1['nodes'] as $idx3 => $d2) {
                    if (count($d2['nodes']) == 0) {
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
        return $data;
    }

}