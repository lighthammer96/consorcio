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
use App\Http\Recopro\Cobrador\CobradorInterface;
use App\Http\Recopro\ConsecutivosComprobantes\ConsecutivosComprobantesInterface;
use App\Http\Recopro\Shop\ShopInterface;
use App\Http\Recopro\Solicitud\SolicitudInterface;
use App\Http\Recopro\VisitaCliente\VisitaClienteInterface;
use App\Http\Recopro\VisitaCliente\VisitaClienteTrait;
use App\Http\Requests\VisitaClienteRequest;
use App\Models\BaseModel;
use PDF;
use DB;
use Illuminate\Http\Request;

class VisitaClienteController extends Controller
{
    use VisitaClienteTrait;

    public function __construct()
    {
        $this->base_model = new BaseModel();
//        $this->middleware('json');
    }

    public function all(Request $request, VisitaClienteInterface $repo)
    {

        $s      = $request->input('search', '');
        $params =  ['id', 'fechareg', 'cobrador', 'estado'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(VisitaClienteInterface $repo, VisitaClienteRequest $request)
    {
        $data                = $request->all();
        $table               = "ERP_Venta";
        $id                  = 'idbanco';
        $data['idbanco']     = $repo->get_consecutivo($table, $id);
        $data['descripcion'] = $data['banco'];

        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => [],
        ]);
    }

