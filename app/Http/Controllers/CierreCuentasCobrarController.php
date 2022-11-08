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
            $repo->update_mc($porciones[0]);
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
            $peri->update_mr($id);
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
                print_r($data); exit;
                $periodo = $data['periodo'];
                $estado = $data['estado'];
                
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
                fecha_calc_mora, '2022-10' AS periodo FROM dbo.ERP_Solicitud 
                WHERE FORMAT(fecha_solicitud, 'yyyy')=2022 AND FORMAT(fecha_solicitud, 'MM')=10;";

                $movimiento=$repo->getMovimientosCierre($periodo);
               
                $movimiento_articulo=$repo->getMovimientosCierreArticulo($periodo);
            
                $movimiento_articulo_detalle=$repo->getMovimientosCierreArticuloDetalle($periodo);
              
                $repoPeri->update_pc($periodo);     
              
           
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
}
