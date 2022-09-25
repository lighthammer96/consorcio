<?php

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\ConfigJerarquiaCompra\ConfigJerarquiaCompraTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\ConfigJerarquiaCompra\ConfigJerarquiaCompraInterface;
use App\Http\Recopro\ConfigJerarquiaCompraDetalle\ConfigJerarquiaCompraDetalleInterface;
use App\Http\Requests\ConfigJerarquiaCompraRequest;
use App\Http\Recopro\Area\AreaInterface;

use DB;
class ConfigJerarquiaCompraController extends Controller
{
    use ConfigJerarquiaCompraTrait;

    public function __construct()
    {
        //        $this->middleware('json');
    }

    public function all(Request $request, ConfigJerarquiaCompraInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['nIdAprob','montoInicio','montoFin','nIdTienda','nIdMoneda','dFecIni','dFecFin','nIdArea','cIdUsuCre','cIdUsuMod'];
        return parseList($repo->search($s), $request, 'nIdAprob', $params);
    }
    public function data_form(ConfigJerarquiaCompraInterface $repo)
    {
        $tienda = $repo->getTienda();
        $area = $repo->getArea();
        $moneda = $repo->getMoneda();
        return response()->json([
            'status' => true,
            'tienda' => $tienda,
            'area' => $area,
            'moneda' => $moneda,

        ]);
    }
    public function getArea(Request $request, AreaInterface $repo)
    {
        return parseSelect($repo->all(), 'id', 'descripcion');
    }

    public function createUpdate($id, ConfigJerarquiaCompraInterface $repo, ConfigJerarquiaCompraDetalleInterface $repoDet, request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data['nIdTienda'] = strtoupper($data['nIdTienda']);
            $data['dFecIni'] = strtoupper($data['dFecIni']);
            $data['dFecFin'] = strtoupper($data['dFecFin']);
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $idt = 'nIdAprob';
                $table = "ERP_AprobacionCompra";
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
                    $table = "ERP_AprobacionCompraDetalle";
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
    public function update(ConfigJerarquiaCompraInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['nIdAprob'];
        $data['nIdTienda'] = strtoupper($data['nIdTienda']);
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(ConfigJerarquiaCompraInterface $repo, Request $request)
    {
        $id = $request->input('nIdAprob');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    } 
     public function deleteDetalle($id, ConfigJerarquiaCompraInterface $repo, Request $request)
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

    public function excel(ConfigJerarquiaCompraInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE JERARQUÍAS COMPRA', 'Jerarquía Compra');
    }

    public function find($id, ConfigJerarquiaCompraInterface $repo)
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
