<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Register_transfer;

use Carbon\Carbon;

trait Register_transferTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['TIPO DE OPERACIÓN','TIPO TRANSFERENCIA','OBSERVACIONES','ESTADO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $natura="Sin recepción";
            if($i->tipoTransferencia=="R"){
                $natura='Con recepción';
            };
            $estado="REGISTRADO";
            if($i->estado==1){
                $estado='PROCESADO';
            };
            $columns[] = [
                ['left', $i->Operation->descripcion],
                ['left', $natura],
                ['left', $i->observaciones],
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