<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\GuiaRemision;

use Carbon\Carbon;

trait GuiaRemisionTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['CÓDIGO','N°','PUNTO PARTIDA','FECHA EMISIÓN','FECHA INICIO TRASLADO','COSTO MÍNIMO','PUNTO LLEGADA','RAZON SOCIAL DESTINATARIO','RUC DESTINATARIO','MARCA','PLACA','N° CONSTANCIA','N° LICENCIA DE CONDUCTOR','RAZON SOCIAL EMPRESA DE TRASPORTE','RUC EMPRESA DE TRANSPORTE','MOTIVO DE TRASLADO','ESTADO','U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $estado="EMITIDO";
            if($i->estado==1){
                $estado='PROCESADO';
            }else if($i->estado==2){
               $estado='ANULADO'; 
            };
            $columns[] = [
                
                ['left', $i->cCodConsecutivo],
                ['left', $i->nConsecutivo],
                ['left', $i->puntoPartida],
                ['left',  (Carbon::parse($i->fechaEmision)->format('d-m-Y'))],
                ['left', (Carbon::parse($i->fechaInicioTraslado)->format('d-m-Y')) ],
                ['left', $i->costoMini],
                ['left', $i->puntoLlega],
                ['left', $i->razonSocialDestinatario],
                ['left', $i->rucDestinatario],
                ['left', $i->marca],
                ['left', $i->placa],
                ['left', $i->nroConstanciaInscripcion],
                ['left', $i->nroLicenciaConductor],
                ['left', $i->razonSocialEtransporte],
                ['left', $i->rucEtransporte],
                ['left', $i->idtraslado],
                ['left', $estado],
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