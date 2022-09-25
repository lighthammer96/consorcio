<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Group_ca\Group_caTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Group_ca\Group_caInterface;
use App\Http\Requests\Group_caRequest;
class Group_caController extends Controller
{
     use Group_caTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, Group_caInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'nombre','estado'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(Group_caInterface $repo, Request $request)
    {
        $data = $request->all();
        $table="ERP_GruposCA";
        $id='id';
        $data['id'] = $repo->get_consecutivo($table,$id);
        $data['nombre'] = strtoupper($data['nombre']);
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

    public function update(Group_caInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['id'];
        $data['nombre'] = strtoupper($data['nombre']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data);
        return response()->json(['Result' => 'OK']);
    }

    public function destroy(Group_caInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(Group_caInterface $repo)
    {
        return parseSelect($repo->allActive(), 'id', 'nombre'); 
    }

    public function excel(Group_caInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE GRUPOS', 'GRUPOS');
    }
}
