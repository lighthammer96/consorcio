<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Sector;

use Carbon\Carbon;

trait SectorTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['SECTOR','UBIGEO','DEPARTAMENTO','PROVINCIA','DISTRITO','ESTADO', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="ACTIVO";
            if($i->estado=='I'){
                $estado='INACTIVO';
            };
            $columns[] = [
                ['left', $i->descripcion],
                ['left', $i->ubigeo],
                ['left', $i->ubigeo_u->cDepartamento],
                ['left', $i->ubigeo_u->cProvincia],
                ['left', $i->ubigeo_u->cDistrito],
                ['left', $estado],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE SECTORES'
        ];

        return $data;
    }
}