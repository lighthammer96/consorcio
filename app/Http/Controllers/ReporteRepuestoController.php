<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\ReporteRepuesto\ReporteRepuestoTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\ReporteRepuesto\ReporteRepuestoInterface;
use App\Http\Recopro\Solicitud_Asignacion\Solicitud_AsignacionInterface;
use App\Http\Recopro\Query_movements\Query_movementsInterface;
use App\Http\Requests\ReporteRepuestoRequest;
class ReporteRepuestoController extends Controller
{
     use ReporteRepuestoTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ReporteRepuestoInterface $repo)
    {   
        ini_set('max_execution_time', '3000');
        set_time_limit(3000);
        
        $s = $request->input('search', '');
        $filtro_tienda = $request->input('filtro_tienda', '');

        $idClienteFiltro = $request->input('idClienteFiltro', '');
        $idVendedorFiltro = $request->input('idVendedorFiltro', '');
        $FechaInicioFiltro = $request->input('FechaInicioFiltro', '');
        $FechaFinFiltro = $request->input('FechaFinFiltro', '');
      
        $params =['origen', 'idventa_ca','monto_total','estado','documento_ven','cCodConsecutivo','nConsecutivo','serie_comprobante','numero_comprobante','razonsocial_cliente','vendedor','REPUESTO','ACEITE','SERVICIO','TERCEROS','fecha'];
        return parseList($repo->search($s,$filtro_tienda,$idClienteFiltro,$idVendedorFiltro,$FechaInicioFiltro,$FechaFinFiltro), $request, 'idtienda', $params);
    }

    public function create(ReporteRepuestoInterface $repo, ReporteRepuestoRequest $request)
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

    public function update(ReporteRepuestoInterface $repo, ReporteRepuestoRequest $request)
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

    public function destroy(ReporteRepuestoInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(ReporteRepuestoInterface $repo,Request $request)
    {
         $s = $request->input('search', '');
        $filtro_tienda = $request->input('filtro_tienda', '');
        $idClienteFiltro = $request->input('idClienteFiltro', '');
        $idVendedorFiltro = $request->input('idVendedorFiltro', '');
        $FechaInicioFiltro = $request->input('FechaInicioFiltro', '');
        $FechaFinFiltro = $request->input('FechaFinFiltro', '');

        return generateExcel($this->generateDataExcel($repo->allFiltro($s,$filtro_tienda,$idClienteFiltro,$idVendedorFiltro,$FechaInicioFiltro,$FechaFinFiltro)), 'LISTA DE REPORTE DE REPUESTOS', 'Repuestos');
    }
    public function pdf(ReporteRepuestoInterface $repo,Request $request,Query_movementsInterface $repom,Solicitud_AsignacionInterface $repcom)
    {
            $s = $request->input('search', '');
            $filtro_tienda = $request->input('filtro_tienda', '');
            $idClienteFiltro = $request->input('idClienteFiltro', '');
            $idVendedorFiltro = $request->input('idVendedorFiltro', '');
            $FechaInicioFiltro = $request->input('FechaInicioFiltro', '');
            $FechaFinFiltro = $request->input('FechaFinFiltro', '');

          
            $data =$repo->allFiltro($s,$filtro_tienda,$idClienteFiltro,$idVendedorFiltro,$FechaInicioFiltro,$FechaFinFiltro);

            
            $simboloMoneda = $repom->getSimboloMoneda();
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
                 'img'=>$image,
                 'simboloMoneda'=>$simboloMoneda,
                 'data'=>$data,
               
            ]);


    }
    //  public function pdf(Request $request, Query_movementsInterface $repo)
    // {       
    //         date_default_timezone_set('America/Lima');
    //         $fechacA= date("d/m/Y");
    //         $s = $request->input('search', '');
    //         $filtro_art =  $request->input('filtro_art');
    //         $filtro_idAlm =  $request->input('filtro_idAlm');
    //         $filtro_idLoc =  $request->input('filtro_idLoc');
    //         $filtro_cate =  $request->input('filtro_cate');
    //         $filtro_nat= $request->input('filtro_nat');
    //         $filtro_oper= $request->input('filtro_oper');
    //         $n_movimiento=$request->input('n_movimiento');
    //         $cod_lote=$request->input('cod_lote');
    //         $cod_serie=$request->input('cod_serie');
    //         $fecha_inicio=$request->input('fecha_inicio');
    //         $fecha_fin=$request->input('fecha_fin');
    //         $data = $repo->allFiltro($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate,$filtro_nat,$filtro_oper,$n_movimiento,$cod_lote,$cod_serie,$fecha_inicio,$fecha_fin);
    //         $simboloMoneda = $repo->getSimboloMoneda();
    //         // $operacion = $repo->get_movimiento($id);
    //         // $data = $repo->find($id); 
    //         // $data_movimiento_Articulo=$repo->get_movement_articulo_print($id);
    //         // $data_movimiento_lote=$repo->get_movemen_lote($id);
    //         // $data_movimiento_serie=$repo->get_movemen_Serie($id);
    //         // if($data['fecha_proceso']){
    //         //     $data['fecha_proceso']=date("d/m/Y", strtotime($data['fecha_proceso']));
    //         // }else{
    //         //    $data['fecha_proceso']=''; 
    //         // };
    //         // $data['fecha_impresion']=date("d/m/Y");
    //         // $img='logo.jpg';
    //         // $path = public_path('img/' . $img);
    //         // $type_image = pathinfo($path, PATHINFO_EXTENSION);
    //         // $image = file_get_contents($path);
    //         // $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);
    //         $img='logo.jpg';
    //         $path = public_path('img/' . $img);
    //         $type_image = pathinfo($path, PATHINFO_EXTENSION);
    //         $image = file_get_contents($path);
    //         $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);
    //         return response()->json([
    //             'status' => true,
    //             'filtro_art'=>$filtro_art,
    //             'filtro_idAlm'=>$filtro_idAlm,
    //             'filtro_idLoc'=>$filtro_idLoc,
    //             'filtro_cate'=>$filtro_cate,
    //             'filtro_nat'=>$filtro_nat,
    //             'filtro_oper'=>$filtro_oper,
    //             'n_movimiento'=>$n_movimiento,
    //             'cod_lote'=>$cod_lote,
    //             'cod_serie'=>$cod_serie,
    //             'fecha_inicio'=>$fecha_inicio,
    //             'fecha_fin'=>$fecha_fin,
    //             'data' => $data,
    //             'fechacA'=>$fechacA,
    //             'simboloMoneda'=>$simboloMoneda,
    //              'img'=>$image,
               
    //         ]);
    // }
}
