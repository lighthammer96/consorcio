<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Revision_ca\Revision_caTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Revision_ca\Revision_caInterface;
use App\Http\Requests\Revision_caRequest;
class Revision_caController extends Controller
{
     use Revision_caTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, Revision_caInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'nombre','idgrupo','estado'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(Revision_caInterface $repo,Request $request)
    {
        $data = $request->all();
        $table="ERP_RevisionCA";
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

    public function update(Revision_caInterface $repo, Request $request)
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

    public function destroy(Revision_caInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(Revision_caInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE REVISIONES', 'REVISIÓN');
    }
}
