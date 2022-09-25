<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\TipoProveedor;

use Carbon\Carbon;

trait TipoProveedorTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['TIPO PROVEEDOR','CUENTA POR PAGAR','CENTRO COSTO POR PAGAR','CUENTA DE CIERRE DEBITO','CENTRO COSTO CIERE DEBITO','CUENTA DE CIERRE CRÉDITO','CENTRO COSTO CIERRE CRÉDITO','ESTADO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="ACTIVO";
            if($i->estado=='I'){
                $estado='INACTIVO';
            };
            $columns[] = [
                ['left', $i->descripcion],
                ['left', $i->cuentaPagar],
                 ['left', $i->cCostoCuentaPagar],
                ['left', $i->cuentaCierreDevito],
                 ['left', $i->cCostoCuentaCieDev],
                ['left', $i->cuentaCierreCredito],
                 ['left', $i->cCostoCuentaCieCre],
                ['left', $estado],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE TIPOS DE PROVEEDORES'
        ];

        return $data;
    }
}