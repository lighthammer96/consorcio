<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Vehiculos_tercero\Vehiculos_terceroTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Vehiculos_tercero\Vehiculos_terceroInterface;
use App\Http\Requests\Vehiculos_terceroRequest;
use App\Http\Recopro\Brand\BrandInterface;
use App\Http\Recopro\Modelo\ModeloInterface;
use App\Http\Recopro\Type_vehiculo\Type_vehiculoInterface;
use DB;
class Vehiculos_terceroController extends Controller
{
     use Vehiculos_terceroTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, Vehiculos_terceroInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'idModelo','idMarca','idModelo','n_chasis','anio_fabricacion','color','placa','motor'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(Vehiculos_terceroInterface $repo, Request $request)
    {
        $data = $request->all();
        $table="ERP_VehTerceros";
        $id='id';
        $data['id'] = $repo->get_consecutivo($table,$id);
        $data['n_chasis'] = strtoupper($data['n_chasis']);
        $data['anio_fabricacion'] = strtoupper($data['anio_fabricacion']);
        $data['color'] = strtoupper($data['color']);
        $data['placa'] = strtoupper($data['placa']);
        $data['motor'] = strtoupper($data['motor']);
        $repo->create($data);
        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(Vehiculos_terceroInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['id'];
        $data['n_chasis'] = strtoupper($data['n_chasis']);
        $data['anio_fabricacion'] = strtoupper($data['anio_fabricacion']);
        $data['color'] = strtoupper($data['color']);
        $data['placa'] = strtoupper($data['placa']);
        $repo->update($id, $data);
        return response()->json(['Result' => 'OK']);
    }

    public function destroy(Vehiculos_terceroInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(Vehiculos_terceroInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE VEHÍCULOS TERCEROS', 'Vehículos Terceros');
    }
    public function getTipoVehiculo(Type_vehiculoInterface $repo)
    {
        return parseSelect($repo->allActive(), 'id', 'descripcion');
    }
    public function getMarca(BrandInterface $repo)
    {
        return parseSelect($repo->all(), 'id', 'description');
    }
     public function getModelo($id, ModeloInterface $repo)
    {
        return parseSelect($repo->all()->where('idMarca',$id), 'idModelo', 'descripcion');
    }
     public function getModeloEs($id, ModeloInterface $repo)
    {
        return parseSelect($repo->all()->where('idMarca',$id), 'idModelo', 'descripcion');
    }
   
    public function get_Placa_documento($id, Vehiculos_terceroInterface $repo)
    {
        try {
            $data = $repo->get_Placa_document($id);
            if(empty($data)){
                  $data = $repo->get_Placa_document_empresa($id);
            }
            $marca=$repo->get_Marca_or();
            $tipo_vehi=$repo->get_TipoVehi_or();
            return response()->json([
                'status' => true,
                'data' => $data,
                'marca'=>$marca,
                'tipo_ve'=>$tipo_vehi,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function get_vehiculo($id, Vehiculos_terceroInterface $repo)
    {
        try {
            $array = explode("|", $id);
            $id = $array[0];
            $tipo_articulo = $array[1];

            if($tipo_articulo == "terceros") {

                $data = $repo->get_vehiculo_document($id);
            }

            if($tipo_articulo == "series") {

                $data = $repo->get_vehiculo_document_empresa($id);
            }
            // if(empty($data)){
            //       $data = $repo->get_vehiculo_document_empresa($id);
            // }
            $marca=$repo->get_Marca_or();
            $tipo_vehi=$repo->get_TipoVehi_or();
            return response()->json([
                'status' => true,
                'data' => $data,
                'marca'=>$marca,
                'tipo_ve'=>$tipo_vehi,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

     public function get_Modelo_documento($id, Vehiculos_terceroInterface $repo)
    {
        try {
            
            $modelo=$repo->get_Modelo_ar($id);
            return response()->json([
                'status' => true,
                'modelo'=>$modelo,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
     public function createUpdate($id, Vehiculos_terceroInterface $repo, Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $table="ERP_VehTerceros";
            $idt='id';
            $data['idMarca'] = strtoupper($data['idMarca']);
            $data['idModelo'] = strtoupper($data['idModelo']);
            $data['n_chasis'] = strtoupper($data['n_chasis']);
            $data['anio_fabricacion'] = strtoupper($data['anio_fabricacion']);
            $data['color'] = strtoupper($data['color']);
            $data['placa'] = strtoupper($data['placa']);

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

}
