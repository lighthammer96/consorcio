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
use App\Http\Recopro\CajaDiariaDetalle\CajaDiariaDetalleRepository;
use App\Http\Recopro\Compania\CompaniaInterface;
use App\Http\Recopro\ConsecutivosComprobantes\ConsecutivosComprobantesInterface;
use App\Http\Recopro\Customer\CustomerInterface;
use App\Http\Recopro\Orden_servicio\Orden_servicioInterface;
use App\Http\Recopro\Shop\ShopInterface;
use App\Http\Recopro\Solicitud\SolicitudInterface;
use App\Http\Recopro\Solicitud\SolicitudRepository;
use App\Http\Recopro\Ventas\VentasInterface;
use App\Http\Recopro\Ventas\VentasTrait;
use App\Http\Requests\VentasRequest;
use App\Models\BaseModel;
use DB;
use PDF;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class VentasController extends Controller 
{
    use VentasTrait;

    public function __construct()
    {
        $this->base_model = new BaseModel();
//        $this->middleware('json');
    }
 
    public function all(Request $request, VentasInterface $repo) 
    {
        $s      = $request->input('search', '');
        $params = ['idventa','cliente','anulado','serie_comprobante', 'numero_comprobante', 'fecha_emision', 'tipo_documento', 'numero_documento', 'moneda', 't_monto_total', 'pagado', 'saldo', 'cCodConsecutivo_solicitud', 'nConsecutivo_solicitud', 'tipo_solicitud', "estado", 'IdTipoDocumento', 'anticipo', 'idventa_referencia', 'tipo_comprobante', 'estado_cpe', 'fecha_emision_server', 'dias_vencidos','comprobante', 'formapago'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search_documentos($s), $request, 'idventa', $params);
    }

    public function create(VentasInterface $repo, VentasRequest $request)
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

    public function update(VentasInterface $repo, VentasRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $idbanco             = $data['idbanco'];
        $data['descripcion'] = $data['banco'];
        $repo->update($idbanco, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(VentasInterface $repo, Request $request)
    {
        $idbanco = $request->input('idbanco');
        $repo->destroy($idbanco);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(VentasInterface $repo)
    {
        return parseSelect($repo->all(), 'idbanco', 'descripcion');
    }

    public function excel(VentasInterface $repo, Request $request)
    {
        $filter = $request->all();
        $data = $repo->search_documentos_excel($filter)->get();
        return generateExcel($this->generateDataExcel($data ), 'LISTA DE DOCUMENTOS EMITIDOS', 'Ventas');
    }

    public function excel_lista_cobranza_cuotas(VentasInterface $repo, Request $request, SolicitudInterface $solicitud_repositorio)
    {
       
        // echo "<pre>";
        $data = $request->all();    
        // print_r($data);
        // // print_r($repo->all()); 
        // exit;

        $where = "";

        if(!empty($data["idcobrador"])) {
            $where .= " AND s.idCobrador={$data["idcobrador"]}";
        }

        if(!empty($data["idtienda"])) {
            $where .= " AND v.idtienda={$data["idtienda"]}";
        }

        if(!empty($data["tipo_solicitud"])) {
            $where .= " AND s.tipo_solicitud={$data["tipo_solicitud"]}";
        }

        if(!empty($data["idconvenio"])) {
            $where .= " AND s.idconvenio={$data["idconvenio"]}";
        }

        if(!empty($data["idconvenio"])) {
            $where .= " AND s.idconvenio={$data["idconvenio"]}";
        }

        if(!empty($data["ubigeo"])) {
            $where .= " AND cl.ubigeo={$data["ubigeo"]}";
        }

        if(!empty($data["idsector"])) {
            $where .= " AND cl.idsector={$data["idsector"]}";
        }

        // $sql_cobradores = "SELECT s.idCobrador, c.descripcion AS cobrador  
        // FROM ERP_Venta AS v
        // INNER JOIN ERP_Solicitud AS s ON(v.cCodConsecutivo_solicitud=s.cCodConsecutivo AND v.nConsecutivo_solicitud=s.nConsecutivo)
        // INNER JOIN ERP_Cobrador AS c ON(s.idCobrador=c.id)
        // INNER JOIN ERP_Clientes AS cc ON(cc.id=s.idcliente)
        // WHERE v.fecha_emision BETWEEN '{$data["fecha_inicio"]}' AND '{$data["fecha_fin"]}' AND s.idCobrador IS NOT NULL {$where}
        // GROUP BY s.idCobrador, c.descripcion";

        // $cobradores = DB::select($sql_cobradores);
        $vacios = 0;
       
        // foreach ($cobradores as $key => $value) {
            $sql = "SELECT c.descripcion AS cobrador, c.id AS idcobrador, FORMAT(v.fecha_emision, 'dd/MM/yyyy') AS fecha_emision, cl.razonsocial_cliente, v.serie_comprobante, v.numero_comprobante, FORMAT(sc.fecha_vencimiento, 'dd/MM/yyyy') AS fecha_vencimiento, m.Descripcion AS moneda, v.t_monto_total,DATEDIFF(DAY, sc.fecha_vencimiento, GETDATE())  AS dias_mora, CASE WHEN sc.saldo_cuota=0 THEN 'Cobrado' ELSE 'Pendiente' END AS estado, vd.int_moratorio_pagado, ISNULL(vd.nrocuota, 0) AS nrocuota, vd.valor_cuota_pagada, s.cCodConsecutivo, s.nConsecutivo
            FROM ERP_Venta AS v
            INNER JOIN ERP_VentaDetalle AS vd ON(vd.idventa=v.idventa)
            INNER JOIN ERP_Solicitud AS s ON(v.cCodConsecutivo_solicitud=s.cCodConsecutivo AND v.nConsecutivo_solicitud=s.nConsecutivo)
            INNER JOIN ERP_Cobrador AS c ON(s.idCobrador=c.id)
            INNER JOIN ERP_Clientes AS cl ON(cl.id=v.idcliente)
            INNER JOIN ERP_SolicitudCronograma AS sc ON(sc.cCodConsecutivo=s.cCodConsecutivo AND sc.nConsecutivo=s.nConsecutivo AND vd.nrocuota=sc.nrocuota)
            INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda)
            WHERE  FORMAT(v.fecha_emision, 'yyyy-MM-dd') BETWEEN '{$data["fecha_inicio"]}' AND '{$data["fecha_fin"]}' AND ISNULL(v.anulado, 'N')<>'S' {$where}
            ORDER BY c.descripcion ASC";
           
            $pagos = DB::select($sql);
            
            if(count($pagos) <= 0) {
                $vacios ++;
            }

            foreach ($pagos as $kp => $vp) {
                $cuotas = $solicitud_repositorio->get_solicitud_cronograma($vp->cCodConsecutivo, $vp->nConsecutivo);
                $pagos[$kp]->nrocuotas = count($cuotas);
            }
           
        
        // }


        // echo "<pre>";
        // print_r($cobradores);
        // exit;

        if($vacios > 0) {
            echo '<script>alert("No hay Datos"); window.close(); </script>';
            exit;
        }
        return generateExcel($this->generateDataExcelListaCobranzaCuotas($pagos), 'LISTA DE COBRANZA DE CUOTAS', 'Ventas');
    }

    public function find_documento(VentasInterface $Repo, Request $request)
    {
        $data = $request->all();

        $response["documento"] = $Repo->find_documento($data["idventa"]);

        return response()->json($response);
    }

    public function data_form(VentasInterface $Repo, CajaDiariaDetalleInterface $caja_diaria_repo)
    {

        $motivos = $Repo->get_motivos();
        $clientes = $caja_diaria_repo->get_clientes();

        // $cambio_tipo = $repo_orden->cambio_tipo(2, date("Y-m-d"));

        return response()->json([
            'status'  => true,
            'clientes' => $clientes,
            'motivos' => $motivos,

        ]);
    }

    public function devolver_dinero($caja_diaria_detalle_repo, $caja_diaria_repositorio, $data) {
        $data_caja_detalle = array();
        $data_caja_detalle["idCajaDiaria"] = $caja_diaria_detalle_repo->get_caja_diaria()[0]->idCajaDiaria; 
        $data_caja_detalle["consecutivo"] = $caja_diaria_detalle_repo->get_consecutivo("ERP_CajaDiariaDetalle", "consecutivo");
        $data_caja_detalle["codigoTipo"] = "VTA";
        $data_caja_detalle["codigoFormaPago"] = "EFE";
        $data_caja_detalle["idMoneda"] = $data["idmoneda"];
        $data_caja_detalle["monto"] = $data["monto"];
        $data_caja_detalle["descripcion"] = "Devolución de dinero por aplicación de nota de Crédtio";
        $data_caja_detalle["nroTarjeta"] = "";
        $data_caja_detalle["nroOperacion"] = "";
        $data_caja_detalle["naturaleza"] = "S";
        
        $this->base_model->insertar($this->preparar_datos("dbo.ERP_CajaDiariaDetalle", $data_caja_detalle));

        //ACTUALIZAMOS MONTOS EN CAJA DIARIA
        $update_caja_diaria                 = array();
        $update_caja_diaria["idCajaDiaria"] = $caja_diaria_detalle_repo->get_caja_diaria()[0]->idCajaDiaria;

        $update_caja_diaria["totalNoEfectivo"] = 0;

        $update_caja_diaria["totalNoEfectivoDol"] = 0;

        if ($data["idmoneda"] == "1") {
            $update_caja_diaria["totalEfectivo"] = $data["monto"] * (-1);
        } else {
            $update_caja_diaria["totalEfectivo"] = 0;
        }

        if ($data["idmoneda"] == "") {
            $update_caja_diaria["totalEfectivoDol"] = $data["monto"] * (-1);

        } else {
            $update_caja_diaria["totalEfectivoDol"] = 0;
        }
        $caja_diaria_repositorio->update_totales($update_caja_diaria);
    }

    

    public function guardar_venta(VentasInterface $Repo, Request $request, CajaDiariaDetalleInterface $caja_diaria_detalle_repo, CajaDiariaInterface $caja_diaria_repositorio, ConsecutivosComprobantesInterface $repoCC, CustomerInterface $repo_cliente, CompaniaInterface $compania_repo)
    {

        $data = $request->all();

        // print_r($data); exit;
        // console.log("desprendimiento");

        $result = array();

        try {
            DB::beginTransaction();
            // $venta = $caja_diaria_detalle_repo->get_venta();
            $cliente = $repo_cliente->find($data["idcliente"]);
            $empresa = $compania_repo->find("00000");
            
            $name_cpe = $empresa->Ruc . "-07-" . $data["serie_comprobante"] . "-" . str_pad($data["numero_comprobante"], 8, "0", STR_PAD_LEFT);

            $data["name_cpe"] = $name_cpe;
            $result = $this->emitir_nota($data, $caja_diaria_detalle_repo, $caja_diaria_repositorio, $Repo, $repoCC);

            
            

            $total_qr = str_replace(",", "", number_format($data["monto"], 2));

            $string_qr = $empresa->Ruc . "|07|" .$data["serie_comprobante"]. "|" .str_pad($data["numero_comprobante"], 8, "0", STR_PAD_LEFT). "|0.00|" .$total_qr. "|" .date("Y-m-d"). "|" .$cliente[0]->tipodoc. "|" .$cliente[0]->documento;
            // GUARDAMOS IMAGEN DEL CODIGO QR
            // referencia: https://www.desarrollolibre.net/blog/laravel/generar-simples-codigos-qrs-con-laravel
            if (!file_exists(base_path("public/QR/"))) {
                mkdir(base_path("public/QR/"), 0777, true);
            }
            QrCode::format('png')->margin(0)->size(300)->color(0, 0, 0)->generate($string_qr, '../public/QR/'.$name_cpe.".png");

            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ei";
            $response["msg"]    = $e->getMessage();
            return response()->json($response);
        }
    }

    public function get_notas_devolucion(VentasInterface $Repo, Request $request)
    {

        $response = $Repo->get_notas_devolucion();
        return response()->json($response);

    }
    public function get_notas_devolucion_find(VentasInterface $Repo, Request $request)
    {
        $idw = $request->input('idt', '');
        $arr = explode("*", $idw);
        $response = $Repo->get_notas_devolucion_find($arr[0],$arr[1],$arr[2]);
        return response()->json($response);

    }

    public function get_venta_detalle_devolucion($id, VentasInterface $repo, Request $request)
    {
        try {
            $arr = explode("*", $id);
            $serie_comprobante = $arr[0];
            $numero_comprobante = $arr[1];
            $val = $repo->get_venta_detalle_devolucion($serie_comprobante, $numero_comprobante);

            return response()->json([
                'status' => true,
                'data'   => $val,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status'  => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function anularventa($id, VentasInterface $repo, Request $request, CajaDiariaDetalleRepository $caja_repo)
    {
        try {
           $response = $repo->anular_venta($id, $caja_repo);
            return response()->json([
                'status' => true,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status'  => false,
                'message' => $e->getMessage(),
            ]);
        }
    }


    public function get_venta_separacion(VentasInterface $repo, Request $request) {
        $data = $request->all();    

        $result = $repo->get_venta_separacion($data["idcliente"]);

        return response()->json($result);
        
    }

    public function get_venta_nota(VentasInterface $repo, Request $request) {
        $data = $request->all();    

        $result = $repo->get_venta_nota($data["idcliente"]);

        return response()->json($result);
        
    }


    public function imprimir_lista_cobraza_cuotas(Request $request, CajaDiariaDetalleInterface $repo_caja, SolicitudInterface $solicitud_repositorio) {

        ini_set('max_execution_time', '300000000');
        set_time_limit(300000000);
        $data = $request->all();    
        
        $datos = array();

        // $solicitudes = $repo->get_visita_solicitudes($id);
        $datos["empresa"] = $repo_caja->get_empresa(); 

        $where = "";

        if(!empty($data["idcobrador"])) {
            $where .= " AND s.idCobrador={$data["idcobrador"]}";
        }

        if(!empty($data["idtienda"])) {
            $where .= " AND v.idtienda={$data["idtienda"]}";
        }

        if(!empty($data["tipo_solicitud"])) {
            $where .= " AND s.tipo_solicitud={$data["tipo_solicitud"]}";
        }

        if(!empty($data["idconvenio"])) {
            $where .= " AND s.idconvenio={$data["idconvenio"]}";
        }

        if(!empty($data["idconvenio"])) {
            $where .= " AND s.idconvenio={$data["idconvenio"]}";
        }

        if(!empty($data["ubigeo"])) {
            $where .= " AND cc.ubigeo={$data["ubigeo"]}";
        }

        if(!empty($data["idsector"])) {
            $where .= " AND cc.idsector={$data["idsector"]}";
        }

        $sql_cobradores = "SELECT s.idCobrador, c.descripcion AS cobrador  
        FROM ERP_Venta AS v
        INNER JOIN ERP_VentaDetalle AS vd ON(vd.idventa=v.idventa)
        INNER JOIN ERP_Solicitud AS s ON(v.cCodConsecutivo_solicitud=s.cCodConsecutivo AND v.nConsecutivo_solicitud=s.nConsecutivo) 
        INNER JOIN ERP_Cobrador AS c ON(s.idCobrador=c.id) 
        INNER JOIN ERP_Clientes AS cc ON(cc.id=s.idcliente)
        INNER JOIN ERP_SolicitudCronograma AS sc ON(sc.cCodConsecutivo=s.cCodConsecutivo AND sc.nConsecutivo=s.nConsecutivo AND vd.nrocuota=sc.nrocuota)
        WHERE FORMAT(v.fecha_emision, 'yyyy-MM-dd') BETWEEN '{$data["fecha_inicio"]}' AND '{$data["fecha_fin"]}' AND s.idCobrador IS NOT NULL {$where} AND ISNULL(v.anulado, 'N')<>'S'
        GROUP BY s.idCobrador, c.descripcion";
        // die($sql_cobradores);
        $cobradores = DB::select($sql_cobradores);
        $vacios = 0;
        foreach ($cobradores as $key => $value) {
            $sql = "SELECT c.id AS idcobrador, FORMAT(v.fecha_emision, 'dd/MM/yyyy') AS fecha_emision, cl.razonsocial_cliente, v.serie_comprobante, v.numero_comprobante, FORMAT(sc.fecha_vencimiento, 'dd/MM/yyyy') AS fecha_vencimiento, m.Descripcion AS moneda, v.t_monto_total,DATEDIFF(DAY, sc.fecha_vencimiento, GETDATE())  AS dias_mora, CASE WHEN sc.saldo_cuota=0 THEN 'Cobrado' ELSE 'Pendiente' END AS estado, vd.int_moratorio_pagado, ISNULL(vd.nrocuota, 0) AS nrocuota, vd.valor_cuota_pagada, s.cCodConsecutivo, s.nConsecutivo
            FROM ERP_Venta AS v
            INNER JOIN ERP_VentaDetalle AS vd ON(vd.idventa=v.idventa)
            INNER JOIN ERP_Solicitud AS s ON(v.cCodConsecutivo_solicitud=s.cCodConsecutivo AND v.nConsecutivo_solicitud=s.nConsecutivo)
            INNER JOIN ERP_Cobrador AS c ON(s.idCobrador=c.id)
            INNER JOIN ERP_Clientes AS cl ON(cl.id=v.idcliente)
            INNER JOIN ERP_SolicitudCronograma AS sc ON(sc.cCodConsecutivo=s.cCodConsecutivo AND sc.nConsecutivo=s.nConsecutivo AND vd.nrocuota=sc.nrocuota)
            INNER JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda)
            WHERE FORMAT(v.fecha_emision, 'yyyy-MM-dd') BETWEEN '{$data["fecha_inicio"]}' AND '{$data["fecha_fin"]}' AND s.idCobrador={$value->idCobrador} AND ISNULL(v.anulado, 'N')<>'S'";
            // echo $sql."\n";
            $pagos = DB::select($sql);
            
            if(count($pagos) <= 0) {
                $vacios ++;
            }

           
            foreach ($pagos as $kp => $vp) {
               

                $cuotas = $solicitud_repositorio->get_solicitud_cronograma($vp->cCodConsecutivo, $vp->nConsecutivo);
                $pagos[$kp]->nrocuotas = count($cuotas);
            }
            $cobradores[$key]->pagos = $pagos;
        

        }


      
        $datos["cobradores"] = $cobradores;
        // echo "<pre>";
        // var_dump($datos);
        // exit;

        if($vacios > 0) {
            echo '<script>alert("No hay Datos"); window.close(); </script>';
            exit;
        }

        
        $pdf = PDF::loadView("reportes.lista_cobranza_cuotas", $datos)->setPaper('A4', "landscape");
        return $pdf->stream("lista_cobranza_cuotas.pdf"); // ver
        // return $pdf->stream("credito_directo.pdf"); // ver
        // print_r($data);
    }

    public function validar_venta_anticipo(CajaDiariaDetalleInterface $repo, Request $request) {
        $data = $request->all();
        $result = $repo->get_segunda_venta_credito($data["cCodConsecutivo"], $data["nConsecutivo"]);
        return response()->json($result);
    }

    public function obtener_data_reporte($data, $repo_orden) {
        $where = "";
        if(!empty($data["idcobrador"])) {
            $where .= " AND s.idCobrador={$data["idcobrador"]}";
        }

        if(!empty($data["idtienda"])) {
            $where .= " AND c.nCodTienda={$data["idtienda"]}";
        }

        if(!empty($data["tipo_solicitud"])) {
            $where .= " AND s.tipo_solicitud={$data["tipo_solicitud"]}";
        }

        $fecha_actual = date("Y-m-d");
        $cambio = $repo_orden->cambio_tipo_venta("2", $fecha_actual);
        $tipo_cambio = (float)$cambio[0]->tipo_cambio_venta;

        $result = array();

        $sql = "SELECT s.cCodConsecutivo, s.nConsecutivo, s.saldo, count(*) AS cuotas FROM ERP_Solicitud AS s
        INNER JOIN ERP_Consecutivos AS c ON(c.cCodConsecutivo=s.cCodConsecutivo)
        INNER JOIN ERP_SolicitudCronograma AS sc ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
        WHERE s.estado NOT IN(5, 10) AND isnull(sc.dias_mora, 0) = 0 AND s.saldo > 0 {$where}
        GROUP BY s.cCodConsecutivo, s.nConsecutivo, s.saldo";

        $cuentas_vencer = DB::select($sql);
        $total_cuentas_vencer = 0;

        foreach ($cuentas_vencer as $key => $value) {
            $total_cuentas_vencer += (float) $value->saldo;
        }

        $result["cuentas_vencer"]["monto_soles"] = number_format($total_cuentas_vencer, 2);
        $result["cuentas_vencer"]["monto_dolares"] = number_format($total_cuentas_vencer / $tipo_cambio, 2);
        $result["cuentas_vencer"]["clientes"] = count($cuentas_vencer);
        $result["cuentas_vencer"]["mora_porcentaje"] = 0;


        $sql = "SELECT s.cCodConsecutivo, s.nConsecutivo, s.saldo, count(*) AS cuotas FROM ERP_Solicitud AS s
        INNER JOIN ERP_Consecutivos AS c ON(c.cCodConsecutivo=s.cCodConsecutivo)
        INNER JOIN ERP_SolicitudCronograma AS sc ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
        WHERE s.estado NOT IN(5, 10) AND isnull(sc.dias_mora, 0) > 0 AND s.saldo > 0 {$where}
        GROUP BY s.cCodConsecutivo, s.nConsecutivo, s.saldo";

        $cuentas_vencidas = DB::select($sql);
        $total_cuentas_vencidas = 0;

        foreach ($cuentas_vencidas as $key => $value) {
            $total_cuentas_vencidas += (float) $value->saldo;
        }

        $total_general = $total_cuentas_vencer + $total_cuentas_vencidas;
        $total_clientes = count($cuentas_vencer) + count($cuentas_vencidas);

        $result["cuentas_vencidas"]["monto_soles"] = number_format($total_cuentas_vencidas, 2);
        $result["cuentas_vencidas"]["monto_dolares"] = number_format($total_cuentas_vencidas / $tipo_cambio, 2);
        $result["cuentas_vencidas"]["clientes"] = count($cuentas_vencidas);
        $result["cuentas_vencidas"]["mora_porcentaje"] = number_format($total_cuentas_vencidas / $total_general, 2) * 100;


        $sql = "SELECT s.cCodConsecutivo, s.nConsecutivo, s.saldo, count(*) AS cuotas FROM ERP_Solicitud AS s
        INNER JOIN ERP_Consecutivos AS c ON(c.cCodConsecutivo=s.cCodConsecutivo)
        INNER JOIN ERP_SolicitudCronograma AS sc ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
        WHERE s.estado NOT IN(5, 10) AND isnull(sc.dias_mora, 0) BETWEEN 1 AND 8 AND s.saldo > 0 {$where}
        GROUP BY s.cCodConsecutivo, s.nConsecutivo, s.saldo";

        $de_1_8 = DB::select($sql);
        $total_de_1_8 = 0;

        foreach ($de_1_8 as $key => $value) {
            $total_de_1_8 += (float) $value->saldo;
        }
       
        $result["de_1_8"]["monto_soles"] = number_format($total_de_1_8, 2);
        $result["de_1_8"]["monto_dolares"] = number_format($total_de_1_8 / $tipo_cambio, 2);
        $result["de_1_8"]["clientes"] = count($de_1_8);
        $result["de_1_8"]["mora_porcentaje"] = number_format($total_de_1_8 / $total_general, 2) * 100;


        $sql = "SELECT s.cCodConsecutivo, s.nConsecutivo, s.saldo, count(*) AS cuotas FROM ERP_Solicitud AS s
        INNER JOIN ERP_Consecutivos AS c ON(c.cCodConsecutivo=s.cCodConsecutivo)
        INNER JOIN ERP_SolicitudCronograma AS sc ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
        WHERE s.estado NOT IN(5, 10) AND isnull(sc.dias_mora, 0) BETWEEN 9 AND 30 AND s.saldo > 0 {$where}
        GROUP BY s.cCodConsecutivo, s.nConsecutivo, s.saldo";

        $de_9_30 = DB::select($sql);
        $total_de_9_30 = 0;

        foreach ($de_9_30 as $key => $value) {
            $total_de_9_30 += (float) $value->saldo;
        }
       
        $result["de_9_30"]["monto_soles"] = number_format($total_de_9_30, 2);
        $result["de_9_30"]["monto_dolares"] = number_format($total_de_9_30 / $tipo_cambio, 2);
        $result["de_9_30"]["clientes"] = count($de_9_30);
        $result["de_9_30"]["mora_porcentaje"] = number_format($total_de_9_30 / $total_general, 2) * 100;

        
        $sql = "SELECT s.cCodConsecutivo, s.nConsecutivo, s.saldo, count(*) AS cuotas FROM ERP_Solicitud AS s
        INNER JOIN ERP_Consecutivos AS c ON(c.cCodConsecutivo=s.cCodConsecutivo)
        INNER JOIN ERP_SolicitudCronograma AS sc ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
        WHERE s.estado NOT IN(5, 10) AND isnull(sc.dias_mora, 0) BETWEEN 31 AND 60 AND s.saldo > 0 {$where}
        GROUP BY s.cCodConsecutivo, s.nConsecutivo, s.saldo";

        $de_31_60 = DB::select($sql);
        $total_de_31_60 = 0;

        foreach ($de_31_60 as $key => $value) {
            $total_de_31_60 += (float) $value->saldo;
        }
       
        $result["de_31_60"]["monto_soles"] = number_format($total_de_31_60, 2);
        $result["de_31_60"]["monto_dolares"] = number_format($total_de_31_60 / $tipo_cambio, 2);
        $result["de_31_60"]["clientes"] = count($de_31_60);
        $result["de_31_60"]["mora_porcentaje"] = number_format($total_de_31_60 / $total_general, 2) * 100;


        $sql = "SELECT s.cCodConsecutivo, s.nConsecutivo, s.saldo, count(*) AS cuotas FROM ERP_Solicitud AS s
        INNER JOIN ERP_Consecutivos AS c ON(c.cCodConsecutivo=s.cCodConsecutivo)
        INNER JOIN ERP_SolicitudCronograma AS sc ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
        WHERE s.estado NOT IN(5, 10) AND isnull(sc.dias_mora, 0) BETWEEN 61 AND 90 AND s.saldo > 0 {$where}
        GROUP BY s.cCodConsecutivo, s.nConsecutivo, s.saldo";

        $de_61_90 = DB::select($sql);
        $total_de_61_90 = 0;

        foreach ($de_61_90 as $key => $value) {
            $total_de_61_90 += (float) $value->saldo;
        }
       
        $result["de_61_90"]["monto_soles"] = number_format($total_de_61_90, 2);
        $result["de_61_90"]["monto_dolares"] = number_format($total_de_61_90 / $tipo_cambio, 2);
        $result["de_61_90"]["clientes"] = count($de_61_90);
        $result["de_61_90"]["mora_porcentaje"] = number_format($total_de_61_90 / $total_general, 2) * 100;

        $sql = "SELECT s.cCodConsecutivo, s.nConsecutivo, s.saldo, count(*) AS cuotas FROM ERP_Solicitud AS s
        INNER JOIN ERP_Consecutivos AS c ON(c.cCodConsecutivo=s.cCodConsecutivo)
        INNER JOIN ERP_SolicitudCronograma AS sc ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
        WHERE s.estado NOT IN(5, 10) AND isnull(sc.dias_mora, 0) BETWEEN 91 AND 120 AND s.saldo > 0 {$where}
        GROUP BY s.cCodConsecutivo, s.nConsecutivo, s.saldo";

        $de_91_120 = DB::select($sql);
        $total_de_91_120 = 0;

        foreach ($de_91_120 as $key => $value) {
            $total_de_91_120 += (float) $value->saldo;
        }
       
        $result["de_91_120"]["monto_soles"] = number_format($total_de_91_120, 2);
        $result["de_91_120"]["monto_dolares"] = number_format($total_de_91_120 / $tipo_cambio, 2);
        $result["de_91_120"]["clientes"] = count($de_91_120);
        $result["de_91_120"]["mora_porcentaje"] = number_format($total_de_91_120 / $total_general, 2) * 100;

        $sql = "SELECT s.cCodConsecutivo, s.nConsecutivo, s.saldo, count(*) AS cuotas FROM ERP_Solicitud AS s
        INNER JOIN ERP_Consecutivos AS c ON(c.cCodConsecutivo=s.cCodConsecutivo)
        INNER JOIN ERP_SolicitudCronograma AS sc ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
        WHERE s.estado NOT IN(5, 10) AND isnull(sc.dias_mora, 0) BETWEEN 121 AND 150 AND s.saldo > 0 {$where}
        GROUP BY s.cCodConsecutivo, s.nConsecutivo, s.saldo";

        $de_121_150 = DB::select($sql);
        $total_de_121_150 = 0;

        foreach ($de_121_150 as $key => $value) {
            $total_de_121_150 += (float) $value->saldo;
        }
       
        $result["de_121_150"]["monto_soles"] = number_format($total_de_121_150, 2);
        $result["de_121_150"]["monto_dolares"] = number_format($total_de_121_150 / $tipo_cambio, 2);
        $result["de_121_150"]["clientes"] = count($de_121_150);
        $result["de_121_150"]["mora_porcentaje"] = number_format($total_de_121_150 / $total_general, 2) * 100;


        $sql = "SELECT s.cCodConsecutivo, s.nConsecutivo, s.saldo, count(*) AS cuotas FROM ERP_Solicitud AS s
        INNER JOIN ERP_Consecutivos AS c ON(c.cCodConsecutivo=s.cCodConsecutivo)
        INNER JOIN ERP_SolicitudCronograma AS sc ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
        WHERE s.estado NOT IN(5, 10) AND isnull(sc.dias_mora, 0) BETWEEN 151 AND 270 AND s.saldo > 0 {$where}
        GROUP BY s.cCodConsecutivo, s.nConsecutivo, s.saldo";

        $de_151_270 = DB::select($sql);
        $total_de_151_270 = 0;

        foreach ($de_151_270 as $key => $value) {
            $total_de_151_270 += (float) $value->saldo;
        }
       
        $result["de_151_270"]["monto_soles"] = number_format($total_de_151_270, 2);
        $result["de_151_270"]["monto_dolares"] = number_format($total_de_151_270 / $tipo_cambio, 2);
        $result["de_151_270"]["clientes"] = count($de_151_270);
        $result["de_151_270"]["mora_porcentaje"] = number_format($total_de_151_270 / $total_general, 2) * 100;


        $sql = "SELECT s.cCodConsecutivo, s.nConsecutivo, s.saldo, count(*) AS cuotas FROM ERP_Solicitud AS s
        INNER JOIN ERP_Consecutivos AS c ON(c.cCodConsecutivo=s.cCodConsecutivo)
        INNER JOIN ERP_SolicitudCronograma AS sc ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
        WHERE s.estado NOT IN(5, 10) AND isnull(sc.dias_mora, 0) BETWEEN 271 AND 360 AND s.saldo > 0 {$where}
        GROUP BY s.cCodConsecutivo, s.nConsecutivo, s.saldo";

        $de_271_360 = DB::select($sql);
        $total_de_271_360 = 0;

        foreach ($de_271_360 as $key => $value) {
            $total_de_271_360 += (float) $value->saldo;
        }
       
        $result["de_271_360"]["monto_soles"] = number_format($total_de_271_360, 2);
        $result["de_271_360"]["monto_dolares"] = number_format($total_de_271_360 / $tipo_cambio, 2);
        $result["de_271_360"]["clientes"] = count($de_271_360);
        $result["de_271_360"]["mora_porcentaje"] = number_format($total_de_271_360 / $total_general, 2) * 100;


        $sql = "SELECT s.cCodConsecutivo, s.nConsecutivo, s.saldo, count(*) AS cuotas FROM ERP_Solicitud AS s
        INNER JOIN ERP_Consecutivos AS c ON(c.cCodConsecutivo=s.cCodConsecutivo)
        INNER JOIN ERP_SolicitudCronograma AS sc ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
        WHERE s.estado NOT IN(5, 10) AND isnull(sc.dias_mora, 0) > 361 AND s.saldo > 0 {$where}
        GROUP BY s.cCodConsecutivo, s.nConsecutivo, s.saldo";

        $de_361 = DB::select($sql);
        $total_de_361 = 0;

        foreach ($de_361 as $key => $value) {
            $total_de_361 += (float) $value->saldo;
        }
       
        $result["de_361"]["monto_soles"] = number_format($total_de_361, 2);
        $result["de_361"]["monto_dolares"] = number_format($total_de_361 / $tipo_cambio, 2);
        $result["de_361"]["clientes"] = count($de_361);
        $result["de_361"]["mora_porcentaje"] = number_format($total_de_361 / $total_general, 2) * 100;

        return $result;
    }

    public function ver_reporte_avance_morosidad(Request $request, Orden_servicioInterface $repo_orden) {
        $data = $request->all();
        // print_r($data);
        $result = $this->obtener_data_reporte($data, $repo_orden);

        return response()->json($result);

    }

    public function imprimir_avance_morosidad(Request $request, Orden_servicioInterface $repo_orden, CajaDiariaDetalleInterface $repo_caja, ShopInterface $shop_repo) {
        $data = $request->all();
        $result = $this->obtener_data_reporte($data, $repo_orden);
        $datos = array();
        $datos["data"] = $result;
        $datos["empresa"] = $repo_caja->get_empresa(); 
        $tienda = "TODAS LAS TIENDAS";
        if(!empty($data["idtienda"])) {
            $tienda = $shop_repo->find($data["idtienda"])[0]->descripcion;
        }

        $fecha_actual = date("Y-m-d");
        $cambio = $repo_orden->cambio_tipo_venta("2", $fecha_actual);
        $tipo_cambio = (float)$cambio[0]->tipo_cambio_venta;

        // echo "<pre>";
        // print_r($datos);
        $datos["tienda"] = $tienda;
        $datos["tipo_cambio"] = number_format($tipo_cambio, 4);
        $pdf = PDF::loadView("reportes.avance_morosidad", $datos);
        return $pdf->stream("avance_morosidad.pdf"); // ver


    }

    public function validar_ticket_pago_cuota(Request $request, VentasInterface $repo, CajaDiariaDetalleInterface $repo_caja_diara_detalle) {
        $data = $request->all();
        $array = explode("|", $data["id"]);
        $cCodConsecutivo = $array[0];
        $nConsecutivo = $array[1];
        $idventa = $array[2];

       

        $parametro_cuota = $repo_caja_diara_detalle->get_parametro_cuota();

        if(count($parametro_cuota) <= 0) {
            throw new Exception("Por favor cree el parametro con el id del producto de tipo cuota!");
        }

        $ticket_pago_cuota = $repo->obtener_ticket_pago_cuota($idventa, $parametro_cuota[0]->value);
        return response()->json($ticket_pago_cuota);
    }

    public function validar_nota(Request $request, VentasInterface $repo) {
        $data = $request->all();

        $validar = $repo->validar_nota($data["idventa"]);
        return response()->json($validar);
    }
  
}
