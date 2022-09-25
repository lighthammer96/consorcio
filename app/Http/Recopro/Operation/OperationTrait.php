<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */
 
namespace App\Http\Recopro\Operation;

use Carbon\Carbon;

trait OperationTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['TIPO OPERACIÓN','NATURALEZA','ESTADO','USUARIOS','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="ACTIVO";
            if($i->estado=='I'){
                $estado='INACTIVO';
            };
            $users = [];
            foreach ($i->operacion_usuario  as $wu) {
                $users[] = $wu->user_p->name;
            }
            $users = implode(', ', $users);
            $columns[] = [
                ['left', $i->descripcion],
                ['left', $i->naturaleza->descripcion],
                ['left', $estado],
                ['left', $users],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE OPERACIONES'
        ];

        return $data;
    }
}