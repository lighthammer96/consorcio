<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 22/06/2017
 * Time: 05:42 PM
 */

namespace App\Http\Recopro\Entry;

use Carbon\Carbon;

trait EntryTrait
{

    public function generateDataExcel($info)
    {
        $columns[] = ['FECHA INGRESO', 'ALMACÉN', 'USUARIO', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];
        foreach ($info as $i) {
            $columns[] = [
                ['left', (($i->entry_date != null) ? Carbon::parse($i->entry_date)->format('d-m-Y') : '')],
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
            'title' => 'LISTA DE INGRESOS'
        ];

        return $data;
    }
}