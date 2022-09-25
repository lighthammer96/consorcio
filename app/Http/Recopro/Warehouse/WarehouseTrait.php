<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 10:35 AM
 */

namespace App\Http\Recopro\Warehouse;

use Carbon\Carbon;

trait WarehouseTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['ALMACÉN', 'CÓDIGO INTERNO', 'TIPO', 'DIRECCIÓN','TIENDA','LOCALIZACIONES',
            'LOCAL FISICO', 'ESTADO', 'USUARIOS',
            'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];
        foreach ($info as $i) {
            $users = [];
            foreach ($i->warehouseUser  as $wu) {
                $users[] = $wu->user->name;
            }
            $users = implode(', ', $users);
            $local = [];
            foreach ($i->ware_Localizacion  as $wu) {
                $local[] = $wu->descripcion;
            }
            $local = implode(', ', $local);
            $columns[] = [
                ['left', $i->description],
                ['left', $i->code_internal],
                ['left', (($i->type_id == 1) ? 'Consumo' : 'Venta')],
                ['left', $i->address],
                ['left', $i->Shop_u->descripcion],
                ['left', $local],
                ['left', (($i->physical_location == 0)?'Inactivo':'Activo')],
                ['left', (($i->state == 0)?'Inactivo':'Activo')],
                ['left', $users],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE ALMACENES'
        ];

        return $data;
    }
}