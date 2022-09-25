<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 01/08/2017
 * Time: 12:24 PM
 */

namespace App\Http\Recopro\ReferralGuide;

use Carbon\Carbon;

trait ReferralGuideTrait
{
    public function excelReferralGuide($info)
    {
//        $columns[] = ['PROVEEDOR', 'RUC', 'ALMACÉN ORIGEN', 'ALMACÉN DESTINO'];

        $columns[] = [
            [$info->entity->NombreEntidad],
            [$info->entity->Documento],
            [$info->warehouse_origin->description],
            [$info->warehouse_destination->description],
            [$info->serial . " - " . $info->number],
            [$info->transport_company->Documento],
            [$info->transport_company->NombreEntidad],
            [$info->license_plate],
            [$info->license],
        ];

        $columns2[] = ['CÓDIGO', 'DESCRIPCIÓN', 'COSTO', 'CANTIDAD', 'IMPORTE'];

        foreach ($info->ReferralGuideProduct as $bp) {
            $columns2[] = [
                [$bp->code],
                [$bp->description],
                [$bp->cost],
                [number_format($bp->quantity, 2, '.', '')],
                [number_format($bp->quantity * $bp->cost, 2, '.', '')],
            ];
        }

        $data = [
            'data' => $columns,
            'data_detail' => $columns2,
            'title' => 'GUÍA DE REMISIÓN'
        ];

        return $data;
    }

    public function generateDataExcel($info)
    {
        $columns[] = ['CÓDIGO', 'N° GUIA', 'FECHA EMISIÓN', 'MOTIVO', 'DESCRIPCIÓN PROYECTO', 'PROVEEDOR', 'TRANSPORTISTA', 'ORIGEN', 'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];
        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->code_guide],
                ['left', $i->serial . " - " . $i->number],
                ['left', (($i->date != null) ? Carbon::parse($i->date)->format('d-m-Y') : '')],
                ['left', $i->motive->description],
                ['left', ($i->project) ? $i->project->description : ''],
                ['left', $i->entity->NombreEntidad],
                ['left', $i->transport_company->NombreEntidad],
                ['left', $i->origin_guide],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE GUIAS DE REMISIÓN'
        ];

        return $data;
    }
}