<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Customer\CustomerInterface;
use App\Http\Recopro\Proforma\ProformaTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Proforma\ProformaInterface;
use App\Http\Recopro\Orden_servicio\Orden_servicioInterface;
use App\Http\Recopro\ProformaView\ProformaViewInterface;
use App\Http\Requests\ProformaRequest;
use DB;

class ProformaController extends Controller
{
    use ProformaTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function pdf(Request $request, ProformaInterface $repo, Orden_servicioInterface $repoOrde)
    {
        $id = $request->input('id');
        $valtodo = explode("_", $id);
        $data = $repo->find_proforma($valtodo[0], $valtodo[1]);
        $data_repuesto = $repo->find_proforma_repuestos($valtodo[0], $valtodo[1]);
        $data['dFechaRegistro2'] = date("Y-m-d", strtotime($data[0]->dFechaRegistro));
        $data_servicio = $repo->find_proforma_servicios($valtodo[0], $valtodo[1]);
        $data_orden = $repoOrde->find_orden($data[0]->cCodConsecutivoOS, $data[0]->nConsecutivoOS);
        $data_cliente = $repoOrde->find_orden_cliente($data_orden[0]->idCliente);
        return response()->json([
            'status' => true,
            'data' => $data,
            'data_repuesto' => $data_repuesto,
            'data_servicio' => $data_servicio,
            'data_cliente' => $data_cliente,
        ]);
    }

    public function all(Request $request, ProformaViewInterface $repo)
    {
        $filter = $request->all();
        $params = ['cCodConsecutivo', 'nConsecutivo', 'razonsocial_cliente', 'cCodConsecutivoOS', 'nConsecutivoOS', 'dFechaRegistro', 'iEstado'];
        return parseList($repo->search($filter), $request, 'cCodConsecutivo', $params);
    }

