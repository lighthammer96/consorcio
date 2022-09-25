<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Descuento;

use Carbon\Carbon;

trait DescuentoTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['DESCRIPCION','TIPO','PORCENTAJE','MONEDA','MONTO','FECHA INICIO','FECHA FIN','LIMITE DE USO','CANTIDAD DE USO','SALDO USO','USUARIOS','APLICACIÓN','ESTADO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="ACTIVO";
            if($i->estado=='I'){
                $estado='INACTIVO';
            };
             $tipo="PORCENTAJE";
            if($i->idTipo=='M'){
                $tipo='MONTO';
            };
            $user="TODOS";
            if($i->nTodosUsusarios=='0'){
                $user='POR USUARIOS';
            };
            $moneda='';
            if(!empty($i->moneda_u->Descripcion)){
                $moneda=$i->moneda_u->Descripcion;
            }
            $tipoApli='TOTAL';
            if($i->cTipoAplica=='L'){
                $tipoApli='POR LINEA';
            }

            $columns[] = [
                ['left', $i->descripcion],
                ['left', $tipo],
                ['left', $i->nPorcDescuento],
                ['left', $moneda],
                ['left', $i->nMonto],
                ['center', (Carbon::parse($i->dFecIni)->format('d-m-Y'))],
                ['center', (Carbon::parse($i->dFecFin)->format('d-m-Y'))],
                ['left', $i->nLimiteUso],
                ['left', $i->nCantUso],
                ['left', $i->nSaldoUso],
                ['left', $user],
                ['left', $tipoApli],
                ['left', $estado],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE DESCUENTOS'
        ];

        return $data;
    }
}