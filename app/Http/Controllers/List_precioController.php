<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\List_precio\List_precioTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\List_precio\List_precioInterface;
use App\Http\Recopro\List_precio_detalle\List_precio_detalleInterface;
use App\Http\Requests\List_precioRequest;
use DB;
class List_precioController extends Controller
{
     use List_precioTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, List_precioInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'descripcion','iEstado','id_tpocli','IdMoneda','dFecVigIni','dFecVigFin'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

      public function find($id, List_precioInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $data['dFecVigIni']=date("Y-m-d", strtotime($data['dFecVigIni']));
            $data['dFecVigFin']=date("Y-m-d", strtotime($data['dFecVigFin']));
            $info=$repo->getProductos($id);
            $productos = [];
            foreach ($info as $bp) {
                    $productos[] = [
                    'id_lista' => $bp->id_lista,   
                    'idProducto' => $bp->idProducto,
                    'descripcion' => $bp->description,
                    'nPrecio' => $bp->nPrecio,
                    'code_article' => $bp->code_article,
                ];
            }
            $data['productos'] = $productos;
            $data['moneda'] = $data->currency->IdMoneda;
            $data['tipo_cliente'] = $data->type_customer->id;
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
     public function aprobarPrecio($id, List_precioInterface $repo)
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
    public function DesaprobarPrecio($id, List_precioInterface $repo)
    {
        try {
          
            $data['iEstado']=0;
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
    public function createUpdate($id, List_precioInterface $repo, List_precio_detalleInterface $repoDet,request $request )
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data['descripcion'] = strtoupper($data['descripcion']);
            $data['iEstado']=0;
            $w = $repo->valida_lista($data['id_tpocli'],$data['IdMoneda'],$data['dFecVigIni'],$data['dFecVigFin']);
            if($w[0]->Mensaje!=''){
                 throw new \Exception('Hay una lista vigente con estos datos. Por favor ingrese otra información.');
            }
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $idt='id';
                $table="ERP_ListaPrecios";
                $data['id'] = $repo->get_consecutivo($table,$idt);
                $grup=$repo->create($data);
                $id=$grup->id;
            };
          
                
                $idProducto=$data['idProducto'];
                $idProducto = explode(',', $idProducto);

                $nPrecio=$data['nPrecio'];
                $nPrecio=explode(',', $nPrecio);

                $idDetalle_Delete=$data['idDetalle_Delete'];


                for ($i=0; $i < count($idProducto) ; $i++) { 
                        $datoLo=[];
                        $dato=[];
                        $var=$repo->getGrupoDet($id,$idProducto[$i]);
                        if(empty($var)){
                                $datoLo['id_lista']=$id;
                                $datoLo['idProducto'] = $idProducto[$i];
                                $datoLo['nPrecio'] = $nPrecio[$i];
                                $repoDet->create($datoLo);
                        }else{
                                $datoLo['nPrecio'] = $nPrecio[$i];
                                $repoDet->update($id,$idProducto[$i], $datoLo);
                        }
                }
                if(!empty($idDetalle_Delete)){
                    for($i = 0; $i < count($idDetalle_Delete); ++$i) {
                        $com=$idDetalle_Delete[$i];
                        $repoDet->destroy_detalle($id,$com);
                    }
                }
       

           
           
            DB::commit();
            return response()->json([
                'status' => true,
                'id'=>$id,
            ]);



        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
    public function create(List_precioInterface $repo, Request $request)
    {
        $data = $request->all();
        $table="ERP_ListaPrecios";
        $id='id';
        $data['id'] = $repo->get_consecutivo($table,$id);
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

    // public function update(List_precioInterface $repo, Request $request)
    // {
    //     $data = $request->all();
    //     $id = $data['idCategoria'];
    //     $data['descripcion'] = strtoupper($data['Categoria']);
    //     $estado='A';
    //     if(!isset($data['estado'])){
    //         $estado='I';
    //     };
    //     $data['estado'] =  $estado;
    //     $repo->update($id, $data);

    //     return response()->json(['Result' => 'OK']);
    // }

    // public function destroy(List_precioInterface $repo, Request $request)
    // {
    //     $id = $request->input('id');
    //     $repo->destroy($id);
    //     return response()->json(['Result' => 'OK']);
    // }
     public function destroy($id, List_precioInterface $repo, Request $request)
    {   try {
         $data = $repo->find($id);
         $elim='A';
         if($data->iEstado=='0'){
             $repo->destroy($id);
             $elim='B';
        }
        return response()->json([
            'status' => true,
            'elim'=>$elim,
        ]);
    }catch (\Exception $e) {
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

    public function excel(List_precioInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE PRECIOS', 'Precios');
    }
}
