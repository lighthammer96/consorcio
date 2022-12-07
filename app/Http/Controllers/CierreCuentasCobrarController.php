<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\CierreCuentasCobrar\CierreCuentasCobrarTrait;
use App\Http\Recopro\View_cierre_cuentas_cobrar\View_cierre_cuentas_cobrarTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\CierreCuentasCobrar\CierreCuentasCobrarInterface;
use App\Http\Recopro\Periodo\PeriodoInterface;
use App\Http\Recopro\VW_CierreInventarioPeriodo\VW_CierreInventarioPeriodoInterface;
use App\Http\Recopro\Register_movement\Register_movementInterface;
use App\Http\Recopro\View_cierre_cuentas_cobrar\View_cierre_cuentas_cobrarInterface;
use App\Http\Recopro\Movimiento_Articulo_cierre\Movimiento_Articulo_cierreInterface;
use App\Http\Recopro\Movimiento_Detalle_cierre\Movimiento_Detalle_cierreInterface;
use App\Http\Recopro\Query_stock\Query_stockInterface;
use App\Http\Recopro\Solicitud_cierre\Solicitud_cierreInterface;
use App\Http\Requests\Movimiento_cierreRequest;
use DB;
class CierreCuentasCobrarController extends Controller
{
     use View_cierre_cuentas_cobrarTrait;

