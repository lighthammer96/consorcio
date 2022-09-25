<?php

/**
 * Created by PhpStorm.
 * User: ever-pc
 * Date: 16/08/2017
 * Time: 10:46 PM
 */

namespace App\Http\Recopro\ConsumerReturn;

use Carbon\Carbon;

trait ConsumerReturnTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['FECHA', 'USUARIO', 'PROYECTO', 'ALMACÉN', 'ESTADO', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];
        foreach ($info as $i) {
            $columns[] = [
                ['left', (($i->date != null) ? Carbon::parse($i->date)->format('d-m-Y') : '')],
                ['left', $i->user->name],
                ['left', ($i->project) ? $i->project->description : ''],
                ['left', ($i->warehouse) ? $i->warehouse->description : ''],
                ['left', $i->state_description],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DEVOLUCIÓN DE CONSUMO'
        ];

        return $data;
    }
}