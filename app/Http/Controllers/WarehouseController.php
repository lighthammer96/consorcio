<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Warehouse\WarehouseInterface;
use App\Http\Recopro\Warehouse\WarehouseTrait;
use App\Http\Requests\WarehouseRequest;
use App\Http\Recopro\Type\TypeInterface;
use App\Http\Recopro\WarehouseUser\WarehouseUserInterface;
use App\Http\Recopro\Localizacion\LocalizacionInterface;
use DB;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    use WarehouseTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, WarehouseInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'code_internal', 'description', 'type_id', 'address', 'state', 'frozen', 'date_frozen'];
        $data = $repo->search($s);
        $info = parseDataList($data, $request, 'id', $params);
        $data = $info[1];

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function createUpdate($id, WarehouseInterface $repo, WarehouseRequest $request, WarehouseUserInterface $wuRepo,LocalizacionInterface $lorepo )
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data_users = $data['users'];
            $data_id_delete_localiza=$data['id_delete'];
            $users = explode(',', $data_users);
            $local_codigot=$data['local_codigo'];
            $local_codigo = explode(',', $local_codigot);

            $local_descripciont=$data['local_descripcion'];
            $local_descripcion=explode(',', $local_descripciont);

            $local_estadot=$data['local_estado'];
            $local_estado=explode(',', $local_estadot);

            $idLocalizacion_v=$data['idLocalizacion_v'];
            $idLocalizacion_v=explode(',', $idLocalizacion_v);

            $data['idTienda']=$data['idTienda'];
            $w = $repo->findByCode($data['code_internal']);
            unset($data['id'], $data['users']);
            if ($id != 0) {
                if ($w && $w->id != $id) {
                    throw new \Exception('Ya existe un almacen con este código interno. Por favor ingrese otro código.');
                }
                $repo->update($id, $data);


            } else {
                if ($w) {
                    throw new \Exception('Ya existe un almacen con este código interno. Por favor ingrese otro código.');
                }
                $Warehouse = $repo->create($data);
                $id = $Warehouse->id;
            }
            $wuRepo->deleteByWarehouse($id, $users);
            if ($data_users != '') {
                foreach ($users as $b) {
                    $wuRepo->create([
                        'warehouse_id' => $id,
                        'user_id' => $b
                    ]);
                }
            }
            $cont=0;
            $va=count($local_codigo);
            for ($i=0; $i < count($local_codigo) ; $i++) {
                    if($idLocalizacion_v[$i]=="N"){
                        $table="ERP_Localizacion";
                        $idta='idLocalizacion';
                        $datoLo=[];
                        $datoLo['idLocalizacion']=$lorepo->get_consecutivo($table,$idta);
                        $datoLo['codigo'] = $local_codigo[$i];
                        $datoLo['descripcion'] = $local_descripcion[$i];
                        $datoLo['estado']= $local_estado[$i];
                        $datoLo['idAlmacen']=$id;
                        $lorepo->create($datoLo);
                    } 
            }
            $cont=0;
            if(!empty($data_id_delete_localiza)){
                for($i = 0; $i < count($data_id_delete_localiza); ++$i) {
                    $lorepo->delete_localizacion($data_id_delete_localiza[$i]);
                };
            };
            DB::commit();
            return response()->json([
                'status' => true,
                'cont'=>$cont,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function find($id, WarehouseInterface $repo)
    {
        try {
            $data = $repo->find($id);

            $users = [];
            foreach ($data->warehouseUser as $bp) {
                $users[] = [
                    'id' => $bp->user->id,
                    'username' => $bp->user->username,
                    'name' => $bp->user->name,
                ];
            }
            $data['users'] = $users;
            $info=$repo->getlocalizacione($id);
            $Localizacion = [];
            foreach ($info as $bp) {
                    $Localizacion[] = [
                    'idLocalizacion' => $bp->idLocalizacion,
                    'codigo' => $bp->codigo,
                    'descripcion' => $bp->descripcion,
                    'estado' => $bp->estado,
                ];
            }
            $data['localizacion'] = $Localizacion;
            $data['idTienda'] = $data->Shop_u->idTienda;
            $data['Tienda'] = $data->Shop_u->descripcion;
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

    public function destroy(WarehouseInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function data_form(TypeInterface $typeRepo)
    {
        $types = parseSelectOnly($typeRepo->all(), 'id', 'description');

        return response()->json([
            'status' => true,
            'types' => $types
        ]);
    }

    public function getAll(WarehouseInterface $repo)
    {
        return parseSelect($repo->all(), 'id', 'description');
    }

    public function excel(WarehouseInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE ALMACENES', 'Almacenes');
    }

    public function pdf(WarehouseInterface $repo)
    {
        return generatePDF($this->generateDataExcel($repo->all()), 'LISTA DE ALMACENES', 'landscape');
    }
}
