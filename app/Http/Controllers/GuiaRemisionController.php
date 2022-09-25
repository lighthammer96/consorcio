<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\GuiaRemision\GuiaRemisionTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\GuiaRemision\GuiaRemisionInterface;
use App\Http\Recopro\GuiaRemisionDetalle\GuiaRemisionDetalleInterface;
use App\Http\Recopro\GuiaRemisionProducto\GuiaRemisionProductoInterface;
use App\Http\Recopro\Solicitud_Asignacion\Solicitud_AsignacionInterface;
use App\Http\Requests\GuiaRemisionRequest;
use App\Models\BaseModel;
use Illuminate\Support\Facades\DB;   
class GuiaRemisionController extends Controller
{
     use GuiaRemisionTrait;

    public function __construct()
    {
//        $this->middleware('json');
          $this->base_model = new BaseModel();
    }
    public function all(Request $request, GuiaRemisionInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['cCodConsecutivo','nConsecutivo','estado','fechaEmision'];
        return parseList($repo->search($s), $request, 'cCodConsecutivo', $params);
    }
    public function data_formGuia (Request $request, GuiaRemisionInterface $repo)
    {   $usuario=auth()->id();
        $series = $repo->getseriesGuia($usuario);
        $tipoTraslado = $repo->getTipoTraslado();
        return response()->json([
            'status' => true,
            'series' => $series,
            'tipoTraslado' => $tipoTraslado,
            
        ]);
    }
    public function deleteProducto($id, GuiaRemisionInterface $repo, Request $request)
    {   try {
            $valtodo=explode("_", $id);
            $val=$repo->destroy_guiaRemisionProduDetalle($valtodo[0],$valtodo[1],$valtodo[2]);
            return response()->json([
                'status' => true,
            ]);

    }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function find(GuiaRemisionInterface $Repo, Request $request) {
        $data = $request->all();
        $arr = explode("*", $data["id"]);
        $cCodConsecutivo = $arr[0];
        $nConsecutivo = $arr[1];
        $response = array();

        $response["solicitud"] = $Repo->get_guiaRemision($cCodConsecutivo, $nConsecutivo);
        $response["solicitud_articulo"] = $Repo->get_guiaRemision_articulo($cCodConsecutivo, $nConsecutivo);
         $response["solicitud_serie"] = $Repo->get_guia_Serie($cCodConsecutivo, $nConsecutivo);

         $response["solicitud_lote"] = $Repo->get_guia_Lote($cCodConsecutivo, $nConsecutivo);

        return response()->json($response);
    }
    public function anular_guiaRemision (Request $request, GuiaRemisionInterface $repo)
    {
            $data = $request->all();

            $cCodConsecutivo = $data['cCodConsecutivo'];
            $nConsecutivo = $data['nConsecutivo'];

            $dta=$repo->get_anularRemision($cCodConsecutivo, $nConsecutivo);
            $estado=$repo->get_guiaRemision($cCodConsecutivo, $nConsecutivo);
            $response = array();
        try {
            DB::beginTransaction();
            
            DB::commit();
             return response()->json([
                'status' => true,
               'estado'=>$estado[0]->estado,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ei"; 
            $response["msg"] = $e->getMessage(); 
            return response()->json($response);
        }

    }
     public function guardar_guiaRemision (Request $request, GuiaRemisionInterface $repo,GuiaRemisionProductoInterface $grp,GuiaRemisionDetalleInterface $grd)
    {    


        $data = $request->all();

        // print_r($data); exit;
           $table="ERP_GuiaRemision";
            $idt='nConsecutivo';
            $idArticulo = $data['idartEnv'];
            $idArticulo = explode(',', $idArticulo);
            $cantidad = $data['idalcantEnv'];
            $cantidad = explode(',', $cantidad);

            $idProductoSe = $data['idProductoSe'];
            $idProductoSe = explode(',', $idProductoSe);

            $idTable = $data['idTable'];
            $idTable = explode(',', $idTable);

            $idTartConse = $data['idTartConse'];
            $idTartConse = explode(',', $idTartConse);


            $ident_serie_bd_serie = $data['ident_serie_bd_serie'];
            $ident_serie_bd_serie = explode(',', $ident_serie_bd_serie);

            $identificador_serie_bd = $data['identificador_serie_bd'];
            $identificador_serie_bd = explode(',', $identificador_serie_bd);

            $idSerieSe = $data['idSerieSe'];
            $idSerieSe = explode(',', $idSerieSe);

            $idLote = $data['idLote'];
            $idLote = explode(',', $idLote);

        $response = array();
        try {
            DB::beginTransaction();
            $ida=$data['cCodConsecutivo'];
            $idb=$data['nConsecutivo'];
            unset($data['idalcantEnv']);
            unset($data['idartEnv']);
            unset($data['idalcantEnv']);
            unset($data['idProductoSe']);
            unset($data['idTable']);
            unset($data['idTartConse']);
            unset($data['ident_serie_bd_serie']);
            unset($data['identificador_serie_bd']);
            unset($data['idSerieSe']);
            unset($data['serieSe']);
            unset($data['idLote']);
            $nConsecutivo='';
            $estado='';
            if ($data['nConsecutivo']!='') {
              
                $repo->update($ida,$idb, $data);
                $dta=$repo->get_guiaRemision($ida, $idb);
                $nConsecutivo = $dta[0]->nConsecutivo;
                $estado = $dta[0]->estado;
            }else {
                $data['estado']='0';
                $data['nConsecutivo']=$repo->get_consecutivo($table,$idt);
                $movement = $repo->create($data);
                $nConsecutivo = $movement->nConsecutivo;
                // $idMovimiento = $movement->idMovimiento;
                $estado = $movement->estado;
            }
            $repo->delete_detalle($ida, $idb);

            for ($i=0; $i < count($idArticulo) ; $i++) { 
                $idLB=$idLote[$i];
                if($idLote[$i]==""){
                     $idLB=null;
                 };

                $tablelMd='ERP_GuiaRemisionProducto';
                $idtMd='consecutivo';
                $conse=$idTartConse[$i]; 
                if($idTable[$i]==0){
                  $varinfo=$grp->create([
                            'cCodConsecutivo' => $data['cCodConsecutivo'],
                            'nConsecutivo' => $data['nConsecutivo'],
                            'idarticulo' => $idArticulo[$i],
                             'idlote' =>$idLB,
                            'consecutivo'=> $grp->get_consecutivo($tablelMd,$idtMd),
                            'cantidad' =>  $cantidad[$i],
                  ]);
                   $conse=$varinfo->consecutivo;    
                }else{
                      $dato_guia=[];
                      $dato_guia['cantidad']=$cantidad[$i];
                      $idaa=$data['cCodConsecutivo'];
                      $idbb=$data['nConsecutivo'];
                      $con=$conse;
                      $grp->update_guiP($idaa,$idbb,$con, $dato_guia);
                }
                
               
                if ($idProductoSe != '') {
                        for ($j=0; $j < count($idProductoSe) ; $j++) { 
                            if($ident_serie_bd_serie[$j]==$identificador_serie_bd[$i]){
                                     $grd->create([
                                        'cCodConsecutivo' => $data['cCodConsecutivo'],
                                        'nConsecutivo' => $data['nConsecutivo'],
                                        'idarticulo' => $idProductoSe[$j],
                                        'consecutivo' => $conse,
                                        'idSerie' =>$idSerieSe[$j],
                                     ]);
                            }
                                       
                        }

                }

            }
            DB::commit();
             return response()->json([
                'status' => true,
                'nConsecutivo'=>$nConsecutivo,
                'estado'=>$estado,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ei"; 
            $response["msg"] = $e->getMessage(); 
            return response()->json($response);
        }
    }

    public function create(GuiaRemisionInterface $repo, Request $request)
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
    // public function pdf(GuiaRemisionInterface $repo,Request $request)
    // {   
      
    //     $cCodConsecutivo = $request->input('cCodConsecutivo', '');
    //     $nConsecutivo = $request->input('nConsecutivo', '');
     
    //     $data = $this->generateDataExcel($repo->allFiltro($s,$filtro_tienda,$idClienteFiltro,$idVendedorFiltro,$FechaInicioFiltro,$FechaFinFiltro,$idcategoria));
    //     return generateDataPDF($data, 'landscape', 'logo.jpg');
    // } 
     public function pdf(GuiaRemisionInterface $repo,Solicitud_AsignacionInterface $repcom,Request $request)
    {
           $cCodConsecutivo = $request->input('cCodConsecutivo', '');
           $nConsecutivo = $request->input('nConsecutivo', '');

            $data_compania=$repcom->get_compania(); 
            $data=$repo->get_guiaRemision($cCodConsecutivo,$nConsecutivo); 
            $data_articulo_noser=$repo->get_guiaArticuloNoser($cCodConsecutivo,$nConsecutivo); 
            $data_articulo_ser=$repo->get_guiaArticuloser($cCodConsecutivo,$nConsecutivo);
            // $simboloMoneda = $repom->getSimboloMoneda();
            $path = public_path('/'.$data_compania[0]->ruta_logo); 
            
            $type_image = pathinfo($path, PATHINFO_EXTENSION);
            $image = file_get_contents($path);
            $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);
            return response()->json([
                'status' => true,
                 'img'=>$image,
                 // 'simboloMoneda'=>$simboloMoneda,
                 'data_compania'=>$data_compania,
                 'data'=>$data,
                 'data_articulo_noser'=>$data_articulo_noser,
                   'data_articulo_ser'=>$data_articulo_ser,
               
            ]);


    }

    public function update(GuiaRemisionInterface $repo, Request $request)
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

    public function destroy(GuiaRemisionInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(GuiaRemisionInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE GUIAS DE REMISIÓN', 'Guías');
    }
}
