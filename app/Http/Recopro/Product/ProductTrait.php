<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 12:17 PM
 */

namespace App\Http\Recopro\Product;

use Carbon\Carbon;

trait ProductTrait
{
    public function generateDataExcel($info)
    {
        ini_set('max_execution_time', 6000);

        $columns[] = ['CÓDIGO','CÓDIGO MATRIZ','DESCRIPCION', 'DESCRIPCION DETALLADA', 'ESTADO','COLOR','SERIE', 'LOTE','DISPONIBLE','IMPUESTO','TIPO','MARCA','MODELO','CATEGORÍA','FAMILIA','SUB FAMILIA','GRUPO CONTABLE',
            'U.CREADO', 'F.CREADO', 'U.MODIFICADO', 'F.MODIFICADO'];

        foreach ($info as $i) {
            $var="";
            $var2=" ";
            if(!empty($i->subfamilia->descripcion)){
                $var=$i->subfamilia->descripcion;
            }
            if(!empty($i->modelo->descripcion)){
                $var2=$i->modelo->descripcion;
            }
            $columns[] = [
                ['left',$i->code_article],
                ['left', $i->code_matrix],
                ['left', $i->description],
                ['left', $i->description_detail],
                ['left', (($i->state == 0) ? 'Inactivo' : 'Activo')],
                ['left', $i->color],
                ['left', (($i->serie == 0) ? 'No' : 'Si')],
                ['left', (($i->lote == 0) ? 'No' : 'Si')],
                ['left', (($i->disponible_venta == 0) ? 'No' : 'Si')],
                ['left', (($i->impuesto == 0) ? 'No' : 'Si')],
                ['left', $i->type->description],
                ['left', $i->marca->description],
                ['left', $var2],
                ['left', $i->categoria->descripcion],
                ['left', $i->familia->descripcion],
                ['left', $var],
                ['left', $i->grupoContable->descripcion],
               
                ['left', $i->user_c->name],
                ['center', (Carbon::parse($i->created_at)->format('d-m-Y'))],
                ['left', $i->user_u->name],
                ['center', (Carbon::parse($i->updated_at)->format('d-m-Y'))]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE ARTICULOS'
        ];

        return $data;
    }
}