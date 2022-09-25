<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:25 AM
 */

namespace App\Http\Recopro\Entity;

use Carbon\Carbon;

trait EntityTrait
{
    public function generateDataExcel($info)
    {
        ini_set('max_execution_time', 6000);
        
        $columns[] = ['DOCUMENTO', 'NOMBRE / RAZÓN SOCIAL', 'DIRECCIÓN LEGAL', 'TIPO DOCUMENTO DE IDENTIDAD',
            'TIPO DE PERSONA', 'CLIENTE', 'PROVEEDOR', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->Documento],
                ['left', $i->NombreEntidad],
                ['left', $i->DireccionLegal],
                ['left', $i->typeDocumentIdentity->Descripcion],
                ['left', $i->typePerson->Descripcion],
                ['left', (($i->is_client == 1) ? 'Si' : 'No')],
                ['left', (($i->is_provider == 1) ? 'Si' : 'No')],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE ENTIDADES'
        ];

        return $data;
    }
}