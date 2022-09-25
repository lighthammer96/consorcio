<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\HeadAccountan\HeadAccountanTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\HeadAccountan\HeadAccountanInterface;
use App\Http\Requests\HeadAccountanRequest;
use App\Http\Recopro\Accoudet\AccoudetInterface;
use DB;
class HeadAccountanController extends Controller
{
     use HeadAccountanTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, HeadAccountanInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idGrupoContableCabecera', 'descripcion as grupocontcab','estado'];
        return parseList($repo->search($s), $request, 'idGrupoContableCabecera', $params);
    }

    public function create(HeadAccountanInterface $repo, HeadAccountanRequest $request)
    {
        $data = $request->all();
        $table="ERP_GrupoContableCabecera";
        $id='idGrupoContableCabecera';
        $data['idGrupoContableCabecera'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['grupocontcab']);
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
    public function createUpdate($id, HeadAccountanInterface $repo, AccoudetInterface $repoDet,request $request )
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
       
            $data['descripcion'] = strtoupper($data['descripcion']);
            $valor="indefinido";
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $idt='idGrupoContableCabecera';
                $table="ERP_GrupoContableCabecera";
                $data['idGrupoContableCabecera'] = $repo->get_consecutivo($table,$idt);
                $grup=$repo->create($data);
                $id=$grup->idGrupoContableCabecera;
            };
          
                
                $idOperaciont=$data['contable_idoperacion'];
                $idOperacion = explode(',', $idOperaciont);

                $cuentat=$data['contable_cuenta'];
                $cuenta=explode(',', $cuentat);

                $centrocostot=$data['contable_centrocosto'];
                $centrocosto=explode(',', $centrocostot);

                $idDetalle_Delete=$data['idDetalle_Delete'];


                for ($i=0; $i < count($idOperacion) ; $i++) { 
                        $datoLo=[];
                        $dato=[];
                        $var=$repoDet->getGrupoDet($idOperacion[$i],$id);
                        if(empty($var)){
                                $datoLo['idGrupoContableCabecera']=$id;
                                $datoLo['idTipoOperacion'] = $idOperacion[$i];
                                $datoLo['cuenta'] = $cuenta[$i];
                                $datoLo['centrocosto']= $centrocosto[$i];
                                $repoDet->create($datoLo);
                        }
                }
                if(!empty($idDetalle_Delete)){
                    for($i = 0; $i < count($idDetalle_Delete); ++$i) {
                        $com=$idDetalle_Delete[$i];
                        $porciones = explode("_", $com);
                        if(!empty($porciones[1])){
                            $repoDet->destroy_detalle($porciones[0],$porciones[1]);
                        }
                       
                    }
                }
       

           
           
            DB::commit();
            return response()->json([
                'status' => true,
                'valor'=>$valor,
            ]);



        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function update(HeadAccountanInterface $repo, HeadAccountanRequest $request)
    {
        $data = $request->all();
        $id = $data['idGrupoContableCabecera'];
        $data['descripcion'] = strtoupper($data['grupocontcab']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(HeadAccountanInterface $repo, Request $request)
    {
        $id = $request->input('idGrupoContableCabecera');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(HeadAccountanInterface $repo)
    {
        return parseSelect($repo->all(), 'idGrupoContableCabecera', 'descripcion');
    }

    public function excel(HeadAccountanInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE GRUPOS CONTABLES CABECERA', 'GRUPO CONTABLE CABECERA');
    }

    public function find($id, HeadAccountanInterface $repo)
    {
        try {
            $data = $repo->find($id);

            $info=$repo->getDetalle($id);
            $grupoDet = [];
            foreach ($info as $bp) {
                    $grupoDet[] = [
                    'idGrupoContableCabecera' => $bp->idGrupoContableCabecera,
                     'operacion' => $bp->descripcion,
                    'idTipoOperacion' => $bp->idTipoOperacion,
                    'cuenta' => $bp->cuenta,
                    'centrocosto' => $bp->centrocosto,
                ];
            }
            $data['GrupoDetalle'] = $grupoDet;
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
