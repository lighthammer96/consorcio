<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\Query_movements;

use Carbon\Carbon;

trait Query_movementsTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['fecha_proceso_s','fecha_registro_s','Articulo','Unidad','Categoria','Tipo_Operacion','Naturaleza','Origen','idOrigen','Almacen','Localizacion','Cantidad','Costo_Unitario','Precio_Unitario','Costo_Total','Precio_Total','Lote','Serie'];

        foreach ($info as $i) {
            $columns[] = [
                ['center', $i->fecha_proceso_s],
                ['center', $i->fecha_registro_s],
                ['left', $i->Articulo],
                ['left', $i->Unidad],
                ['left', $i->Categoria],
                ['left', $i->Tipo_Operacion],
                ['left', $i->Naturaleza],
                ['left', $i->Origen],
                ['left', $i->idOrigen],
                ['left', $i->Almacen],
                ['left', $i->Localizacion],
                ['right', $i->Cantidad],
                ['right', $i->Costo_Unitario],
                ['right', $i->Precio_Unitario],
                ['right',number_format($i->Costo_Total,2)],
                ['right',number_format($i->Precio_Total,2)],
                ['left', $i->Lote],
                ['left', $i->Serie]
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE MOVIMIENTOS DE ARTICULOS'
        ];

        return $data;
    }
}