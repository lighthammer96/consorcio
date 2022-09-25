<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/3/2017
 * Time: 6:34 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Level\LevelInterface;
use App\Http\Recopro\Product\ProductInterface;
use Illuminate\Http\Request;

class LevelController extends Controller
{
    public function getLevels(LevelInterface $repo)
    {
        $data = [];

        $parents = $repo->getParents();

        foreach ($parents as $p) {
            $menu = [];
            foreach ($p->children as $ch) {
                $menu2 = [];
                foreach ($ch->children as $ch2) {
                    $menu3 = [];
                    foreach ($ch2->children as $ch3) {
                        $has = (count($ch3->products) > 0);
                        $menu3[] = [
                            'text' => $ch3->description,
                            'id' => $ch3->code,
                            'has' => $has
                        ];
                    }
                    $arr3 = [
                        'text' => $ch2->description,
                        'code' => $ch2->code
                    ];
                    if (count($menu3) > 0) {
                        $arr3['nodes'] = $menu3;
                    }
                    $menu2[] = $arr3;
                }
                $arr2 = [
                    'text' => $ch->description,
                    'code' => $ch->code
                ];
                if (count($menu2) > 0) {
                    $arr2['nodes'] = $menu2;
                }
                $menu[] = $arr2;
            }
            $arr = [
                'text' => $p->description,
                'code' => $p->code
            ];
            if (count($menu) > 0) {
                $arr['nodes'] = $menu;
            }
            $data[] = $arr;
        }

        return response()->json([
            'status' => true,
            'Data' => $data
        ]);
    }

    public function associate($id, Request $request, ProductInterface $pRepo)
    {
        try {
            $level_id = $request->input('level_id');
            $product_id = $request->input('product_id');
            $code_matrix = $request->input('code');

            $pRepo->update($product_id, [
                'matrix' => $level_id,
                'code_matrix' => $code_matrix
            ]);

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

    public function disassociate($id, ProductInterface $pRepo)
    {
        try {
            $pRepo->update($id, [
                'matrix' => null,
                'code_matrix' => null
            ]);

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

    public function getProductsLevel($id, LevelInterface $repo)
    {
        $products = $repo->find($id)->products;

        $data = [];
        foreach ($products as $p) {
            $data[] = [
                'text' => $p->description_detail,
                'id' => $p->id
            ];
        }

        return response()->json([
            'status' => true,
            'Data' => $data
        ]);
    }

    public function getAll(LevelInterface $repo)
    {
        $data = $repo->getAll()->toArray();
        $prev = ['id' => 0, 'description' => 'NO ESTÁ ASOCIADO'];
        array_unshift($data, $prev);
        $data = json_decode(json_encode($data), FALSE);
        return parseSelect($data, 'id', 'description');
    }

    public function search(Request $request, LevelInterface $repo, ProductInterface $productRepo)
    {
        $q = $request->input('q');

        $s_1 = $repo->searchChildren($q)->select('code', 'description', 'type')->get();
        $s_2 = $productRepo->searchByMatrix($q)->select('code_matrix as code', 'description')->get();
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
            $type = (isset($i['type'])) ?
                $i['type'] : $productRepo->findByAttr('code_matrix', $i['code'])->level->type;
            $data[] = [
                'id' => $i['code'],
                'text' => $i['code'].'-'.$i['description'],
                'type' => $type
            ];
        }

        return response()->json([
            'status' => true,
            'items' => $data
        ]);
    }
}