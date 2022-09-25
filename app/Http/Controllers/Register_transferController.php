<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */
namespace App\Http\Controllers;

use App\Http\Recopro\Register_transfer\Register_transferTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Register_transfer\Register_transferInterface;
use App\Http\Recopro\Register_Transfer_Articulo\Register_Transfer_ArticuloInterface;
use App\Http\Recopro\Register_Transfer_Detalle\Register_Transfer_DetalleInterface;
use App\Http\Recopro\Currency\CurrencyInterface;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use App\Http\Recopro\Operation\OperationInterface;
use App\Http\Recopro\Product\ProductInterface;
use App\Http\Recopro\Lot\LotInterface;
use App\Http\Recopro\Localizacion\LocalizacionInterface;
use App\Http\Requests\Register_transferRequest;
use App\Http\Recopro\Serie\SerieInterface;
use Carbon\Carbon;
use DB;
class Register_transferController extends Controller
{
     use Register_transferTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, Register_transferInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idTransferencia','tipoTransferencia','estado',];
        return parseList($repo->search($s), $request, 'idTransferencia', $params);
    }

    public function create(Register_transferInterface $repo, Register_transferRequest $request)
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

    public function update(Register_transferInterface $repo, Register_transferRequest $request)
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

    public function procesarTransferencia($id, Register_transferInterface $repo, Request $request)
    {   try {
        $val=$repo->procesarTransferencia($id);
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

    public function destroy($id, Register_transferInterface $repo, Request $request)
    {   try {
        $val=$repo->destroy($id);
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
    public function validaDetalle($id, Register_transferInterface $repo){
        try {
            $data = $repo->getDetalle($id);
            if(empty($data)){
                 throw new \Exception("Debe registrar los articulos de la transferencia");
            }

             DB::commit();
            return response()->json([
                'status' => true,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function createUpdate($id, Register_transferInterface $repo, Request $request, OperationInterface $opRepo)
    {
       
        try {
            $data = $request->all();
            $table="ERP_Transferencia";
            $idt='idTransferencia';
            $data['observaciones'] = strtoupper($data['observaciones']);
            if($data['observaciones']==''){
                $data['observaciones']=null;
            }
            if ($id != 0) {
                $repo->update($id, $data);
                $movement = $repo->find($id);
                $idTransferencia = $movement->idTransferencia;
                $estado = $movement->estado;

            }else {
                $data['idTransferencia'] = $repo->get_consecutivo($table,$idt);
                $movement = $repo->create($data);
                $idTransferencia = $movement->idTransferencia;
                $estado = $movement->estado;
            }
            // if ($data['idKit'] != 0) {
            //     $kitrepo->destroy($data['idKit']);
            // };
            // if (isset($data['cantidad'])) {
            //         $datoLo=[];
            //         $idt='idArticuloKit';
            //         $table="ERP_Articulo_kit";
            //         $datoLo['idArticuloKit'] = $kitrepo->get_consecutivo($table,$idt);
            //         $datoLo['idArticulo'] = $id ;
            //         $datoLo['cantidad'] =$data['cantidad'];
            //         $valor=$kitrepo->create($datoLo);
            //         $idKit = $valor->idArticuloKit;
            //         $idArticuloKitT=$data['idArticuloKit'];
            //         $idArticuloKit=explode(',', $idArticuloKitT);

            //         $cantidadKitT=$data['cantidadKit'];
            //         $cantidadKit=explode(',', $cantidadKitT);

            //         for ($i=0; $i < count($idArticuloKit) ; $i++) { 
            //             $datKit=[];
            //             $datKit['idArticuloKit'] =$idKit;
            //             $datKit['idArticulo'] = $idArticuloKit[$i] ;
            //             $datKit['cantidad'] =$cantidadKit[$i];
            //             $kitrepo->create($datKit);

            //     }

            // }
          
            DB::commit();
            return response()->json([
                'status' => true,
                'code' => $idTransferencia,
                'estado'=>$estado,
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

    public function excel(Register_transferInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE TRANSFERENCIAS', 'TRANSFERENCIAS');
    }

    
    public function getLocalizacionSelec($id, LocalizacionInterface $repo)
    {
       try {
            $data = $repo->getLocalizacion($id);

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
    public function validateCantSerie($id, SerieInterface $reSeri){
        try {
            $datos=$id;
            $datos=explode('*', $datos);
            $idArticulo=$datos[0];
            $cantidad=$datos[1];
            $data = $reSeri->getSeries($idArticulo);
            $valor=count($data);
            $val="N";
            if($data){
                $val="A";
              if($cantidad>$valor){
                $val='S';
              }
            }
            return response()->json([
                'status' => true,
                'data' => $val,
                'cantidad'=>$valor
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function validateLote($id, LotInterface $relot)
    {
       try {
            $data = $relot->findByCode($id);
            $valor='N';
            $fecha='N';
            $codigol='N';
            if($data){
                $valor='A';
                $fecha=$data->fechaVencimiento;
                $codigol=$data->idLote;
            }
            return response()->json([
                'status' => true,
                'data' => $valor,
                'fecha'=>$fecha,
                'codigol'=>$codigol,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function valida_series_serve($id, SerieInterface $repo){

        try {
            $data=0;
            $series=explode(',',$id);
            for ($i=0; $i < count($series) ; $i++) { 
                    $data = $repo->findByCode($series[$i]);
                    if ($data) {
                    throw new \Exception('Ya existe una Serie con este código '.$series[$i]. 'Por favor ingrese otro código.');
                    break;
                    }
                       

             }
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

    // public function getStockLoc($id, Register_transferInterface $repo){

    //     try {
    //         $datos=explode(',', $id);
    //         $idl=$datos[0];
    //         $idArl=$datos[1];
    //         $stock=0;
    //         $data = $repo->getStockLoc($idl, $idArl);
    //         if(!empty($data)){
    //             $stock=$data[0]->total;
    //         }
    //         return response()->json([
    //             'status' => true,
    //             'data' => $stock
    //         ]);

    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => $e->getMessage()
    //         ]);
    //     }
    // }
    public function pdf(Request $request, Register_transferInterface $repo)
    {
            $id = $request->input('id');
            $data = $repo->find($id);
            $data_movimiento_Articulo =$repo->get_movement_articulo_print($id);
            $data_movimiento_lote=$repo->get_movemen_lote($id);
            $data_movimiento_serie=$repo->get_movemen_Serie($id);
            if($data['fecha_proceso']){
                $data['fecha_proceso']=date("d/m/Y", strtotime($data['fecha_proceso']));
            }else{
               $data['fecha_proceso']=''; 
            };
            $data['fecha_impresion']=date("d/m/Y");
            $img='logo.jpg';
            $path = public_path('img/' . $img);
            $type_image = pathinfo($path, PATHINFO_EXTENSION);
            $image = file_get_contents($path);
            $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);
            return response()->json([
                'status' => true,
                'data' => $data,
                'movimiento_Ar'=>$data_movimiento_Articulo,
                'data_movimiento_lote'=>$data_movimiento_lote,
                'data_movimiento_serie'=>$data_movimiento_serie,
                'estado'=>$id,
                'img'=>$image,
            ]);
    }

    public function find($id, Register_transferInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $data_movimiento_Articulo =$repo->get_movement_articulo($id);
            $data_movimiento_lote=$repo->get_movemen_lote($id);
            $data_movimiento_serie=$repo->get_movemen_Serie($id);
            $data['fecha_registro']=date("Y-m-d", strtotime($data['fecha_registro']));
            return response()->json([
                'status' => true,
                'data' => $data,
                'movimiento_Ar'=>$data_movimiento_Articulo,
                'data_movimiento_lote'=>$data_movimiento_lote,
                'data_movimiento_serie'=>$data_movimiento_serie,
                  'estado'=>$data,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,

                'message' => $e->getMessage()
            ]);
        }
    }
    public function getLocaStock($id, Register_transferInterface $repo){

        try {
            $data = $repo->getLocaStock($id);
            $LocalizacionAlmacen=$repo->getLocalizacioAlmacen($id);
            return response()->json([
                'status' => true,
                'data' => $data,
                'LocalizacionAlmacen'=>$LocalizacionAlmacen,
               
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function data_form (Register_transferInterface $moventRepo,CurrencyInterface $currencyRepo, WarehouseInterface $WareRepo,OperationInterface $operRepo)
    {
        $moneda = parseSelectOnly($currencyRepo->allActive(), 'IdMoneda', 'Descripcion');
        $almacen = parseSelectOnly($WareRepo->allActive(), 'id', 'description');
        $operacion = parseSelectOnly($operRepo->allActive(), 'idTipoOperacion', 'descripcion');
        $usuario=auth()->id();
        $operaciones = $operRepo->getOperationTranfer($usuario);
        $almacen_usuario = $WareRepo->getAlmacen_usuario($usuario);
        return response()->json([
            'status' => true,
            'moneda' => $moneda,
            'almacen' => $almacen,
            'operacion' => $operacion,
            'operaciones'=> $operaciones,
            'almacen_usuario'=>$almacen_usuario,
        ]);
    }
     public function getKit($id, Register_transferInterface $repo,ProductInterface $repoPro)
    {
       try {
           
            $info=$repoPro->getidArticuloKit($id);
            $idkit=$info[0]->idArticuloKit;
            $data = $repoPro->getDetalleKitCom($idkit,$id);        
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
    public function createUpdate_Articulo($id, Register_Transfer_ArticuloInterface $repo, Request $request,Register_Transfer_DetalleInterface $redm)
    {
       
        try {
            $data = $request->all();

            $idArticulo = $data['idArticulo'];
            $idArticulo = explode(',', $idArticulo);

            $idAlmacen = $data['idAlmacen'];
            $idAlmacen = explode(',', $idAlmacen);

            
            $idLocalizacion = $data['idLocalizacion'];
            $idLocalizacion = explode(',', $idLocalizacion);

            $idalmacenDestino = $data['idalmacenDestino'];
            $idalmacenDestino = explode(',', $idalmacenDestino);

            $idLocalizacionDestino = $data['idLocalizacionDestino'];
            $idLocalizacionDestino = explode(',', $idLocalizacionDestino);

            $identificador_serie_bd = $data['identificador_serie_bd'];
            $identificador_serie_bd = explode(',', $identificador_serie_bd);



            $cantidad = $data['cantidad'];
            $cantidad = explode(',', $cantidad);

            $costo = $data['costo'];
            $costo = explode(',', $costo);

            $costo_total = $data['costo_total'];
            $costo_total = explode(',', $costo_total);
           
            $idLote = $data['idLote'];
            $idLote = explode(',', $idLote);

            $dataLote = $data['dataLote'];
            $dataLote = explode(',', $dataLote);

            $ident_serie_bd_serie = $data['ident_serie_bd_serie'];
            $ident_serie_bd_serie = explode(',', $ident_serie_bd_serie);

            $idProductoSe = $data['idProductoSe'];
            $idProductoSe = explode(',', $idProductoSe);

            $serieSe = $data['serieSe'];
            $serieSe = explode(',', $serieSe);

            $idSerieSe = $data['idSerieSe'];
            $idSerieSe = explode(',', $idSerieSe);

            $cantSe = $data['cantSe'];
            $cantSe = explode(',', $cantSe);

            // $serieNenv = $data['serieNenv'];
            // $serieNenv = explode(',', $serieNenv);

            $idProductoSeN = $data['idProductoSeN'];
            $idProductoSeN = explode(',', $idProductoSeN);

            $chasiNs = $data['chasiNs'];
            $chasiNs = explode(',', $chasiNs);

            $motorNs = $data['motorNs'];
            $motorNs = explode(',', $motorNs);

            $anioNFs = $data['anioNFs'];
            $anioNFs = explode(',', $anioNFs);

            $anioNVs = $data['anioNVs'];
            $anioNVs = explode(',', $anioNVs);

            $colorNs = $data['colorNs'];
            $colorNs = explode(',', $colorNs);
           
          
            $valida="ha";
            for ($i=0; $i < count($idArticulo) ; $i++) { 
                $tipo=$repo->traerKit($idArticulo[$i]);
                $tipoSe=$repo->traerTipo($idArticulo[$i]);
                $tipoLo=$repo->traerTipoLo($idArticulo[$i]);
                $valoSrie=0;
                $valotLote=0;
                $idAl=$idAlmacen[$i];
                $idLoca=$idLocalizacion[$i];
                $idAr=$idArticulo[$i];
                $cant=$cantidad[$i];
                if($tipo[0]->type_id=="3"){
                $valida=$repo->validarStockKit($idAl,$idLoca,$idAr,$cant);
                }else{
                    if($tipoSe[0]->serie=='1'){
                       for ($se=0; $se < count($idSerieSe) ; $se++) {
                            $contaCant=0;
                              for ($sa=0; $sa < count($idSerieSe) ; $sa++) {
                                    if($idSerieSe[$se]==$idSerieSe[$sa]){
                                         $contaCant=$contaCant+1;
                                    }
                            };
                            $valoSrie=$idSerieSe[$se];
                            $valotLote=0;
                            if($identificador_serie_bd[$i]==$ident_serie_bd_serie[$se]){
                               $valida=$repo->validarStock($idAl,$idLoca,$idAr,$valotLote,$valoSrie,$contaCant);
                                if($valida[0]->Mensaje!="OK"){
                                break;
                                } 
                            }
                            
                        }
                    }else if($tipoLo[0]->lote=="1"){
                        for ($lo=0; $lo < count($idLote) ; $lo++) {
                            $valoSrie=0;
                            $valotLote=$idLote[$lo];
                            $valida=$repo->validarStock($idAl,$idLoca,$idAr,$valotLote,$valoSrie,$cant);
                            if($valida[0]->Mensaje!="OK"){
                                break;
                            }
                        }
                    }else{
                        $valoSrie=0;
                        $valotLote=0;
                        $valida=$repo->validarStock($idAl,$idLoca,$idAr,$valotLote,$valoSrie,$cant);
                    }
                   
                }
                $valida2=$valida[0]->Mensaje;
                if($valida2!="OK"){
                     $descripcionArticuloGet=$repo->traerDescripcionArticulo($idArticulo[$i]);
                     $descripcion=$descripcionArticuloGet[0]->description;
                     throw new \Exception($valida2);
                }
            }
            $contv=-1;
            $repo->delete_detalle($id);
            $repo->delete_articulo_detalle($id);
            if ($idArticulo != '') {
                for ($i=0; $i < count($idArticulo) ; $i++) { 
                        $idLB=$idLote[$i];
                        if($idLote[$i]==""){
                            $idLB=null;
                        };
                        $tabledet="ERP_TransferenciaProducto";
                        $conse='consecutivo';
                         $varMoU=$repo->create([
                        'idTransferencia' => $id,
                        'idArticulo' => $idArticulo[$i],
                        'idAlmacenOrigen' => $idAlmacen[$i],
                        'idLocalizacionOrigen' =>$idLocalizacion[$i],
                        'idAlmacenDestino' => $idalmacenDestino[$i],
                        'idLocalizacionDestino' =>$idLocalizacionDestino[$i],
                        'idlote' =>$idLB,
                        'cantidad' => $cantidad[$i],
                        'costo' => $costo[$i],
                        'costo_total' => $costo_total[$i],
                        'consecutivo' => $repo->get_consecutivo($tabledet,$conse),

                         ]);
                $tipo=$repo->traerTipo($idArticulo[$i]);
                $conse=$varMoU->consecutivo;
                if($tipo[0]->serie=="1"){
                    if ($idProductoSe != '') {
                    $tamo=count($idProductoSe);
                    for ($j=0; $j < $tamo ; $j++) {
                        if($ident_serie_bd_serie[$j]==$identificador_serie_bd[$i]){
                           $redm->create([
                            'idTransferencia' => $id,
                            'idArticulo' => $idProductoSe[$j],
                            'consecutivo' =>$conse,
                            'idSerie' =>$idSerieSe[$j],
                           ]); 
                        };
                        
                    }

                }
            }
                
            }
        }
           
            DB::commit();
            return response()->json([
                'status' => true,
                'data'=>$valida,
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
