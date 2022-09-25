<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Objetivo;

use Carbon\Carbon;

trait ObjetivoTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['DESCRIPCION','TIPO OBJETIVO','ESTADO','MONEDA','AÑO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) { 
            $estado="REGISTRADO";
            if($i->estado=='1'){
                $estado='APROBADO';
            };
            $columns[] = [
                ['left', $i->descripcion],
                ['left', $i->tipoObjet_c->descripcion],
                ['left', $estado],
                ['left', $i->moneda_c->Descripcion],
                ['left', $i->nAno],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->dFecCre)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->dFecMod)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE OBJETIVOS'
        ];

        return $data;
    }
}