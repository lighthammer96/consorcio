<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Periodo\PeriodoTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Periodo\PeriodoInterface;
use App\Http\Requests\PeriodoRequest;
use DB;
use DateTime;
class PeriodoController extends Controller
{
     use PeriodoTrait;

    public function __construct() 
    {
//        $this->middleware('json');
    }

    public function all(Request $request, PeriodoInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['periodo', 'estado', 'estado_cc'];
        return parseList($repo->search($s), $request, 'periodo', $params);
    }


    public function create(PeriodoInterface $repo, Request $request)
    {
        $data = $request->all();
        $table="ERP_Periodo";
        $data['periodo'] = strtoupper($data['periodo']);
        $estado='A';
        $estado_cc='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        if(!isset($data['estado_cc'])){
            $estado_cc='I';
        };
        $data['estado'] =  $estado;
        $data['estado_cc'] =  $estado_cc;
        $b = $repo->findByCode($data['periodo']);
        $data_ide='A';
        if ($b) {
             $data_ide='B';
        };
        if($data_ide=='A'){
            $repo->create($data);
        }
        return response()->json([
            'Result' => 'OK',
            'Record' => [],
            'data_ide'=>$data_ide,

        ]);
    }
      public function find($id, PeriodoInterface $repo)
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
     public function createUpdate($id, PeriodoInterface $repo, Request $request)
    {   
        DB::beginTransaction();
        try {
            $data = $request->all();
            $table="ERP_Periodo";
            $idt='periodo';
            $data['anio'] = strtoupper($data['anio']);
            $data['estado'] = strtoupper($data['estado']);
            $data['mes'] = strtoupper($data['mes']);
            $data['anual'] = strtoupper($data['anual']);// fechaInico.val("2019-08-10");
            if($data['anual']=='A'){
                $mes=['01','02','03','04','05','06','07','08','09','10','11','12'];
               for ($i = 0; $i < count($mes); ++$i) {
                    $Periodo= $data['anio'].'-'.$mes[$i];
                    $aniot=$data['anio'];
                    $mest=$mes[$i];
                    $L = new DateTime("$aniot-$mest-01"); 
                    $data['fechaInicio'] = $L ;
                    $data['fechaFin'] = $L->format('Y-m-t');
                    $data['periodo'] = $Periodo;
                    $b = $repo->findByCode($Periodo);
                    $data_ide='A';
                    if ($b) {
                           $data_ide='B';
                    };
                    if($data_ide=='A'){
                        $repo->create($data);
                    }
                }


            }else{
                $Periodo= $data['anio'].'-'.$data['mes'];
                $data['periodo'] = $Periodo;
                $b = $repo->findByCode($Periodo);
                $data_ide='A';
                if ($b) {
                      throw new \Exception('Ya existe un registro con este periodo.');
                };
                if($data_ide=='A'){
                    $repo->create($data);
                }
            }
          
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

    public function update(PeriodoInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['periodo'];
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;

        $b = $repo->findByCode($data['periodo']);
        $data_ide='A';
        if ($b && $b->periodo != $id) {
             $data_ide='B';
        };
        if($data_ide=='A'){
         $repo->update($id, $data);
        }
        

        return response()->json(['Result' => 'OK','data_ide'=>$data_ide]);
    }

    public function destroy(PeriodoInterface $repo, Request $request)
    {
        $id = $request->input('periodo');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(PeriodoInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE PERIODOS', 'Peridos');
    }
}
