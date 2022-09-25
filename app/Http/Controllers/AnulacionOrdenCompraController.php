<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\AnulacionOrdenCompra\AnulacionOrdenCompraTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\AnulacionOrdenCompra\AnulacionOrdenCompraInterface;
use App\Http\Requests\AnulacionOrdenCompraRequest;
class AnulacionOrdenCompraController extends Controller
{
     use AnulacionOrdenCompraTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, AnulacionOrdenCompraInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['Total', 'IdMoneda','Moneda','razonsocialProveedor','idProveedor','idOrden', 'cCodConsecutivo','nConsecutivo','dFecRegistro','prioridad','dFecRequerida','ident','iEstado'];
        return parseList($repo->search($s), $request, 'idProveedor', $params);
    }

    public function create(AnulacionOrdenCompraInterface $repo, Request $request)
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

    
}
