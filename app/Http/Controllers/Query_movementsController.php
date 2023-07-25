<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Query_movements\Query_movementsTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Query_movements\Query_movementsInterface;
use App\Http\Requests\Query_movementsRequest;
use App\Http\Recopro\Solicitud_Asignacion\Solicitud_AsignacionInterface;
class Query_movementsController extends Controller
{
    use Query_movementsTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, Query_movementsInterface $repo)
    {
        $s = $request->input('search', '');
        $filtro_art = $request->input('filtro_art');
        $filtro_idAlm = $request->input('filtro_idAlm');
        $filtro_idLoc = $request->input('filtro_idLoc');
        $filtro_cate = $request->input('filtro_cate');
        $filtro_nat = $request->input('filtro_nat');
        $filtro_oper = $request->input('filtro_oper');
        $n_movimiento = $request->input('n_movimiento');
        $cod_lote = $request->input('cod_lote');
        $cod_serie = $request->input('cod_serie');
        $fecha_inicio = $request->input('fecha_inicio');
        $fecha_fin = $request->input('fecha_fin');

        $params = ['code_article','idTransaccion','id','fecha_registro','fecha_proceso_s','fecha_registro_s','idArticulo','Articulo','Unidad','Categoria','Tipo_Operacion','Naturaleza','Origen','idOrigen','Almacen','Localizacion','Cantidad','Costo_Unitario','Precio_Unitario','Costo_Total','Precio_Total','Lote','Serie', 'Obs'];
        return parseList($repo->search($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate,$filtro_nat,$filtro_oper,$n_movimiento,$cod_lote,$cod_serie,$fecha_inicio,$fecha_fin), $request, 'id', $params);
    }

    public function excel(Query_movementsInterface $repo,Request $request)
    {
        $s = $request->input('search', '');
        $filtro_art =  $request->input('filtro_art');
        $filtro_idAlm =  $request->input('filtro_idAlm');
        $filtro_idLoc =  $request->input('filtro_idLoc');
        $filtro_cate =  $request->input('filtro_cate');
        $filtro_nat= $request->input('filtro_nat');
        $filtro_oper= $request->input('filtro_oper');
        $n_movimiento=$request->input('n_movimiento');
        $cod_lote=$request->input('cod_lote');
        $cod_serie=$request->input('cod_serie');
        $fecha_inicio=$request->input('fecha_inicio');
        $fecha_fin=$request->input('fecha_fin');
        // print_R($filtro_art);
        return generateExcel($this->generateDataExcel($repo->allFiltro($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate,$filtro_nat,$filtro_oper,$n_movimiento,$cod_lote,$cod_serie,$fecha_inicio,$fecha_fin)), 'LISTA DE MOVIMIENTOS POR ARTICULOS', 'Articulo');
    }
    public function getDataFiltro(Query_movementsInterface $repo)
    {
        try {
            $data_almacen=$repo->get_almacen();
            $data_localizacion=$repo->get_localizacion();
            $data_categoria=$repo->get_categoria();
            $data_articulo=$repo->get_articulo();
            // $data_complete=$repo->get_data_complete();
            $data_tipoOperacion=$repo->get_tipoOperacion();
            $data_naturaleza=$repo->get_naturaleza();
            return response()->json([
                'status' => true,
                'd_Almacen' => $data_almacen,
                'd_localizacion'=>$data_localizacion,
                'd_categoria'=>$data_categoria,
                'd_articulo'=>$data_articulo,
                'd_tipoOperacion'=>$data_tipoOperacion,
                'd_naturaleza'=>$data_naturaleza,
                // 'data_complete'=>$data_complete,
            ]);
        } catch (\Exception $e) {
//            throw new \Exception($e);
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function pdf(Request $request,Solicitud_AsignacionInterface $repcom, Query_movementsInterface $repo)
    {
        date_default_timezone_set('America/Lima');
        $fechacA= date("d/m/Y");
        $s = $request->input('search', '');
        $filtro_art =  $request->input('filtro_art');
        $filtro_idAlm =  $request->input('filtro_idAlm');
        $filtro_idLoc =  $request->input('filtro_idLoc');
        $filtro_cate =  $request->input('filtro_cate');
        $filtro_nat= $request->input('filtro_nat');
        $filtro_oper= $request->input('filtro_oper');
        $n_movimiento=$request->input('n_movimiento');
        $cod_lote=$request->input('cod_lote');
        $cod_serie=$request->input('cod_serie');
        $fecha_inicio=$request->input('fecha_inicio');
        $fecha_fin=$request->input('fecha_fin');
        $data = $repo->allFiltro($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate,$filtro_nat,$filtro_oper,$n_movimiento,$cod_lote,$cod_serie,$fecha_inicio,$fecha_fin);
        $simboloMoneda = $repo->getSimboloMoneda();
        // $operacion = $repo->get_movimiento($id);
        // $data = $repo->find($id);
        // $data_movimiento_Articulo=$repo->get_movement_articulo_print($id);
        // $data_movimiento_lote=$repo->get_movemen_lote($id);
        // $data_movimiento_serie=$repo->get_movemen_Serie($id);
        // if($data['fecha_proceso']){
        //     $data['fecha_proceso']=date("d/m/Y", strtotime($data['fecha_proceso']));
        // }else{
        //    $data['fecha_proceso']='';
        // };
        // $data['fecha_impresion']=date("d/m/Y");
        // $img='logo.jpg';
        // $path = public_path('img/' . $img);
        // $type_image = pathinfo($path, PATHINFO_EXTENSION);
        // $image = file_get_contents($path);
        // $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);

        $data_compania=$repcom->get_compania();

        $path = public_path('/'.$data_compania[0]->ruta_logo);
        if(!file_exists($path)){
            $path = public_path('/img/a1.jpg');
        }

        $type_image = pathinfo($path, PATHINFO_EXTENSION);
        $image = file_get_contents($path);
        $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);
        return response()->json([
            'status' => true,
            'filtro_art'=>$filtro_art,
            'filtro_idAlm'=>$filtro_idAlm,
            'filtro_idLoc'=>$filtro_idLoc,
            'filtro_cate'=>$filtro_cate,
            'filtro_nat'=>$filtro_nat,
            'filtro_oper'=>$filtro_oper,
            'n_movimiento'=>$n_movimiento,
            'cod_lote'=>$cod_lote,
            'cod_serie'=>$cod_serie,
            'fecha_inicio'=>$fecha_inicio,
            'fecha_fin'=>$fecha_fin,
            'data' => $data,
            'fechacA'=>$fechacA,
            'simboloMoneda'=>$simboloMoneda,
            'img'=>$image,

        ]);
    }
}