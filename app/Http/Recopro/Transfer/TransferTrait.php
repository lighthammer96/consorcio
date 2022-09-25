<?php
/**
 * Created by PhpStorm.
 * User: ever-pc
 * Date: 17/08/2017
 * Time: 07:34 PM
 */

namespace App\Http\Recopro\Transfer;

use Carbon\Carbon;


trait TransferTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['FECHA', 'USUARIO', 'ALMACÉN ORIGEN', 'ALMACÉN DESTINO', 'ESTADO', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];
        foreach ($info as $i) {
            $columns[] = [
                ['left', (($i->transfer_date != null) ? Carbon::parse($i->transfer_date)->format('d-m-Y') : '')],
                ['left', $i->user->name],
                ['left', ($i->warehouseOrigin) ? $i->warehouseOrigin->description : ''],
                ['left', ($i->warehouseDestination) ? $i->warehouseDestination->description : ''],
                ['left', $i->state_description],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE TRANSFERENCIAS'
        ];

        return $data;
    }
}