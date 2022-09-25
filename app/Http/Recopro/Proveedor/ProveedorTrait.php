<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Proveedor;

use Carbon\Carbon;

trait ProveedorTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['TIPO DOCUMENTO','DOCUMENTO','TIPO PROVEEDOR','TIPO DOCUMENTO VENTA','RAZON SOCIAL', 'CONTACTO', 'DIRECCION', 'CORREO ELECTRÓNICO','CELULAR','TELÉFONO','DISTRITO','IMPUESTO','CONGELADO','ACTIVO','U.CREADO','F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $doc_venta='';
           if(!empty($i->tipo_doc_vent->Descripcion)){
             $doc_venta=$i->tipo_doc_vent->Descripcion;
           };
           $in='NO';
           $co='NO';
           $ac='NO';
           if($i->impuesto=='S'){
            $in='SI';
           };
           if($i->activo=='S'){
            $co='SI';
           };
           if($i->congelado=='S'){
            $ac='SI';
           };
            $columns[] = [
                ['left', $i->tipo_u->cDescripcion],
                ['left', $i->documento],
                ['left', $i->tipo_c->descripcion],
                ['left', $doc_venta],
                ['left', $i->razonsocial],
                ['left', $i->contacto],
                ['left', $i->direccion],
                ['left', $i->correo_electronico],
                ['left', $i->celular],
                ['left', $i->telefono],
                ['left', $i->ubigeo_u->cDistrito],
                  ['left', $in],
                    ['left', $co],
                      ['left', $ac],
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->dFecCre)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->dFecMod)->format('d-m-Y'))]
                
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE PROVEEDORES'
        ];

        return $data;
    }
}