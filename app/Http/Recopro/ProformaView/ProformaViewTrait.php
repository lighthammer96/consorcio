<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\ProformaView;

use Carbon\Carbon;

trait ProformaViewTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['CÓDIGO','CONSECUTIVO','CÓDIGO ORDEN','CONSECUTIVO ORDEN','FECHA REGISTRO','TOTAL MANO DE OBRA','TOTAL REPUESTOS','SUB TOTAL','IMPUESTO','TOTAL','ESTADO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="REGISTRADO";
            if($i->estado=='1'){
                $estado='APROBADA';
            }else if($i->estado=='2'){
                $estado='ENTREGADA';
            }else if($i->estado=='3'){
                $estado='ENTREGA PARCIAL';
            }else if($i->estado=='4'){
                $estado='CON DEVOLUCIÓN';
            };
            $columns[] = [
                ['left', $i->cCodConsecutivo],
                ['left', $i->nConsecutivo],
                ['left', $i->cCodConsecutivoOS],
                ['left', $i->nConsecutivoOS],
                ['left',(Carbon::parse($i->dFechaRegistro)->format('d-m-Y'))],
                ['left', $i->nTotalMO],
                ['left', $i->nTotalDetalle],
                ['left', $i->nSubTotal],
                ['left', $i->nImpuesto],
                ['left', $i->nTotal],
                ['left', $estado],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE PROFORMAS'
        ];

        return $data;
    }
}