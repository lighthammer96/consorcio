<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Shop\ShopTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Shop\ShopInterface;
use App\Http\Requests\ShopRequest;
use Carbon\Carbon;
use DB;
class ShopController extends Controller
{
     use ShopTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ShopInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idTienda', 'descripcion as Tienda','direccion','ubigeo','estado','ubigeo as Departamento' , 'ubigeo as Provincia', 'ubigeo as Distrito'];
        return parseList($repo->search($s), $request, 'idTienda', $params);
    }

    public function create(ShopInterface $repo, ShopRequest $request)
    {
        $data = $request->all();
        $table="ERP_Tienda";
        $id='idTienda';
        $data['idTienda'] = $repo->get_consecutivo($table,$id);
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

    public function update(ShopInterface $repo, ShopRequest $request)
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

    public function createUpdate($id, ShopInterface $repo, ShopRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();

            $table="ERP_Tienda";
            $idt='idTienda';
            $data['descripcion'] = strtoupper($data['descripcion']);
            $data['direccion'] = strtoupper($data['direccion']);
            $data['ubigeo'] = $data['distrito'];
            $data['estado'] = $data['estado'];
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $data['idTienda'] = $repo->get_consecutivo($table,$idt);
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

    public function destroy(ShopInterface $repo, Request $request)
    {
        $id = $request->input('idTienda');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

      public function getall(Request $request, ShopInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idTienda', 'descripcion as Tienda','direccion','ubigeo','estado','ubigeo as Departamento' , 'ubigeo as Provincia', 'ubigeo as Distrito'];
        return parseList($repo->search2($s), $request, 'idTienda', $params);
    }


    public function getTiendas(Request $request, ShopInterface $repo)
    {
        return parseSelect($repo->all(), 'idTienda', 'descripcion');
    }


    public function excel(ShopInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE TIENDAS', 'Tienda');
    }

    public function find($id, ShopInterface $repo)
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
