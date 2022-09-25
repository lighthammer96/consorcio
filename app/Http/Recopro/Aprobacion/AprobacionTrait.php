<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Aprobacion;

use Carbon\Carbon;

trait AprobacionTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['NOMBRE', 'TIENDA','USUARIOS', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $usuarios=[];
            foreach ($i->usuarios  as $wu) {
                $usuarios[] = $wu->usuario;
            }
            $usuarios = implode(',', $usuarios);
            $columns[] = [
                ['left', $i->nombre_aprobacion],
                ['left', $i->tienda_d->descripcion],
                ['left', $usuarios],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE APROBACION'
        ];

        return $data;
    }
}