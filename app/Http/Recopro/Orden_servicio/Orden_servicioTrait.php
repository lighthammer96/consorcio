<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Orden_servicio;

use Carbon\Carbon;

trait Orden_servicioTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['CONSECUTIVO','N°','TIPO','TIPO MANTENIMIENTO','MONEDA','FECHA RECEPCIÓN','HORA RECEPCIÓN','FECHA ENTREGA','HORA ENTREGA','TIPO VEHÍCULO','PLACA','MOTOR','CHASIS','AÑO FABRICACIÓN','COLOR','KILOMETRAJE','CLIENTE','TÉCNICO','ASESOR','CONDICIÓN DE PAGO','OBESERVACIONES','ESTADO','MONTO REVISIÓN','MONTO MECÁNICA','TERCEROS','OTROS MONTOS','REPUESTOS','ACCESORIOS','LUBRICANTES','OTRO REPUESTOS','TOTAL','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="REGISTRADO";
            if($i->estado=='1'){
                $estado='CON PROFORMA';
            }else if($i->estado=='2'){
                $estado='EN EJECUCIÓN';
            }else if($i->estado=='3'){
                $estado='TERMINADA';
            }else if($i->estado=='4'){
                $estado='CANCELADA';
            };
            $vara='';
            if( !empty($i->id_asesor->descripcion)){
                $vara=$i->id_asesor->descripcion;
            };
            $varb='';
            if( !empty($i->id_tecnico->descripcion)){
                $varb=$i->id_tecnico->descripcion;
            };
            $columns[] = [
                ['left', $i->cCodConsecutivo],
                ['left', $i->nConsecutivo],
                ['left', $i->tipo_serv_man->descripcion],
                ['left', $i->tipo_mantinimiento->nombre],
                ['left', $i->tipo_moneda->Descripcion],
                ['center', (Carbon::parse($i->dFecRec)->format('d-m-Y'))],
                ['left', $i->horaRec],
                ['center', (Carbon::parse($i->dFecEntrega)->format('d-m-Y'))],
                ['left', $i->horaRec],
                ['left', $i->tipo_vehiculo->descripcion],
                ['left', $i->cPlacaVeh],
                ['left', $i->cMotor],
                ['left', $i->cChasis],
                ['left', $i->iAnioFab],
                ['left', $i->cColor],
                ['left', $i->nKilometraje],
                ['left', $i->id_cliente->razonsocial_cliente],
                ['left', $vara],
                ['left', $varb],
                ['left', $i->id_condicion_pago->description],
                ['left', $i->cObservaciones],
                ['left', $estado],
                ['left', $i->mo_revision],
                ['left', $i->mo_mecanica],       
                ['left', $i->terceros],     
                ['left', $i->otros_mo],       
                ['left', $i->respuestos],       
                ['left', $i->accesorios],       
                ['left', $i->lubricantes],       
                ['left', $i->otros_rep],       
                ['left', $i->total],       
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE ORDEN DE SERVICIOS'
        ];

        return $data;
    }
}