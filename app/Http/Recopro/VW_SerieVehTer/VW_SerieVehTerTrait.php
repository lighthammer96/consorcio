<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\VW_SerieVehTer;

use Carbon\Carbon;

trait VW_SerieVehTerTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['ID','COD. ARTÍCULO','ARTÍCULO','CATEGORÍA','UNID','ALM','LOC','LOTE','SERIE','DISPONIBLE','REMITIDO','TRÁNSITO','S.TOTAL','COSTO','COSTO TOTAL'];
        $cont=0;
        foreach ($info as $i) {
            $cont=$cont+ $i->Costo_Total;
            $columns[] = [
                ['left', $i->id,''],
                ['left', $i->code_article,''],
                ['left', $i->Articulo,''],
                ['left', $i->Categoria,''],
                ['left', $i->Unidad,''],
                ['left', $i->Almacen,''],
                ['left', $i->Localizacion,''],
                ['left', $i->Lote,''],
                ['left', $i->Serie,''],
                ['left', $i->Disponible,''],
                ['left', $i->Remitido,''],
                ['left', $i->Transito,''],
                ['left', $i->Total,''],
                ['left', number_format($i->Costo_Promedio_Unitario,2) ,''],
                ['left', number_format($i->Costo_Total,2) ,''],
               
            ];
        }
        $columns[] = [
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','',''],
                ['left','Total costo inventario ','bold'],
                ['left',number_format($cont,2),'bold'],
               
            ];

        $data = [
            'data' => $columns,
            'title' => $info[0]->Perido,
        ];

        return $data;
    }
}