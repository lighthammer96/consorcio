<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Movimiento_cierre\Movimiento_cierreTrait;
use App\Http\Recopro\View_movimiento_cierre\View_movimiento_cierreTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Movimiento_cierre\Movimiento_cierreInterface;
use App\Http\Recopro\Periodo\PeriodoInterface;
use App\Http\Recopro\VW_CierreInventarioPeriodo\VW_CierreInventarioPeriodoInterface;
use App\Http\Recopro\Register_movement\Register_movementInterface;
use App\Http\Recopro\View_movimiento_cierre\View_movimiento_cierreInterface;
use App\Http\Recopro\Movimiento_Articulo_cierre\Movimiento_Articulo_cierreInterface;
use App\Http\Recopro\Movimiento_Detalle_cierre\Movimiento_Detalle_cierreInterface;
use App\Http\Recopro\Query_stock\Query_stockInterface;
use App\Http\Requests\Movimiento_cierreRequest;
use DB;
class Movimiento_cierreController extends Controller
{
     use View_movimiento_cierreTrait;

    public function __construct() 
    {
//        $this->middleware('json');
    } 
       public function pdf(Request $request, VW_CierreInventarioPeriodoInterface $repo, Query_stockInterface $repoStoc)
    {       
        ini_set('max_execution_time', '3000');
        set_time_limit(3000);
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
    public function findMov($id, Movimiento_cierreInterface $repo)
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
    public function all(Request $request, View_movimiento_cierreInterface $repo)
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
    public function reversarCierre($id, Movimiento_cierreInterface $repo, Request $request, View_movimiento_cierreInterface $repoView,PeriodoInterface $peri)
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
     public function createUpdatePreCierre($id, Movimiento_cierreInterface $repo, Request $request,View_movimiento_cierreInterface $repoView,Movimiento_Articulo_cierreInterface $repoArCie,Movimiento_Detalle_cierreInterface $repoArDetalle, PeriodoInterface $repoPeri)
    {
       
        try {
            $data = $request->all();
            $periodo = $data['periodo'];
            $estado = $data['estado'];
            
            $w = $repoView->findByCode($periodo);
            if ($w) {
                throw new \Exception('Ya existe un cierre en ese periodo. Por favor ingrese otro periodo.');
            }
             
                $movimiento=$repo->getMovimientosCierre($periodo);
               
                $movimiento_articulo=$repo->getMovimientosCierreArticulo($periodo);
            
                $movimiento_articulo_detalle=$repo->getMovimientosCierreArticuloDetalle($periodo);
              
                $repoPeri->update_pc($periodo);     
                //  $dato=[];   
                //  $dato['idMovimiento'] = $row->idMovimiento;
                //  $dato['idTipoOperacion'] = $row->idTipoOperacion;
                //  $dato['fecha_registro'] = $row->fecha_registro;
                //  $dato['fecha_proceso'] = $row->fecha_proceso;
                //  $dato['idUsuario'] = $row->idUsuario;
                //  $dato['naturaleza'] = $row->naturaleza;
                //  $dato['observaciones'] = $row->observaciones;
                //  $dato['idMoneda'] = $row->idMoneda;
                //  $dato['cCodConsecutivo'] = $row->cCodConsecutivo;
                //  $dato['nConsecutivo'] = $row->nConsecutivo;
                //  $dato['periodo'] = $periodo;
                //  $dato['estado'] = 'P';
                //  $repo->create($dato);
                // };
          
           
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
    public function data_form (Movimiento_cierreInterface $Repo)
    {
        
        $periodos = $Repo->getPeriodos();
       
        // print_r($dataredondeo); exit;
        return response()->json([
            'status' => true,
            'periodos' => $periodos,
        ]);
    }
    public function create(Movimiento_cierreInterface $repo, Request $request)
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
    public function getMovimientos($id, Movimiento_cierreInterface $repo)
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

    public function update(Movimiento_cierreInterface $repo, Request $request)
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

    public function destroy(Movimiento_cierreInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(View_movimiento_cierreInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CIERRE DE INVENTARIO', 'Cierre');
    }
}