    public function deleteDetalleMO($id, ProformaInterface $repo, Request $request)
    {

        DB::beginTransaction();
        try {
            $data = $request->all();
            $valtodo = explode("_", $id);

            $id_revision_array = $data['id_revision_array'];
            $id_revision_array = explode(',', $id_revision_array);

            $idDetalleRepuestoGrup = $data['idDetalleRepuestoGrup'];
            $idDetalleRepuestoGrup = explode(',', $idDetalleRepuestoGrup);

            for ($i = 0; $i < count($id_revision_array); $i++) {
                $val = $repo->destroy_proforma_servicio($valtodo[0], $valtodo[1], $id_revision_array[$i]);
                if ($val[0]->Mensaje != '') {
                    break;
                }
            };
            for ($i = 0; $i < count($idDetalleRepuestoGrup); $i++) {
                $val2 = $repo->destroy_proforma_repuesto($valtodo[0], $valtodo[1], $idDetalleRepuestoGrup[$i]);
                if ($val2[0]->Mensaje != '') {
                    break;
                }
            };
            DB::commit();
            return response()->json([
                'status' => true,
                'data' => $id_revision_array,
                'dato' => $val,
                'dato2' => $val2,
                'datad' => $id,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function createUpdate($id, ProformaInterface $repo, Request $request)
    {
        DB::beginTransaction();
        try {

            $data = $request->all();

            $cCod = strtoupper($data['cCod']);
            $nCons = strtoupper($data['nCons']);
            $cCodOS = strtoupper($data['cCodOS']);
            $nConsOS = strtoupper($data['nConsOS']);
            $cMoneda = strtoupper($data['cMoneda']);
            $nidCliente = strtoupper($data['nidCliente']);
            $nidAsesor = strtoupper($data['nidAsesor']);
            $cPlacaVeh = strtoupper($data['cPlacaVeh']);
            $dFecRec = strtoupper($data['dFecRec']);
            $nEstimado = strtoupper($data['nEstimado']);
            $modo_array_repuesto = $data['modo_array_repuesto'];
            $modo_array_repuesto = explode(',', $modo_array_repuesto);

            $totalDetalle_to = $data['totalDetalle'];
            $totalMO_to = $data['totalMO'];
            if ($totalMO_to == '') {
                $totalMO_to = 0;
            }

            $id_revision_array = $data['id_revision_array'];
            $id_revision_array = explode(',', $id_revision_array);

            $id_tipo_array = $data['id_tipo_array'];
            $id_tipo_array = explode(',', $id_tipo_array);

            $id_repuesto_tipoTotal = $data['id_repuesto_tipoTotal'];
            $id_repuesto_tipoTotal = explode(',', $id_repuesto_tipoTotal);

            $id_repuesto_array = $data['id_repuesto_array'];
            $id_repuesto_array = explode(',', $id_repuesto_array);

            $id_repuesto_cantidad = $data['id_repuesto_cantidad'];
            $id_repuesto_cantidad = explode(',', $id_repuesto_cantidad);

            $id_repuesto_precio = $data['id_repuesto_precio'];
            $id_repuesto_precio = explode(',', $id_repuesto_precio);

            $precio_array_servicio = $data['precio_array_servicio'];
            $precio_array_servicio = explode(',', $precio_array_servicio);

            $id_repuesto_impuesto = $data['id_repuesto_impuesto'];
            $id_repuesto_impuesto = explode(',', $id_repuesto_impuesto);

            $modo_array_servicio = $data['modo_array_servicio'];
            $modo_array_servicio = explode(',', $modo_array_servicio);

            $idDetalleGrup = $data['idDetalleGrup'];
            $idDetalleGrup = explode(',', $idDetalleGrup);

            $impuesto_servicio = $data['impuesto_servicio'];
            $impuesto_servicio = explode(',', $impuesto_servicio);

            $idDetalleRepuestoGrup = $data['idDetalleRepuestoGrup'];
            $idDetalleRepuestoGrup = explode(',', $idDetalleRepuestoGrup);

            $nDescuento = $data['nDescuentoP'];
            $nPorcDescuento = $data['nPorcDescuentoP'];
            $nIdDscto = $data['nIdDsctoP'];
            if ($nIdDscto == '') {
                $nIdDscto = 0;
            }
            $nOperGratuita = $data['nOperGratuitaP'];

            $totalmo = 0;
            $totaldetalle = 0;
            $impuesto = 0;

            $subTotalServicio = $data['subTotalServicio'];
            $subTotalServicio = explode(',', $subTotalServicio);

            for ($i = 0; $i < count($precio_array_servicio); $i++) {
                $totalmo = $totalmo + floatval($precio_array_servicio[$i]);
            }
            for ($i = 0; $i < count($id_repuesto_cantidad); $i++) {
                $totaldetalle = $totaldetalle + (floatval($id_repuesto_cantidad[$i]) * floatval($id_repuesto_precio[$i]));
            }
            $subtotal = floatval($totalmo) + floatval($totaldetalle);

            for ($i = 0; $i < count($id_repuesto_impuesto); $i++) {
                $impuesto = $impuesto + floatval($id_repuesto_impuesto[$i]);
            }
            for ($i = 0; $i < count($impuesto_servicio); $i++) {
                $impuesto = $impuesto + floatval($impuesto_servicio[$i]);
            }
            $total = floatval($subtotal) + floatval($impuesto);

            $val = 1;
            if ($data['nCons'] == 0) {
                $val = 0;
            };
            $modo = $val;
            $usuario = auth()->id();

            $res = $repo->actualizar_proforma(
                $cCod,
                $nCons,
                $cCodOS,
                $nConsOS,
                $cMoneda,
                $nidCliente,
                $nidAsesor,
                $cPlacaVeh,
                $dFecRec,
                $nEstimado,
                $totalMO_to,
                $totalDetalle_to,
                $subtotal,
                $impuesto,
                $total,
                $nDescuento,
                $nPorcDescuento,
                $nIdDscto,
                $nOperGratuita,

                $modo,
                $usuario
            );

            $montoRepu = $data["montoRepu"];
            $montoRepu = explode(',', $montoRepu);

            $porRepu = $data["porRepu"];
            $porRepu = explode(',', $porRepu);

            $idDescuenRepues = $data["idDescuenRepues"];
            $idDescuenRepues = explode(',', $idDescuenRepues);

            $staOperacionRepu = $data["staOperacionRepu"];
            $staOperacionRepu = explode(',', $staOperacionRepu);

            $operacionGraRep = $data["operacionGraRep"];
            $operacionGraRep = explode(',', $operacionGraRep);

            $cantidDeta = $data["cantidDeta"];

            $cantidDeta = explode(',', $cantidDeta);
            $montoDeta = $data["montoDeta"];
            $montoDeta = explode(',', $montoDeta);
            $porDeta = $data["porDeta"];
            $porDeta = explode(',', $porDeta);
            $cantidDeta = $data["cantidDeta"];
            $cantidDeta = explode(',', $cantidDeta);
            $idDescuenDeta = $data["idDescuenDeta"];
            $idDescuenDeta = explode(',', $idDescuenDeta);
            $staOperacion = $data["staOperacion"];
            $staOperacion = explode(',', $staOperacion);

            if (intval($res[0]->Mensaje)) {
                if ($id_repuesto_array[0] != '') {
                    for ($i = 0; $i < count($id_repuesto_array); $i++) {
                        $total = floatval($id_repuesto_cantidad[$i]) * floatval($id_repuesto_precio[$i]);
                        if ($staOperacionRepu[$i] == 'S') {
                            $totalO = floatval($id_repuesto_cantidad[$i]) * floatval($id_repuesto_precio[$i]) + floatval($id_repuesto_impuesto[$i]);
                        } else {
                            $totalO = 0;
                        };
                        $repo->actualizar_Proforma_detalle($cCod, $res[0]->Mensaje, $idDetalleRepuestoGrup[$i], $id_repuesto_array[$i],
                            $id_repuesto_cantidad[$i], $id_repuesto_precio[$i], $operacionGraRep[$i], $id_repuesto_impuesto[$i], $id_repuesto_tipoTotal[$i],
                            $montoRepu[$i], $porRepu[$i], $idDescuenRepues[$i], $staOperacionRepu[$i], $totalO, $modo_array_repuesto[$i], $usuario);
                    };
                }

                if ($id_revision_array[0] != '') {
                    for ($i = 0; $i < count($id_revision_array); $i++) {
                        $totald = floatval($cantidDeta[$i]) * floatval($precio_array_servicio[$i]);
                        if ($staOperacion[$i] == 'S') {
                            $totalO = floatval($cantidDeta[$i]) * floatval($precio_array_servicio[$i]) + floatval($impuesto_servicio[$i]);
                        } else {
                            $totalO = 0;
                        };
                        $repo->actualizar_Proforma_MO($cCod, $res[0]->Mensaje, $idDetalleGrup[$i], $id_revision_array[$i], $subTotalServicio[$i], $impuesto_servicio[$i], $id_tipo_array[$i], $montoDeta[$i], $porDeta[$i], $cantidDeta[$i], $precio_array_servicio[$i], $idDescuenDeta[$i], $staOperacion[$i], $totalO, $modo_array_servicio[$i], $usuario);
                    }
                }

            };
            DB::commit();
            return response()->json([
                'status' => true,
                'res' => $res,
                'test' => $id_repuesto_array,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function destroy($id, ProformaInterface $repo, Request $request)
    {
        try {
            $valtodo = explode("_", $id);
            $val = $repo->destroy_Proforma($valtodo[0], $valtodo[1]);
            return response()->json([
                'status' => true,
                'data' => $val,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function excel(ProformaInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE PROFORMAS', 'Proforma');
    }

    public function data_form(ProformaInterface $Repo, CustomerInterface $cusRepo, Orden_servicioInterface $osRepo)
    {
        try {
            $codigo_proforma = $Repo->getTotal_Orden();
            // $articulos_repuestos=$Repo->get_articuloRepuestos();
            $getTotal_Orden_total = $Repo->getTotal_Orden_total();
            $get_proformas_entrega = $Repo->get_proformas_entrega();
            $get_proformas_devolucion = $Repo->get_proformas_devolucion();
            $getTotal_Orden_total_calidad = $Repo->getTotal_Orden_total_calidad();
            $data_servicioGeneral = $Repo->getDataGeneralServicio();
            $igv = $Repo->get_igv();

            $tipo_clie = $cusRepo->tipo_clie();

            $usuario = auth()->id();
            $descuentos = $osRepo->get_descuentos($usuario);
            $dataredondeo = $osRepo->get_redondeo();
            $codigo_proforma2 = $osRepo->getcodigo_proforma();
            $condicion_pago = $osRepo->getcondicion_pago();
            $asesor = $osRepo->getasesor();
            $servicios_todos = $osRepo->get_servicios_todos();
            $moneda = $osRepo->getmoneda();
            $totales = $osRepo->get_totales();

            return response()->json([
                'status' => true,
                'codigo_proforma' => $codigo_proforma,
                // 'articulos_repuestos'=>$articulos_repuestos,
                'total_orden' => $getTotal_Orden_total,
                'proformas_entrega' => $get_proformas_entrega,
                'proformas_devolucion' => $get_proformas_devolucion,
                'getTotal_Orden_total_calidad' => $getTotal_Orden_total_calidad,
                'igv' => $igv,
                'data_servicioGeneral' => $data_servicioGeneral,

                'tipo_clie' => $tipo_clie,

                'descuentos' => $descuentos,
                'dataredondeo' => (isset($dataredondeo[0]->value)) ? $dataredondeo[0]->value : 0,
                'decimales_redondeo' => (isset($decimales_redondeo[0]->value)) ? $decimales_redondeo[0]->value : 0,
                'codigo_proforma2' => $codigo_proforma2,
                'condicion_pago' => $condicion_pago,
                'asesor' => $asesor,
                'servicios_todos' => $servicios_todos,
                'moneda' => $moneda,
                'totales' => $totales,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function deleteDetalleServicio($id, ProformaInterface $repo, Request $request)
    {
        try {
            $valtodo = explode("_", $id);
            $val = $repo->destroy_Proforma_detalleSer($valtodo[0], $valtodo[1], $valtodo[2]);
            return response()->json([
                'status' => true,
                'data' => $val,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getDetalle_entrada($id, ProformaInterface $repo, Request $request)
    {
        try {
            $valtodo = explode("_", $id);
            $val = $repo->get_detalle_entrada($valtodo[0], $valtodo[1]);
            $val_dataDev = $repo->get_detalle_entrada_Devolucion($valtodo[0], $valtodo[1]);
            return response()->json([
                'status' => true,
                'data' => $val_dataDev,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function deleteDetalleRepuesto($id, ProformaInterface $repo, Request $request)
    {
        try {
            $valtodo = explode("_", $id);
            $val = $repo->destroy_Proforma_detalleRepuesto($valtodo[0], $valtodo[1], $valtodo[2]);
            return response()->json([
                'status' => true,
                'data' => $val,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function cambiar_estado($id, ProformaInterface $repo, Request $request)
    {

        DB::beginTransaction();
        try {
            $data = $request->all();
            $valtodo = explode("_", $id);
            $usuario = auth()->id();
            $val = $repo->cambiar_estado($valtodo[0], $valtodo[1], $data['estado'], $usuario);
            DB::commit();
            return response()->json([
                'status' => true,
                'data' => $val,

            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function find($id, ProformaInterface $repo)
    {
        try {
            $valtodo = explode("_", $id);
            $data = $repo->find_proforma($valtodo[0], $valtodo[1]);
            $data_repuesto = $repo->find_proforma_repuestos($valtodo[0], $valtodo[1]);
            $data['dFechaRegistro2'] = date("Y-m-d", strtotime($data[0]->dFechaRegistro));
            $data_servicio = $repo->find_proforma_servicios($valtodo[0], $valtodo[1]);
            return response()->json([
                'status' => true,
                'data' => $data,
                'data_repuesto' => $data_repuesto,
                'data_servicio' => $data_servicio,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function get_repuestos_consecutivo($id, ProformaInterface $repo)
    {
        try {
            $data = $repo->get_repuestos_consecutivo2($id);

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

}
