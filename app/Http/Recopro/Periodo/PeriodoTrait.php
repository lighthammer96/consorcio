<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Periodo;

use Carbon\Carbon;

trait PeriodoTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['PERIODO','ESTADO','FECHA INICIO','FECHA FIN','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="ACTIVO";
            if($i->estado=='I'){
                $estado='INACTIVO';
            };
            $columns[] = [
                ['left', $i->periodo],
                ['left', $estado],
                ['left', $i->fechaInicio],
                ['left', $i->fechaFin],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE PERIODO'
        ];

        return $data;
    }
}