<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;
use App\Http\Recopro\Register_movement\Register_movementTrait;
use App\Http\Recopro\Category\CategoryTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Category\CategoryInterface;
use App\Http\Recopro\Proforma\ProformaInterface;
use App\Http\Recopro\Currency\CurrencyInterface;
use App\Http\Recopro\Register_movement\Register_movementInterface;
use App\Http\Recopro\View_Movimiento_Conformidad_Compra\View_Movimiento_Conformidad_CompraInterface;
use App\Http\Recopro\Register_movement_Articulo\Register_movement_ArticuloInterface;
use App\Http\Recopro\Lot\LotInterface;
use App\Http\Recopro\Register_movement_Detalle\Register_movement_DetalleInterface;
use App\Http\Recopro\Register_Transfer_Articulo\Register_Transfer_ArticuloInterface;
use App\Http\Recopro\Serie\SerieInterface;
use App\Http\Recopro\Operation\OperationInterface;
use App\Http\Recopro\Ventas\VentasInterface;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use App\Http\Requests\ProformaRequest;
use DB; 
class ConformidadServicioController extends Controller
{
    use Register_movementTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    // public function all(Request $request, CategoryInterface $repo)
    // {
    //     $s = $request->input('search', '');
    //     $params = ['idCategoria', 'descripcion as Categoria','estado'];
    //     return parseList($repo->search($s), $request, 'idCategoria', $params);
    // }

    public function all(Request $request, View_Movimiento_Conformidad_CompraInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idTipoOperacion','idUsuario','estado','idMovimiento'];
        return parseList($repo->search_recepcionCompraConformidad($s), $request, '', $params);
    }

    public function excel(View_Movimiento_Conformidad_CompraInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all_orden_compraConformidad()), 'LISTA DE MOVIMIENTOS DE CONFORMIDAD DE SERVICIOS', 'Lista de movimientos');
    }
    
}
