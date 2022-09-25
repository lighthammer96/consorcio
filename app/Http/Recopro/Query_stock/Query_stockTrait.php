<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Query_stock;

use Carbon\Carbon;

trait Query_stockTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['Cod. Artículo','Articulo','Categoria','Unidad','Almacen','Localizacion','Lote','Serie','Tipo Compra Venta','Disponible','Remitido','Total','Transito','Costo_Promedio_Unitario','Costo_Total', 'Chasis', 'Motor', 'Color', 'Año'];

        foreach ($info as $i) {
            $columns[] = [
                ['left', $i->code_article],
                ['left', $i->Articulo],
                ['left', $i->Categoria],
                ['left', $i->Unidad],
                ['left', $i->Almacen],
                ['left', $i->Localizacion],
                ['left', $i->Lote],
                ['left', $i->Serie],
                ['left', $i->tipoCompraVenta],
                ['right', $i->Disponible],
                ['right', $i->Remitido],
                ['right', $i->Total],
                ['right', $i->Transito],
                ['right', number_format($i->Costo_Promedio_Unitario,2)],
                ['right', number_format($i->Costo_Total,2)],
                ['right', $i->Chasis],
                ['right', $i->Motor],
                ['right', $i->Color],
                ['right', $i->Ano]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE ARTICULOS CON STOCK'
        ];

        return $data;
    }
}