    public function __construct() 
    {
//        $this->middleware('json');
    } 
       public function pdf(Request $request, VW_CierreInventarioPeriodoInterface $repo, Query_stockInterface $repoStoc)
    {       
            date_default_timezone_set('America/Lima');
            $fechacA= date("d/m/Y");
            $s = "a";
            $porciones="";
            $perido_busquedad = $request->input('periodo');
            $estado = $request->input('estado');
            if(!empty($perido_busquedad)){
                $porciones = explode("*", $perido_busquedad);
                $porciones=$porciones[0];
            }
            $simboloMoneda = $repoStoc->getSimboloMoneda();
              $img='logo.jpg';
            $path = public_path('img/' . $img);
            $type_image = pathinfo($path, PATHINFO_EXTENSION);
            $image = file_get_contents($path);
            $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);
            $data =$repo->search_periodo($porciones);
            return response()->json([
                'status' => true,
                'data' => $data,
                'fechacA'=>$fechacA,
                'simboloMoneda'=>$simboloMoneda,
                 'img'=>$image,
                   'periodo'=>$porciones,
                   'estado'=>$estado,
            ]);
    }
    public function findMov($id, CierreCuentasCobrarInterface $repo)
    {
        try {
          
            $data = $repo->find_moviCierre($id);
            $periodos = $repo->getPeriodos();
            return response()->json([
                'status' => true,
                'data' => $data,
                'periodos'=>$periodos,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function list_movimientosCerrados(Request $request, VW_CierreInventarioPeriodoInterface $repo)
    {
        $s = $request->input('search', '');
        // $estado_busquedad = $request->input('estado_busquedad');
        // $idMovimientoBusquedad = $request->input('idMovimientoBusquedad');
        $perido_busquedad = $request->input('perido_busquedad');
        $params =  ['code_article','id','Articulo','Unidad','Almacen','Localizacion','Lote','Serie','Disponible','Transito','Remitido','Total','CostoCierre','Periodo'];

        if($perido_busquedad==''){
           return parseList($repo->search($s,''), $request, 'id', $params);
        }else{
            $perido_busquedad = $request->input('perido_busquedad');
            $porciones = explode("*", $perido_busquedad);
            return parseList($repo->search($s,$porciones[0]), $request, 'id', $params);
        }
       
    }
    public function all(Request $request, View_cierre_cuentas_cobrarInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['periodo','estado'];
        return parseList($repo->search($s), $request, 'periodo', $params);
    }
    public function createUpdate($id, PeriodoInterface $repo, Request $request)
    {
       
        try {
            $data = $request->all();
            $periodo = $data['periodo'];
            $porciones = explode("*", $periodo);
            $estado = $data['estado'];
            $repo->update_cc($porciones[0]);
            DB::commit();
            return response()->json([
                'status' => true,
                // 'code' => $idMovimiento
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    } 

    
    public function reversarCierre($id, CierreCuentasCobrarInterface $repo, Request $request, View_cierre_cuentas_cobrarInterface $repoView,PeriodoInterface $peri)
    {
       
        try {
            $data = $request->all();
            $reversar=$repo->reversarMovimientos($id);
            $peri->update_cc_mr($id);
            DB::commit();
            return response()->json([
                'status' => true,
                // 'code' => $idMovimiento
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    } 
     public function createUpdatePreCierre($id, CierreCuentasCobrarInterface $repo, Request $request,View_cierre_cuentas_cobrarInterface $repoView,Movimiento_Articulo_cierreInterface $repoArCie,Movimiento_Detalle_cierreInterface $repoArDetalle, PeriodoInterface $repoPeri)
    {
       
        try {
                $data = $request->all();
                // print_r($data); exit;
                $periodo = $data['periodo'];
                $estado = $data['estado'];
                $array = explode("-", $periodo);
                $anio = intval($array[0]);
                $mes = intval($array[1]);
                
                $w = $repoView->findByCode($periodo);
                if ($w) {
                    throw new \Exception('Ya existe un cierre en ese periodo. Por favor ingrese otro periodo.');
                }
                
                $sql_statement = "
                INSERT INTO dbo.ERP_Solicitud_cierre 
                SELECT cCodConsecutivo, nConsecutivo, fecha_solicitud, tipo_solicitud, origen, idconvenio, idvendedor, idcliente, idmoneda, 
                estado, fecha_vencimiento, descuento_id, t_porcentaje_descuento, t_monto_descuento, t_monto_subtotal, t_monto_exonerado, 
                t_monto_afecto, t_monto_inafecto, t_impuestos, t_monto_total, monto_descuento_detalle, subtotal_detalle, 
                monto_exonerado_detalle, monto_afecto_detalle, monto_inafecto_detalle, impuestos_detalle, monto_total_detalle, 
                user_created, user_updated, user_deleted, created_at, updated_at, deleted_at, comentarios, IdTipoDocumento, t_nOperGratuita, 
                cCodConsecutivoO, nConsecutivoO, intereses, saldo, facturado, pagado, idCobrador, nomora, tipo, condicion_pago, 
                comentario_aprobacion, int_moratorio, pagado_mora, saldo_mora, comentario_facturacion, descripcion_adicional_clausula, 
                fecha_calc_mora, '{$periodo}' AS periodo FROM dbo.ERP_Solicitud 
                WHERE FORMAT(fecha_solicitud, 'yyyy')={$anio} AND FORMAT(fecha_solicitud, 'MM')={$mes};
                
                INSERT INTO dbo.ERP_SolicitudCredito_cierre 
                SELECT sc.cCodConsecutivo, sc.nConsecutivo, sc.idconyugue, sc.idfiador, sc.idfiadorconyugue, sc.monto_venta, sc.intereses, sc.cuota_inicial, 
                sc.fecha_pago_inicial, sc.valor_cuota, sc.nro_cuotas, sc.total_financiado, sc.dia_pago, sc.fecha_iniciopago, sc.tipo_vivienda, sc.propietario, 
                sc.monto_alquiler, sc.profesion, sc.centro_trabajo, sc.cargo, sc.tiempo_laboral, sc.direccion_trabajo, sc.razon_social_negocio, sc.actividad_negocio, 
                sc.direccion_negocio, sc.ingreso_neto_mensual, sc.ingreso_neto_conyugue, sc.otros_ingresos, sc.total_ingresos, sc.tipo_vivienda_fiador, 
                sc.propietario_fiador, sc.monto_alquiler_fiador, sc.profesion_fiador, sc.centro_trabajo_fiador, sc.cargo_fiador, sc.tiempo_laboral_fiador, 
                sc.direccion_trabajo_fiador, sc.razon_social_negocio_fiador, sc.actividad_negocio_fiador, sc.direccion_negocio_fiador, 
                sc.ingreso_neto_mensual_fiador, sc.ingreso_neto_conyugue_fiador, sc.otros_ingresos_fiador, sc.total_ingresos_fiador, sc.user_created, 
                sc.user_updated, sc.user_deleted, sc.created_at, sc.updated_at, sc.deleted_at, sc.valor_cuota_final, sc.cargo_independiente, 
                sc.tiempo_laboral_independiente, sc.cargo_independiente_fiador, sc.tiempo_laboral_independiente_fiador, sc.dia_vencimiento_cuota, '{$periodo}' AS periodo
                FROM dbo.ERP_SolicitudCredito AS sc
                INNER JOIN dbo.ERP_Solicitud AS s ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
                WHERE FORMAT(s.fecha_solicitud, 'yyyy')={$anio} AND FORMAT(s.fecha_solicitud, 'MM')={$mes};
                
                INSERT INTO dbo.ERP_SolicitudCronograma_cierre 
                SELECT sc.cCodConsecutivo, sc.nConsecutivo, sc.nrocuota, sc.fecha_vencimiento, sc.valor_cuota, sc.int_moratorio, sc.saldo_cuota, sc.monto_pago, 
                sc.user_created, sc.user_updated, sc.user_deleted, sc.created_at, sc.updated_at, sc.deleted_at, sc.dias_mora, sc.pagado_mora, sc.saldo_mora, '{$periodo}' AS periodo
                FROM dbo.ERP_SolicitudCronograma AS sc
                INNER JOIN dbo.ERP_Solicitud AS s ON(s.cCodConsecutivo=sc.cCodConsecutivo AND s.nConsecutivo=sc.nConsecutivo)
                WHERE FORMAT(s.fecha_solicitud, 'yyyy')={$anio} AND FORMAT(s.fecha_solicitud, 'MM')={$mes};
                
                INSERT INTO dbo.ERP_SolicitudNegociaMora_cierre 
                SELECT snm.idsolicitudmora, snm.cCodConsecutivo, snm.nConsecutivo, snm.nrocuota, snm.fechareg, snm.monto, snm.motivo, snm.user_created, 
                snm.user_updated, snm.user_deleted, snm.created_at, snm.updated_at, snm.deleted_at, '{$periodo}' AS periodo
                FROM dbo.ERP_SolicitudNegociaMora AS snm
                INNER JOIN dbo.ERP_Solicitud AS s ON(s.cCodConsecutivo=snm.cCodConsecutivo AND s.nConsecutivo=snm.nConsecutivo)
                WHERE FORMAT(s.fecha_solicitud, 'yyyy')={$anio} AND FORMAT(s.fecha_solicitud, 'MM')={$mes};
                
                UPDATE dbo.ERP_Periodo SET estado_cc='P' WHERE periodo='{$periodo}';";
                DB::statement($sql_statement);
                // $movimiento=$repo->getMovimientosCierre($periodo);
               
                // $movimiento_articulo=$repo->getMovimientosCierreArticulo($periodo);
            
                // $movimiento_articulo_detalle=$repo->getMovimientosCierreArticuloDetalle($periodo);
              
                // $repoPeri->update_pc($periodo);     
              
           
                DB::commit();
                return response()->json([
                    'status' => true,
                    // 'code' => $idMovimiento
                ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    } 
    public function data_form (CierreCuentasCobrarInterface $Repo)
    {
        
        $periodos = $Repo->getPeriodos();
       
        // print_r($dataredondeo); exit;
        return response()->json([
            'status' => true,
            'periodos' => $periodos,
        ]);
    }
    public function create(CierreCuentasCobrarInterface $repo, Request $request)
    {
        $data = $request->all();
        $table="ERP_Categoria";
        $id='idCategoria';
        $data['idCategoria'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['Categoria']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }
    public function getMovimientos($id, CierreCuentasCobrarInterface $repo)
    {
       try {
            $data = $repo->getMovimientosCierre($id);
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

    public function update(CierreCuentasCobrarInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['idCategoria'];
        $data['descripcion'] = strtoupper($data['Categoria']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(CierreCuentasCobrarInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(View_cierre_cuentas_cobrarInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CIERRE DE INVENTARIO', 'Cierre');
    }

    public function list_solicitudes(Request $request, Solicitud_cierreInterface $repo)
    {
        $data = $request->all();
        $s = $request->input('search', '');
        $array = explode("*", $data["periodo"]);
        $periodo = $array[0];
        $params = ['cCodConsecutivo', 'nConsecutivo', 'fecha_solicitud', 'tipo_solicitud', 'idconvenio', 'tipo_documento', 'numero_documento', 'moneda', 't_monto_total', 'pagado', 'saldo', 'facturado', 'estado', 'cliente'];
        // print_r($s); exit;
        return parseList($repo->search($s, $periodo), $request, 'cCodConsecutivo', $params);
    }
}
