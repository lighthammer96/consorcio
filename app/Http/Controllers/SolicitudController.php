<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\CajaDiariaDetalle\CajaDiariaDetalle;
use App\Http\Recopro\CajaDiariaDetalle\CajaDiariaDetalleInterface;
use App\Http\Recopro\Customer\CustomerInterface;
use App\Http\Recopro\Orden_servicio\Orden_servicioInterface;
use App\Http\Recopro\Persona\PersonaInterface;
use App\Http\Recopro\Solicitud\SolicitudInterface;
use App\Http\Recopro\Solicitud\SolicitudRepository;
use App\Http\Recopro\Solicitud\SolicitudTrait;
use App\Http\Recopro\SolicitudCredito\SolicitudCreditoInterface;
use App\Http\Recopro\Ventas\VentasInterface;
use App\Http\Recopro\Ventas\VentasRepository;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use App\Http\Requests\SolicitudRequest;
use App\Models\BaseModel;
use DateTime;
use Exception;
use PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SolicitudController extends Controller
{
    use SolicitudTrait;

    public function __construct()
    {
//        $this->middleware('json');
        $this->base_model = new BaseModel();
    }

    public function all(Request $request, SolicitudInterface $repo)
    {
        // $dias_del_mes = date( 't', strtotime( "2022-10-1" ) );

        // echo $dias_del_mes;
        // $date1 = new DateTime("2015-02-14");
        // $date2 = new DateTime("2015-02-10");
        // $diff = $date1->diff($date2);
        // print_r($diff->days);
        // exit;
        $s = $request->input('search', '');
        $params = ['cCodConsecutivo', 'nConsecutivo', 'fecha_solicitud', 'tipo_solicitud', 'idconvenio', 'tipo_documento', 'numero_documento', 'moneda', 't_monto_total', 'pagado', 'saldo', 'facturado', 'estado', 'cliente'];
        // print_r($s); exit;
        return parseList($repo->search($s), $request, 'cCodConsecutivo', $params);
    }
    
    public function list_ventas(Request $request, SolicitudInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['cCodConsecutivo', 'nConsecutivo', 'fecha_solicitud', 'tipo_solicitud', 'idconvenio', 'tipo_documento', 'numero_documento', 'cliente', 'moneda', 't_monto_total', 'pagado', 'saldo', 'facturado', 'estado'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search_ventas($s), $request, 'cCodConsecutivo', $params);
    }


    public function list_solicitudes_refinanciamiento(Request $request, SolicitudCreditoInterface $repo_credito)
    {
        $s = $request->input('search', '');
        $params = ['cCodConsecutivo', 'nConsecutivo', 'fecha_solicitud', 'tipo_solicitud', 'idconvenio', 'tipo_documento', 'numero_documento', 'cliente', 'moneda', 't_monto_total', 'pagado', 'saldo', 'facturado', 'estado'];
        // print_r($repo->search($s)); exit;
        return parseList($repo_credito->search_refinanciamientos($s), $request, 'cCodConsecutivo', $params);
    }

    public function list_creditos(Request $request, SolicitudCreditoInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['cCodConsecutivo', 'nConsecutivo', 'fecha_solicitud', 'tipo_solicitud', 'idconvenio', 'tipo_documento', 'numero_documento', 'cliente', 'moneda', 't_monto_total', 'pagado', 'saldo', 'facturado', 'estado', 'cuota', 'documento', 'serie'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'cCodConsecutivo', $params);
    }

    public function create(SolicitudInterface $repo, SolicitudRequest $request)
    {
        $data = $request->all();
        // $data['cCodConsecutivo'] = $data['cCodConsecutivo'];
        // $data['nombre_caja'] = $data['convenio'];
        // print_r($data);
        
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);

        
    }

    public function guardar_solicitud(SolicitudInterface $repo, SolicitudRequest $request, VentasInterface $ventas_repo)
    {
        $data = $request->all();

        // print_r($data); exit;
        $response = array();

        try {
            DB::beginTransaction();

            
            $desc = explode("*", $data["descuento_id"]);
            $descuento_id = $desc[0];
            $data["descuento_id"] = $descuento_id;
            $data["IdTipoDocumento"] = $data["id_tipoDoc_Venta_or_solicitud"];

            // solo en estado regisstrado actualizara el saldo
            
            if($data["estado"] == "1" || $data["estado"] == "") { 
                //SALDOS
                $data["saldo"] = $data["t_monto_total"];
            }
            
        
            if($data["nConsecutivo"] == "") {
              
                
               
                $data["facturado"] = 0;
                $data["pagado"] = 0;
                $data["nConsecutivo"] = $repo->get_consecutivo($data["cCodConsecutivo"]);
                $data["fecha_solicitud"] = date("Y-m-d H:i:s");
                $data["origen"] = "V";
                $data["estado"] = "1";
               

                // print_r($this->preparar_datos("dbo.ERP_Solicitud", $data));
                // exit;
               
                $result = $this->base_model->insertar($this->preparar_datos("dbo.ERP_Solicitud", $data));
                if($data["tipo_solicitud"] != "1") {

                    $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudCredito", $data));
                }
                $repo->actualizar_correlativo($data["cCodConsecutivo"], $data["nConsecutivo"]);
            } else {
                $result = $this->base_model->modificar($this->preparar_datos("dbo.ERP_Solicitud", $data));
                if($data["tipo_solicitud"] != "1") {
                    $this->base_model->modificar($this->preparar_datos("dbo.ERP_SolicitudCredito", $data));
                }
               
            }   

            
            

   
            $data_articulo = array();
            $data_detalle = array();
            
            if(count($data["idarticulo"]) > 0) {

               
                $data_articulo = $data;
                for ($i=0; $i < count($data["idarticulo"]); $i++) { 
                    if($i == 0) {

                        $data_articulo["id"][$i] = $repo->get_consecutivo_detalle("ERP_SolicitudArticulo", "id");
                    } else {
                        $data_articulo["id"][$i] = $data_articulo["id"][$i-1] + 1;
                    }

                    $data_articulo["nCantidadEntregada"][$i] = 0;
                    $data_articulo["nCantidadPendienteEntregar"][$i] = $data_articulo["cantidad"][$i];
                    $data_articulo["nCantidadDevuelta"][$i] = 0;
                    $data_articulo["nCantidadPendienteDevolver"][$i] = 0;

                   

                    if(isset($data["series_id"][$i]) && !empty($data["series_id"][$i])) {

                        $idSeries = explode(",", $data["series_id"][$i]);
                        $idarticulos = explode(",", $data["articulos_id"][$i]);
                     
                        if(count($idSeries) >  0) {
                            
                           
                            
                            $data_detalle = $data;
                          
                            for ($s=0; $s < count($idSeries); $s++) { 
                                if($s == 0) {
            
                                    $data_detalle["id"][$s] = $repo->get_consecutivo_detalle("ERP_SolicitudDetalle", "id");
                                } else {
                                    $data_detalle["id"][$s] = $data_detalle["id"][$s-1] + 1;
                                }
                                $data_detalle["idSerie"][$s] = $idSeries[$s];
                                $data_detalle["idarticulo"][$s] = $idarticulos[$s];
                                $data_detalle["id_solicitud_articulo"][$s] = $data_articulo["id"][$i];
                            }
                           
                            
                            // print_r($r);
                           
                        }
                       
                    }
                }
                if(count($data_detalle) > 0) {
                    DB::table("ERP_SolicitudDetalle")->where("cCodConsecutivo", $data["cCodConsecutivo"])->where("nConsecutivo",  $data["nConsecutivo"])->delete();
                  
                }
                
                if(count($data_articulo) > 0) {
                    DB::table("ERP_SolicitudArticulo")->where("cCodConsecutivo", $data["cCodConsecutivo"])->where("nConsecutivo",  $data["nConsecutivo"])->delete();
              

                    $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudArticulo", $data_articulo));
                }

                if(count($data_detalle) > 0) {
                   

                    $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudDetalle", $data_detalle));
                }
               
            }
          
            
            $result["separaciones"] = $ventas_repo->get_ventas_separacion($data["idcliente"]);

          
            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ei"; 
            $response["msg"] = $e->getMessage(); 
            return response()->json($response);
        }
        
       
    }
    public function update(SolicitudInterface $repo, SolicitudRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $cCodConsecutivo = $data['cCodConsecutivo'];
        // $data['nombre_caja'] = $data['convenio'];
        $repo->update($cCodConsecutivo, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(SolicitudInterface $repo, Request $request)
    {
        $cCodConsecutivo = $request->input('cCodConsecutivo');
        $repo->destroy($cCodConsecutivo);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(SolicitudInterface $repo)
    {
        return parseSelect($repo->all(), 'cCodConsecutivo', 'nombre_caja');
    }

    public function excel(SolicitudInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE Solicitud', 'Solicitud');
    }

    public function data_form (SolicitudInterface $Repo, Orden_servicioInterface $repo_orden, WarehouseInterface $WareRepo, VentasRepository $ventas_repositorio)
    {
        
        $codigo = $Repo->getcodigo();
        // $codigo_proforma = $Repo->getcodigo_proforma();
        $condicion_pago = $repo_orden->getcondicion_pago();
        // $tipo_servicio = $repo_orden->gettipo_servicio();
        $tipo_document = $repo_orden->gettipo_document();
        $tipo_document_venta=$repo_orden->gettipo_document_venta();
        $formas_pago=$Repo->get_formas_pago();
        // $revisiones = $repo_orden->getrevisiones();
        // $tecnico = $repo_orden->gettecnico();
        // $asesor = $repo_orden->getasesor();
        $moneda = $repo_orden->getmoneda();
        // $servicios = $repo_orden->get_servicios(); 
        // $tipoMantenimiento = $repo_orden->get_Tipomantenimientos(); 
        // $totales = $repo_orden->get_totales();
        $usuario=auth()->id();
        $descuentos=$repo_orden->get_descuentos($usuario);
        $almacen_usuario = $WareRepo->getAlmacen_usuario($usuario);
        $lotes = $Repo->obtener_lotes($usuario);
        $convenios = $Repo->obtener_convenios($usuario);
        $vendedores = $Repo->obtener_vendedores($usuario);
        $personas = $Repo->obtener_personas($usuario);
        $parametro_igv =  $Repo->get_parametro_igv();
        $dataredondeo = $repo_orden->get_redondeo();
        $decimales_redondeo = $repo_orden->get_decimales_redondeo();
        
      
        // $cambio_tipo = $repo_orden->cambio_tipo(2, date("Y-m-d"));

        return response()->json([
            'status' => true,
            'codigo' => $codigo,
            // 'codigo_proforma'=>$codigo_proforma,
            'condicion_pago' => $condicion_pago,
            // 'tipo_servicio' => $tipo_servicio,
            'tipo_document'=> $tipo_document,
            // 'revisiones'=>$revisiones,
            // 'tecnico'=>$tecnico,
            'moneda'=>$moneda,
            // 'asesor'=>$asesor,
            'descuentos'=>$descuentos,
            'formas_pago'=>$formas_pago,
            // 'servicios'=>$servicios,
            // 'totales'=>$totales,
            // 'tipoMantenimiento'=>$tipoMantenimiento,
            'tipo_document_venta'=>$tipo_document_venta,
            'usuario'=>$usuario,
            'almacen_usuario'=>$almacen_usuario,
            'lotes'=>$lotes,
            'convenios'=>$convenios,
            'vendedores'=>$vendedores,
            'personas'=>$personas,
            'parametro_igv'=>$parametro_igv,
            // 'separaciones'=>$separaciones,
          
            'dataredondeo'=>(isset($dataredondeo[0]->value)) ? $dataredondeo[0]->value : 0,
            'decimales_redondeo'=>(isset($decimales_redondeo[0]->value)) ? $decimales_redondeo[0]->value : 0,
        ]);
    }

    public function factor_credito(SolicitudInterface $Repo, Request $request) {
        $param_nro_cuotas = $Repo->get_parametro_cuotas();
        $nro_cuotas = $request->input("nro_cuotas");

        $factor_credito = $Repo->get_factor_credito($nro_cuotas, $param_nro_cuotas);


        echo json_encode($factor_credito);


    }

    public function enviar_solicitud(SolicitudInterface $Repo, Request $request) {
        $data = $request->all();
        $res = array("status" => "i");
        $data_update = array();
        $data_update["cCodConsecutivo"] = $data["cCodConsecutivo"];
        $data_update["nConsecutivo"] = $data["nConsecutivo"];

        try {
            DB::beginTransaction();

            $solicitud_articulo = $Repo->get_solicitud_articulo($data["cCodConsecutivo"], $data["nConsecutivo"]);
            if(count($solicitud_articulo) <= 0) {
                throw new Exception("La solicitud no tiene un detalle de articulos!");
            }
            
            if($data["tipo_solicitud"] == "1") {

                for ($ii=0; $ii < count($solicitud_articulo); $ii++) { 
                    if($solicitud_articulo[$ii]->serie == 1) {
                        $r = $Repo->get_solicitud_detalle_series($solicitud_articulo[$ii]->cCodConsecutivo, $solicitud_articulo[$ii]->nConsecutivo, $solicitud_articulo[$ii]->id);

                        if(count($r) <= 0 ) {
                            throw new Exception("Por Favor ingrese la serie del producto: ". $solicitud_articulo[$ii]->producto." en el detalle de la solicitud!");
                        }
                    }
                }

                // $validar_series = $Repo->get_solicitud_detalle($data["cCodConsecutivo"], $data["nConsecutivo"]);
                
                // if(count($validar_series) <= 0) {
                //     throw new Exception("Por Favor ingrese las series!");
                // }
            }

            if($data["tipo_solicitud"] == "1" || $data["cuota_inicial"] > 0) {
                $data_update["estado"] = "2"; // vigente
    

            } else {
                $data_update["estado"] = "3"; // por aprobar

            
            
                $result = $Repo->envio_aprobar_solicitud($data_update);
                
                if(isset($result[0]->msg) && $result[0]->msg != "OK") {
                    $res["msg"] = $result[0]->msg;
                }
            }

            if(!empty($res["msg"])) {
                $res["status"] = "ei";
            }

            $res["datos"] = $data_update;
            // exit;
            // print_r($res); exit;
            // print_R($this->preparar_datos("dbo.ERP_Solicitud", $data_update));
            $this->base_model->modificar($this->preparar_datos("dbo.ERP_Solicitud", $data_update));
        // echo json_encode($res);

            DB::commit();
            return response()->json($res);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ei"; 
            $response["msg"] = $e->getMessage(); 
            return response()->json($response);
        }
       
    }

    public function find(SolicitudInterface $Repo, Request $request, Orden_servicioInterface $repo_orden, VentasInterface $ventas_repo) {
        $data = $request->all();
        $arr = explode("_", $data["id"]);
        $cCodConsecutivo = $arr[0];
        $nConsecutivo = $arr[1];
        $response = array();

        $response["solicitud"] = $Repo->get_solicitud($cCodConsecutivo, $nConsecutivo);
        $response["solicitud_articulo"] = $Repo->get_solicitud_articulo($cCodConsecutivo, $nConsecutivo);
        $response["solicitud_detalle"] = $Repo->get_solicitud_detalle($cCodConsecutivo, $nConsecutivo);
        $response["solicitud_credito"] = $Repo->get_solicitud_credito($cCodConsecutivo, $nConsecutivo);
        $response["solicitud_cronograma"] = $Repo->get_solicitud_cronograma($cCodConsecutivo, $nConsecutivo);
        $response["descuentos"] =$repo_orden->get_descuentos_all();
        $response["separaciones"] = $ventas_repo->get_ventas_separacion($response["solicitud"][0]->idcliente);

        // $newString = mb_convert_encoding($response, "UTF-8", "auto");
        // return json_encode($response);
        return response()->json($response);
    }


    public function mostrar_aprobaciones(SolicitudInterface $Repo, Request $request) {
        $data = $request->all();

        $response = $Repo->mostrar_aprobaciones($data["cCodConsecutivo"], $data["nConsecutivo"]);
        return response()->json($response);
    }

    public function imprimir_solicitud($id, SolicitudInterface $Repo, CajaDiariaDetalleInterface $repo_caja, CustomerInterface $cliente_repositorio, PersonaInterface $persona_repositorio) {

        $array = explode("|", $id);
        $cCodConsecutivo = $array[0];
        $nConsecutivo = $array[1];

        $datos = array();

        $solicitud = $Repo->get_solicitud($cCodConsecutivo, $nConsecutivo);
        $solicitud_credito = $Repo->get_solicitud_credito($cCodConsecutivo, $nConsecutivo);
        
        $solicitud_articulo = $Repo->get_solicitud_articulo($cCodConsecutivo, $nConsecutivo);
        $datos["cliente"] = $cliente_repositorio->find($solicitud[0]->idcliente);
        $datos["empresa"] = $repo_caja->get_empresa(); 
        $datos["solicitud_credito"] = $solicitud_credito; 

        $datos["solicitud"] = $solicitud; 
        $datos["solicitud_articulo"] = $solicitud_articulo; 

        $idconyugue = (!empty($solicitud_credito[0]->idconyugue)) ? $solicitud_credito[0]->idconyugue : "0";
        $datos["conyugue"] = $persona_repositorio->find($idconyugue);

        $idfiador = (!empty($solicitud_credito[0]->idfiador)) ? $solicitud_credito[0]->idfiador : "0";
        $datos["fiador"] = $persona_repositorio->find($idfiador);

        $idfiadorconyugue = (!empty($solicitud_credito[0]->idfiadorconyugue)) ? $solicitud_credito[0]->idfiadorconyugue : "0";
        $datos["fiadorconyugue"] = $persona_repositorio->find($idfiadorconyugue);

        $nombre_pdf = "";
        $titulo = "";
        if($solicitud[0]->tipo_solicitud == 1) {
            $nombre_pdf = "contado.pdf";
            $titulo = "Contado";

        } elseif($solicitud[0]->tipo_solicitud == 2) {
            $nombre_pdf = "credito_directo.pdf";
            $titulo = "Crédito Directo";
        } elseif($solicitud[0]->tipo_solicitud == 3) {
            $nombre_pdf = "credito_financiero.pdf";

            $titulo = "Crédito Financiero";
        }

        $datos["titulo"] = $titulo;
        // echo "<pre>";
        // print_r($datos);
        // exit;
        
        if($solicitud[0]->tipo_solicitud != 2) {

            $pdf = PDF::loadView("solicitud.contado_financiado", $datos);
        } else {
            $pdf = PDF::loadView("solicitud.credito_directo", $datos);
        }

        

        return $pdf->stream($nombre_pdf); // ver
        // return $pdf->stream("credito_directo.pdf"); // ver
    }

    public function imprimir_clausula_solicitud($id, SolicitudInterface $Repo, CajaDiariaDetalleInterface $repo_caja, CustomerInterface $cliente_repositorio, PersonaInterface $persona_repositorio) {
       
        $array = explode("|", $id);
        $cCodConsecutivo = $array[0];
        $nConsecutivo = $array[1];

        $datos = array();

        $solicitud = $Repo->get_solicitud($cCodConsecutivo, $nConsecutivo);
        $solicitud_credito = $Repo->get_solicitud_credito($cCodConsecutivo, $nConsecutivo);
        
        $solicitud_articulo = $Repo->get_solicitud_articulo($cCodConsecutivo, $nConsecutivo);
        
        $datos["cliente"] = $cliente_repositorio->find($solicitud[0]->idcliente);
     
        $datos["solicitud_credito"] = $solicitud_credito; 

        $datos["solicitud"] = $solicitud; 
        $datos["solicitud_articulo"] = $solicitud_articulo; 
        $datos["producto"] = $Repo->get_solicitud_articulo_vehiculo($cCodConsecutivo, $nConsecutivo);
        $datos["segunda_venta"] = $repo_caja->get_segunda_venta_credito($cCodConsecutivo, $nConsecutivo); 
        // echo "<pre>";
        // print_r($datos);
        // exit;
        $pdf = PDF::loadView("solicitud.clausula_solicitud", $datos);
        return $pdf->stream("clausula_solicitud.pdf"); // ver
    }

    public function eliminar_solicitud(Request $request, SolicitudInterface $solicitud_repositorio) {
        $data = $request->all();
        
        try {
            DB::beginTransaction();

            $sql_delete = "DELETE FROM dbo.ERP_SolicitudCredito WHERE  cCodConsecutivo='{$data["cCodConsecutivo"]}' AND nConsecutivo={$data["nConsecutivo"]};
            DELETE FROM dbo.ERP_SolicitudDetalle WHERE  cCodConsecutivo='{$data["cCodConsecutivo"]}' AND nConsecutivo={$data["nConsecutivo"]};
            DELETE FROM dbo.ERP_SolicitudArticulo WHERE  cCodConsecutivo='{$data["cCodConsecutivo"]}' AND nConsecutivo={$data["nConsecutivo"]};";
            DB::statement($sql_delete);
            // $this->base_model->eliminar($this->preparar_datos("dbo.ERP_SolicitudCredito", $data));
            // $this->base_model->eliminar($this->preparar_datos("dbo.ERP_SolicitudDetalle", $data));
            // $this->base_model->eliminar($this->preparar_datos("dbo.ERP_SolicitudArticulo", $data));
            $result = $this->base_model->eliminar($this->preparar_datos("dbo.ERP_Solicitud", $data));
        
            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ee"; 
            $response["msg"] = $e->getMessage(); 
            return response()->json($response);
        }
    }

    public function anular_solicitud(Request $request, SolicitudInterface $solicitud_repositorio) {
        $data = $request->all();
      
        try {
            DB::beginTransaction();
            // print_r($data); exit;
            $data["estado"] = 10;
            // update ERP_OrdenServicio set cFacturado = 'N', iEstado = 2 where cCodConsecutivo = cCodConsecutivoO_origen and nConsecutivo = cCodConsecutivoO_origen and iEstado not in (0,1,4)
            // update ERP_Proforma set cFacturado = 'N', iEstado = 2 where cCodConsecutivoOs = cCodConsecutivoO_origen and nConsecutivoOS = cCodConsecutivoO_origen and iEstado not in (0,1,6)

            $solicitud = $solicitud_repositorio->get_solicitud($data["cCodConsecutivo"], $data["nConsecutivo"]);
            if($solicitud[0]->origen == "O") {
                $sql_update = "
                UPDATE ERP_OrdenServicio set cFacturado = 'N', iEstado = 0 where cCodConsecutivo = '{$solicitud[0]->cCodConsecutivoO}' and nConsecutivo = {$solicitud[0]->nConsecutivoO} and iEstado not in (0,1,4);
                UPDATE ERP_Proforma set cFacturado = 'N', iEstado = 2 where cCodConsecutivoOS = '{$solicitud[0]->cCodConsecutivoO}' and nConsecutivoOS = {$solicitud[0]->nConsecutivoO} and iEstado not in (0,1,6);
                ";
                DB::statement($sql_update);
            }
           
            
            $sql_delete = "DELETE FROM dbo.ERP_SolicitudDetalle WHERE cCodConsecutivo='{$data["cCodConsecutivo"]}' AND nConsecutivo={$data["nConsecutivo"]}";
            DB::statement($sql_delete);

            $result = $this->base_model->modificar($this->preparar_datos("dbo.ERP_Solicitud", $data));
            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ee"; 
            $response["msg"] = $e->getMessage(); 
            return response()->json($response);
        }      
    }

    public function get_cliente_documento($id, CustomerInterface $repo)
    {
        try {
            $data = $repo->get_cliente_document($id);
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

    public function get_cliente_persona($id, Orden_servicioInterface $repo, Request $request)
    {   try {
            $val=$repo->get_clientePersona($id);
            return response()->json([
                'status' => true,
                'data'=>$val,
            ]);

    }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function get_precios_list($id, Orden_servicioInterface $repo, Request $request)
    {   try {
            $valtodo=explode("_", $id);
            $idProducto=$valtodo[0];
            $idTipoCli=$valtodo[1];
            $idMoneda=$valtodo[2];
            $cambio = 0;
            $val=$repo->get_precios_list($idProducto, $idTipoCli,$idMoneda);
            // var_dump($val);
             $newPrecio='';
            if(empty($val) && $idMoneda=='1'){
                $para=$repo->get_parametroPrecio();

                $parametro_moneda = (isset($para[0]->value)) ? $para[0]->value : 0;

                $val=$repo->get_precios_list($idProducto, $idTipoCli,$parametro_moneda);
                if(!empty($val)){
                    $fecha_actual=date("Y-m-d");
                    $cambio=$repo->cambio_tipo($parametro_moneda,$fecha_actual);

                    $newPrecio=floatval($val[0]->nPrecio)*floatval($cambio[0]->Mensaje);
                }
            } else {
                $newPrecio = $val[0]->nPrecio;
            }
        // throw new \Exception('Ya existe un almacen con este código interno. Por favor ingrese otro código.');
        //     DB::commit();
            return response()->json([
                'status' => true,
                'data'=>$val,
                'newPrecio'=>$newPrecio,
                'cambio'=>$cambio,
            ]);

    }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function validar_parametro_categoria() {
        $sql = "SELECT * FROM ERP_Parametros WHERE id=18";
        $result = DB::select($sql);
        echo json_encode($result);
    }

    public function validar_serie(Request $request, SolicitudInterface $repo) {
        $data = $request->all();
        $result = $repo->validar_serie($data["idserie"]);
        return response()->json($result);
    }

    public function copiar_solicitud(Request $request, SolicitudInterface $repo) {
        $data = $request->all();

        for ($i=0; $i < $data["numero_solicitudes"]; $i++) { 
            $result = $repo->copiar_solicitud($data["cCodConsecutivo"], $data["nConsecutivo"]);
        }
        return response()->json($result);
    }
    

    public function guardar_separaciones(Request $request) {
        $data = $request->all();
        // print_r($data); exit;
        if(count($data["idseparacion"]) > 0) {
            $sql_delete = "DELETE FROM dbo.ERP_SolicitudSeparacion WHERE cCodConsecutivo='{$data["cCodConsecutivo"]}' AND nConsecutivo='{$data["nConsecutivo"]}'";
            DB::statement($sql_delete);
        }
       
        for ($i=0; $i < count($data["idseparacion"]); $i++) { 
            $datos = array();
            $datos["idventa"] = $data["idseparacion"][$i];
            $datos["cCodConsecutivo"] = $data["cCodConsecutivo"];
            $datos["nConsecutivo"] = $data["nConsecutivo"];
            $result = $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudSeparacion", $datos));
            $sql_update = "UPDATE ERP_Venta SET aplicado_separacion = 'S'       
            WHERE idventa={$datos["idventa"]}";
    
            DB::statement($sql_update);
        }

        // $this->base_model->insertar();
      
        return response()->json($result);
    }

    public function obtener_separaciones(Request $request, SolicitudInterface $repo) {
        $data = $request->all();
        $result = $repo->obtener_separaciones($data["cCodConsecutivo"], $data["nConsecutivo"]);
        return response()->json($result);
    
    }

   public function obtener_series(Request $request, SolicitudInterface $repo) {
    $data = $request->all();
    $result = $repo->obtener_series($data["id_solicitud_articulo"]);
    return response()->json($result);
   }

}
