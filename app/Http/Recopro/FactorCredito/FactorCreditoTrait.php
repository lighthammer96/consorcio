<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\FactorCredito;

use Carbon\Carbon;

trait FactorCreditoTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['NROCUOTAS', 'PORCENTAJE', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->nrocuotas],
                ['left', $i->porcentaje],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE FACTORES DE CRÉDITO'
        ];

        return $data;
    }
}