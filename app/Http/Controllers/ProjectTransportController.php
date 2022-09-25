<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 13/09/2017
 * Time: 04:02 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Level\LevelInterface;
use App\Http\Recopro\Product\ProductInterface;
use Illuminate\Http\Request;

class ProjectTransportController extends Controller
{
    private static $_CODE_TRANSPORT = '13';

    public function getListMatrix(LevelInterface $repo)
    {
        $data = [];
        $children = $repo->getChildren('1');

        foreach ($children as $ch) {
            if ($ch->code == self::$_CODE_TRANSPORT) {
                $menu = [];
                foreach ($ch->children as $ch2) {
                    $arr2 = [
                        'text' => $ch2->code . '-' . $ch2->description,
                        'code' => $ch2->code,
                        'description' => $ch2->description,
                        'um' => 'VJE',
                        'type' => $ch2->parent_id
                    ];
                    $menu[] = $arr2;
                }
                $arr = [
                    'text' => $ch->code . '-' . $ch->description,
                    'code' => $ch->code
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

        $s_1 = $repo->searchChildrenGT($q, 2)->select('code', 'description', 'parent_id as parent')->get();
        $s_2 = $productRepo->searchByMatrixGT($q, 2)->select('code_matrix as code', 'description', 'matrix as parent')->get();
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
            $um = 'VJE';
            if ($product) {
                $u = $product->unity;
                $um = (is_null($u->symbol)) ? $u->Descripcion : $u->symbol;
            }
            $data[] = [
                'id' => $i['code'],
                'description' => $i['description'],
                'text' => $i['code'].'-'.$i['description'],
                'um' => $um,
                'parent' => $i['parent']
            ];
        }

        return response()->json([
            'status' => true,
            'items' => $data
        ]);
    }
}