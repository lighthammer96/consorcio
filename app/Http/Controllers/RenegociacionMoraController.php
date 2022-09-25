<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\CajaDiariaDetalle\CajaDiariaDetalleInterface;
use App\Http\Recopro\CajaDiaria\CajaDiariaInterface;
use App\Http\Recopro\ConsecutivosComprobantes\ConsecutivosComprobantesInterface;
use App\Http\Recopro\Solicitud\SolicitudInterface;
// use App\Http\Recopro\RenegociacionMora\RenegociacionMoraInterface;
// use App\Http\Recopro\RenegociacionMora\RenegociacionMoraTrait;
// use App\Http\Requests\RenegociacionMoraRequest;
use App\Models\BaseModel;
use DB;
use Illuminate\Http\Request;
use Exception;
class RenegociacionMoraController extends Controller
{
    // use RenegociacionMoraTrait;

    public function __construct()
    {
        $this->base_model = new BaseModel();
//        $this->middleware('json');
    }

 



    public function guardar_renegociacion_mora(Request $request, SolicitudInterface $solicitud_repositorio)
    {

        $data = $request->all();

        $result = array();

        // print_r($data); exit;

        try {
            DB::beginTransaction();
            
            // echo  $solicitud_repositorio->get_consecutivo("ERP_SolicitudNegociaMora", "idsolicitudmora");
           
            $total_pagado_mora = 0;
            $total_saldo_mora = 0;
            $monto_total = 0;
            for ($i=0; $i < count($data["monto"]); $i++) { 
                if($data["monto"][$i] == "") {
                    // throw new Exception("El monto de la cuota: ".$data["nrocuota"][$i]." esta vacio!");
                    continue;
                }
                $detalle_mora = array();
               
                $detalle_mora["idsolicitudmora"] = $solicitud_repositorio->get_consecutivo_detalle("ERP_SolicitudNegociaMora", "idsolicitudmora");
                
                $detalle_mora["cCodConsecutivo"] = $data["cCodConsecutivo_credito"];
                $detalle_mora["nConsecutivo"] = $data["nConsecutivo_credito"];
                $detalle_mora["nrocuota"] = $data["nrocuota"][$i];
                $detalle_mora["fechareg"] = date("Y-m-d H:i:s");
                $detalle_mora["monto"] = $data["monto"][$i];
                $detalle_mora["motivo"] = $data["motivo"][$i];
              
                // print_r($this->preparar_datos("dbo.ERP_SolicitudNegociaMora", $detalle_mora));
                $result = $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudNegociaMora", $detalle_mora));
                // print_r($result);

                $saldo_mora = (float)$data["saldo_mora"][$i] - (float)$data["monto"][$i];
                $pagado_mora = (float)$data["monto"][$i];
                $saldo_cuota = (float)$data["saldo_cuota"][$i] - $pagado_mora;

                 //ACTUALIZAR MONTOS EN solicitud cronograma
                $update_montos_mora = array();
                $update_montos_mora["cCodConsecutivo"] = $data["cCodConsecutivo_credito"];
                $update_montos_mora["nConsecutivo"] = $data["nConsecutivo_credito"];
                $update_montos_mora["nrocuota"] = $data["nrocuota"][$i];
                $update_montos_mora["monto"] = $data["monto"][$i];
                $update_montos_mora["pagado_mora"] = round($pagado_mora, 2);
                $update_montos_mora["saldo_mora"] = round($saldo_mora, 2);
                $update_montos_mora["saldo_cuota"] = round($saldo_cuota, 2);
                $update_montos_mora["monto_pago"] = (float)$data["monto"][$i];
                $solicitud_repositorio->update_montos_mora($update_montos_mora);

        
                $total_pagado_mora += $pagado_mora;
                $total_saldo_mora += $saldo_mora;
                $monto_total += (float)$data["monto"][$i];

            }

            
            //ACTUALIZAR SALDOS EN SOLICITUD
            $update_solicitud = array();
            $update_solicitud["cCodConsecutivo"] = $data["cCodConsecutivo_credito"];
            $update_solicitud["nConsecutivo"] = $data["nConsecutivo_credito"];
            $update_solicitud["monto_pagar_credito"] = $monto_total;
            $update_solicitud["pagado_mora"] = $total_pagado_mora;
            $update_solicitud["saldo_mora"] = $total_saldo_mora;
            $solicitud_repositorio->update_saldos_solicitud($update_solicitud);

            $sql_update = "UPDATE ERP_Solicitud SET nomora = {$data["nomora"]}       
            WHERE cCodConsecutivo='{$data["cCodConsecutivo_credito"]}' AND nConsecutivo={$data["nConsecutivo_credito"]}";
            DB::statement($sql_update);
           


            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ei";
            $response["msg"]    = $e->getMessage();
            return response()->json($response);
        }
    }

    
}
