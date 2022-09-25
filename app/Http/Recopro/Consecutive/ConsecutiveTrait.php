<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Consecutive;

use Carbon\Carbon;

trait ConsecutiveTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['CÓDIGO CONSECUTIVO','TIPO CONSECUTIVO','DETALLE','TIENDA','CONSECUTIVO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->cCodConsecutivo],
                ['left',  $i->get_tipoConsecutivo_excel->cTipoConsecutivo],
                ['left', $i->cDetalle],
                ['left', $i->get_tienda_excel->descripcion],
                ['left', $i->nConsecutivo],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->dFecCre)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->dFecMod)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE CONSECUTIVOS'
        ];

        return $data;
    }
}