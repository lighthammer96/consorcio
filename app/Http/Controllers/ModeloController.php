<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Modelo\ModeloTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Modelo\ModeloInterface;
use App\Http\Requests\ModeloRequest;
class ModeloController extends Controller
{
     use ModeloTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ModeloInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idModelo', 'descripcion as Modelo','estado','idMarca'];
        return parseList($repo->search($s), $request, 'idModelo', $params);
    }

    public function create(ModeloInterface $repo, ModeloRequest $request)
    {
        $data = $request->all();
        $table="ERP_Modelo";
        $id='idModelo';
        $data['idModelo'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['Modelo']);
        $data['idMarca'] = $data['idMarca'];
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

     public function TraerModelos($id, ModeloInterface $repo)
    {
       try {
            $data = $repo->TraerModelos($id);

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

    public function update(ModeloInterface $repo, ModeloRequest $request)
    {
        $data = $request->all();
        $id = $data['idModelo'];
        $data['descripcion'] = strtoupper($data['Modelo']);
        $data['idMarca'] = $data['idMarca'];
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(ModeloInterface $repo, Request $request)
    {
        $id = $request->input('idModelo');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(ModeloInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE MODELOS', 'Modelos');
    }
}
