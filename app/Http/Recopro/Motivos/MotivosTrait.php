<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Motivos;

use Carbon\Carbon;

trait MotivosTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['CÓDIGO','MOTIVO', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO', 'ESTADO'];
        // print_r($info); exit;   
        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->codigo],
                ['left', $i->descripcion],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))],
                ['left', $i->user_c->estado]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE MOTIVOS'
        ];

        return $data;
    }
}