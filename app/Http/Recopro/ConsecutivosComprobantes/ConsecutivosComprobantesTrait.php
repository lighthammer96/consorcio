<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\ConsecutivosComprobantes;

use Carbon\Carbon;

trait ConsecutivosComprobantesTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['SERIE','TIPO DOCUMENTO', 'NUMERO', 'TIENDA', 'ACTUAL', 'ULTIMO', 'LONGITUD', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            // $usuarios=[];
            // foreach ($i->usuarios_det  as $wu) {
            //     $usuarios[] = $wu->user_comp->name;
            // }
            // $usuarios = implode(',', $usuarios);
            $columns[] = [
                ['left', $i->serie],
                ['left', $i->tipo_documento->Descripcion],
                ['left', $i->numero],
                ['left', $i->tienda_d->descripcion],
                ['left', $i->actual],
                ['left', $i->ultimo],
                ['left', $i->longitud],
                // ['left', $usuarios],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE CONSECUTIVOS COMPROBANTES'
        ];

        return $data;
    }
}