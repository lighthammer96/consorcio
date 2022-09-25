<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\ReporteOrdenDiario;

use Carbon\Carbon;

trait ReporteOrdenDiarioTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['FECHA','CÓDIGO','SERVICIOS', 'KM', 'FACT MANO DE OBRA', 'FACT REPUESTOS Y ACEITES','CHASIS','2W/3W','MODELO VEHÍCULO','AÑO DEL VEHÍCULO','PLACA VEHÍCULO','NOMBRE CLIENTE','TELÉFONO','CELULAR','CORREO','DIRECCIÓN'];

        // $params =  ['servicios', 'dFecRec','cCodConsecutivo','nConsecutivo','codigo_consecutivo','nKilometraje','odMo','pro_totaSer','pro_totalRepu','modelo_serie','marca_serie','idMarca_serie','modelo_vet','idMarca_vet','marca_vet','id_tipoveh','descripcion','cChasis','iAnioFab','cPlacaVeh','razonsocial_cliente','celular','telefono','correo_electronico','direccion'];
        foreach ($info as $i) {
            $maprf=$i->pro_totaSer;
            if( $maprf==null){
                $maprf=0;
            };
            $man=floatval($maprf)+floatval($i->odMo);
            $modelo=$i->modelo_serie;
            if($modelo==null){
                $modelo=$i->modelo_vet;
            };
            $varmo=$i->Simbolo." ".number_format($man,2);
            $varrep=$i->Simbolo." ".number_format($i->pro_totalRepu,2);
            $columns[] = [
                 ['left', $i->dFecRec],
                
                 ['left', $i->codigo_consecutivo],

                 ['left', $i->servicios],

                  ['left', $i->nKilometraje],
                
                  ['left', $varmo],
                
                  ['left', $varrep],
                
                  ['left', $i->cChasis],
                
                  ['left', $i->descripcion],
                
                  ['left', $modelo],
                
                  ['left', $i->iAnioFab],
                
                  ['left', $i->cPlacaVeh],
                
                  ['left', $i->razonsocial_cliente],

                  ['left', $i->telefono],

                  ['left', $i->celular],

                  ['left', $i->correo_electronico],

                  ['left', $i->direccion],
                
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE ORDENES DE SERVICIO'
        ];

        return $data;
    }
}