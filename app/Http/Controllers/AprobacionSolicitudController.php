<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\AprobacionSolicitud\AprobacionSolicitudTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\AprobacionSolicitud\AprobacionSolicitudInterface;
use App\Http\Recopro\AprobacionUsuario\AprobacionUsuarioInterface;
use App\Http\Recopro\Aprobacion\AprobacionInterface;
use App\Http\Recopro\AprobacionTotal\AprobacionTotalInterface;
use App\Http\Recopro\Solicitud\SolicitudInterface;
use App\Http\Recopro\View_PendienteCobro\View_PendienteCobroInterface;
use App\Http\Requests\AprobacionSolicitudRequest;
use App\Models\BaseModel;
use DateTime;
use DB;
class AprobacionSolicitudController extends Controller
{
     use AprobacionSolicitudTrait;

    public function __construct()
    {
        $this->base_model = new BaseModel();
//        $this->middleware('json');
    }
      public function allTotales(Request $request,AprobacionTotalInterface $repo)
    {
        $s = $request->input('search_c', '');
        $idCliente = $request->input('cliente_id_or', '');
        $params = ['idcliente', 'idMoneda','moneda','saldoTotal'];
        return parseList($repo->search($s,$idCliente), $request, 'idcliente', $params);
    }
     public function listpendientesCobro(Request $request,View_PendienteCobroInterface $repo)
    {
        $idcliente = $request->input('idcliente', '');
        $IdMoneda = $request->input('IdMoneda', '');
        $params = ['IdMoneda','idCliente', 't_monto_total','pagado','saldo','serie_comprobante','numero_comprobante','razonsocial_cliente','fecha_emision','cCodConsecutivo_solicitud','nConsecutivo_solicitud','condicion_pago_text','tipoDocumento','moneda'];
        return parseList($repo->search($IdMoneda,$idcliente), $request, 'idcliente', $params);
    }
    public function updateComentarioAprobacion($id, AprobacionInterface $repo, AprobacionUsuarioInterface $repoDet, request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $comentario = strtoupper($data['comentario_aprobacion']);
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

    public function AprobarRechazarSolicitud($id, AprobacionSolicitudInterface $repo,Request $request, SolicitudInterface $solicitud_repositorio)
    {
       
        try {
            $data = $request->all();
            $res = array("status" => "i");
            $t_monto_total = 0;
            $data_update = array(); 
            $data_update["nCodConformidad"] = $data["nCodConformidad"];
            $data_update['aprobaComentario'] =$data['aprobaComentario'];
            if(empty($data['aprobaComentario'])){
                $data_update['aprobaComentario']=null;
            }
            $data_update['iEstado'] = $data['iEstado'];
            $res = $repo->aprobarRechazar($data_update);
            $val=$res[0]->msg;

            $conformidad = array();
            $solicitud = array();
            if(trim($val) == "Aprobada") {
                $conformidad = $repo->obtener_conformidad($data["nCodConformidad"]);
                $solicitud = $solicitud_repositorio->get_solicitud($conformidad[0]->cCodConsecutivo, $conformidad[0]->nConsecutivo);
                $solicitud_credito = $solicitud_repositorio->get_solicitud_credito($conformidad[0]->cCodConsecutivo, $conformidad[0]->nConsecutivo);
                $fecha = $solicitud[0]->fecha_solicitud;

                $t_monto_total = (float)$solicitud_credito[0]->total_financiado + (float)$solicitud_credito[0]->intereses;

                if(!empty($solicitud_credito[0]->dia_vencimiento_cuota) && $solicitud_credito[0]->dia_vencimiento_cuota > 0) {
                    $arr_date = explode("-", $fecha);
                    $dia = $solicitud_credito[0]->dia_vencimiento_cuota;
                    $mes = $arr_date[1] + 1;
                    // if($dia < $arr_date[2]) {
                    //     $mes = $arr_date[1] + 1;
                    // }
                    $anio = $arr_date[0];
                    
                } 

                for ($c=1; $c <= $solicitud_credito[0]->nro_cuotas; $c++) { 

                    if(!empty($solicitud_credito[0]->dia_vencimiento_cuota) && $solicitud_credito[0]->dia_vencimiento_cuota > 0) {
                        if($mes > 12) {
                            $mes = 1;
                            $anio = $anio + 1;
                        }

                        $fecha_actual = date("Y-m-d");
                        $fecha = $anio."-".$mes."-".$dia;
                        $date1 = new DateTime($fecha);
                        $date2 = new DateTime($fecha_actual);
                        $diff = $date1->diff($date2);
                        if($diff < 30) {
                            $mes = $mes + 1;
                        }
                        $fecha = $anio."-".$mes."-".$dia;
                        // $dias_del_mes = date( 't', strtotime( $anio."-".$mes."-1" ) );
                        // if($dias_del_mes < $dia) {
                        //     $fecha = $anio."-".$mes."-".$dias_del_mes;
                        // }
                      
                        
                    } else {
                        $fecha = $this->sumar_restar_dias($fecha, "+", 30);
                    }
                   
                    $data_cronograma = array();
                    $data_cronograma["cCodConsecutivo"] = $conformidad[0]->cCodConsecutivo;
                    $data_cronograma["nConsecutivo"] = $conformidad[0]->nConsecutivo;
                    $data_cronograma["nrocuota"] = $c;
                    $data_cronograma["fecha_vencimiento"] = $fecha;

                    if( $t_monto_total > $solicitud_credito[0]->valor_cuota_final) {

                        $data_cronograma["valor_cuota"] =  $solicitud_credito[0]->valor_cuota_final;
                        $data_cronograma["saldo_cuota"] =  $solicitud_credito[0]->valor_cuota_final;
                    } else {
                        $data_cronograma["valor_cuota"] = $t_monto_total;
                        $data_cronograma["saldo_cuota"] =  $t_monto_total;
                    }

                    // $data_cronograma["valor_cuota"] = $solicitud_credito[0]->valor_cuota_final;
                    $data_cronograma["int_moratorio"] = "0";
                    // $data_cronograma["saldo_cuota"] = $solicitud_credito[0]->valor_cuota_final;
                    $data_cronograma["monto_pago"] = "0";
                    // print_r($this->preparar_datos("dbo.ERP_SolicitudCronograma", $data_cronograma));
                    $res = $this->base_model->insertar($this->preparar_datos("dbo.ERP_SolicitudCronograma", $data_cronograma));
                    $t_monto_total -= (float)$solicitud_credito[0]->valor_cuota_final;
                    // print_r($res);   
                }
            }

            DB::commit();
            return response()->json([
                'status' => true,
                'msg'=>trim($val),
                'conformidad'=>$conformidad,
                'solicitud'=>$solicitud,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    } 
         public function getVentas($id, AprobacionSolicitudInterface $repo)
    {
        try {
            $data = $repo->getVentasAproba($id);
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
          public function getAprobadores($id, AprobacionSolicitudInterface $repo)
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

    public function all(Request $request, AprobacionSolicitudInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['Conformidad','Codigo','Consecutivo','IdUsuario','Usuario','EstadoAprob','Fecha','FechaVenc','EstadoSol','Saldo','Total','Moneda','Cliente','NumeroDoc','TipoDoc','TipoSolicitud'];
        return parseList($repo->search($s), $request, 'Conformidad', $params);
    }

    public function create(AprobacionSolicitudInterface $repo, AprobacionSolicitudRequest $request)
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

    public function update(AprobacionSolicitudInterface $repo, AprobacionSolicitudRequest $request)
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

    public function destroy(AprobacionSolicitudInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(AprobacionSolicitudInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CATEGORÍAS', 'Categoría');
    }
}
