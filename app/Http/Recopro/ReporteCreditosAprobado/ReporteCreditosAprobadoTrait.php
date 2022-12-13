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
        $columns[] = ['SOLICITUD','FECHA SOL','TIPO SOL', 'CONVENIO','CLIENTE','TIPO CLIENTE', 'FECHA DOC', 'SERIE','NUMERO','MONEDA','PRECIO LISTA','INTERES','N° CUOTAS','INICIAL','CUOTA','TOTAL FINANCIADO','CRÉDITO','FINANCIADO'];
        $tipo_solicitud = "";
        foreach ($info as $i) {
            switch($i->tipo_solicitud) {
                case 1:
                    $tipo_solicitud = "Contado";
                    break;
                case 2:
                    $tipo_solicitud = "Crédito Directo";
                    break;
                case 3:
                    $tipo_solicitud = "Crédito Financiero";
                    break;
                case 4:
                    $tipo_solicitud = "Crédito";
                    break;
                default:
                    $tipo_solicitud = "ninguno";
                    break;
            }
            $columns[] = [
                ['left', $i->cCodConsecutivo.'-'.$i->nConsecutivo],
                ['center', (Carbon::parse($i->fecha_solicitud)->format('d-m-Y'))],
                ['left', $tipo_solicitud],
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