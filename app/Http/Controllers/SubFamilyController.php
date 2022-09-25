<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\SubFamily\SubFamilyTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\SubFamily\SubFamilyInterface;
use App\Http\Requests\SubFamilyRequest;
class SubFamilyController extends Controller
{
     use SubFamilyTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, SubFamilyInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idSubFamilia', 'descripcion as SubFamilia','estado','idFamilia'];
        return parseList($repo->search($s), $request, 'idSubFamilia', $params);
    }

    public function create(SubFamilyInterface $repo, SubFamilyRequest $request)
    {
        $data = $request->all();
        $table="ERP_SubFamilia";
        $id='idSubFamilia';
        $data['idSubFamilia'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['SubFamilia']);
        $data['idFamilia'] = $data['idFamilia'];
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

    public function update(SubFamilyInterface $repo, SubFamilyRequest $request)
    {
        $data = $request->all();
        $id = $data['idSubFamilia'];
        $data['descripcion'] = strtoupper($data['SubFamilia']);
        $data['idFamilia'] = $data['idFamilia'];
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function TraerSubFamilia($id, SubFamilyInterface $repo)
    {
       try {
            $data = $repo->TraerSubFamilia($id);

            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }


    public function destroy(SubFamilyInterface $repo, Request $request)
    {
        $id = $request->input('idSubFamilia');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(SubFamilyInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE SUB FAMILIAS', 'Sub Familias');
    }
}
