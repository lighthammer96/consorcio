<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Objetivo\ObjetivoTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Objetivo\ObjetivoInterface;
use App\Http\Recopro\ObjetivosDetalle\ObjetivosDetalleInterface;
use App\Http\Requests\ObjetivoRequest;
use DB;
class ObjetivoController extends Controller
{
     use ObjetivoTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ObjetivoInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'descripcion','id_tipoobj','iEstado','IdMoneda','nAno'];
        return parseList($repo->search($s), $request, 'id', $params);
    }
     public function data_form(ObjetivoInterface $repo)
    {
        $tipoObjetivo =$repo->get_tipoObjetivo();
        $tipoPersona =$repo->get_tipoPersona();
        return response()->json([
            'status' => true,
            'objetivo' => $tipoObjetivo,
            'tipoPersona'=>$tipoPersona,
        ]);
    }
    public function get_personas($id, ObjetivoInterface $repo)
    {
        try {
            if($id==1){
                $personas=$repo->get_Asesor();
            }else if($id==2){
                $personas=$repo->get_tecnico();
            }
            return response()->json([
                'status' => true,
                'personas' => $personas,
             
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
     public function aprobarObjetivo($id, ObjetivoInterface $repo)
    {
        try {
          
            $data['iEstado']=1;
            $repo->update($id, $data);
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

 
    public function create(ObjetivoInterface $repo, Request $request)
    {
        $data = $request->all();
        $table="ERP_Categoria";
        $id='idCategoria';
        $data['idCategoria'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['Categoria']);
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

    public function update(ObjetivoInterface $repo, Request $request)
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

    public function destroy(ObjetivoInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }
     public function find($id, ObjetivoInterface $repo)
    {
        try {

            $data = $repo->find($id);
            $dato=$repo->getGrupoDet_obje_total($id);
              $detalle = [];
            foreach ($dato as $row) {
                  if($row->id_TipoPers=='1'){
                        $info=$repo->getGrupoDet_obje_asesor($id,$row->nPeriodo,$row->id_TipoPers,$row->id_Persona);
                    }else{
                        $info=$repo->getGrupoDet_obje_tecnico($id,$row->nPeriodo,$row->id_TipoPers,$row->id_Persona);
                    }

            foreach ($info as $bp) {
                    $detalle[] = [
                    'id_obj' => $bp->id_obj,
                    'nPeriodo' => $bp->nPeriodo,
                    'id_TipoPers' => $bp->id_TipoPers,
                    'tipo_persona'=>$bp->tipo_persona,
                    'id_Persona' => $bp->id_Persona,
                    'persona'=>$bp->persona,
                    'nCant'=>$bp->nCant,
                    'nMonto'=>$bp->nMonto,
                ];
            }

            }
          
            
           
            $data['detalle'] = $detalle;
            return response()->json([
                'status' => true,
                'data' => $data,

            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function excel(ObjetivoInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE OBJETIVOS', 'Objetivos');
    }

    public function createUpdate($id, ObjetivoInterface $repo, ObjetivosDetalleInterface $repoDet,request $request )
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data['descripcion'] = strtoupper($data['descripcion']);
            // $valor="indefinido";
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $idt='id';
                $table="ERP_Objetivos";
                $data['iEstado'] = 0;
                $data['id'] = $repo->get_consecutivo($table,$idt);
                $grup=$repo->create($data);
                $id=$grup->id;
            };
          
                
                $id_periodo_a=$data['nPeriodo'];
                $id_periodo_a = explode(',', $id_periodo_a);

                $id_tipo_persona_a=$data['id_TipoPers'];
                $id_tipo_persona_a=explode(',', $id_tipo_persona_a);

                $id_persona_a=$data['id_Persona'];
                $id_persona_a=explode(',', $id_persona_a);


                $cantidad_a=$data['nCant'];
                $cantidad_a = explode(',', $cantidad_a);

                $monto_a=$data['nMonto'];
                $monto_a=explode(',', $monto_a);

                $idDetalle_Delete=$data['id_delete'];

                for ($i=0; $i < count($id_periodo_a) ; $i++) { 
                        $datoLo=[];
                        $dato=[];
                        $var=$repo->getGrupoDet_obje($id,$id_periodo_a[$i],$id_tipo_persona_a[$i],$id_persona_a[$i]);
                        if(empty($var)){
                                $datoLo['id_obj']=$id;
                                $datoLo['nPeriodo'] = $id_periodo_a[$i];
                                $datoLo['id_TipoPers'] = $id_tipo_persona_a[$i];
                                $datoLo['id_Persona']= $id_persona_a[$i];
                                $datoLo['nCant']= $cantidad_a[$i];
                                $datoLo['nMonto']= $monto_a[$i];
                                $repoDet->create($datoLo);
                        }else{
                                $datoLo['nCant']= $cantidad_a[$i];
                                $datoLo['nMonto']= $monto_a[$i];
                                $repoDet->update($id,$id_periodo_a[$i],$id_tipo_persona_a[$i],$id_persona_a[$i],$datoLo);
                        }
                }
                if(!empty($idDetalle_Delete)){
                    for($i = 0; $i < count($idDetalle_Delete); ++$i) {
                        $com=$idDetalle_Delete[$i];
                        $porciones = explode("_", $com);
                        if(!empty($porciones[1])){
                            $repoDet->destroy_detalle($porciones[0],$porciones[1],$porciones[2],$porciones[3]);
                        }
                       
                    }
                }
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
}
