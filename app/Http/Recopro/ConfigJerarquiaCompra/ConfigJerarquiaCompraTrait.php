<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\ConfigJerarquiaCompra;

use Carbon\Carbon;

trait ConfigJerarquiaCompraTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['TIENDA','AREA','FECHA INICIO','FECHA FIN','MONEDA','MONTO INICIO','MONTO FIN','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->shop_u->descripcion],
                ['left', $i->area_u->descripcion],
                ['center', (Carbon::parse($i->dFecIni)->format('d-m-Y'))], 
                ['center', (Carbon::parse($i->dFecFin)->format('d-m-Y'))],
                ['left', $i->moneda_u->Descripcion],
                ['left', number_format($i->montoInicio,2)],
                ['left', number_format($i->montoFin,2)], 
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE JERARQUÍAS COMPRA'
        ];

        return $data;
    }
}