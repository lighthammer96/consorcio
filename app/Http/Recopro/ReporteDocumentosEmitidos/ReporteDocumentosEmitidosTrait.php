<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\ReporteDocumentosEmitidos;

trait ReporteDocumentosEmitidosTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['TIPODOC','TIPO DOCUMENTO','DOCUMENTO','FECHA EMISION','NUMERO DOC','CLIENTE','MONEDA','TOTAL', 'SOLARIZADO', 'GLOSA', 'ANULADO', 'ESTADO SUNAT', 'TIPO DOC REF', 'DOCUMENTO REF', 'FECHA EMISION REF'];

        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->TipoDoc],
                ['left', $i->TipoDocumento],
                ['left', $i->Documento],
                ['left', $i->FechaEmision],
                ['left', $i->NumeroDoc],
                ['left', $i->Cliente],
                ['left', $i->Moneda],
                ['left', $i->Total],
                ['left', $i->Solarizado],
                ['left', $i->Glosa],
                ['left', $i->Anulado],
                ['left', $i->EstadoSunat],
                ['left', $i->TipoDocRef],
                ['left', $i->DocumentoRef],
                ['left', $i->FechaEmisionRef]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DOCUMENTOS EMITIDOS'
        ];

        return $data;
    }
}
