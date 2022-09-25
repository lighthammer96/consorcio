<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 15/08/2017
 * Time: 12:24 PM
 */

namespace App\Http\Recopro\ReceptionTransfer;

use Carbon\Carbon;

trait ReceptionTransferTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['FECHA', 'USUARIO', 'ALMACÉN ORIGEN', 'ALMACÉN DESTINO', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];
        foreach ($info as $i) {
            $columns[] = [
                ['left', (($i->date != null) ? Carbon::parse($i->date)->format('d-m-Y') : '')],
                ['left', $i->user->name],
                ['left', ($i->warehouseOrigin) ? $i->warehouseOrigin->description : ''],
                ['left', ($i->warehouseDestination) ? $i->warehouseDestination->description : ''],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE RECEPCIÓN DE TRANSFERENCIA'
        ];

        return $data;
    }

    public function excelReceptionTransfer($receptionTransfer, $info)
    {
        $data = $info->find($receptionTransfer);
//        dd($data);
//        $columns[] = ['FECHA', 'USUARIO', 'ALMACÉN ORIGEN', 'ALMACÉN DESTINO', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];
        $columns[] = [
            [(($data->date != null) ? Carbon::parse($data->date)->format('d-m-Y') : '')],
            [$data->user->name],
            [($data->warehouseOrigin) ? $data->warehouseOrigin->description : ''],
            [($data->warehouseDestination) ? $data->warehouseDestination->description : ''],
            [$data->user_c->name],
            [(Carbon::parse($data->created_at)->format('d-m-Y'))],
            [$data->user_u->name],
            [(Carbon::parse($data->updated_at)->format('d-m-Y'))]
        ];
        $columns2 = [];

        foreach ($data->ReceptionTransferProduct as $bp) {
            $columns2[] = [
                [$bp->code],
                [$bp->description],
                [$bp->cost],
                [number_format($bp->received, 2, '.', '')],
                [number_format($bp->received * $bp->cost, 2, '.', '')],
            ];
        }

        $data = [
            'data' => $columns,
            'data_detail' => $columns2,
            'title' => 'LISTA DE RECEPCIÓN DE TRANSFERENCIA'
        ];

        return $data;
    }
}