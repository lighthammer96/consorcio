<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Operation\OperationTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Operation\OperationInterface;
use App\Http\Recopro\Operation_Usuario\Operation_UsuarioInterface;
use App\Http\Requests\OperationRequest;
use Carbon\Carbon;
use DB;
class OperationController extends Controller
{
     use OperationTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, OperationInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idTipoOperacion', 'descripcion as Operacion','estado','idNaturaleza'];
        return parseList($repo->search($s), $request, 'idTipoOperacion', $params);
    }

    public function createUpdate($id, OperationInterface $repo,Operation_UsuarioInterface $wuRepo,Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $table="ERP_TipoOperacion";
                $idt='idTipoOperacion';
                $data['idTipoOperacion'] = $repo->get_consecutivo($table,$idt);
                $operation = $repo->create($data);
                $id = $operation->idTipoOperacion;
              
            };
             if (isset($data['users'])) {
                    $data_users = $data['users'];
                    $users = explode(',', $data_users);
                    $wuRepo->deleteByOperation($id);
                    foreach ($users as $b) {
                    $wuRepo->create([
                        'idTipoOperacion' => $id,
                        'idUsuario' => $b
                    ]);
                }
              
             }
           
           
            DB::commit();
            return response()->json([
                'status' => true
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
    public function create(OperationInterface $repo, OperationRequest $request)
    {
        $data = $request->all();
        $table="ERP_TipoOperacion";
        $id='idTipoOperacion';
        $data['idTipoOperacion'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['Operacion']);
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

    public function data_form(OperationInterface $repo)
    {
        $idTipoOperacion = parseSelectOnly($repo->all(), 'idTipoOperacion', 'descripcion');
        return response()->json([
            'status' => true,
            'operacion' => $idTipoOperacion,
        ]);
    }

    public function update(OperationInterface $repo, OperationRequest $request)
    {
        $data = $request->all();
        $id = $data['idTipoOperacion'];
        $data['descripcion'] = strtoupper($data['Operacion']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(OperationInterface $repo, Request $request)
    {
        $id = $request->input('idTipoOperacion');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(OperationInterface $repo)
    {
        return parseSelect($repo->all(), 'idTipoOperacion', 'descripcion');
    }

    public function excel(OperationInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE TIPOS OPERACIONES', 'OPERACIÓN');
    }
    public function find($id, OperationInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $users = [];
            foreach ($data->operacion_usuario as $bp) {
                $users[] = [
                    'id' => $bp->user_p->id,
                    'username' => $bp->user_p->username,
                    'name' => $bp->user_p->name,
                ];
            }
            $data['users'] = $users;
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
