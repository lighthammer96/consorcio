<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\ConfigJerarquia;

use Carbon\Carbon;

trait ConfigJerarquiaTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['TIENDA','TIPO SOLICITUD','FECHA INICIO','FECHA FIN','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $solicitud="CONTADO";
            if($i->nIdTipoSolicitud=='2'){
                $solicitud='CRÉDITO DIRECTO';
            }else if($i->nIdTipoSolicitud=='3'){
                 $solicitud='CRÉDITO FINANCIERO';
            };

            $columns[] = [
                ['left', $i->shop_u->descripcion],
                ['left', $solicitud],
                ['center', (Carbon::parse($i->dFecIni)->format('d-m-Y'))], 
                ['center', (Carbon::parse($i->dFecFin)->format('d-m-Y'))],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE JERARQUÍAS'
        ];

        return $data;
    }
}