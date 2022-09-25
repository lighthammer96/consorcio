<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\SolicitudCompra;

use Carbon\Carbon;

trait SolicitudCompraTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['ID SOLICITUD','CODIGO','CONSECUTIVO','FECHA REGISTRO','FECHA REQUERIDA ','PRIORIDAD','AREA','ESTADO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="REGISTRADO";
            $prioridad="ALTA";
            if($i->estado==1){
                $estado='APROBADO';
            }else if($i->estado==2){
                $estado='CON ORDEN DE COMPRA';
            }else if($i->estado==3){
                $estado='CERRADO';
            }else if($i->estado==4){
                $estado='CANCELADO';
            };

            if($i->area=='M'){
                $prioridad='MEDIA';
            }else if($i->area=='B'){
                $prioridad='BAJA';
            };
            $area='';
            if(!empty($i->area_c->descripcion)){
                $area=$i->area_c->descripcion;
            };
            $columns[] = [
                ['left', $i->idMovimiento],
                ['left', $i->cCodConsecutivo],
                ['left', $i->nConsecutivo],
                ['left',  (Carbon::parse($i->fecha_registro)->format('d-m-Y'))],
                ['left',  (Carbon::parse($i->fecha_requerida)->format('d-m-Y'))],
                ['left', $prioridad],  
                ['left', $area],  
                ['left', $estado],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE SOLICITUDES DE COMPRA'
        ];

        return $data;
    }
}