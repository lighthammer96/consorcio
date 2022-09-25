<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 18/08/2017
 * Time: 12:30 PM
 */

namespace App\Http\Recopro\Stock;

use Carbon\Carbon;

trait StockTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['CÓDIGO DE ARTÍCULO', 'ARTÍCULO', 'ALMACÉN', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];
        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->product->code_article],
                ['left', $i->product->description_detail],
                ['left', $i->warehouse->description],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE STOK DE PRODUCTOS'
        ];

        return $data;
    }
}