<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 05/07/2017
 * Time: 09:49 AM
 */

namespace App\Http\Recopro\Petty_cash;

use Carbon\Carbon;

trait Petty_cashTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['CAJA CHICA', 'CÓDIGO', 'RESPONSABLE',
            'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];
        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->description],
                ['left', $i->code],
                ['left', $i->liable->name],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE CAJAS CHICAS'
        ];

        return $data;
    }
}