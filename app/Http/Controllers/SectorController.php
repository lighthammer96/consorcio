<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Sector\SectorTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Sector\SectorInterface;
use Carbon\Carbon;
use DB;
class SectorController extends Controller
{
     use SectorTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, SectorInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id','descripcion','ubigeo','estado','ubigeo as Departamento' , 'ubigeo as Provincia', 'ubigeo as Distrito'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(SectorInterface $repo, Request $request)
    {
        $data = $request->all();
        $table="ERP_Sector";
        $id='id';
        $data['id'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['Tienda']);
        $data['direccion'] = strtoupper($data['direccion']);
        $data['ubigeo'] = $data['ubigeo'];
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

    public function update(SectorInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['idCategoria'];
        $data['descripcion'] = strtoupper($data['Categoria']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function createUpdate($id, SectorInterface $repo, Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();

            $table="ERP_Sector";
            $idt='id';
            $data['descripcion'] = strtoupper($data['descripcion']);
            $data['ubigeo'] = $data['distrito'];
            $data['estado'] = $data['estado'];
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $data['id'] = $repo->get_consecutivo($table,$idt);
                $repo->create($data);
            };
            DB::commit();
            return response()->json([
                'status' => true,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function destroy(SectorInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

      public function getall(Request $request, SectorInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'descripcion as Tienda','direccion','ubigeo','estado','ubigeo as Departamento' , 'ubigeo as Provincia', 'ubigeo as Distrito'];
        return parseList($repo->search2($s), $request, 'id', $params);
    }


    public function getTiendas(Request $request, SectorInterface $repo)
    {
        return parseSelect($repo->all(), 'id', 'descripcion');
    }


    public function excel(SectorInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE SECTORES', 'Sector');
    }

    public function find($id, SectorInterface $repo)
    {
        try {
            $data = $repo->find($id);
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
}
