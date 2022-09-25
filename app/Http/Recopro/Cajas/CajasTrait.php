<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Cajas;

use Carbon\Carbon;

trait CajasTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['CAJA', 'TIENDA', 'USUARIO', 'ACTIVO', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $usuarios=[];
            foreach ($i->usuarios  as $wu) {
                $usuarios[] = $wu->usuario;
            }
            $usuarios = implode(',', $usuarios);
            $estado="SI";
            if($i->activo=='N'){
                $estado='NO';
            };
            $columns[] = [
                ['left', $i->nombre_caja],
                ['left', $i->tienda_d->descripcion],
                ['left', $usuarios],
                ['left', $estado],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE CAJAS'
        ];

        return $data;
    }
}