<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers; 

use App\Http\Recopro\ReporteComisiones\ReporteComisionesTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\ReporteComisiones\ReporteComisionesInterface;
use App\Http\Requests\ReporteComisionesRequest;
use App\Http\Recopro\Solicitud_Asignacion\Solicitud_AsignacionInterface;
use Illuminate\Support\Facades\DB;

class ReporteComisionesController extends Controller
{
     use ReporteComisionesTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ReporteComisionesInterface $repo)
    { 
        $s = $request->input('search', ''); 
        

        $idClienteFiltro = $request->input('idClienteFiltro', '');
        $idVendedorFiltro = $request->input('idVendedorFiltro', '');
        $FechaInicioFiltro = $request->input('FechaInicioFiltro', '');
        $FechaFinFiltro = $request->input('FechaFinFiltro', '');
        


        $params =  ['IdVendedor','Vendedor','IdCliente', 'Cliente','Documento','Numero', 'FechaDoc','Monto','TipoCambio','Moneda','PorcComision','ComisionSoles','CondPago','Vehiculo','Convenio','PrecioLista','Descuento'];
        return parseList($repo->search($s,$idClienteFiltro,$idVendedorFiltro,$FechaInicioFiltro,$FechaFinFiltro), $request, 'IdVendedor', $params);
    }

    


    public function destroy(ReporteComisionesInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(ReporteComisionesInterface $repo,Request $request)
    {
       
        $s = $request->input('search', '');
        // $filtro_tienda = $request->input('filtro_tienda', '');
        $idClienteFiltro = $request->input('idClienteFiltro', ''); 
        $idVendedorFiltro = $request->input('idVendedorFiltro', '');
        $FechaInicioFiltro = $request->input('FechaInicioFiltro', '');
        $FechaFinFiltro = $request->input('FechaFinFiltro', '');
         
        // $idcategoria = $request->input('idcategoria', '');

        // $idTipoSolicitud = $request->input('idTipoSolicitud', '');
        // $idConvenio = $request->input('idConvenio', '');

        $where = " 1=1 ";

        if(!empty($FechaInicioFiltro) && !empty($FechaFinFiltro)) {
            $where .= " AND FechaDoc BETWEEN '{$FechaInicioFiltro}' AND '{$FechaFinFiltro}'";
        }

        if(!empty($idClienteFiltro)) {
            $where .= " AND IdCliente={$idClienteFiltro}";
        }

        if(!empty($idVendedorFiltro)) {
            $where .= " AND IdVendedor={$idVendedorFiltro}";
        }

        $sql_vendedores = "SELECT IdVendedor, Vendedor FROM dbo.VTA_ReporteComision WHERE {$where} GROUP BY IdVendedor, Vendedor";
        $vendedores = DB::select($sql_vendedores);

        foreach ($vendedores as $key => $value) {
            $sql = "SELECT * FROM dbo.VTA_ReporteComision WHERE {$where} AND IdVendedor={$value->IdVendedor}";
            $vendedores[$key]->data = DB::select($sql);
        }
        // print_r($vendedores); exit;

        // $data_excel = $this->generateDataExcel($repo->allFiltro($s,$idClienteFiltro,$idVendedorFiltro,$FechaInicioFiltro,$FechaFinFiltro));
        // print_r($data_excel); exit;
        // return generateExcelComisiones($this->generateDataExcel($repo->allFiltro($s,$idClienteFiltro,$idVendedorFiltro,$FechaInicioFiltro,$FechaFinFiltro)), 'REPORTE DE COMISIONES ', 'COMISIONES');
        return generateExcelComisiones($vendedores, 'REPORTE DE COMISIONES', 'COMISIONES');
    }
    public function pdf(ReporteComisionesInterface $repo,Solicitud_AsignacionInterface $repcom,Request $request)
    {   
         $s = $request->input('search', '');
        $filtro_tienda = $request->input('filtro_tienda', '');
        $idClienteFiltro = $request->input('idClienteFiltro', '');
        $idVendedorFiltro = $request->input('idVendedorFiltro', '');
        $FechaInicioFiltro = $request->input('FechaInicioFiltro', '');
        $FechaFinFiltro = $request->input('FechaFinFiltro', '');
         $idcategoria = $request->input('idcategoria', '');

        $idTipoSolicitud = $request->input('idTipoSolicitud', '');
        $idConvenio = $request->input('idConvenio', '');

            $data_compania=$repcom->get_compania(); 
         
            $path = public_path('/'.$data_compania[0]->ruta_logo);
            if(!file_exists($path)){
                $path = public_path('/img/a1.jpg');
            }
            $type_image = pathinfo($path, PATHINFO_EXTENSION);
            $image = file_get_contents($path);
            $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);
           
        $data = $this->generateDataExcel2($repo->allFiltro($s,$filtro_tienda,$idClienteFiltro,$idVendedorFiltro,$FechaInicioFiltro,$FechaFinFiltro,$idcategoria,$idTipoSolicitud,$idConvenio));
        return generateDataPDFVC($data, 'landscape', $image);
    } 
} 
