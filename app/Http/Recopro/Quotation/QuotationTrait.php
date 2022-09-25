<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 07/07/2017
 * Time: 06:37 PM
 */

namespace App\Http\Recopro\Quotation;


trait QuotationTrait
{
    public function excelConsolidated($info)
    {
        $columns[] = ['ARTÍCULO', 'U.M.', 'CANTIDAD'];

        foreach ($info as $item => $i) {
            $columns[] = [
                ['left', $i['description']],
                ['center', $i['um']],
                ['right', number_format($i['quantity'], 2, '.', '')],
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'CONSOLIDADO DE REQUERIMIENTOS'
        ];

        return $data;
    }
}