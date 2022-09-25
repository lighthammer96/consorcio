<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Compania;

use Carbon\Carbon;

trait CompaniaTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['RAZON SOCIAL','NOMBRE COMERCIAL','DIRECCION','RUC','TELÉFONO 1','TELÉFONO 2','TELÉFONO 3','TELÉFONO 4','CONTACTO','CORREO','BASE','RUTA DATA','RUTA LOG','FECHA ULT BACKUP','ESTADO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="ACTIVO";
            if($i->estado=='0'){
                $estado='INACTIVO';
            };
            $columns[] = [
                ['left', $i->RazonSocial],
                ['left', $i->NombreComercial],
                ['left', $i->Direccion],
                ['left', $i->Ruc],
                ['left', $i->Telefono1],
                ['left', $i->Telefono2],
                ['left', $i->Telefono3],
                ['left', $i->Telefono4],
                ['left', $i->Contacto],
                ['left', $i->Correo],
                ['left', $i->Base],
                ['left', $i->RutaData],
                ['left', $i->RutaLog],
                ['left', $i->FechaUltBackup],
                ['left', $estado],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE COMPANIAS'
        ];

        return $data;
    }
}