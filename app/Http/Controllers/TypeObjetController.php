<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\TypeObjet\TypeObjetTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\TypeObjet\TypeObjetInterface;
use App\Http\Requests\TypeObjetRequest;
class TypeObjetController extends Controller
{
     use TypeObjetTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, TypeObjetInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'descripcion','estado'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(TypeObjetInterface $repo, Request $request)
    {
        $data = $request->all();
        $table="ERP_TipoObjetivos";
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

    public function update(TypeObjetInterface $repo, Request $request)
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

    public function destroy(TypeObjetInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(TypeObjetInterface $repo)
    {
        return parseSelect($repo->all(), 'id', 'descripcion');
    }

    public function excel(TypeObjetInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE TIPOS DE OBJETIVOS', 'Tipo de Objetivos');
    }
}
