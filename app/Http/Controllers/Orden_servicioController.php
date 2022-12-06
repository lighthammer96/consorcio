<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Brand\BrandInterface;
use App\Http\Recopro\Orden_servicio\Orden_servicioTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Orden_servicio\Orden_servicioInterface;
use App\Http\Requests\Orden_servicioRequest;

use App\Http\Recopro\Customer\CustomerInterface;
use App\Http\Recopro\Modelo\ModeloInterface;
use App\Http\Recopro\View_OrdenServicio\View_OrdenServicioInterface;
use App\Http\Recopro\VW_SerieVehTer\VW_SerieVehTerInterface;
use App\Models\BaseModel;
use DB;
class Orden_servicioController extends Controller
{
     use Orden_servicioTrait; 

    public function __construct()
    {
        $this->base_model = new BaseModel();
//        $this->middleware('json');
    } 
     public function pdf(Request $request, Orden_servicioInterface $repo)
    {          
            $id = $request->input('id');
            $valtodo=explode("_", $id);
            $data = $repo->find_orden($valtodo[0],$valtodo[1]);
            $data_matenimiento = $repo->find_orden_mantenimiento($valtodo[0],$valtodo[1]);
            $data['dFecEntrega2']=date("Y-m-d", strtotime($data[0]->dFecEntrega));
            $data['dFecRec2']=date("Y-m-d", strtotime($data[0]->dFecRec));
            $data_cliente=$repo->find_orden_cliente($data[0]->idCliente);
            $data_detalle=$repo->find_orden_detalle($valtodo[0],$valtodo[1]);
            $get_vehiculo=$repo->get_vehi($data[0]->cPlacaVeh);
            if(empty($get_vehiculo)){
                $get_vehiculo=$repo->get_vehiSerie($data[0]->cPlacaVeh);
            }
            $get_distrito=$repo->get_distrito_print($data_cliente[0]->ubigeo);
            $getClienteNuevo=$repo->get_clienteNuevo($data[0]->idCliente);
            date_default_timezone_set('UTC');
            $fechacAc= date("H:i:s");
            return response()->json([
                'status' => true,
                'data' => $data,
                'data_cliente'=>$data_cliente,
                'data_matenimiento'=>$data_matenimiento,
                'data_detalle'=>$data_detalle,
                'con'=>$valtodo[0],
                'nr'=>$valtodo[1],
                'get_distrito'=>$get_distrito,
                'get_vehiculo'=>$get_vehiculo,
                'getClienteNuevo'=>$getClienteNuevo,
                'fechacAc'=>$fechacAc
            ]);
    }

    // public function all(Request $request, Orden_servicioInterface $repo)
    public function all(Request $request, View_OrdenServicioInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['cCodConsecutivo', 'nConsecutivo','dFecRec','cPlacaVeh','cliente','iEstado'];
        return parseList($repo->search($s), $request, 'cCodConsecutivo', $params);
    }
 
