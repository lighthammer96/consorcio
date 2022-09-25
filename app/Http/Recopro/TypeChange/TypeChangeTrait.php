<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:43 AM
 */

namespace App\Http\Recopro\TypeChange;

use Carbon\Carbon;

trait TypeChangeTrait
{
    public function generateDataExcel($info)
    {
        ini_set('max_execution_time', 6000);

        $columns[] = ['FECHA', 'COMPRA', 'VENTA','COMERCIAL COMPRA','COMERCIAL VENTA', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $columns[] = [
                ['left', (Carbon::parse($i->Fecha)->format('d-m-Y'))],
                ['right', $i->Compra],
                ['right', $i->Venta],
                ['right', $i->cambioComercialCompra],
                ['right', $i->cambioComercialVenta],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE TIPOS DE CAMBIOS'
        ];

        return $data;
    }
}