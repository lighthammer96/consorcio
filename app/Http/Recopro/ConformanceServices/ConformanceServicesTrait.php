<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 07/09/2018
 * Time: 04:48 PM
 */

namespace App\Http\Recopro\ConformanceServices;


use Carbon\Carbon;

trait ConformanceServicesTrait
{
    public function generateDataExcelCS($info)
    {
        $columns[] = ['O/C', 'NUMERO CONFORMIDAD', 'FECHA RECEPCION', 'USUARIO', 'ESTADO'];

        foreach ($info as $d) {
            $number_oc = $d->purchaseOrder->number_oc;
            $date = Carbon::parse($d->date)->format('d/m/Y');
            $state = ($d->state == 0) ? 'GUARDADO' : 'PROCESADO';

            $columns[] = [
                ['center', $number_oc],
                ['center', $d->code],
                ['center', $date],
                ['left', $d->user_c->name],
                ['left', $state]
            ];
        }
        $data = [
            'data' => $columns,
            'title' => 'CONFORMIDAD DE SERVICIOS'
        ];
        return $data;
    }

    public function parseDataCS($attributes)
    {
        $attributes['state_associated'] = (isset($attributes['state_associated'])) ? $attributes['state_associated'] : 0;
        return $attributes;
    }
}