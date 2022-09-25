<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\CuentasBancarias; 

use Carbon\Carbon;

trait CuentasBancariasTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = [ 'BANCO', 'MONEDA','NÚMERO CUENTA','DESCRIPCIÓN', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $columns[] = [
                // ['left', $i->codigo_formapago],
             
                ['left', $i->banco_d->descripcion],
                ['left', $i->currency_cuenta->Descripcion],
                ['left', $i->numero_cuenta],
                ['left', $i->descripcion_cuenta],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE CUENTAS BANCARIAS'
        ];

        return $data;
    }
}