    public function update(VisitaClienteInterface $repo, VisitaClienteRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $idbanco             = $data['idbanco'];
        $data['descripcion'] = $data['banco'];
        $repo->update($idbanco, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(VisitaClienteInterface $repo, Request $request)
    {
        $idbanco = $request->input('idbanco');
        $repo->destroy($idbanco);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(VisitaClienteInterface $repo)
    {
        return parseSelect($repo->all(), 'idbanco', 'descripcion');
    }

    public function excel(VisitaClienteInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE DOCUMENTOS EMITIDOS', 'VisitaCliente');
    }

    public function find_documento(VisitaClienteInterface $Repo, Request $request)
    {
        $data = $request->all();

        $response["documento"] = $Repo->find_documento($data["idventa"]);

        return response()->json($response);
    }

    public function data_form(VisitaClienteInterface $Repo, CobradorInterface $cobrador, ShopInterface $shop_repo, SolicitudInterface $Repo_sol)
    {
        $usuario=auth()->id();
        $motivos = $Repo->get_motivos(); 
      
        $cobrador = $cobrador->getCobrador();
        $clientes = $Repo->getClientes();
        $tiendas = $shop_repo->getTiendas();
        $convenios = $Repo_sol->obtener_convenios($usuario);
        // $solicitudes = $Repo->getSolicitudes();

        // $cambio_tipo = $repo_orden->cambio_tipo(2, date("Y-m-d"));

        return response()->json([
            'status'  => true,

            'motivos' => $motivos,
            'cobrador' => $cobrador,
            'clientes' => $clientes,
            'tiendas' => $tiendas,
            'convenios' => $convenios,
            // 'solicitudes' => $solicitudes,

        ]);
    }

   

    public function guardar_visita(VisitaClienteInterface $Repo, Request $request, CajaDiariaDetalleInterface $caja_diaria_detalle_repo, CajaDiariaInterface $caja_diaria_repositorio, ConsecutivosComprobantesInterface $repoCC)
    {

        $data = $request->all();
        // print_r($data); exit;
        $result = array();

        try {
            DB::beginTransaction();
            // $venta = $caja_diaria_detalle_repo->get_venta();
            if($data["idvisita"] == "") {
                $data_visita  = $data;
                $data_visita["id"]  = $Repo->get_consecutivo("ERP_VisitaCliente", "id");
                $data_visita["estado"]  = "1";
               
                $result = $this->base_model->insertar($this->preparar_datos("dbo.ERP_VisitaCliente", $data_visita));
    
                for ($i=0; $i < count($data["cuotas"]); $i++) { 
                    $solicitud = explode("_", $data["idsolicitud"][$i]);
                    $data_visita_solicitud = array();
                    $data_visita_solicitud["id"] = $data_visita["id"];
                    $data_visita_solicitud["cCodConsecutivo"] = $solicitud[0];
                    $data_visita_solicitud["nConsecutivo"] = $solicitud[1];
                    $this->base_model->insertar($this->preparar_datos("dbo.ERP_VisitaClienteSolicitud", $data_visita_solicitud));
    
                    $cuotas = explode(",", $data["cuotas"][$i]);
    
                    for ($c=0; $c < count($cuotas); $c++) { 
                        $data_visita_cuota = array();
                        $data_visita_cuota["id"] = $data_visita["id"];
                        $data_visita_cuota["cCodConsecutivo"] = $solicitud[0];
                        $data_visita_cuota["nConsecutivo"] = $solicitud[1];
                        $data_visita_cuota["nrocuota"] = $cuotas[$c];
                        $this->base_model->insertar($this->preparar_datos("dbo.ERP_VisitaClienteCuota", $data_visita_cuota));
                    }
                }
            } else {
                $data_visita  = $data;
                $data_visita["id"]  = $data["idvisita"];
                $data_visita["estado"]  = "3";
               
                $result = $this->base_model->modificar($this->preparar_datos("dbo.ERP_VisitaCliente", $data_visita));

                for ($i=0; $i < count($data["cuotas"]); $i++) { 
                    $solicitud = explode("_", $data["idsolicitud"][$i]);
                    $data_visita_solicitud = array();
                    $data_visita_solicitud["id"] = $data["idvisita"];
                    $data_visita_solicitud["cCodConsecutivo"] = $solicitud[0];
                    $data_visita_solicitud["nConsecutivo"] = $solicitud[1];
                    $data_visita_solicitud["cObservacion"] = $data["cObservacion"];
                    $this->base_model->modificar($this->preparar_datos("dbo.ERP_VisitaClienteSolicitud", $data_visita_solicitud));
    
                    $cuotas = explode(",", $data["cuotas"][$i]);
                    $fechas_pago = explode("|", $data["fecha_pago"][$i]);
                    $montos_pago = explode("|", $data["monto_pago"][$i]);
                    $observaciones = explode("|", $data["cObservacion_v"][$i]);
    
                    for ($c=0; $c < count($cuotas); $c++) { 
                        $data_visita_cuota = array();
                        $data_visita_cuota["id"] = $data["idvisita"];
                        $data_visita_cuota["cCodConsecutivo"] = $solicitud[0];
                        $data_visita_cuota["nConsecutivo"] = $solicitud[1];
                        $data_visita_cuota["nrocuota"] = $cuotas[$c];
                        $data_visita_cuota["fecha_pago"] = $fechas_pago[$c];
                        $data_visita_cuota["monto_pago"] = $montos_pago[$c];
                        $data_visita_cuota["cObservacion"] = $observaciones[$c];
                        $this->base_model->modificar($this->preparar_datos("dbo.ERP_VisitaClienteCuota", $data_visita_cuota));
                    }
                }
            }
           

            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ei";
            $response["msg"]    = $e->getMessage();
            return response()->json($response);
        }
    }

    public function procesar_visita(VisitaClienteInterface $Repo, Request $request, CajaDiariaDetalleInterface $caja_diaria_detalle_repo, CajaDiariaInterface $caja_diaria_repositorio, ConsecutivosComprobantesInterface $repoCC)
    {

        $data = $request->all();
        // print_r($data); exit;
        $result = array();

        try {
            DB::beginTransaction();
            $data["estado"] = 2;
            $result = $this->base_model->modificar($this->preparar_datos("dbo.ERP_VisitaCliente", $data));
            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ei";
            $response["msg"]    = $e->getMessage();
            return response()->json($response);
        }

    }

    public function obtener_solicitud(VisitaClienteInterface $repo, Request $request) {
        $data = $request->all();    

        $result = $repo->obtener_solicitud($data["idcliente"], $data["idsolicitud"]);

        return response()->json($result);
    }

    public function find_visita(VisitaClienteInterface $repo, Request $request, SolicitudInterface $solicitud_repositorio) {
        $data = $request->all();    

        $result["visita_cliente"] = $repo->obtener_visita_cliente($data["id"]);
        $result["visita_cliente_solicitud"] = $repo->obtener_visita_cliente_solicitud($data["id"]);
        $result["visita_cliente_cuota"] = $repo->obtener_visita_cliente_cuota($data["id"]);
        $result["solicitud_cronograma"] = $repo->obtener_visita_cliente_cuota($data["id"]);

        return response()->json($result);
     
    }

    public function obtener_cuotas_cronograma(VisitaClienteInterface $repo, Request $request, SolicitudInterface $solicitud_repositorio) {
        $data = $request->all();    

        $arr = explode("_", $data["id"]);
        $cCodConsecutivo = (isset($arr[0])) ? $arr[0] : "";
        $nConsecutivo = (isset($arr[1])) ? $arr[1] : "";
        $idvisita = $data["idvisita"];


        $response = $repo->obtener_cuotas_cronograma($cCodConsecutivo, $nConsecutivo, $idvisita);

        return response()->json($response);

    }

    public function imprimir_cartas_cobranza($id, VisitaClienteInterface $repo, Request $request, CajaDiariaDetalleInterface $repo_caja, SolicitudInterface $solicitud_repositorio) {

      
        $datos = array();

        // $solicitudes = $repo->get_visita_solicitudes($id);
        $datos["empresa"] = $repo_caja->get_empresa(); 
        $datos["visita_cliente"] = $repo->obtener_visita_cliente($id); 
        $datos["solicitudes"] = $repo->obtener_visita_cliente_solicitud($id); 
        $dias_mora = 0;
        foreach ($datos["solicitudes"] as $key => $value) {
            $cuotas_pendientes = $repo->obtener_cuotas_pendientes($value->cCodConsecutivo, $value->nConsecutivo); 
            $datos["solicitudes"][$key]->primera_cuota_vencida = $cuotas_pendientes[0];
            if(count($cuotas_pendientes) > 0 && $cuotas_pendientes[0]->dias_mora > 0) {
                $dias_mora ++;
            }

            $cuotas_vencidas = [];
            $intereses = 0;
            $deuda = 0;
            foreach ($cuotas_pendientes as $kcp => $vcp) {
                if(date("Y-m-d") > $vcp->fecha_vencimiento) {
                  
                    array_push($cuotas_vencidas, $vcp->nrocuota);
                }

                $deuda += (float)$vcp->saldo_cuota;
                $intereses += (float)$vcp->int_moratorio;
            }
            $datos["solicitudes"][$key]->cuotas_vencidas = $cuotas_vencidas;
            $datos["solicitudes"][$key]->deuda = $deuda;
            $datos["solicitudes"][$key]->intereses = $intereses; 
            $datos["solicitudes"][$key]->vehiculo = $solicitud_repositorio->get_solicitud_articulo_vehiculo($value->cCodConsecutivo, $value->nConsecutivo); 

            $ultimo_pago_cuota = $repo->ultimo_pago_cuota($value->cCodConsecutivo, $value->nConsecutivo);

            $datos["solicitudes"][$key]->ultimo_pago_cuota = $ultimo_pago_cuota;

            $segunda_venta = $repo_caja->get_segunda_venta_credito($value->cCodConsecutivo, $value->nConsecutivo);
            $datos["solicitudes"][$key]->segunda_venta = $segunda_venta;
            
        }

        $sql_1 = "SELECT * FROM ERP_Parametros WHERE id=9";
        $par_1 = DB::select($sql_1);

        $sql_2 = "SELECT * FROM ERP_Parametros WHERE id=10";
        $par_2 = DB::select($sql_2);

        $sql_3 = "SELECT * FROM ERP_Parametros WHERE id=11";
        $par_3 = DB::select($sql_3);

        $sql_cobranza = "SELECT * FROM ERP_Parametros WHERE id=12";
        $parametro_jefe_cobranza = DB::select($sql_cobranza);

        $sql_firma = "SELECT * FROM ERP_Parametros WHERE id=13";
        $parametro_firma = DB::select($sql_firma);

        $datos["parametro_1"] = $par_1[0]->value;
        $datos["parametro_2"] = $par_2[0]->value;
        $datos["parametro_3"] = $par_3[0]->value;
        $datos["parametro_jefe_cobranza"] = $parametro_jefe_cobranza[0]->value;
        $datos["parametro_firma"] = $parametro_firma[0]->value;
      
        // echo "<pre>";
        // print_r($datos);
        // exit;
        if($dias_mora <= 0) {
            echo '<script>alert("No cuotas con dias de mora"); window.close(); </script>';
            exit;
        }
        
        $pdf = PDF::loadView("visita_cliente.carta_cobranza", $datos);
        return $pdf->stream("carta_cobranza.pdf"); // ver
        // return $pdf->stream("credito_directo.pdf"); // ver
    }

    public function imprimir_visita($id, VisitaClienteInterface $repo, Request $request, CajaDiariaDetalleInterface $repo_caja, SolicitudInterface $solicitud_repositorio) {

        $datos = array();

        // $solicitudes = $repo->get_visita_solicitudes($id);
        $datos["empresa"] = $repo_caja->get_empresa(); 
        $datos["visita_cliente"] = $repo->obtener_visita_cliente($id); 
        $datos["solicitudes"] = $repo->obtener_visita_cliente_solicitud($id); 

        foreach ($datos["solicitudes"] as $key => $value) {
            $cuotas_pendientes = $repo->obtener_cuotas_pendientes($value->cCodConsecutivo, $value->nConsecutivo); 
            $datos["solicitudes"][$key]->primera_cuota_vencida = $cuotas_pendientes[0];
            $cuotas_vencidas = [];
            $intereses = 0;
            $deuda = 0;
            foreach ($cuotas_pendientes as $kcp => $vcp) {
                if(date("Y-m-d") > $vcp->fecha_vencimiento) {
                  
                    array_push($cuotas_vencidas, $vcp->nrocuota);
                }

                $deuda += (float)$vcp->saldo_cuota;
                $intereses += (float)$vcp->int_moratorio;
            }
            $datos["solicitudes"][$key]->cuotas_vencidas = $cuotas_vencidas;
            $datos["solicitudes"][$key]->deuda = $deuda;
            $datos["solicitudes"][$key]->intereses = $intereses; 
            $datos["solicitudes"][$key]->vehiculo = $solicitud_repositorio->get_solicitud_articulo_vehiculo($value->cCodConsecutivo, $value->nConsecutivo); 

            $ultimo_pago_cuota = $repo->ultimo_pago_cuota($value->cCodConsecutivo, $value->nConsecutivo);
            $ultimo_pago_x_cuota = $repo->ultimo_pago_x_cuota($value->cCodConsecutivo, $value->nConsecutivo, $cuotas_pendientes[0]->nrocuota);

            $datos["solicitudes"][$key]->ultimo_pago_cuota = $ultimo_pago_cuota;
            $datos["solicitudes"][$key]->ultimo_pago_x_cuota = $ultimo_pago_x_cuota;

            $segunda_venta = $repo_caja->get_segunda_venta_credito($value->cCodConsecutivo, $value->nConsecutivo);
            $datos["solicitudes"][$key]->segunda_venta = $segunda_venta;
            
        }

        $sql_1 = "SELECT * FROM ERP_Parametros WHERE id=9";
        $par_1 = DB::select($sql_1);

        $sql_2 = "SELECT * FROM ERP_Parametros WHERE id=10";
        $par_2 = DB::select($sql_2);

        $sql_3 = "SELECT * FROM ERP_Parametros WHERE id=11";
        $par_3 = DB::select($sql_3);

        $sql_cobranza = "SELECT * FROM ERP_Parametros WHERE id=12";
        $parametro_jefe_cobranza = DB::select($sql_cobranza);

        $sql_firma = "SELECT * FROM ERP_Parametros WHERE id=13";
        $parametro_firma = DB::select($sql_firma);

        $datos["parametro_1"] = $par_1[0]->value;
        $datos["parametro_2"] = $par_2[0]->value;
        $datos["parametro_3"] = $par_3[0]->value;
        $datos["parametro_jefe_cobranza"] = $parametro_jefe_cobranza[0]->value;
        $datos["parametro_firma"] = $parametro_firma[0]->value;
      
        // echo "<pre>";
        // print_r($datos);
        // exit;

        
        $pdf = PDF::loadView("visita_cliente.visita", $datos)->setPaper('A4', "landscape");
        return $pdf->stream("visita.pdf"); // ver
        // return $pdf->stream("credito_directo.pdf"); // ver
    }
    
}
