<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\RegisterOrdenCompra;

use Carbon\Carbon;

trait RegisterOrdenCompraTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['ID ORDEN','CÓDIGO','CONSECUTIVO','ESTADO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="REGISTRADO";
            if($i->iEstado==1){
                $estado='POR APROBAR';
            };
            if($i->iEstado==2){
                $estado='APROBADO';
            };
            if($i->iEstado==3){
                $estado='RECIBIDO';
            };
            if($i->iEstado==4){
                $estado='BACKORDER';
            };
            if($i->iEstado==5){
                $estado='CERRADO';
            };
            if($i->iEstado==6){
                $estado='CANCELADO';
            };
            $columns[] = [
                ['left', $i->id],
                ['left', $i->cCodConsecutivo],
                ['left', $i->nConsecutivo],
                ['left', $estado],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE ORDENES DE COMPRA'
        ];

        return $data;
    }
}