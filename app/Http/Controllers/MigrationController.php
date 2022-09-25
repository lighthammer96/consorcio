<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 15/06/2017
 * Time: 12:02 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Level\Level;
use App\Http\Recopro\Level\LevelInterface;
use App\Http\Recopro\Product\Product;
use App\Http\Recopro\Product\ProductInterface;
use Maatwebsite\Excel\Facades\Excel;

class MigrationController extends controller
{
    public function index(ProductInterface $product)
    {
        ini_set('max_execution_time', 6000);
//        Product::where('id', '<>', 0)->update(['matrix' => null]);
        Product::truncate();
        Level::truncate();
        Excel::load('public/excel/migra.xlsx', function ($reader) use ($product) {
            $result = $reader->get();
            foreach ($result as $value) {
                if ($value->level == 1) {
                    Level::create([
                        'code' => $value->code,
                        'description' => $value->description,
                        'parent_id' => $value->parent_id
                    ]);
                } else {
                    if ($value->description != '') {
                        $product->create([
                            'code_matrix' => $value->code,
                            'description' => str_limit($value->description, 250),
                            'description_detail' => $value->description,
                            'matrix' => $value->parent_id,
                            'type_id' => $value->type,
                            'model' => 'Test',
                            'um_id' => 'UND'
                        ]);
                    }
                }
            }
        })->get();

        return 'OK';
    }
}