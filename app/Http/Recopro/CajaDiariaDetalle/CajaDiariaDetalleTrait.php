<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\CajaDiariaDetalle;

use Carbon\Carbon;

trait CajaDiariaDetalleTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['CONCEPTO','CONCECUTIVO','TIPO','MONEDA','MONTO','NRO DE OPERACIÓN','FORMA DE PAGO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $descrip="";
            $moneda="";
            if(!empty($i->descripcion)){
                $descrip=$i->descripcion;
            }
            if(!empty($i->moneda_u->Descripcion)){
                $moneda=$i->moneda_u->Descripcion;
            }
            $columns[] = [
                ['left',$descrip],
                ['left', $i->consecutivo],
                ['left', $i->codigoTipo_u->descripcion_tipo],
                ['left', $moneda],
                ['left', $i->monto],
                ['left', $i->nroOperacion],
                ['left', $i->formaPago_u->descripcion_subtipo],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE MOVIMIENTOS DE CAJA'
        ];

        return $data;
    }

    public function generateDataComprobantesExcel($info)
    {
        $columns[] = ['SERIE','NÚMERO','FECHA','TIPO DOC','N° DOCUMENTO','CLIENTE','MONEDA','MONTO', 'PAGADO', 'SALDO', 'ESTADO'];

        foreach ($info as $i) {
            
            $columns[] = [
                ['left', $i->serie_comprobante],
                ['left', $i->numero_comprobante],
                ['left', $i->fecha_emision],
                ['left', $i->tipo_documento],
                ['left', $i->numero_documento],
                ['left', $i->cliente],
                ['left', $i->moneda],
                ['left', $i->t_monto_total],
                ['left', $i->pagado],
                ['left', $i->saldo],
                ['left', $i->estado_cpe],
               
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE COMPROBANTES'
        ];

        return $data;
    }
}