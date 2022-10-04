<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/12/2017
 * Time: 11:36 AM
 */

namespace App\Http\Recopro\ReporteComisiones;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

trait ReporteComisionesTrait
{
    public function generateDataExcel($info)
    {
        $columns[] = ['Cliente','Documento','FechaDoc', 'Número','Monto Docum.','T/C','Moneda','% Comisión','En Soles','Forma de Pago','Descripcion'];

        foreach ($info as $i) {
             
         
            $columns[] = [
              
                ['left', $i->Cliente],
                ['left', $i->Documento],
                ['left', $i->Numero],
                ['left', (Carbon::parse($i->FechaDoc)->format('d/m/Y'))],
                ['left', number_format($i->Monto, 2)],
                ['left', number_format($i->TipoCambio, 2)],
                ['left', $i->Moneda],
                ['left', $i->PorcComision],
                ['left', number_format($i->ComisionSoles, 2)],
                ['left', $i->CondPago],
                ['left', $i->Vehiculo],
              
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE COMISIONES'
        ];

        return $data;
    }
      public function generateDataExcel2($info)
    {
        $columns[] = ['FECHA','DOCUMENTO','DNI/RUC','CLIENTE','DIRECCIÓN','CELULAR','MOTOR','MODELO','NÚMERO DE SERIE','COLOR','INICIAL','PRECIO UNITARIO','PAGADO','SALDO','FORMA PAGO','MONEDA','TIPO DE CAMBIO','VENDEDOR'];

        foreach ($info as $i) {
             $fecha=(Carbon::parse($i->Fecha)->format('Y-m-d'));
             $destroy=DB::select("SET NOCOUNT ON; EXEC CO_Obtiene_TC_CV_Msj '0','2','$fecha','V'");
            $columns[] = [
                ['center', (Carbon::parse($i->Fecha)->format('d/m/Y'))],
                ['left', $i->Documento],
                ['left', $i->DocumentoCliente],
                ['left', $i->razonsocial_cliente],
                ['left', $i->Direccion],
                ['left', $i->celular],
                ['left', $i->Motor],
                ['left', $i->Modelo],
                ['left', $i->numero_serie],
                ['left', $i->Color],
                ['left', number_format($i->cuota_inicial,2)],
                ['left', number_format($i->precio_unitario,2)],
                ['left', number_format($i->pagado,2)],
                ['left', number_format($i->saldo,2)],
                ['left', $i->condicion_pago],
                ['left', $i->Moneda],
                ['left', number_format($destroy[0]->Mensaje, 4)],
                ['left', $i->usuario],
            ];
        }

        $data = [
            'data' => $columns,
            'title' => 'LISTA DE VENTAS'
        ];

        return $data;
    }
}