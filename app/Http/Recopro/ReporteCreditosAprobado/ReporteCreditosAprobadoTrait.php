<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\ReporteCreditosAprobado;

use Carbon\Carbon;

trait ReporteCreditosAprobadoTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['SOLICITUD', 'FECHA SOL', 'TIPO SOL', 'CONVENIO', 'CLIENTE', 'TIPO CLIENTE', 'FECHA DOC', 'SERIE',
            'NUMERO', 'MONEDA', 'PRECIO LISTA', 'INTERES', 'N° CUOTAS', 'INICIAL', 'CUOTA', 'TOTAL FINANCIADO', 'CRÉDITO',
            'FINANCIADO'];

        foreach ($info as $i) {
            $type_sol = $i->tipo_solicitud;
            $type_sol_ = ($type_sol == 1) ? 'Contado' : 'Ninguno';
            $type_sol_ = ($type_sol == 2) ? 'Crédito Directo' : $type_sol_;
            $type_sol_ = ($type_sol == 3) ? 'Crédito Financiero' : $type_sol_;
            $type_sol_ = ($type_sol == 4) ? 'Crédito' : $type_sol_;
            $columns[] = [
                ['left', $i->cCodConsecutivo . '-' . $i->nConsecutivo],
                ['center', (Carbon::parse($i->fecha_solicitud)->format('d-m-Y'))],
                ['left', $type_sol_],
                ['left', $i->convenio],
                // ['left', $i->idvendedor],
                // ['left', $i->idcliente],
                ['left', $i->razonsocial_cliente],
                ['left', $i->tipocliente],
                ['center', (Carbon::parse($i->fecdoc)->format('d-m-Y'))],
                ['left', $i->serie_comprobante],
                ['left', $i->numero_comprobante],
                ['left', $i->moneda],
                ['left', $i->precio_lista],
                ['left', $i->intereses],
                ['left', $i->nro_cuotas],
                ['left', $i->inicial],
                ['left', $i->cuota],
                ['left', $i->total_financiado],
                ['left', $i->Credito],
                ['left', $i->financiado],
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE CRÉDITOS DE APROBADOS'
        ];

        return $data;
    }
}