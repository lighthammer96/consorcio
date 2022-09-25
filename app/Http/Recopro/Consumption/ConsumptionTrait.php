<?php

/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 16/08/2017
 * Time: 09:56 AM
 */

namespace App\Http\Recopro\Consumption;

use Carbon\Carbon;

trait ConsumptionTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['FECHA', 'USUARIO', 'PROYECTO', 'ALMACÉN', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];
        foreach ($info as $i) {
            $columns[] = [
                ['left', (($i->date != null) ? Carbon::parse($i->date)->format('d-m-Y') : '')],
                ['left', $i->user->name],
                ['left', ($i->project) ? $i->project->description : ''],
                ['left', ($i->warehouse) ? $i->warehouse->description : ''],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE CONSUMOS'
        ];

        return $data;
    }
}