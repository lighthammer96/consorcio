<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\SolicitudCompra;

use Carbon\Carbon;

trait SolicitudCompraTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['CODIGO', 'CONSECUTIVO', 'FECHA REGISTRO', 'FECHA REQUERIDA ', 'AREA', 'USUARIO', 'OBSERVACIONES',
            'ESTADO'];

        foreach ($info as $i) {
            $area_ = ($i->area) ? $i->area->descripcion : '';
            $user_ = ($i->user) ? $i->user->name : '';
            $observations = (is_null($i->observaciones)) ? '' : $i->observaciones;
            $state = 'Registrado';
            if ($i->estado == 1) {
                $state = 'Aprobado';
            } elseif ($i->estado == 2) {
                $state = 'C/Orden de Compra';
            } elseif ($i->estado == 3) {
                $state = 'Cerrado';
            } elseif ($i->estado == 4) {
                $state = 'Cancelado';
            }
            $columns[] = [
                ['center', $i->cCodConsecutivo],
                ['center', $i->nConsecutivo],
                ['center', (Carbon::parse($i->fecha_registro)->format('d/m/Y'))],
                ['center', (Carbon::parse($i->fecha_requerida)->format('d/m/Y'))],
                ['left', $area_],
                ['left', $user_],
                ['left', $observations],
                ['left', $state]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE SOLICITUDES DE COMPRA'
        ];

        return $data;
    }
}