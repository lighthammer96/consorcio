<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Aprobacion\AprobacionInterface;
use App\Http\Recopro\AprobacionUsuario\AprobacionUsuarioInterface;
use App\Http\Recopro\Aprobacion\AprobacionTrait;
use App\Http\Requests\AprobacionRequest;
use Illuminate\Http\Request;
use DB;
 
class AprobacionController extends Controller
{
    use AprobacionTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, AprobacionInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idaprobacion', 'nombre_aprobacion', 'idtienda'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'idaprobacion', $params);
    }
     public function find($id, AprobacionInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $dataDetalle=$repo->getDetalle($id);
            return response()->json([
                'status' => true,
                'data' => $data,
                'dataDetalle' => $dataDetalle
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
     public function deleteDetalle($id, AprobacionInterface $repo, Request $request)
    {

        DB::beginTransaction();
        try {
          
            $valtodo=explode("_", $id);
            $val=$repo->destroy_aprobacionSoliDetalle($valtodo[0],$valtodo[1]);
            DB::commit();
            return response()->json([
                'status' => true,
                'dato'=>$val,
            
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function createUpdate($id, AprobacionInterface $repo, AprobacionUsuarioInterface $repoDet, request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data['idtienda'] = strtoupper($data['idtienda']);
            $data['nombre_aprobacion'] = strtoupper($data['nombre_aprobacion']);
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $idt = 'idaprobacion';
                $table = "ERP_Aprobacion";
                $data['idaprobacion'] = $repo->get_consecutivo($table, $idt);
                $grup = $repo->create($data);
                $id = $grup->idaprobacion;
            };


            $idUsuario = $data['idUsuario'];
            $idUsuario = explode(',', $idUsuario);

            $idApr = $data['idApr'];
            $idApr = explode(',', $idApr);

            $nameUsuario = $data['nameUsuario'];
            $nameUsuario = explode(',', $nameUsuario);

            for ($i = 0; $i < count($idUsuario); $i++) {
                $datoLo = [];
                $modo = 1;
                if ($idApr[$i] == '0') {
                    $modo = 0;
                };
                if ($modo == 0) {
                    $datoLo['idAprobacion'] = $id;
                    $datoLo['idUsuario'] = $idUsuario[$i];
                    $datoLo['usuario'] = $nameUsuario[$i];
                    $repoDet->create($datoLo);
                }
                // else {
                //     $repoDet->update($id, $idUsuario[$i], $datoLo);
                // };
            };




            DB::commit();
            return response()->json([
                'status' => true,
               // 'data'=>$grup,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
    
    public function create(AprobacionInterface $repo, AprobacionRequest $request)
    {
        $data = $request->all();
        // $data['idaprobacion'] = $data['idaprobacion'];
        // $data['nombre_aprobacion'] = $data['convenio'];
        // print_r($data);
        $table="ERP_Aprobacion";
        $id='idaprobacion';
        $data['idaprobacion'] = $repo->get_consecutivo($table,$id);
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(AprobacionInterface $repo, AprobacionRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $idaprobacion = $data['idaprobacion'];
        // $data['nombre_aprobacion'] = $data['convenio'];
        $repo->update($idaprobacion, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(AprobacionInterface $repo, Request $request)
    {
        $idaprobacion = $request->input('idaprobacion');
        $repo->destroy($idaprobacion);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(AprobacionInterface $repo)
    {
        return parseSelect($repo->all(), 'idaprobacion', 'nombre_aprobacion');
    }

    public function excel(AprobacionInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE APROBACION', 'Aprobacion');
    }
}
