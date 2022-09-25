<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 05/07/2017
 * Time: 12:08 PM
 */

namespace App\Http\Recopro\PaymentCondition;

use Carbon\Carbon;

trait PaymentConditionTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['CÓDIGO', 'DIAS', 'DESCRIPCIÓN',
            'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];
        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->code],
                ['left', $i->days],
                ['left', $i->description],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE CONDICIÓN DE PAGO'
        ];

        return $data;
    }
}