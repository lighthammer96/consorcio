<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Descuento\DescuentoTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Descuento\DescuentoInterface;
use App\Http\Requests\DescuentoRequest;
use DB;
class DescuentoController extends Controller
{
     use DescuentoTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }
      public function data_form (DescuentoInterface $Repo)
    {
        
        $usuarios = $Repo->getUsuario();
        $productos = $Repo->getProductos();

        return response()->json([
            'status' => true,
            'usuarios' => $usuarios,
            'productos'=>$productos,
        ]);
    }
       public function createUpdate($id, DescuentoInterface $repo, Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $descripcion= strtoupper($data['descripcion']);
            $idTipo = strtoupper($data['idTipo']);
            $nPorcDescuento = strtoupper($data['nPorcDescuento']);
            $idMoneda= strtoupper($data['idMoneda']);
            $nMonto= strtoupper($data['nMonto']);
            $estado= strtoupper($data['estado']);
            $dFecIni= strtoupper($data['dFecIni']);
            $dFecFin= strtoupper($data['dFecFin']);
          
            if( $data['idTipo']=="M"){
                if($nPorcDescuento==''){
                    $nPorcDescuento=0;
                }; 
            }else{
                $idMoneda = '';
                if($nMonto==''){
                    $nMonto=0;
                };
            };
            $nLimiteUso = strtoupper($data['nLimiteUso']);
            $nCantUso = strtoupper($data['nCantUso']);
            $nSaldoUso= strtoupper($data['nSaldoUso']);

            $nTodosUsusarios= strtoupper($data['nTodosUsusarios']);
            $cTipoAplica= strtoupper($data['cTipoAplica']);

            $idProducto=$data['idProducto'];
            $idProducto=explode(',', $idProducto);

            $idProductoDeta=$data['idProductoDeta'];
            $idProductoDeta=explode(',', $idProductoDeta);

            $idUsuario=$data['idUsuario'];
            $idUsuario=explode(',', $idUsuario);

            $idUsuarioDeta=$data['idUsuarioDeta'];
            $idUsuarioDeta=explode(',', $idUsuarioDeta);

            $todos_articulos= strtoupper($data['todos_articulos']);

            $val=1;
            if($id==0){
                $val=0;
            };
            $modo=$val;
            $usuario=auth()->id();
            $res=$repo->actualizarDescuento(
                $id,
                $descripcion ,
                $idTipo ,
                $nPorcDescuento,
                $idMoneda,
                $nMonto,
                $estado,
                $dFecIni,
                $dFecFin,
                $nLimiteUso,
                $nCantUso,
                $nSaldoUso,
                $nTodosUsusarios,
                $cTipoAplica,
                $modo,
                $usuario,
                $todos_articulos
            );
            if(intval($res[0]->Mensaje)){
                if($nTodosUsusarios=='0'){
                    for ($i=0; $i < count($idUsuario) ; $i++) {
                        $modo=1;
                        if($idUsuarioDeta[$i]=='0'){
                             $modo=0;
                        }
                        $repo->actualizarDescuentoUsuario($res[0]->Mensaje,$idUsuario[$i], $modo,$usuario);
                     };

                }
              
             
             if($cTipoAplica=='L' && $todos_articulos == "N"){
                    for ($i=0; $i < count($idProducto) ; $i++) {
                        $modo=1;
                        if($idProductoDeta[$i]=='0'){
                             $modo=0;
                        }
                        $repo->actualizarDescuentoProducto($res[0]->Mensaje,$idProducto[$i], $modo,$usuario);
                     };

                }
            }
            DB::commit();
            return response()->json([
                'status' => true,
                'res'=>$res,
                'cTipoAplica'=>$nTodosUsusarios,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function deleteUsuario($id, DescuentoInterface $repo, Request $request)
    {   try {
            $valtodo=explode("_", $id);
            $val=$repo->destroyUsuarioUnico($valtodo[0],$valtodo[1]);
        // throw new \Exception('Ya existe un almacen con este código interno. Por favor ingrese otro código.');
        //     DB::commit();
            return response()->json([
                'status' => true,
                'data'=>$val,
            ]);

    }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
     public function deleteProducto($id, DescuentoInterface $repo, Request $request)
    {   try {
            $valtodo=explode("_", $id);
            $val=$repo->destroyProductoUnico($valtodo[0],$valtodo[1]);
        // throw new \Exception('Ya existe un almacen con este código interno. Por favor ingrese otro código.');
        //     DB::commit();
            return response()->json([
                'status' => true,
                'data'=>$val,
            ]);

    }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
     public function deleteUsuarioTotal($id, DescuentoInterface $repo, Request $request)
    {   try {
         
            $val=$repo->destroyUsuarioTotal($id);
            return response()->json([
                'status' => true,
                'data'=>$val,
            ]);

    }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
     public function deleteProductoTotal($id, DescuentoInterface $repo, Request $request)
    {   try {
         
            $val=$repo->destroyProductoTotal($id);
            return response()->json([
                'status' => true,
                'data'=>$val,
            ]);

    }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function find($id, DescuentoInterface $repo)
    {
        try {
            $data = $repo->find_Descuento($id);
            $dataUsuario = $repo->findDescuentoUsuario($id);
            $dataProducto = $repo->findDescuentoProducto($id);
            $data['dFecIni']=date("Y-m-d", strtotime($data[0]->dFecIni));
            $data['dFecFin']=date("Y-m-d", strtotime($data[0]->dFecFin));
            return response()->json([
                'status' => true,
                'data' => $data,
                'dataUsuario'=>$dataUsuario,
                'dataProducto'=>$dataProducto,
              
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function all(Request $request, DescuentoInterface $repo)
    {
        $s = $request->input('search', '');
        $params =['id', 'descripcion','idTipo','nPorcDescuento','idMoneda','nMonto','estado','dFecIni','dFecFin','nLimiteUso','nCantUso','nSaldoUso','cTipoAplica','nTodosUsusarios','user_created','user_updated'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(DescuentoInterface $repo, Request $request)
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

    public function update(DescuentoInterface $repo, Request $request)
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

    public function destroy(DescuentoInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(DescuentoInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE DESCUENTOS', 'Descuento');
    }
}
