<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Query_stock\Query_stockTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Query_stock\Query_stockInterface;
use App\Http\Requests\Query_stockRequest;
use App\Http\Recopro\Solicitud_Asignacion\Solicitud_AsignacionInterface;
class Query_stockController extends Controller
{
     use Query_stockTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, Query_stockInterface $repo)
    {
        $s = $request->input('search', '');
        $filtro_art = $request->input('filtro_art');
        $filtro_idAlm = $request->input('filtro_idAlm');
        $filtro_idLoc = $request->input('filtro_idLoc');
        $filtro_cate = $request->input('filtro_cate');
        $params = ['tipoCompraVenta','code_article','id','Articulo','Categoria','Unidad','Almacen','Localizacion','Lote','Serie','Disponible','Remitido','Total','Transito','Costo_Promedio_Unitario','Costo_Total', 'Chasis', 'Motor', 'Color', 'Ano'];
        // print_R($filtro_art);
        return parseList($repo->search($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate), $request, 'id', $params);
    }
    //  public function all(Request $request, Query_stockInterface $repo)
    // {
    //     $s = $request->input('search', '');
    //     $params = ['id','Articulo','Categoria','Unidad','Almacen','Localizacion','Lote','Serie','Disponible','Remitido','Total','Transito','Costo_Promedio_Unitario','Costo_Total'];
    //     return parseList($repo->search($s), $request, 'id', $params);
    // }

    public function excel(Query_stockInterface $repo, Request $request)
    {   $s = $request->input('search', '');
        $filtro_art =  $request->input('filtro_art');
        $filtro_idAlm =  $request->input('filtro_idAlm');
        $filtro_idLoc =  $request->input('filtro_idLoc');
        $filtro_cate =  $request->input('filtro_cate');
        return generateExcel($this->generateDataExcel($repo->allFiltro($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate)), 'LISTA DE ARTICULOS CON STOCK', 'Articulo');
    }
     public function getDataFiltro(Query_stockInterface $repo)
    {
        try {
            $data_almacen=$repo->get_almacen();
            $data_localizacion=$repo->get_localizacion();
            $data_categoria=$repo->get_categoria();
            $data_articulo=$repo->get_articulo();
            // $data_complete=$repo->get_data_complete();
            return response()->json([
                'status' => true,
                'd_Almacen' => $data_almacen,
                'd_localizacion'=>$data_localizacion,
                'd_categoria'=>$data_categoria,
                'd_articulo'=>$data_articulo,
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
    public function get_localizacion_al($id, Query_stockInterface $repo)
    {
        try {
            $data_almacen=$repo->get_id_almacen($id);
            $data = $repo->get_localizacion_almacen($data_almacen[0]->id);
            return response()->json([
                'status' => true,
                'localizaciones' => $data,
              
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
      public function pdf(Request $request,Solicitud_AsignacionInterface $repcom, Query_stockInterface $repo)
    {       
            date_default_timezone_set('America/Lima');
            $fechacA= date("d/m/Y");
            $s = $request->input('search', '');
            $filtro_art =  $request->input('filtro_art');
            $filtro_idAlm =  $request->input('filtro_idAlm');
            $filtro_idLoc =  $request->input('filtro_idLoc');
            $filtro_cate =  $request->input('filtro_cate');
            $simboloMoneda = $repo->getSimboloMoneda();
            //   $img='logo.jpg'; 
            // $path = public_path('img/' . $img);

            $data_compania=$repcom->get_compania(); 

            $path = public_path('/'.$data_compania[0]->ruta_logo);
            if(!file_exists($path)){
                $path = public_path('/img/a1.jpg');
            }

            $type_image = pathinfo($path, PATHINFO_EXTENSION);
            $image = file_get_contents($path);
            $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);
            $data =$repo->allFiltro($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate);
            return response()->json([
                'status' => true,
                'filtro_art'=>$filtro_art,
                'filtro_idAlm'=>$filtro_idAlm,
                'filtro_idLoc'=>$filtro_idLoc,
                'filtro_cate'=>$filtro_cate,
                'data' => $data,
                'fechacA'=>$fechacA,
                'simboloMoneda'=>$simboloMoneda,
                 'img'=>$image,
            ]);
    }
} 
