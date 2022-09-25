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
use App\Http\Recopro\Ventas\VentasInterface;
// use App\Http\Recopro\Refinanciamientos\RefinanciamientosInterface;
// use App\Http\Recopro\Refinanciamientos\RefinanciamientosTrait;
// use App\Http\Requests\RefinanciamientosRequest;
use App\Models\BaseModel;
use DB;
use Illuminate\Http\Request;
use Exception;
use App\Http\Recopro\Persona\PersonaInterface;

class RefinanciamientosController extends Controller
{
    // use RefinanciamientosTrait;

    public function __construct()
    {
        $this->base_model = new BaseModel();
//        $this->middleware('json');
    }

 



    public function generar_refinanciamiento(Request $request, SolicitudInterface $solicitud_repositorio, CajaDiariaDetalleInterface $caja_diaria_detalle_repo, VentasInterface $ventas_repo, CajaDiariaInterface $caja_diaria_repositorio, ConsecutivosComprobantesInterface $repoCC)
    {
        

        $data = $request->all();

        $result = array();

        // print_r($data); exit;

        try {
            DB::beginTransaction();
            $parametro_igv =  $solicitud_repositorio->get_parametro_igv();
            
            if(count($parametro_igv) <= 0) {
                throw new Exception("Por favor cree el parametro IGV!");
            }

            $comprobante_saldo = $caja_diaria_detalle_repo->get_segunda_venta_credito($data["cCodConsecutivo"], $data["nConsecutivo"]);


            $sql_solicitud = "SELECT * FROM ERP_Solicitud WHERE cCodConsecutivo='{$data["cCodConsecutivo"]}' AND nConsecutivo={$data["nConsecutivo"]}";
            $solicitud = DB::select($sql_solicitud);


            
            $t_monto_total = (float)$data["monto_refinanciamiento"] + (float)$data["intereses_refinanciamiento"];
            // print_r($data["monto_refinanciamiento"] ." ".  $data["intereses_refinanciamiento"]." ".$t_monto_total);
            $t_monto_exonerado = 0;
            $t_monto_afecto = 0;
            $t_impuestos = 0;
            if($solicitud[0]->t_impuestos > 0) {
                $porcentaje = 100 + $parametro_igv[0]->valor;
                $t_monto_subtotal = $t_monto_total * 100 / $porcentaje;
                $t_impuestos = $t_monto_total - $t_monto_subtotal;
                $t_monto_afecto = $t_monto_subtotal;
            } else {
                $t_monto_subtotal = $t_monto_total;
                $t_monto_exonerado = $t_monto_total;
            }

            if(count($comprobante_saldo) <= 0) {
                throw new Exception("No existe comprobante por el saldo!");
            }

           
         
            $sql_solicitud_articulo = "SELECT * FROM ERP_SolicitudArticulo WHERE cCodConsecutivo='{$data["cCodConsecutivo"]}' AND nConsecutivo={$data["nConsecutivo"]}";
            $solicitud_articulo = DB::select($sql_solicitud_articulo);


            

            $sql_solicitud_credito = "SELECT * FROM ERP_SolicitudCredito WHERE cCodConsecutivo='{$data["cCodConsecutivo"]}' AND nConsecutivo={$data["nConsecutivo"]}";
            $solicitud_credito = DB::select($sql_solicitud_credito);
           
            if(count($solicitud) > 0) {
                foreach ($solicitud as $ks => $vs) {
                    $data_solicitud = (array) $vs;
                    $data_solicitud["nConsecutivo"] = $solicitud_repositorio->get_consecutivo($data["cCodConsecutivo"]);
                    $data_solicitud["tipo"] = "R";
                    $data_solicitud["cCodConsecutivoO"] = $data["cCodConsecutivo"]; 
                    $data_solicitud["nConsecutivoO"] = $data["nConsecutivo"]; 
                    $data_solicitud["fecha_solicitud"] = $data["fecha_refinanciamiento"]." ".date("H:i:s");
                    $data_solicitud["t_monto_subtotal"] = $t_monto_subtotal; 
                    $data_solicitud["t_monto_exonerado"] = $t_monto_exonerado; 
                    $data_solicitud["t_monto_afecto"] = $t_monto_afecto; 
                    $data_solicitud["t_impuestos"] = $t_impuestos; 
                    $data_solicitud["t_monto_total"] = $t_monto_total; 
                    $data_solicitud["saldo"] = $t_monto_total; 
                    $data_solicitud["facturado"] = ""; 
                    $data_solicitud["pagado"] = ""; 

                    $data_solicitud["int_moratorio"] = "0"; 
                    $data_solicitud["pagado_mora"] = "0"; 
                    $data_solicitud["saldo_mora"] = "0"; 
                    // print_r($data_solicitud);
                    $this->base_model->insertar($this->preparar_datos("dbo.ERP_Solicitud", $data_solicitud));
                    $solicitud_repositorio->actualizar_correlativo($data_solicitud["cCodConsecutivo"], $data_solicitud["nConsecutivo"]);
                }
               
                if(count($comprobante_saldo) > 0 && $comprobante_saldo[0]->saldo > 0) {

                    //GENERAMOS UNA NOTA DE CREDITO POR EL SALDO 
                    $datos_nota = (array)$ventas_repo->find_documento($comprobante_saldo[0]->idventa)[0];
    
                    $datos_nota["monto"] = $comprobante_saldo[0]->saldo;
                    
                    $datos_nota["serie_comprobante"] = $data["serie_comprobante"];
                    $datos_nota["numero_comprobante"] = $data["numero_comprobante"];
                    // $datos_nota["condicion_pago"] =  $comprobante_saldo[0]->idcondicionpago;
                    $datos_nota["descripcion"] = "NOTA DE CREDITO APLICADA EN REFINANCIAMIENTO POR EL COMPROBANTE DEL SALDO";
                    $datos_nota["idmotivo"] = "01";
                    $datos_nota["cCodConsecutivo"] = $comprobante_saldo[0]->cCodConsecutivo_solicitud;
                    $datos_nota["nConsecutivo"]    = $comprobante_saldo[0]->nConsecutivo_solicitud;
                     
                    $res_nota = $this->emitir_nota($datos_nota, $caja_diaria_detalle_repo, $caja_diaria_repositorio, $ventas_repo, $repoCC, "R");
                    // print_r($res_nota); exit;
                  
                    // GENERAMOS UNA NUEVA BOLETA POR EL SALDO 
                    $data_venta = (array)$comprobante_saldo[0];
                    $data_venta["idventa"] = $caja_diaria_detalle_repo->get_consecutivo("ERP_Venta", "idventa");
                    $serie = $repoCC->obtener_consecutivo_comprobante($comprobante_saldo[0]->IdTipoDocumento,  $caja_diaria_detalle_repo->get_caja_tienda()[0]->idtienda);
                    
                    $data_venta["serie_comprobante"] = $serie[0]->serie;
                    $data_venta["fecha_emision"]             = $data["fecha_refinanciamiento"]." ".date("H:i:s");
                    $data_venta["numero_comprobante"] = $serie[0]->actual;
                    $data_venta["cCodConsecutivo_solicitud"] = $solicitud[0]->cCodConsecutivo;
                    $data_venta["nConsecutivo_solicitud"] = $data_solicitud["nConsecutivo"];
                    $data_venta["anticipo"] = 0;
                    $data_venta["t_monto_subtotal"] = $t_monto_subtotal;
                    $data_venta["t_monto_total"] = $t_monto_total;
                    $data_venta["t_monto_exonerado"] = $t_monto_exonerado;
                    $data_venta["t_monto_afecto"] = $t_monto_afecto;
                    $data_venta["t_impuestos"] = $t_impuestos;
                    $data_venta["pagado"] = "0";
                    $data_venta["saldo"] = $t_monto_total;

                        
                    $data_venta["condicion_pago"] =  $comprobante_saldo[0]->idcondicionpago;

                    // print_r($data_venta);

                    $result = $this->base_model->insertar($this->preparar_datos("dbo.ERP_Venta", $data_venta));
                    $result["idnota"] =  $res_nota["datos"][0]["idventa"];
                    $venta_detalle = $caja_diaria_detalle_repo->get_venta_detalle($comprobante_saldo[0]->idventa);

                    
                    // TOTALIZAMOS LOS PRECIOS TOTALES DEL DETALLA SOLICITUD ARTICULO
                    $suma_precio_total = 0;
                    for ($vd=0; $vd < count($venta_detalle); $vd++) { 
                        if($venta_detalle[$vd]->cOperGrat != "S") {
                            $suma_precio_total += (float)$venta_detalle[$vd]->precio_total;
                        }
                    }
    
                    foreach ($venta_detalle as $kvd => $vvd) {
                        $data_venta_detalle = (array) $vvd;
                        $data_venta_detalle["idventa"] =   $data_venta["idventa"];
                        $data_venta_detalle["consecutivo"] = $caja_diaria_detalle_repo->get_consecutivo("ERP_VentaDetalle", "consecutivo");

                        //PORRATEAMOS
                        $porcentaje = $vvd->precio_total / $suma_precio_total;
                        $subtotal = $t_monto_subtotal * $porcentaje;

                        $data_venta_detalle["precio_total"] = 0;
                        $data_venta_detalle["monto_descuento"] = 0;
                        $data_venta_detalle["monto_subtotal"] = 0;
                        $data_venta_detalle["impuestos"] = 0;
                        $data_venta_detalle["monto_afecto"] = 0;
                        $data_venta_detalle["monto_exonerado"] = 0;
                        $data_venta_detalle["monto_inafecto"] = 0;
                        $data_venta_detalle["monto_total"] = 0;

                        if($vvd->cOperGrat != "S") {
                            $data_venta_detalle["precio_unitario"] = round( $subtotal / $vvd->cantidad, 2);
                            $data_venta_detalle["precio_total"] = round($subtotal, 2);
                            $data_venta_detalle["monto_subtotal"] = round($subtotal, 2);


                            if($vvd->impuestos > 0) {
                                $igv = $parametro_igv[0]->value;
                                $data_venta_detalle["impuestos"] = $subtotal * $igv / 100;
                                $data_venta_detalle["monto_afecto"]  = $subtotal;
                            } else {
                                $data_venta_detalle["monto_exonerado"] = $subtotal;
                            }

                            $data_venta_detalle["monto_total"] = $data_venta_detalle["monto_exonerado"] + $data_venta_detalle["monto_afecto"] + $data_venta_detalle["impuestos"];
    

                        } else {
                            $data_venta_detalle["precio_unitario"] = round($vvd->precio_unitario, 2);
                        }
                        

                        $data_venta_detalle["nOperGratuita"] = 0;
                        if($vvd->cOperGrat == "S") {

                            $data_venta_detalle["nOperGratuita"] = round($subtotal, 2);
                        }

                        $data_venta_detalle["monto_descuento_prorrateado"] = 0;
                        // echo "data detalle nnueva boleta";
                        // print_r($data_venta_detalle);
                        // exit;
                        $this->base_model->insertar($this->preparar_datos("dbo.ERP_VentaDetalle", $data_venta_detalle));
                        
                    }
    
                    $repoCC->actualizar_correlativo($data_venta["serie_comprobante"], $data_venta["numero_comprobante"]);
    
                  
            
                }

    
            }
 
           
            if(count($solicitud_articulo) > 0) {
                foreach ($solicitud_articulo as $ksa => $vsa) {
                    $data_solicitud_articulo = (array) $vsa;
                    $data_solicitud_articulo["id"] = $solicitud_repositorio->get_consecutivo_detalle("ERP_SolicitudArticulo", "id");
                    $data_solicitud_articulo["cCodConsecutivo"] = $data_solicitud["cCodConsecutivo"];
                    $data_solicitud_articulo["nConsecutivo"] = $data_solicitud["nConsecutivo"];
    
                    $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudArticulo", $data_solicitud_articulo));

                    $sql_solicitud_detalle = "SELECT * FROM ERP_SolicitudDetalle WHERE cCodConsecutivo='{$data["cCodConsecutivo"]}' AND nConsecutivo={$data["nConsecutivo"]} AND id_solicitud_articulo={$vsa->id}";
                    $solicitud_detalle = DB::select($sql_solicitud_detalle);

                    if(count($solicitud_detalle) > 0) {
                        foreach ($solicitud_detalle as $ksd => $vsd) {
                            $data_solicitud_detalle = (array) $vsd;
                            $data_solicitud_detalle["id"] = $solicitud_repositorio->get_consecutivo_detalle("ERP_SolicitudDetalle", "id");
                            $data_solicitud_detalle["cCodConsecutivo"] = $data_solicitud["cCodConsecutivo"];
                            $data_solicitud_detalle["nConsecutivo"] = $data_solicitud["nConsecutivo"];
                            $data_solicitud_detalle["id_solicitud_articulo"] = $data_solicitud_articulo["id"];
            
                            $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudDetalle", $data_solicitud_detalle));
                        }
                    }
                }
            }
      
            
           

           
           

            if(count($solicitud_credito) > 0) {  
                foreach ($solicitud_credito as $ksc => $vsc) {
                    $data_solicitud_credito = (array) $vsc;
                    $data_solicitud_credito["cCodConsecutivo"] = $data_solicitud["cCodConsecutivo"];
                    $data_solicitud_credito["nConsecutivo"] = $data_solicitud["nConsecutivo"];
                    $data_solicitud_credito["cuota_inicial"] = 0;
                    $data_solicitud_credito["nro_cuotas"] = $data["nrocuotas_refinanciamiento"];
                    $data_solicitud_credito["monto_venta"] = $data["monto_refinanciamiento"];
                    $data_solicitud_credito["total_financiado"] = $data["monto_refinanciamiento"];
                    $data_solicitud_credito["valor_cuota"] = $data["valor_cuota_refinanciamiento"];
                    $data_solicitud_credito["intereses"] = $data["intereses_refinanciamiento"];
                    $data_solicitud_credito["valor_cuota_final"] = $data["valor_cuota_final_refinanciamiento"];
    
                    $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudCredito", $data_solicitud_credito));
                }
    
            }
            
            
            $fecha = $data["fecha_refinanciamiento"];
            $dia_vencimiento_cuota = $data["dia_vencimiento_cuota_refinanciamiento"];
            if(!empty($dia_vencimiento_cuota) && $dia_vencimiento_cuota > 0) {
                $arr_date = explode("-", $fecha);
                $dia = $dia_vencimiento_cuota;
                $mes = $arr_date[1] + 1;
                // if($dia < $arr_date[2]) {
                //     $mes = $arr_date[1] + 1;
                // }
                $anio = $arr_date[0];
                
            } 
            // $valor_cuota = (float) $data["monto_refinanciamiento"] / (int) $data["nrocuotas_refinanciamiento"];
            // $valor_cuota = round($valor_cuota, 2);
            for ($c=1; $c <= $data["nrocuotas_refinanciamiento"]; $c++) { 
                if(!empty($dia_vencimiento_cuota) && $dia_vencimiento_cuota > 0) {
                    if($mes > 12) {
                        $mes = 1;
                        $anio = $anio + 1;
                    }
                    
                    $fecha = $anio."-".$mes."-".$dia;
                    $dias_del_mes = date( 't', strtotime( $anio."-".$mes."-1" ) );
                 
                    if($dias_del_mes < $dia) {
                        $fecha = $anio."-".$mes."-".$dias_del_mes;
                    }
                    
                    $mes = $mes + 1;
                    
                } else {

                    $fecha = $this->sumar_restar_dias($fecha, "+", 30);
                }
                $data_cronograma = array();
                $data_cronograma["cCodConsecutivo"] = $data_solicitud["cCodConsecutivo"];
                $data_cronograma["nConsecutivo"] = $data_solicitud["nConsecutivo"];
                $data_cronograma["nrocuota"] = $c;
                $data_cronograma["fecha_vencimiento"] = $fecha;
                if( $t_monto_total > $data["valor_cuota_final_refinanciamiento"]) {

                    $data_cronograma["valor_cuota"] =  $data["valor_cuota_final_refinanciamiento"];
                    $data_cronograma["saldo_cuota"] =  $data["valor_cuota_final_refinanciamiento"];
                } else {
                    $data_cronograma["valor_cuota"] = $t_monto_total;
                    $data_cronograma["saldo_cuota"] =  $t_monto_total;
                }
                $data_cronograma["int_moratorio"] = "0";
              
                $data_cronograma["monto_pago"] = "0";
                // print_r($this->preparar_datos("dbo.ERP_SolicitudCronograma", $data_cronograma));
                $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudCronograma", $data_cronograma));
                $t_monto_total -= (float)$data["valor_cuota_final_refinanciamiento"];
                // print_r($res);   
            }


           

            //CAMBIAMOS LA solicitud origen a estado refinanciado
            $sql_update = "UPDATE ERP_Solicitud SET estado = 9       
            WHERE cCodConsecutivo='{$data["cCodConsecutivo"]}' AND nConsecutivo={$data["nConsecutivo"]}";
            // echo $sql_update;
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

    public function get_persona_documento($id, PersonaInterface $repo)
    {
        try {
            $data = $repo->get_persona_documento($id);
            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    } 

    
    public function get_caja_tienda(CajaDiariaDetalleInterface $repo) {
        $result = $repo->get_caja_tienda();
        return response()->json($result);

    }

    public function obtener_consecutivo_comprobante(ConsecutivosComprobantesInterface $repo, Request $request, CajaDiariaDetalleInterface $caja_repo) {

        $data = $request->all();
        $caja_diaria = $caja_repo->get_caja_tienda();
        $consecutivo_comprobante = $repo->obtener_consecutivo_comprobante($data["tipo_documento"], $caja_diaria[0]->idtienda);

        return response()->json($consecutivo_comprobante);
    }
}
