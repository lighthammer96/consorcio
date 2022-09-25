<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Persona;

use Carbon\Carbon;

trait PersonaTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['TIPO PERSONA','TIPO DOCUMENTO','NRO DOCUMENTO','NOMBRE','RAZON SOCIAL','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->tipo_per->cDescripcion],
                ['left', $i->tipo_u->cDescripcion],
                ['left', $i->cNumerodocumento],
                ['left', $i->cNombrePersona],
                ['left', $i->cRazonsocial],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE CATEGORÍAS'
        ];

        return $data;
    }
}