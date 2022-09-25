<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\List_precio;

use Carbon\Carbon;

trait List_precioTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['LISTA','TIPO CLIENTE','MONEDA','FECHA INICIO','FECHA FIN','ESTADO','PRODUCTOS','PRECIOS','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];
        foreach ($info as $i) {
            $estado="REGISTRADA";
            if($i->iEstado=='1'){
                $estado='APROBADA';
            }else if($i->iEstado=='2'){
                $estado='VENCIDA';
            };
            $producto = [];
            $precio=[];
            foreach ($i->list_precDet  as $wu) {
                $producto[] = $wu->produc_b->description;
                $precio[] = $wu->nPrecio;
            }
            $producto = implode(', ', $producto);
            $precio = implode(', ', $precio);
         
            $columns[] = [
                ['left', $i->descripcion],
                ['left', $i->type_customer->descripcion],
                ['left', $i->currency->Descripcion],

                ['left', (Carbon::parse($i->dFecVigIni)->format('d-m-Y'))],
                ['left',(Carbon::parse($i->dFecVigFin)->format('d-m-Y'))],
                ['left', $estado],
                ['left', $producto],
                ['left', $precio],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE PRECIOS'
        ];

        return $data;
    }
}