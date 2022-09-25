<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\TypeCostumer\TypeCostumerTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\TypeCostumer\TypeCostumerInterface;
use App\Http\Requests\TypeCostumerRequest;
class TypeCostumerController extends Controller
{
     use TypeCostumerTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, TypeCostumerInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'descripcion','estado'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(TypeCostumerInterface $repo, Request $request)
    {
        $data = $request->all();
        $table="ERP_TipoCliente";
        $id='id';
        $data['id'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['descripcion']);
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

    public function update(TypeCostumerInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['id'];
        $data['descripcion'] = strtoupper($data['descripcion']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(TypeCostumerInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(TypeCostumerInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE TIPOS DE CLIENTES', 'Clientes');
    }
}
