<?php
/**
 * Created by PhpStorm.
 * User: ever-pc
 * Date: 23/06/2017
 * Time: 12:40 AM
 */

namespace App\Http\Recopro\Departure;

use Carbon\Carbon;

trait DepartureTrait
{

    public function generateDataExcel($info)
    {
        $columns[] = ['FECHA SALIDA', 'ALMACÉN', 'USUARIO', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];
        foreach ($info as $i) {
            $columns[] = [
                ['left', (($i->departure_date != null) ? Carbon::parse($i->departure_date)->format('d-m-Y') : '')],
                ['left', $i->warehouse->description],
                ['left', $i->user->name],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE SALIDAS'
        ];

        return $data;
    }
}