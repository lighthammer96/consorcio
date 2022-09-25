<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\View_OrdenCompraConformidad\View_OrdenCompraConformidadTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\View_OrdenCompraConformidad\View_OrdenCompraConformidadInterface;
use App\Http\Requests\View_OrdenCompraConformidadRequest;
use DB;
class AprobacionOrdenCompraController extends Controller
{
     use View_OrdenCompraConformidadTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, View_OrdenCompraConformidadInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idOrdenCompra','Conformidad', 'Codigo','Consecutivo','IdUsuario','Usuario', 'EstadoAprob','Fecha','FechaReq','TipoDoc', 'NumeroDoc','Proveedor','Moneda','Total', 'EstadoOC'];
        return parseList($repo->search($s), $request, 'Codigo', $params);
    }

    public function getAprobadores($id, View_OrdenCompraConformidadInterface $repo)
    {
        try {
            $todo=explode("*", $id);
            $data = $repo->getAprobadores($todo[0],$todo[1]);
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


      public function AprobarRechazarSolicitud($id, View_OrdenCompraConformidadInterface $repo,Request $request)
    {
       
        try {
            $data = $request->all();
            $res = array("status" => "i");
            $data_update = array(); 
            $data_update["nCodConformidad"] = $data["nCodConformidad"];
            $data_update['aprobaComentario'] =$data['aprobaComentario'];
            if(empty($data['aprobaComentario'])){
                $data_update['aprobaComentario']=null;
            }
            $data_update['iEstado'] = $data['iEstado'];
            $data_update['id']=$id;
            $res = $repo->aprobarRechazar($data_update);
            $val=$res[0]->msg;

           
           

            DB::commit();
            return response()->json([
                'status' => true,
                'msg'=>trim($val),
               
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    
    public function updateComentarioAprobacion($id,View_OrdenCompraConformidadInterface $repo,Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $comentario = strtoupper($data['comentarioAprobacion']);
            $idCom = explode("_", $id);
           
            $repo->update_aprobacion($idCom[0],$idCom[1],$comentario);
           
            DB::commit();
            return response()->json([
                'status' => true,
               'data_comentario'=>$comentario,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }


    public function create(View_OrdenCompraConformidadInterface $repo, Request $request)
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

    public function update(View_OrdenCompraConformidadInterface $repo, Request $request)
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

    public function destroy(View_OrdenCompraConformidadInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(View_OrdenCompraConformidadInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CATEGORÍAS', 'Categoría');
    }
}
