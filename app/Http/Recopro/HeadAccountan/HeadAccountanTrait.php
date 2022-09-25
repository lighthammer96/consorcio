<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\HeadAccountan;

use Carbon\Carbon;

trait HeadAccountanTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['GRUPO CONTABLE ','OPERACIONES','CUENTAS','CENTROS COSTOS','ESTADO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="ACTIVO";
            if($i->estado=='I'){
                $estado='INACTIVO';
            };
            $cuenta = [];
            $coste = [];
            $operacion=[];
            foreach ($i->headDeta  as $wu) {
                $cuenta[] = $wu->cuenta;
                $coste[] = $wu->centrocosto;
                $operacion[] = $wu->operacion_u->descripcion;
            }
            $cuenta = implode(', ', $cuenta);
            $coste = implode(', ', $coste);
            $operacion = implode(', ', $operacion);

            $columns[] = [
                ['left', $i->descripcion],
                ['left', $operacion],
                ['left', $cuenta],
                ['left', $coste],
                ['left', $estado],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'GRUPO CONTABLE '
        ];

        return $data;
    }
}