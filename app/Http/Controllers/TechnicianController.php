<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Technician\TechnicianTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Technician\TechnicianInterface;
use App\Http\Requests\TechnicianRequest;
class TechnicianController extends Controller
{
     use TechnicianTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, TechnicianInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'descripcion','estado'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(TechnicianInterface $repo, Request $request)
    {
        $data = $request->all();
        $table="ERP_Tecnico";
        $id='id';
        $data['descripcion'] = strtoupper($data['descripcion']);
        $data['id'] = $repo->get_consecutivo($table,$id);
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

    public function update(TechnicianInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['id'];
        $data['descripcion'] = strtoupper($data['descripcion']);
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(TechnicianInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(TechnicianInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE TÉCNICOS', 'Técnicos');
    }
}
