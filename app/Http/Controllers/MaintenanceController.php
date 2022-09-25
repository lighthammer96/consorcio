<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Maintenance\MaintenanceTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Maintenance\MaintenanceInterface;
use App\Http\Requests\MaintenanceRequest;
class MaintenanceController extends Controller
{
     use MaintenanceTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, MaintenanceInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'nombre','estado'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(MaintenanceInterface $repo, Request $request)
    {
        $data = $request->all();
        $table="ERP_Mantenimientos";
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

    public function update(MaintenanceInterface $repo, Request $request)
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

    public function destroy(MaintenanceInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(MaintenanceInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE MANTENIMIENTOS', 'MANTENIMIENTOS');
    }
}
