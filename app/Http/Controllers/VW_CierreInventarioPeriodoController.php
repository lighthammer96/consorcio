<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\VW_CierreInventarioPeriodo\VW_CierreInventarioPeriodoTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\VW_CierreInventarioPeriodo\VW_CierreInventarioPeriodoInterface;
use App\Http\Recopro\Query_stock\Query_stockInterface;
use App\Http\Requests\VW_CierreInventarioPeriodoRequest;
class VW_CierreInventarioPeriodoController extends Controller
{
     use VW_CierreInventarioPeriodoTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, VW_CierreInventarioPeriodoInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idCategoria', 'descripcion as Categoria','estado'];
        return parseList($repo->search($s), $request, 'idCategoria', $params);
    }

    public function create(VW_CierreInventarioPeriodoInterface $repo, VW_CierreInventarioPeriodoRequest $request)
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

    public function update(VW_CierreInventarioPeriodoInterface $repo, VW_CierreInventarioPeriodoRequest $request)
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

    public function destroy(VW_CierreInventarioPeriodoInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excelPerido(VW_CierreInventarioPeriodoInterface $repo,Query_stockInterface $repoStoc,Request $request)
    {

        // return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CATEGORÍAS', 'Categoría');
         date_default_timezone_set('America/Lima');
        $fechacA= date("d/m/Y");
        $simboloMoneda = $repoStoc->getSimboloMoneda();

        $perido_busquedad = $request->input('periodo');
        $estado = $request->input('estado');
        if(!empty($perido_busquedad)){
                $porciones = explode("*", $perido_busquedad);
                $porciones=$porciones[0];
        }
        $periodo=$porciones;

        return generateExcelMovimientoCierre($this->generateDataExcel($repo->allFiltro($porciones)), 'REPORTE DE CIERRE DE INVENTARIO PERIODO', 'Cierre de inventario',$fechacA,$simboloMoneda,$periodo,$estado);

    }
}
