<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Cajas\CajasInterface;
use App\Http\Recopro\CajaUsuario\CajaUsuarioInterface;
use App\Http\Recopro\Cajas\CajasTrait;
use App\Http\Requests\CajasRequest;
use Illuminate\Http\Request;
use DB;
class CajasController extends Controller
{
    use CajasTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, CajasInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idcaja', 'nombre_caja', 'usuario', 'activo', 'idtienda'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'idcaja', $params);
    }
     public function find($id, CajasInterface $repo)
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

    public function create(CajasInterface $repo, CajasRequest $request)
    {
        $data = $request->all();
        $table="ERP_Cajas";
        $id='idcaja';
        $data['idcaja'] = $repo->get_consecutivo($table,$id);
        // $data['idcaja'] = $data['idcaja'];
        // $data['nombre_caja'] = $data['convenio'];
        // print_r($data);
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }
    public function createUpdate($id, CajasInterface $repo, CajaUsuarioInterface $repoDet, request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data['idtienda'] = strtoupper($data['idtienda']);
            $data['nombre_caja'] = strtoupper($data['nombre_caja']);
            // $estado='A';
            // if(!isset($data['estado'])){
            //     $estado='I';
            // };
            $data['activo'] = $data['estado'];
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $idt = 'idcaja';
                $table = "ERP_Cajas";
                $data['idcaja'] = $repo->get_consecutivo($table, $idt);
                $grup = $repo->create($data);
                $id = $grup->idcaja;
            };


            $idUsuario = $data['idUsuario'];
            $idUsuario = explode(',', $idUsuario);

            $idcajadet = $data['idcajadet'];
            $idcajadet = explode(',', $idcajadet);

            $nameUsuario = $data['nameUsuario'];
            $nameUsuario = explode(',', $nameUsuario);

            for ($i = 0; $i < count($idUsuario); $i++) {
                $datoLo = [];
                $modo = 1;
                if ($idcajadet[$i] == '0') {
                    $modo = 0;
                };
                if ($modo == 0) {
                    $datoLo['idCaja'] = $id;
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

    public function deleteDetalle($id, CajasInterface $repo, Request $request)
    {

        DB::beginTransaction();
        try {
          
            $valtodo=explode("_", $id);
            $val=$repo->destroy_CajaDetalle($valtodo[0],$valtodo[1]);
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
    public function update(CajasInterface $repo, CajasRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $idcaja = $data['idcaja'];
        // $data['nombre_caja'] = $data['convenio'];
        $repo->update($idcaja, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(CajasInterface $repo, Request $request)
    {
        $idcaja = $request->input('idcaja');
        $repo->destroy($idcaja);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(CajasInterface $repo)
    {
        return parseSelect($repo->all(), 'idcaja', 'nombre_caja');
    }

    public function excel(CajasInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CAJAS', 'Cajas');
    }
}
