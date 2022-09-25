<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\ReporteOrdenDiario\ReporteOrdenDiarioTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\ReporteOrdenDiario\ReporteOrdenDiarioInterface;
use App\Http\Requests\ReporteOrdenDiarioRequest;
class ReporteOrdenDiarioController extends Controller 
{
     use ReporteOrdenDiarioTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ReporteOrdenDiarioInterface $repo)
    {
        
        $s = $request->input('search', '');

        $idMarca = $request->input('idMarca', '');

        $idtipoveh = $request->input('idtipoveh', '');
      
        $FechaInicioFiltro = $request->input('FechaInicioFiltro', '');
        $FechaFinFiltro = $request->input('FechaFinFiltro', '');


        $params =  ['servicios', 'dFecRec','cCodConsecutivo','nConsecutivo','codigo_consecutivo','nKilometraje','odMo','pro_totaSer','pro_totalRepu','modelo_serie','marca_serie','idMarca_serie','modelo_vet','idMarca_vet','marca_vet','id_tipoveh','descripcion','cChasis','iAnioFab','cPlacaVeh','razonsocial_cliente','celular','telefono','correo_electronico','direccion'];
        return parseList($repo->search($s,$idMarca,$idtipoveh,$FechaInicioFiltro,$FechaFinFiltro), $request, 'idCategoria', $params);
    }
     public function data_form(ReporteOrdenDiarioInterface $repo)
    {
    ;
        $marcas=$repo->getMarcas();
        $tiposVehicu=$repo->getTipoVehi();
        return response()->json([ 
            'status' => true,
            'marcas' => $marcas,
            'tiposVehicu' => $tiposVehicu,
        ]);
    }
    public function create(ReporteOrdenDiarioInterface $repo, Request $request)
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

    public function update(ReporteOrdenDiarioInterface $repo, Request $request)
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

    public function destroy(ReporteOrdenDiarioInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(ReporteOrdenDiarioInterface $repo, Request $request)
    {
         date_default_timezone_set('America/Lima');
               // date_default_timezone_set('UTC');
          
            $fechacAc= date("d/m/Y H:i:s");


        $s = $request->input('search', '');

        $idMarca = $request->input('idMarca', '');

        $idtipoveh = $request->input('idtipoveh', '');

        $Marca = $request->input('Marca', '');

        $tipoveh = $request->input('tipoveh', '');
      
        $FechaInicioFiltro = $request->input('FechaInicioFiltro', '');
        $FechaFinFiltro = $request->input('FechaFinFiltro', '');

        return generateExcelOrdenSer($this->generateDataExcel($repo->allFiltro($s,$idMarca,$idtipoveh,$FechaInicioFiltro,$FechaFinFiltro)), 'REPORTE DE ORDENES DE SERVICIO',$Marca,$tipoveh,$FechaInicioFiltro,$FechaFinFiltro,$idMarca,$idtipoveh,$fechacAc,'Ordenes de servicio');
    }
}
