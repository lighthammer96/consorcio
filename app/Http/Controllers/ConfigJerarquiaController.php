<?php

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\ConfigJerarquia\ConfigJerarquiaTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\ConfigJerarquia\ConfigJerarquiaInterface;
use App\Http\Recopro\ConfigJerarquiaDetalle\ConfigJerarquiaDetalleInterface;
use App\Http\Requests\ConfigJerarquiaRequest;
use DB;
class ConfigJerarquiaController extends Controller
{
    use ConfigJerarquiaTrait;

    public function __construct()
    {
        //        $this->middleware('json');
    }

    public function all(Request $request, ConfigJerarquiaInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['nIdAprob','nIdTienda','nIdTipoSolicitud', 'dFecIni','dFecFin'];
        return parseList($repo->search($s), $request, 'nIdAprob', $params);
    }
    public function data_form(ConfigJerarquiaInterface $repo)
    {
        $tienda = $repo->getTienda();

        return response()->json([
            'status' => true,
            'tienda' => $tienda,

        ]);
    }

    public function createUpdate($id, ConfigJerarquiaInterface $repo, ConfigJerarquiaDetalleInterface $repoDet, request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data['nIdTienda'] = strtoupper($data['nIdTienda']);
            $data['nIdTipoSolicitud'] = strtoupper($data['nIdTipoSolicitud']);
            $data['dFecIni'] = strtoupper($data['dFecIni']);
            $data['dFecFin'] = strtoupper($data['dFecFin']);
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $idt = 'nIdAprob';
                $table = "ERP_ConfiguraAprobCre";
                $data['nIdAprob'] = $repo->get_consecutivo($table, $idt);
                $grup = $repo->create($data);
                $id = $grup->nIdAprob;
            };


            $idUsuario = $data['idUsuario'];
            $idUsuario = explode(',', $idUsuario);

            $idjer = $data['idjer'];
            $idjer = explode(',', $idjer);

            $dataOrden = $data['dataOrden'];
            $dataOrden = explode(',', $dataOrden);


            for ($i = 0; $i < count($idUsuario); $i++) {
                $datoLo = [];
                $modo = 1;
                if ($idjer[$i] == '0') {
                    $modo = 0;
                };

                  
                    $datoLo['nOrden'] = $dataOrden[$i];
                if ($modo == 0) {
                    $idt = 'nIdAprob';
                    $table = "ERP_ConfiguraAprobCreDet";
                    $datoLo['nIdAprob'] = $id;
                    $datoLo['nIdUsuario'] = $idUsuario[$i];
                    $repoDet->create($datoLo);
                } else {
                    $repoDet->update($id, $idUsuario[$i], $datoLo);
                };
            };




            DB::commit();
            return response()->json([
                'status' => true,
                // 'valor'=>$valor,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
    public function update(ConfigJerarquiaInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['nIdAprob'];
        $data['nIdTienda'] = strtoupper($data['nIdTienda']);
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(ConfigJerarquiaInterface $repo, Request $request)
    {
        $id = $request->input('nIdAprob');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    } 
     public function deleteDetalle($id, ConfigJerarquiaInterface $repo, Request $request)
    {

        DB::beginTransaction();
        try {
          
            $valtodo=explode("_", $id);
            $val=$repo->destroy_jerarquiaDetalle($valtodo[0],$valtodo[1]);
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

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(ConfigJerarquiaInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE JERARQUÍAS', 'Jerarquía');
    }

    public function find($id, ConfigJerarquiaInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $dataDetalle=$repo->getDetalle($id);
            $data['dFecInicio2']=date("Y-m-d", strtotime($data->dFecIni));
            $data['dFechaFin2']=date("Y-m-d", strtotime($data->dFecFin));
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
}
