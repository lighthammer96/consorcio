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
use App\Http\Recopro\Register_movement\Register_movementInterface;
use App\Http\Recopro\Category\CategoryInterface;
use App\Http\Requests\CategoryRequest;
class DevolucionOrdenCompraController extends Controller
{
     use Register_movementTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, Register_movementInterface $repo)
    {
       $s = $request->input('search', '');
        $params = ['idTipoOperacion','idUsuario','estado','idMovimiento'];
        return parseList($repo->search_devolucionCompra($s), $request, '', $params);
    }
    

    public function create(CategoryInterface $repo, CategoryRequest $request)
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

    public function update(CategoryInterface $repo, CategoryRequest $request)
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

    public function destroy(CategoryInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(Register_movementInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all_devolucion_oc()), 'LISTA DE DEVOLUCIÓN A ORDENES DE COMPRA', 'Devolución');
    }
}
