<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Serie;

use Carbon\Carbon;

trait SerieTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['SERIE','PLACA','ARTÍCULO','CHASIS','MOTOR','COLOR','AÑO DE FABRICACIÓN','AÑO DEL MODELO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $columns[] = [
                ['left',$i->nombreSerie],
                ['left',$i->cPlacaVeh],
                ['left',$i->Product_d->description_detail],
                ['left',$i->chasis],
                ['left',$i->motor],
                ['left',$i->color],
                ['left',$i->anio_fabricacion],
                ['left',$i->anio_modelo],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE SERIES'
        ];

        return $data;
    }
}