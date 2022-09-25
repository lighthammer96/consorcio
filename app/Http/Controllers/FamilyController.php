<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Family\FamilyTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Family\FamilyInterface;
use App\Http\Requests\FamilyRequest;
class FamilyController extends Controller
{
     use FamilyTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, FamilyInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idFamilia', 'descripcion as Familia','estado'];
        return parseList($repo->search($s), $request, 'idFamilia', $params);
    }

    public function create(FamilyInterface $repo, FamilyRequest $request)
    {
        $data = $request->all();
        $table="ERP_Familia";
        $id='idFamilia';
        $data['idFamilia'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['Familia']);
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

    public function update(FamilyInterface $repo, FamilyRequest $request)
    {
        $data = $request->all();
        $id = $data['idFamilia'];
        $data['descripcion'] = strtoupper($data['Familia']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(FamilyInterface $repo, Request $request)
    {
        $id = $request->input('idFamilia');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(FamilyInterface $repo)
    {
        return parseSelect($repo->all(), 'idFamilia', 'descripcion');
    }

    public function excel(FamilyInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE FAMILIAS', 'Familias');
    }
}
