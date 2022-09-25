<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Movimiento_cierre;

use Carbon\Carbon;

trait Movimiento_cierreTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['IDMOVIMIENTO','OPERACIÓN','USUARIO','ESTADO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="REGISTRADO";
            if($i->estado==1){
                $estado='PROCESADO';
            };
            $columns[] = [
                ['left', $i->idMovimiento],
                ['left', $i->Operation->descripcion],
                ['left', $i->user_d->name],
                ['left', $estado],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE MOVIMIENTOS'
        ];

        return $data;
    }
}