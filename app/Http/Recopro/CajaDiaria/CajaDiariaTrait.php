<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\CajaDiaria;

use Carbon\Carbon;

trait CajaDiariaTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['CAJA','FECHA CAJA','USUARIO','ESTADO','TOTAL EFECTIVO SOLES','TOTAL EGRESOS SOLES','TOTAL OTROS INGRESOS SOLES','TOTAL NO EFECTIVO SOLES','TOTAL EFECTIVO DÓLARES','TOTAL EGRESOS DÓLARES','TOTAL OTROS INGRESOS DÓLARES','TOTAL NO EFECTIVO DÓLARES','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="Aperturado";
            if($i->estado=='0'){
                $estado='Cerrado';
            };
            $columns[] = [
                ['left', $i->caja_u->nombre_caja],
                ['left', (Carbon::parse($i->fechaCaja)->format('d-m-Y'))],
                ['left', $i->usuario_u->name],
                ['left', $estado],
                ['left', $i->totalEfectivo],
                ['left', $i->totalEgresos],
                ['left', $i->totalOtrosIngresos],
                ['left', $i->totalNoEfectivo],
                ['left', $i->totalEfectivoDol],
                ['left', $i->totalEgresosDol],    
                ['left', $i->totalOtrosIngresosDol],
                ['left', $i->totalNoEfectivoDol],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE APERTURA DE CAJAS'
        ];

        return $data;
    }
}