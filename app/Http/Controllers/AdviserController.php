<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Adviser\AdviserTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Adviser\AdviserInterface;
use App\Http\Requests\AdviserRequest;
class AdviserController extends Controller
{
     use AdviserTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, AdviserInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'descripcion','estado'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(AdviserInterface $repo, Request $request)
    {
        $data = $request->all(); 
        $table="ERP_Asesores";
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

    public function update(AdviserInterface $repo,Request $request)
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

    public function destroy(AdviserInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(AdviserInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE ASESORES', 'ASESOR');
    }
}
