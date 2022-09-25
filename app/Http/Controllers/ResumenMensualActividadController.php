<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\ResumenMensualActividad\ResumenMensualActividadTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\ResumenMensualActividad\ResumenMensualActividadInterface;
use App\Http\Recopro\Query_movements\Query_movementsInterface;
use App\Http\Recopro\Solicitud_Asignacion\Solicitud_AsignacionInterface;
use App\Http\Recopro\Orden_servicio\Orden_servicioInterface;
use App\Http\Requests\ResumenMensualActividadRequest;
class ResumenMensualActividadController extends Controller
{
     use ResumenMensualActividadTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    
    public function all(Request $request, ResumenMensualActividadInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idCategoria', 'descripcion as Categoria','estado'];
        return parseList($repo->search($s), $request, 'idCategoria', $params);
    }

    public function create(ResumenMensualActividadInterface $repo, Request $request)
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

    public function update(ResumenMensualActividadInterface $repo, ResumenMensualActividadRequest $request)
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

    public function destroy(ResumenMensualActividadInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(ResumenMensualActividadInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CATEGORÍAS', 'Categoría');
    }
    public function excelMetas(ResumenMensualActividadInterface $repo,Request $request,Query_movementsInterface $repom,Solicitud_AsignacionInterface $repcom,Orden_servicioInterface $repOs)
    { 
            $idusu=auth()->id();
            $usuario=$repo->getUsuario($idusu);
            $fecha_actual=date("Y-m-d");
            $cambio=$repOs->cambio_tipo(2,$fecha_actual);
            $Anio = $request->input('Anio', '');
            $mes = $request->input('mes', '');
            $data_mensual =$repo->allReporteMensual($Anio,$mes);
            $data_orden =$repo->allReporteMensualOrden($Anio,$mes);
            $data_compania=$repcom->get_compania(); 
            $simboloMoneda = $repom->getSimboloMonedaTotal();

            return generateExcelMetas($this->generateDataExcel($repo->all()), 'RESUMEN MENSUAL DE ACTIVIDADES','Resumen', $idusu,$usuario,$fecha_actual,$cambio,$Anio,$mes,$data_mensual,$data_orden,$data_compania,$simboloMoneda);
       
       
    }
     public function pdf(ResumenMensualActividadInterface $repo,Request $request,Query_movementsInterface $repom,Solicitud_AsignacionInterface $repcom,Orden_servicioInterface $repOs)
    {
            $idusu=auth()->id();
            $usuario=$repo->getUsuario($idusu);
            $fecha_actual=date("Y-m-d");
            $cambio=$repOs->cambio_tipo(2,$fecha_actual);
            $Anio = $request->input('Anio', '');
            $mes = $request->input('mes', '');
            $data =$repo->allReporteMensual($Anio,$mes);
            $data_orden =$repo->allReporteMensualOrden($Anio,$mes);
            $data_compania=$repcom->get_compania(); 
            $simboloMoneda = $repom->getSimboloMonedaTotal();
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
                 'mes'=>$mes,
                 'Anio'=>$Anio,
                 'cambio'=>$cambio,
                 'usuario'=>$usuario,
                 'data_compania'=>$data_compania,
                 'data_orden'=>$data_orden,
               
            ]);


    }
}
