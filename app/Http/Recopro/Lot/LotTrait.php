<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Lot;

use Carbon\Carbon;

trait LotTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['LOTE','ARTÍCULO','CANTIDAD','FECHA DE INGRESO','FECHA VENCIMIENTO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="ACTIVO";
            if($i->estado=='I'){
                $estado='INACTIVO';
            };
            $columns[] = [
                ['left', $i->Lote],
                ['left',$i->Product_d->description_detail],
                ['left',$i->cantidad],
                ['left',$i->fechaIngreso],
                ['left',$i->fechaVencimiento],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE LOTES'
        ];

        return $data;
    }
}