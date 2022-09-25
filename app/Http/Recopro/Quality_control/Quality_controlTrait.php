<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Quality_control;

use Carbon\Carbon;

trait Quality_controlTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['CÓDIGO','NRO','FECHA','OTROS','REVISIONES','ESTADO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="REGISTRADO";
            if($i->estado=='1'){
                $estado='TERMINADO';
            };
            $REVISIONES = [];
            foreach ($i->Quality_control_revision  as $wu) {
                if($wu->iRevisado=='1'){
                     $REVISIONES[] = $wu->revision->nombre;
                }
            }
            $REVISIONES = implode(', ', $REVISIONES);
            $columns[] = [
                ['left', $i->cCodConsecutivoOS],
                ['left', $i->nConsecutivoOS],
                ['left',(Carbon::parse($i->dFechaRegistro)->format('d-m-Y'))],
                ['left', $i->cOtros],
                ['left', $REVISIONES],
                ['left', $estado],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE CATEGORÍAS'
        ];

        return $data;
    }
}