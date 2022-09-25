<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */
namespace App\Http\Controllers;

use App\Http\Recopro\CategoriaVehicular\CategoriaVehicularTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\CategoriaVehicular\CategoriaVehicularInterface;
use App\Http\Requests\CategoriaVehicularRequest;
class CategoriaVehicularController extends Controller
{
     use CategoriaVehicularTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, CategoriaVehicularInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idCatVeh', 'descripcion','estado'];
        return parseList($repo->search($s), $request, 'idCatVeh', $params);
    }

    public function create(CategoriaVehicularInterface $repo, Request $request)
    {
        $data = $request->all();
        $table="ERP_CategoriaVeh";
        $id='idCatVeh';
        $data['descripcion'] = strtoupper($data['descripcion']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $b = $repo->findByCode($data['idCatVeh']);
        $data_ide='A';
        if ($b) {
             $data_ide='B';
        };
        if($data_ide=='A'){
            $repo->create($data);
        }

        return response()->json([
            'Result' => 'OK',
            'Record' => [],
             'data_ide'=>$data_ide,
        ]);
    }

    public function update(CategoriaVehicularInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['idCatVeh'];
        $data['descripcion'] = strtoupper($data['descripcion']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $b = $repo->findByCode($data['idCatVeh']);
        $data_ide='A';
        if ($b && $b->idCatVeh != $id) {
             $data_ide='B';
        };
        if($data_ide=='A'){
         $repo->update($id, $data);
        }

        return response()->json(['Result' => 'OK','data_ide'=>$data_ide]);
    }

    public function destroy(CategoriaVehicularInterface $repo, Request $request)
    {
        $id = $request->input('idCatVeh');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(CategoriaVehicularInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CATEGORÍAS VEHÍCULARES', 'Categoría');
    }
}
