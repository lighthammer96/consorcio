<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\RegisterOrdenCompra\RegisterOrdenCompraTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\RegisterOrdenCompra\RegisterOrdenCompraInterface;
use App\Http\Recopro\Currency\CurrencyInterface;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use App\Http\Recopro\Operation\OperationInterface;
use App\Http\Recopro\Product\ProductInterface;
use App\Http\Recopro\Lot\LotInterface;
use App\Http\Recopro\Localizacion\LocalizacionInterface;
use App\Http\Requests\RegisterOrdenCompraRequest;
use App\Http\Recopro\Serie\SerieInterface;
use App\Http\Recopro\Solicitud_Asignacion\Solicitud_AsignacionInterface;
use App\Http\Recopro\RegisterOrdenCompraArticulo\RegisterOrdenCompraArticuloInterface;
use App\Http\Recopro\ViewScomprArticulo\ViewScomprArticuloInterface;
use App\Http\Recopro\View_OrdenCompra\View_OrdenCompraInterface;
use App\Http\Recopro\SolicitudCompraArticulo\SolicitudCompraArticuloInterface;
use Carbon\Carbon;
use DB;

use Illuminate\Support\Facades\Storage;
class CancelarCerrarOcController extends Controller
{
     use RegisterOrdenCompraTrait;

    public function __construct() 
    {
//        $this->middleware('json');
    }
   
    public function all(Request $request, View_OrdenCompraInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id','cCodConsecutivo','nConsecutivo','iEstado','ident','created_at'];
        return parseList($repo->searchDocumentos($s), $request, 'id', $params);
    }
   

    public function create(RegisterOrdenCompraInterface $repo, RegisterOrdenCompraRequest $request)
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
   
    public function update(RegisterOrdenCompraInterface $repo, RegisterOrdenCompraRequest $request)
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


    public function excel(RegisterOrdenCompraInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE ORDENES DE COMPRA', 'Lista de ordenes de compra');
    }
    
    
    

    

   
   

   
  
     
}
