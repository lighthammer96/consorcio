<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 09/06/2017
 * Time: 05:59 PM
 */

namespace App\Http\Recopro\Requirement;

use Carbon\Carbon;

trait RequirementTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['REQUERIMIENTO', 'FECHA DE REGISTRO', 'FECHA REQUERIDA', 'ID PROYECTO', 'PROYECTO',
            'ESTADO', 'ESTADO POR LINEA', 'SOLICITADO POR', 'AUTORIZADO POR', 'OBSERVACIONES',
            'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];
        foreach ($info as $i) {
            $columns[] = [
                ['center', $i->code],
                ['center', Carbon::parse($i->date_registration)->format('d-m-Y')],
                ['center', Carbon::parse($i->date_required)->format('d-m-Y')],
                ['center', $i->project->code],
                ['left', $i->project->description],
                ['left', $i->requirement_state->description],
                ['left', $i->requirement_state_line->description],
                ['left', $i->requested_by],
                ['left', (($i->approved) ? $i->approved->name : '')],
                ['left', $i->observation],
                ['left', $i->user_c->name],
                ['center', Carbon::parse($i->created_at)->format('d-m-Y')],
                ['left', $i->user_u->name],
                ['center', Carbon::parse($i->updated_at)->format('d-m-Y')]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE REQUERIMIENTOS'
        ];

        return $data;
    }
}