     public function deleteDetalleChangue($id, Orden_servicioInterface $repo, Request $request)
    {

        DB::beginTransaction();
        try {
            $data = $request->all();
            $valtodo=explode("_", $id);
            
            $id_revision_array=$data['id_revision_array'];
            $id_revision_array=explode(',', $id_revision_array);
            for ($i=0; $i < count($id_revision_array) ; $i++) {
               $val=$repo->destroy_orden_detalle($valtodo[0],$valtodo[1],$id_revision_array[$i]);
               if($val[0]->Mensaje!=''){
                break;
               }
            };
            DB::commit();
            return response()->json([
                'status' => true,
                'data'=>$id_revision_array,
                'dato'=>$val,
                'datad'=>$id,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
     public function cambiar_estado($id, Orden_servicioInterface $repo, Request $request)
    {

        DB::beginTransaction();
        try { 
            $data = $request->all();
            $valtodo=explode("_", $id);
            $usuario=auth()->id();
            if($data['estado']==2){
                $idTecnico = $request->input('idTecnico');
                 $repo->updateTecnico($valtodo[0],$valtodo[1],$idTecnico);
            }
           
            $val=$repo->cambiar_estado($valtodo[0],$valtodo[1],$data['estado'],$usuario);
            DB::commit();
            return response()->json([
                'status' => true,
                'data'=>$val,
                
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function createUpdate($id, Orden_servicioInterface $repo,CustomerInterface $repoCust,Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();

            $cCodConsecutivo=strtoupper($data['cCodConsecutivo']);
            $nConsecutivo=strtoupper($data['nConsecutivo']);
            $id_tipo=strtoupper($data['id_tipo']);
            $id_tipomant=strtoupper($data['id_tipomant']);
            $IdMoneda=strtoupper($data['IdMoneda']);
            $dFecRec=strtoupper($data['dFecRec']);
            $horaRec=strtoupper($data['horaRec']);
            $dFecEntrega=strtoupper($data['dFecEntrega']);
            $horaEnt=strtoupper($data['horaEnt']);
            $id_tipoveh=strtoupper($data['id_tipoveh']);
            $cPlacaVeh=strtoupper($data['cPlacaVeh']);
            $cMotor=strtoupper($data['cMotor']);
            $cChasis=strtoupper($data['cChasis']);
            $iAnioFab=strtoupper($data['iAnioFab']);
            $cColor=strtoupper($data['cColor']);
            $nKilometraje=strtoupper($data['nKilometraje']);
            $idCliente=strtoupper($data['idCliente']);
            $idTecnico=strtoupper($data['idTecnico']);
            $idAsesor=strtoupper($data['idAsesor']);
            $idcCondicionPago=strtoupper($data['idcCondicionPago']);
            $cObservaciones=strtoupper($data['cObservaciones']);
            $comentario_facturacion=strtoupper($data['comentario_facturacion']);
            $id_tipoDoc_Venta_or=strtoupper($data['id_tipoDoc_Venta_or']);
            $mo_revision=strtoupper($data['mo_revision']);
            $mo_mecanica=strtoupper($data['mo_mecanica']);
            $terceros=strtoupper($data['terceros']);
            $otros_mo=strtoupper($data['otros_mo']);
            $respuestos=strtoupper($data['respuestos']);
            $accesorios=strtoupper($data['accesorios']);
            $lubricantes=strtoupper($data['lubricantes']);
            $otros_rep=strtoupper($data['otros_rep']);
            $precio_array=$data['precio_array'];
            $precio_array=explode(',', $precio_array);

            $nIdDscto=strtoupper($data['nIdDscto']);
           
            $nPorcDescuento=strtoupper($data['nPorcDescuento']);
            $nDescuento=strtoupper($data['nDescuento']);
            $nOperGratuita=strtoupper($data['nOperGratuita']);
            
            $impuesto_servicio=$data['impuesto_servicio'];
            $impuesto_servicio=explode(',', $impuesto_servicio);

            $idDetalleGrup=$data['idDetalleGrup'];
            $idDetalleGrup=explode(',', $idDetalleGrup);

            $impuesto=0;
            $totalmo=0;

            $dato=[];
         
            $idCl=$idCliente;
            $dato['IdTipoDocumento'] =$id_tipoDoc_Venta_or;
            $repoCust->update($idCl, $dato);

            for ($i=0; $i < count($impuesto_servicio) ; $i++) {
                $impuesto=$impuesto+floatval($impuesto_servicio[$i]);
            }
             for ($i=0; $i < count($precio_array) ; $i++) {
                $totalmo=$totalmo+floatval($precio_array[$i]);
            }
            $total=$data["total"];
            if($nOperGratuita==""){
                $nOperGratuita=0;
            }
            if($mo_revision==''){
                $mo_revision=0;
            };
            if($mo_mecanica==''){
                $mo_mecanica=0;
            };
            if($terceros==''){
                $terceros=0;
            };
            if($otros_mo==''){
                $otros_mo=0;
            };
            if($respuestos==''){
                $respuestos=0;
            };
            if($accesorios==''){
                $accesorios=0;
            };
            if($lubricantes==''){
                $lubricantes=0;
            };
            if($otros_rep==''){
                $otros_rep=0;
            };
            $val=1;
            if($data['nConsecutivo']==0){
                $val=0;
            };
            $modo=$val;
            $usuario=auth()->id();
            $res=$repo->actualizar_orden(
                $cCodConsecutivo,
                $nConsecutivo,
                $id_tipo,
                $id_tipomant,
                $IdMoneda,
                $dFecRec,
                $horaRec,
                $dFecEntrega,
                $horaEnt,
                $id_tipoveh,
                $cPlacaVeh,
                $cMotor,
                $cChasis,
                $iAnioFab,
                $cColor,
                $nKilometraje,
                $idCliente,
                $idTecnico,
                $idAsesor,
                $idcCondicionPago,
                $cObservaciones,
                $mo_revision,
                $mo_mecanica,
                $terceros,
                $otros_mo,
                $respuestos,
                $accesorios,
                $lubricantes,
                $otros_rep,
                $impuesto,
                $total,
                $id_tipoDoc_Venta_or,
                $nIdDscto,
                $nPorcDescuento,
                $nDescuento,
                $nOperGratuita,
                $modo,
                $usuario, $comentario_facturacion
            );
            if(intval($res[0]->Mensaje)){

            $id_mantenimiento_array=$data['id_mantenimiento_array'];
            $id_mantenimiento_array=explode(',', $id_mantenimiento_array);

            $id_revision_array=$data['id_revision_array'];
            $id_revision_array=explode(',', $id_revision_array);

            $id_tipo_array=$data['id_tipo_array'];
            $id_tipo_array=explode(',', $id_tipo_array);

            

            $precio_array=$data['precio_array'];
            $precio_array=explode(',', $precio_array);

            $modo_array_serv=$data['modo_array_serv'];
            $modo_array_serv=explode(',', $modo_array_serv);

            $modo_array_mant=$data['modo_array_mant'];
            $modo_array_mant=explode(',', $modo_array_mant);


            $cantidDeta=$data['cantidDeta'];
            $cantidDeta=explode(',', $cantidDeta);

            $porDeta=$data['porDeta'];
            $porDeta=explode(',', $porDeta);

            $montoDeta=$data['montoDeta'];
            $montoDeta=explode(',', $montoDeta);

            $idDescuenDeta=$data['idDescuenDeta'];
            $idDescuenDeta=explode(',', $idDescuenDeta);

            $staOperacion=$data['staOperacion'];
            $staOperacion=explode(',', $staOperacion);

            $operacionGra=$data['operacionGra'];
            $operacionGra=explode(',', $operacionGra);

             for ($i=0; $i < count($id_mantenimiento_array) ; $i++) { 
                $repo->actualizar_orden_mantenimiento($cCodConsecutivo,$res[0]->Mensaje,$id_mantenimiento_array[$i],$modo_array_mant[$i],$usuario);
             };
             for ($i=0; $i < count($id_revision_array) ; $i++) {
                $totald=floatval($cantidDeta[$i])*floatval($precio_array[$i]);
                if($staOperacion[$i]=='S'){
                    $totalO=floatval($cantidDeta[$i])*floatval($precio_array[$i])+floatval($impuesto_servicio[$i]);
                }else{
                    $totalO=0;
                };
                 $repo->actualizar_orden_detalle($cCodConsecutivo,$res[0]->Mensaje,$idDetalleGrup[$i],$id_revision_array[$i],$operacionGra[$i],$impuesto_servicio[$i],$id_tipo_array[$i],$montoDeta[$i],$porDeta[$i],$cantidDeta[$i],$precio_array[$i],$idDescuenDeta[$i],$staOperacion[$i],$totalO,$modo_array_serv[$i],$usuario);
                }

             };
           
            DB::commit();
            return response()->json([
                'status' => true,
                'res'=>$res,
                'val'=>$idDetalleGrup,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
      public function getCliente(CustomerInterface $repo)
    {
        return parseSelect($repo->all(), 'id', 'razonsocial_cliente');
    }
     public function data_form (Orden_servicioInterface $Repo, ModeloInterface $modeloRepo, BrandInterface $brandRepo)
    {
        
        $codigo = $Repo->getcodigo();
        $codigo_proforma = $Repo->getcodigo_proforma();
        $condicion_pago = $Repo->getcondicion_pago();
        $tipo_servicio = $Repo->gettipo_servicio();
        $tipo_document = $Repo->gettipo_document();
        $tipo_document_venta=$Repo->gettipo_document_venta();
        $revisiones = $Repo->getrevisiones();
        $tecnico = $Repo->gettecnico();
        $asesor = $Repo->getasesor();
        $moneda = $Repo->getmoneda();
        $servicios = $Repo->get_servicios(); 
        $servicios_todos = $Repo->get_servicios_todos(); 
        $tipoMantenimiento = $Repo->get_Tipomantenimientos(); 
        $totales = $Repo->get_totales();
        $usuario=auth()->id();
        $descuentos=$Repo->get_descuentos($usuario);
        $dataredondeo=$Repo->get_redondeo();
        $decimales_redondeo = $Repo->get_decimales_redondeo();
        $modelo = parseSelectOnly($modeloRepo->allActive(), 'idModelo', 'descripcion');
        $marca = parseSelectOnly($brandRepo->all(), 'id', 'description');
        // print_r($dataredondeo); exit;
        return response()->json([
            'status' => true,
            'codigo' => $codigo,
            'codigo_proforma'=>$codigo_proforma,
            'condicion_pago' => $condicion_pago,
            'tipo_servicio' => $tipo_servicio,
            'tipo_document'=> $tipo_document,
            'revisiones'=>$revisiones,
            'servicios_todos'=>$servicios_todos,
            'tecnico'=>$tecnico,
            'moneda'=>$moneda,
            'asesor'=>$asesor,
            'descuentos'=>$descuentos,
            'servicios'=>$servicios,
            'totales'=>$totales,
            'tipoMantenimiento'=>$tipoMantenimiento,
            'tipo_document_venta'=>$tipo_document_venta,
            'dataredondeo'=>(isset($dataredondeo[0]->value)) ? $dataredondeo[0]->value : 0,
            'usuario'=>$usuario,
            'modelo'=>$modelo,
            'marca'=>$marca,
            'decimales_redondeo'=>(isset($decimales_redondeo[0]->value)) ? $decimales_redondeo[0]->value : 0,
        ]);
    }

    public function destroy($id, Orden_servicioInterface $repo, Request $request)
    {   try {
            $valtodo=explode("_", $id);
            $val=$repo->destroy_orden($valtodo[0],$valtodo[1]);
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
     public function get_cliente_persona($id, Orden_servicioInterface $repo, Request $request)
    {   try {
            $val=$repo->get_clientePersona($id);
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
    public function get_precios_list($id, Orden_servicioInterface $repo, Request $request)
    {   try {
            $valtodo=explode("_", $id);
            $idProducto=$valtodo[0];
            $idTipoCli=$valtodo[1];
            $idMoneda=$valtodo[2];
            $val=$repo->get_precios_list($idProducto, $idTipoCli,$idMoneda);
            // var_dump($val);
             $newPrecio='';
            if(empty($val) && $idMoneda=='1'){
                $para=$repo->get_parametroPrecio();

                $parametro_moneda = (isset($para[0]->value)) ? $para[0]->value : 0;

                $val=$repo->get_precios_list($idProducto, $idTipoCli,$parametro_moneda);
                if(!empty($val)){
                    $fecha_actual=date("Y-m-d");
                    $cambio=$repo->cambio_tipo($parametro_moneda,$fecha_actual);
                    $newPrecio=floatval($val[0]->nPrecio)*floatval($cambio[0]->Mensaje);
                }
            } else {
                $newPrecio = $val[0]->nPrecio;
            }
        // throw new \Exception('Ya existe un almacen con este código interno. Por favor ingrese otro código.');
        //     DB::commit();
            return response()->json([
                'status' => true,
                'data'=>$val,
                'newPrecio'=>$newPrecio,
            ]);

    }catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function deleteDetalle($id, Orden_servicioInterface $repo, Request $request)
    {   try {
            $valtodo=explode("_", $id);
            $val=$repo->destroy_orden_detalle($valtodo[0],$valtodo[1],$valtodo[2]);
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
      public function delete_movimiento($id, Orden_servicioInterface $repo, Request $request)
    {   try {
            $valtodo=explode("_", $id);
            $val=$repo->destroy_orden_mantenimiento($valtodo[0],$valtodo[1],$valtodo[2]);
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

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(Orden_servicioInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE ORDENES DE SERVICIOS', 'Ordenes');
    }
    public function find($id, Orden_servicioInterface $repo)
    {
        try {
            $valtodo=explode("_", $id);
            $data = $repo->find_orden($valtodo[0],$valtodo[1]);
            $data_matenimiento = $repo->find_orden_mantenimiento($valtodo[0],$valtodo[1]);
            $data['dFecEntrega2']=date("Y-m-d", strtotime($data[0]->dFecEntrega));
            $data['dFecRec2']=date("Y-m-d", strtotime($data[0]->dFecRec));
            $data_cliente=$repo->find_orden_cliente($data[0]->idCliente);
            $data_detalle=$repo->find_orden_detalle($valtodo[0],$valtodo[1]);
           
            return response()->json([
                'status' => true,
                'data' => $data,
                'data_cliente'=>$data_cliente,
                'data_matenimiento'=>$data_matenimiento,
                'data_detalle'=>$data_detalle,
                'con'=>$valtodo[0],
                'nr'=>$valtodo[1]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function update_articulo(Request $request) {
        $data = $request->all();
        $result = array();
        // print_r($data);

        try {

            DB::beginTransaction();

            if($data["tipo_articulo"] == "terceros") {
                $update = array();
                $update["id"] = $data["id_"];
                $update["placa"] = $data["placa"];
                $update["idModelo"] = $data["idmodelo"];
                $update["idMarca"] = $data["idmarca"];
                $update["n_chasis"] = $data["chasis"];
                $update["anio_fabricacion"] = $data["anio_fabricacion"];
                $update["color"] = $data["color"];
                $update["motor"] = $data["motor"];
                $result = $this->base_model->modificar($this->preparar_datos("dbo.ERP_VehTerceros", $update));
                
            }

            
            if($data["tipo_articulo"] == "series") {
                $update_serie = array();
                $update_serie["idSerie"] = $data["id_"];
                $update_serie["placa"] = $data["placa"];
               
                $update_serie["chasis"] = $data["chasis"];
                $update_serie["anio_fabricacion"] = $data["anio_fabricacion"];
                $update_serie["color"] = $data["color"];
                $update_serie["motor"] = $data["motor"];
                $result = $this->base_model->modificar($this->preparar_datos("dbo.ERP_Serie", $update_serie));

                $update_producto = array();
                $update_producto["id"] = $data["idproducto"];
    
                $update_producto["idModelo"] = $data["idmodelo"];
                $update_producto["idMarca"] = $data["idmarca"];
              
                $this->base_model->modificar($this->preparar_datos("dbo.ERP_Productos", $update_producto));
            }

            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ei"; 
            $response["msg"] = $e->getMessage(); 
            return response()->json($response);
        }

    }

    public function list_vehiculos(Request $request, VW_SerieVehTerInterface $repo_SerieVehTer) {
        $s = $request->input('search', '');
        $params = ['serie','chasis','motor','color','aniofabriacion','placa','marca','modelo'];
        // print_r($repo->search($s)); exit;
        return parseList($repo_SerieVehTer->search($s), $request, 'serie', $params);

    }
}
