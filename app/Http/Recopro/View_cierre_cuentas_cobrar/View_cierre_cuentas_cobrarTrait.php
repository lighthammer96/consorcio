<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\View_cierre_cuentas_cobrar;

use Carbon\Carbon;

trait View_cierre_cuentas_cobrarTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['PERIODO','ESTADO'];

        foreach ($info as $i) {
            $estado="CERRADO";
            if($i->estado=='P'){
                $estado='PRE-CERRADO';
            };
            $columns[] = [
                ['left', $i->periodo],
                ['left', $estado],
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE CIERRE DE INVENTARIO'
        ];

        return $data;
    }
}