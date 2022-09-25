<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/27/2017
 * Time: 4:42 PM
 */

namespace App\Http\Recopro\Buyer;

use Carbon\Carbon;

trait BuyerTrait
{
    public function generateDataExcel($info)
    {
        ini_set('max_execution_time', 6000);

        $columns[] = ['CODIGO', 'DESCRIPCION', 'ESTADO', 'USUARIO', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->code],
                ['left', $i->description],
                ['left', (($i->state == 1) ? 'Activo' : 'Inactivo')],
                ['left', $i->user->name],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE COMPRADORES'
        ];

        return $data;
    }
}