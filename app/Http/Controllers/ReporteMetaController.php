<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\ReporteMeta\ReporteMetaTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\ReporteMeta\ReporteMetaInterface;
use App\Http\Recopro\Query_movements\Query_movementsInterface;
use App\Http\Recopro\Solicitud_Asignacion\Solicitud_AsignacionInterface;
use App\Http\Recopro\Orden_servicio\Orden_servicioInterface;
use App\Http\Requests\ReporteMetaRequest;
use PDF;

class ReporteMetaController extends Controller
{
     use ReporteMetaTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }
    public function data_form (Request $request, ReporteMetaInterface $repo)
    {   $usuario=auth()->id();
        $tiposObjetivos = $repo->getTiposObjetivos();
        return response()->json([
            'status' => true,
            'tiposObjetivos' => $tiposObjetivos,
        ]);
    }

    public function all(Request $request, ReporteMetaInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idCategoria', 'descripcion as Categoria','estado'];
        return parseList($repo->search($s), $request, 'idCategoria', $params);
    }

    public function create(ReporteMetaInterface $repo, Request $request)
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

    public function update(ReporteMetaInterface $repo, ReporteMetaRequest $request)
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

    public function destroy(ReporteMetaInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    // public function excelMes(ReporteMetaInterface $repo,Request $request)
    // {   
    //     $anio = $request->input('Anio','');
    //     $data=$repo->getDataAnio($anio);
    //     $data_meses=$repo->getDataAnioMeses($anio);
    //     $mes=[];
    //     foreach ($data_meses as $row){
    //       array_push($mes,$row->mes);    
    //     }
    //     return generateExcelMensual($data, 'REPORTE DE METAS MENSUAL', $mes);
    // }

     public function excelMes(ReporteMetaInterface $repo,Request $request)
    { 
        ini_set('max_execution_time', '3000');
        set_time_limit(3000);
        $anio = $request->input('Anio','');
        $data_info=$repo->getDataAnio($anio);
        $data_tecnico=$repo->getTecnico($anio);
        $data_metas=$repo->getTecnico_metas($anio);
        $data_meses=$repo->getDataAnioMeses($anio);
        $mantenimientos=$repo->getTiposMantenimiento();
        $mes=[];
        foreach ($data_meses as $row){
          array_push($mes,$row->mes);    
        }
        
        if(count($data_info)>0){
            // print_r($repo->all());
            //  exit;
            return generateExcelMensual($this->generateDataExcelMes($repo->all()), 'REPORTE DE METAS DIARIAS', $mes,$data_info,$anio,$data_tecnico,$data_metas,$mantenimientos);
        }else{
            return 'N';
        }
       
    }
     public function excelMesComple(ReporteMetaInterface $repo,Request $request)
    { 
        $anio = $request->input('Anio','');
        $data_info=$repo->getDataAnio($anio);
        $data_tecnico=$repo->getTecnico($anio);
        $data_metas=$repo->getTecnico_metas($anio);
        $data_meses=$repo->getDataAnioMeses($anio);
        // $mantenimientos=$repo->getTiposMantenimiento();
        $mes=[];
        foreach ($data_meses as $row){
          array_push($mes,$row->mes);    
        }
       
            return generateExcelMensualCompleto($this->generateDataExcelMes($repo->all()), 'REPORTE DE OBJETIVOS', $mes,$data_info,$anio,$data_tecnico,$data_metas);
        
       
    }

     public function pdf(ReporteMetaInterface $repo,Request $request,Query_movementsInterface $repom,Solicitud_AsignacionInterface $repcom,Orden_servicioInterface $repOs)
    {
            $idusu=auth()->id();
            $usuario=$repo->getUsuario($idusu);
            $fecha_actual=date("Y-m-d");
            $cambio=$repOs->cambio_tipo(2,$fecha_actual);
            $Anio = $request->input('Anio', '');
            $mes = $request->input('mes', '');
            $data =$repo->allReporteMensual($Anio,$mes);
            $data_orden =$repo->allReporteMensualOrden($Anio,$mes);
           
            $simboloMoneda = $repom->getSimboloMonedaTotal();
            $data_compania=$repcom->get_compania(); 

            $path = public_path('/'.$data_compania[0]->ruta_logo);
            if(!file_exists($path)){
                $path = public_path('/img/a1.jpg');
            }
            $path = public_path('/'.$data_compania[0]->ruta_logo);
            $type_image = pathinfo($path, PATHINFO_EXTENSION);
            $image = file_get_contents($path);
            $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);
            return response()->json([
                'status' => true,
                 'img'=>$image,
                 'simboloMoneda'=>$simboloMoneda,
                 'data'=>$data,
                 'mes'=>$mes,
                 'Anio'=>$Anio,
                 'cambio'=>$cambio,
                 'usuario'=>$usuario,
                 'data_compania'=>$data_compania,
                 'data_orden'=>$data_orden,
               
            ]);


    }

    public function reporte_objetivos($data, ReporteMetaInterface $repo) {

        //ST_Reporte_Objetivos 
        $array = explode("|", $data);
        $tipo_objetivo = $array[0];
        $fecha = $array[1];

        $datos = $repo->reporte_objetivos($tipo_objetivo, $fecha);
        
        
        $pdf = PDF::loadView("ReporteMeta.reporte_objetivos", $datos);
      
        // return $pdf->save("ficha_asociado.pdf"); // guardar
        // return $pdf->download("ficha_asociado.pdf"); // descargar
        return $pdf->stream("reporte_objetivos.pdf"); // v

        
        // $datos = 
    }
}
