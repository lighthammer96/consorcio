<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Measure;

use Carbon\Carbon;

trait MeasureTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['UNIDAD DE MEDIDA','EQUIVALENCIA SUNAT','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->Descripcion],
                ['left', $i->EquivalenciaSunat],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE UNIDADES DE MEDIDA'
        ];

        return $data;
    }
}