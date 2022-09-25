<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Vehiculos_tercero;

use Carbon\Carbon;

trait Vehiculos_terceroTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['MARCA','MODELO','CHASIS','AÑO DE FABRICACIÓN','COLOR','PLACA','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="ACTIVO";
            if($i->estado=='I'){
                $estado='INACTIVO';
            };
            $var2=" ";
            if(!empty($i->modelo->descripcion)){
                $var2=$i->modelo->descripcion;
            }
            $columns[] = [
                ['left', $i->marca->description],
                ['left', $var2],
                ['left', $i->n_chasis],
                ['left', $i->anio_fabricacion],
                ['left', $i->color],
                ['left', $i->placa],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE VEHÍCULOS TERCEROS'
        ];

        return $data;
    }
}