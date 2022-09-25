<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 18/08/2017
 * Time: 12:17 PM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\Stock\StockInterface;
use App\Http\Recopro\Stock\StockTrait;
use Illuminate\Http\Request;

class StockController extends Controller
{
    use StockTrait;

    public function all(Request $request, StockInterface $repo)
    {
        $filter = $request->all();
        $params = ['id', 'product_id', 'warehouse_id', 'stock', 'stock_transit'];
        $data = $repo->search($filter);
        $info = parseDataList($data, $request, 'id', $params);
        $data = $info[1];

        foreach ($data as $d) {
            $d->warehouse_o = ($d->warehouse) ? $d->warehouse->description : '';
            $d->code_internal = ($d->warehouse) ? $d->warehouse->code_internal : '';
            $d->code_article = ($d->product) ? $d->product->code_article : '';
            $d->average_cost = ($d->product) ? $d->product->average_cost : '';
            $total = $d->product->average_cost * $d->stock;
            $d->cost_total = number_format($total, 2, '.', '');
            $d->description_article = ($d->product) ? $d->product->description_detail : '';
        }

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function excel(StockInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE STOCK', 'STOCK');
    }


}