<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Area\AreaInterface;
use App\Http\Recopro\Consecutive\ConsecutiveInterface;
use App\Http\Recopro\SolicitudCompra\SolicitudCompraTrait;
use App\Http\Recopro\SolicitudCompraArticulo\SolicitudCompraArticuloInterface;
use Illuminate\Http\Request;
use App\Http\Recopro\SolicitudCompra\SolicitudCompraInterface;
use App\Http\Recopro\Product\ProductInterface;
use App\Http\Recopro\Lot\LotInterface;
use App\Http\Recopro\Localizacion\LocalizacionInterface;
use App\Http\Recopro\Serie\SerieInterface;
use App\Http\Recopro\Solicitud_Asignacion\Solicitud_AsignacionInterface;
use Carbon\Carbon;
use DB;

class SolicitudCompraController extends Controller
{
    use SolicitudCompraTrait;

    public function __construct()
    {
        $this->middleware('ajax', ['only' => ['all']]);
    }

    public function all(Request $request, SolicitudCompraInterface $repo)
    {
        try {
            $filter = $request->all();
            $params = ['idMovimiento', 'cCodConsecutivo', 'nConsecutivo', 'fecha_requerida', 'fecha_registro', 'idArea',
                'idUsuario', 'observaciones', 'estado'];

            $info = parseDataList($repo->search($filter), $request, 'idMovimiento', $params, 'DESC');

            $data = $info[1];

            foreach ($data as $d) {
                $d->fecha_registro = Carbon::parse($d->fecha_registro)->format('d/m/Y');
                $d->fecha_requerida = Carbon::parse($d->fecha_requerida)->format('d/m/Y');
                $d->area_ = ($d->area) ? $d->area->descripcion : '';
                $d->user_ = ($d->user) ? $d->user->name : '';
                $d->observaciones = (is_null($d->observaciones)) ? '' : $d->observaciones;
                $state = 'Registrado';
                if ($d->estado == 1) {
                    $state = 'Aprobado';
                } elseif ($d->estado == 2) {
                    $state = 'C/Orden de Compra';
                } elseif ($d->estado == 3) {
                    $state = 'Cerrado';
                } elseif ($d->estado == 4) {
                    $state = 'Cancelado';
                }
                $d->state = $state;
                unset($d->area, $d->idArea, $d->user, $d->idUsuario, $d->estado);
            }
            return response()->json([
                'Result' => 'OK',
                'TotalRecordCount' => $info[0],
                'Records' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'Result' => 'ERROR',
                'Message' => [$e->getMessage()]
            ]);
        }
    }

    public function data_form(ConsecutiveInterface $conRepo, AreaInterface $areaRepo)
    {
        try {
            $data_con = [];
            foreach ($conRepo->getByType('SOLCOMPRA') as $con) {
                $data_con[] = $con->cCodConsecutivo;
            }
            $data_area = [];
            foreach ($areaRepo->allActive() as $area) {
                $data_area[] = [
                    'id' => $area->id,
                    'text' => $area->descripcion
                ];
            }
//            $usuario = auth()->id();
//            $almacen_usuario = $WareRepo->getAlmacen_usuario($usuario);
//            $tipocompra = $serRepo->get_tipoCompraVenta();

            return response()->json([
                'status' => true,
                'consecutive' => $data_con,
                'area' => $data_area,
//                'almacen_usuario' => $almacen_usuario,
//                'tipoCompra' => $tipocompra
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function createUpdate($id, Request $request, SolicitudCompraInterface $solRepo, ConsecutiveInterface $conRepo,
                                 SolicitudCompraArticuloInterface $scaRepo)
    {
        ini_set('max_execution_time', 6000);
        DB::beginTransaction();
        try {
            $data = $request->except(['estado', 'fecha_registro', 'fecha_requerida', 'detail']);
            $date_register = $request->input('fecha_registro', '');
            $date_register = Carbon::createFromFormat('d/m/Y', $date_register);
            $data['fecha_registro'] = $date_register;
            $date_required = $request->input('fecha_requerida', '');
            $date_required = Carbon::createFromFormat('d/m/Y', $date_required);
            $data['fecha_requerida'] = $date_required;
            $state = $request->input('estado', 0);
            $data['estado'] = $state;
            if ($id != 0) {
                $sol = $solRepo->find($id);
                if ($sol && $sol->estado != 0) {
                    throw new \Exception('No puede modificar esta solicitud');
                }
            }
            if ($id == 0) {
                $data['idMovimiento'] = $solRepo->getIDByLast();
                $number_con = $conRepo->getIDByConsecutive($data['cCodConsecutivo']);
                $data['nConsecutivo'] = $number_con;
                $data['idUsuario'] = auth()->id();
                $sol = $solRepo->create($data);
                $id = $sol->idMovimiento;
                $conRepo->update($data['cCodConsecutivo'], [
                    'nConsecutivo' => $number_con
                ]);
            } else {
                $sol = $solRepo->update($id, $data);
            }
            $detail = $request->input('detail', []);
            if ($state == 1 && count($detail) == 0) {
                throw new \Exception('Debe agregar minimo 1 articulo');
            }
            $sca_id = [];
            foreach ($detail as $det) {
                $p_id = $det['id'];
                $q_ = (float)$det['q'];
                $date_required_ = $det['date'];
                $date_required_ = Carbon::createFromFormat('d/m/Y', $date_required_);
                $sca = $scaRepo->createUpdate([
                    'idMovimiento' => $id,
                    'idArticulo' => $p_id,
                    'cantidad' => $q_,
                    'fecha_requerida' => $date_required_,
                    'estado' => $state,
                    'consecutivo' => $scaRepo->getIDByLast(),
                    'observaciones' => $det['observations']
                ]);
                $sca_id[] = $sca->id;
            }
            $scaRepo->deleteByExcept($id, $sca_id);
            $data_return = [];
            if ($state == 0) {
                $number = $sol->nConsecutivo;
                $state_ = 'Registrado';
                if ($sol->estado == 1) {
                    $state_ = 'Aprobado';
                } elseif ($sol->estado == 2) {
                    $state_ = 'C/Orden de Compra';
                } elseif ($sol->estado == 3) {
                    $state_ = 'Cerrado';
                } elseif ($sol->estado == 4) {
                    $state_ = 'Cancelado';
                }
                $data_return = [
                    'code' => $id,
                    'state' => $state_,
                    'number' => $number
                ];
            }
            DB::commit();
            return response()->json([
                'status' => true,
                'data' => $data_return
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function find($id, SolicitudCompraInterface $repo)
    {
        try {
            $data = $repo->find($id);

            $state = 'Registrado';
            if ($data->estado == 1) {
                $state = 'Aprobado';
            } elseif ($data->estado == 2) {
                $state = 'C/Orden de Compra';
            } elseif ($data->estado == 3) {
                $state = 'Cerrado';
            } elseif ($data->estado == 4) {
                $state = 'Cancelado';
            }
            $data->state = $state;
            $data->fecha_registro = Carbon::parse($data->fecha_registro)->format('d/m/Y');
            $data->fecha_requerida = Carbon::parse($data->fecha_requerida)->format('d/m/Y');
            $detail = [];
            foreach ($data->articles as $sca) {
                $article = $sca->article;
                $u = $article->unity;
                $und = (is_null($u->symbol)) ? $u->Descripcion : $u->symbol;
                $state_ = 'Registrado';
                if ($sca->estado == 1) {
                    $state_ = 'Aprobado';
                } elseif ($sca->estado == 2) {
                    $state_ = 'C/Orden de Compra';
                } elseif ($sca->estado == 3) {
                    $state_ = 'Cerrado';
                } elseif ($sca->estado == 4) {
                    $state_ = 'Cancelado';
                }
                $detail[] = [
                    'id' => $sca->idArticulo,
                    'description' => $article->description,
                    'q' => (float)$sca->cantidad,
                    'und' => $und,
                    'date' => Carbon::parse($sca->fecha_requerida)->format('d/m/Y'),
                    'observations' => (is_null($sca->observaciones)) ? '' : $sca->observaciones,
                    'state' => $state_
                ];
            }
            $data->detail = $detail;
//            $operaciones = $repo->getOperationFind();
//            $data_movimiento_Articulo = $repo->get_movement_articulo($id);
//            $data_movimiento_Articulo_entrega = $repo->get_movement_articulo_entrega($id);
//            $data_movimiento_Articulo_entrega_venta = $repo->get_movimiento_Articulo_entrega_venta($id);
//            $data_movimiento_lote = $repo->get_movemen_lote($id);
//            $data_movimiento_serie = $repo->get_movemen_Serie($id);
//            $data_movimiento_lote_entrega = $repo->get_movemen_lote_entrega($id);
//            $data_movimiento_serie_entrega = $repo->get_movemen_Serie_entrega($id);
//            $data_ventaMovimiento = $repo->get_movimientoVenta($id);

            return response()->json([
                'status' => true,
                'data' => $data,
//                'movimiento_Ar' => $data_movimiento_Articulo,
//                'operaciones' => $operaciones,
//                'data_movimiento_lote' => $data_movimiento_lote,
//                'data_movimiento_serie' => $data_movimiento_serie,
//                'data_movimiento_Articulo_entrega' => $data_movimiento_Articulo_entrega,
//                'data_movimiento_Articulo_entrega_venta' => $data_movimiento_Articulo_entrega_venta,
//                'data_ventaMovimiento' => $data_ventaMovimiento,
//                'data_movimiento_lote_entrega' => $data_movimiento_lote_entrega,
//                'data_movimiento_serie_entrega' => $data_movimiento_serie_entrega,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function destroy(Request $request, SolicitudCompraInterface $repo, SolicitudCompraArticuloInterface $scaRepo)
    {
        DB::beginTransaction();
        try {
            $id = $request->input('idMovimiento');
            $sol = $repo->find($id);
            if (!$sol || $sol->estado != 0) {
                throw new \Exception('No puede eliminar esta solicitud');
            }
            $scaRepo->deleteBySol($id);
            $repo->destroy($id);

            DB::commit();
            return response()->json([
                'Result' => 'OK',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'Result' => 'ERROR',
                'Message' => [$e->getMessage()]
            ]);
        }
    }
    public function excel(SolicitudCompraInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE SOLICITUDES DE COMPRA', 'Lista de solicitudes');
    }

    public function cambiarEstado($id, Request $request, SolicitudCompraInterface $scRepo,
                                  SolicitudCompraArticuloInterface $scaRepo)
    {
        DB::beginTransaction();
        try {
            $state = $request->input('state');
            $scaRepo->updateBySol($id, [
                'estado' => $state
            ]);
            $scRepo->update($id, [
                'estado' => $state
            ]);

            DB::commit();
            return response()->json([
                'status' => true
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function deleteDetalleSC($id, SolicitudCompraInterface $repo, Request $request)
    {
        try {
            $array = explode("_", $id);
            $val = $repo->destroy_detalle_solicitudCompra($array[0], $array[1]);
            return response()->json([
                'status' => true,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function create(SolicitudCompraInterface $repo, SolicitudCompraRequest $request)
    {
        $data = $request->all();
        $table = "ERP_Categoria";
        $id = 'idCategoria';
        $data['idCategoria'] = $repo->get_consecutivo($table, $id);
        $data['descripcion'] = strtoupper($data['Categoria']);
        $estado = 'A';
        if (!isset($data['estado'])) {
            $estado = 'I';
        };
        $data['estado'] = $estado;
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function xmlcargar(Request $request, SolicitudCompraInterface $repo)
    {
        $fileXml = $request->file('file');
        $nombre = $fileXml->getClientOriginalName();
        $ruta = public_path("xml/" . $nombre);
        copy($fileXml, $ruta);
        $xml = simplexml_load_file(public_path("xml/" . $nombre));
        $valor = $xml->xpath("cac:InvoiceLine");
        $valorMoneda = $xml->xpath("cbc:DocumentCurrencyCode");
        $monedFac = $valorMoneda[0]->__toString();
        $mone = '';
        if ($monedFac == 'USD') {
            $mone = '2';
        } else if ($monedFac == 'PEN') {
            $mone = '1';
        }
        $arrayIdsProdE = [];
        $arrayCodProdE = [];
        $arrayDescripE = [];
        $arrayCantidaE = [];
        $arrayCostoUnE = [];
        $arrayCodProdN = [];
        $arrayDescripN = [];
        $arrayCantidaN = [];
        $arrayCostoUnN = [];
        foreach ($valor as $elemento) {
            $valorIgv = $elemento->xpath("cac:TaxTotal/cbc:TaxAmount");
            $valorCant = $elemento->xpath("cbc:InvoicedQuantity");
            $valorDescr = $elemento->xpath("cac:Item/cbc:Description");
            $valorProdu = $elemento->xpath("cac:Item/cac:SellersItemIdentification/cbc:ID");
            $valorImpor = $elemento->xpath("cbc:LineExtensionAmount");
            $valorCosto = $elemento->xpath("cac:PricingReference/cac:AlternativeConditionPrice/cbc:PriceAmount");
            $descrProd = $valorDescr[0]->__toString();
            $codigProd = $valorProdu[0]->__toString();
            $cantiProd = $valorCant[0]->__toString();
            $igvProd = $valorIgv[0]->__toString();
            $imporProd = $valorImpor[0]->__toString();
            $costoProd = $valorCosto[0]->__toString();
            $val = $repo->getProductoFactura($codigProd);
            if (empty($val)) {

                array_push($arrayCodProdN, $codigProd);
                array_push($arrayDescripN, $descrProd);
                array_push($arrayCantidaN, $cantiProd);
                array_push($arrayCostoUnN, $costoProd);
            } else {
                array_push($arrayIdsProdE, $val[0]->id);
                array_push($arrayCodProdE, $codigProd);
                array_push($arrayDescripE, $descrProd);
                array_push($arrayCantidaE, $cantiProd);
                array_push($arrayCostoUnE, $costoProd);
            }
        }
        unlink(public_path("xml/" . $nombre));
        return response()->json([
            'Result' => 'OK',
            'Record' => [],
            'arrayIdsProdE' => $arrayIdsProdE,
            'arrayCodProdE' => $arrayCodProdE,
            'arrayDescripE' => $arrayDescripE,
            'arrayCantidaE' => $arrayCantidaE,
            'arrayCostoUnE' => $arrayCostoUnE,
            'arrayCodProdN' => $arrayCodProdN,
            'arrayDescripN' => $arrayDescripN,
            'arrayCantidaN' => $arrayCantidaN,
            'arrayCostoUnN' => $arrayCostoUnN,
            'monedFac' => $mone,

        ]);
    }

//    public function procesarTransferencia($id, SolicitudCompraInterface $repo, Request $request)
//    {
//        try {
//            $val = $repo->procesarTransferencia($id);
//            // throw new \Exception('Ya existe un almacen con este código interno. Por favor ingrese otro código.');
//            //     DB::commit();
//            return response()->json([
//                'status' => true,
//                'data' => $val,
//            ]);
//
//        } catch (\Exception $e) {
//            DB::rollBack();
//            return response()->json([
//                'status' => false,
//                'message' => $e->getMessage()
//            ]);
//        }
//    }


    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

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

    public function validateCantSerie($id, SerieInterface $reSeri)
    {
        try {
            $datos = $id;
            $datos = explode('*', $datos);
            $idArticulo = $datos[0];
            $cantidad = $datos[1];
            $data = $reSeri->getSeries($idArticulo);
            $valor = count($data);
            $val = "N";
            if ($data) {
                $val = "A";
                if ($cantidad > $valor) {
                    $val = 'S';
                }
            }
            return response()->json([
                'status' => true,
                'data' => $val,
                'cantidad' => $valor
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
            $valor = 'N';
            $fecha = 'N';
            $codigol = 'N';
            if ($data) {
                $valor = 'A';
                $fecha = $data->fechaVencimiento;
                $codigol = $data->idLote;
            }
            return response()->json([
                'status' => true,
                'data' => $valor,
                'fecha' => $fecha,
                'codigol' => $codigol,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function valida_series_serve($id, SerieInterface $repo)
    {

        try {
            $data = 0;
            $series = explode(',', $id);
            for ($i = 0; $i < count($series); $i++) {
                $data = $repo->findByCode($series[$i]);
                if ($data) {
                    throw new \Exception('Ya existe una Serie con este código ' . $series[$i] . 'Por favor ingrese otro código.');
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

    // public function getStockLoc($id, SolicitudCompraInterface $repo){

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
    public function pdf(Request $request, SolicitudCompraInterface $repo, Solicitud_AsignacionInterface $repcom)
    {
        $id = $request->input('id');
        $idtipoOpe = $request->input('idtipoOpe', '');
        $data_movimientoEntrega = "";
        $data_movimientoEntregaArti = "";
        if ($idtipoOpe == 7) {
            $data_movimientoEntrega = $repo->get_movimientoEntregaProf($id);
            $data_movimientoEntregaArti = $repo->get_movement_articulo_printProforma($id);
        } else {
            $data_movimientoEntrega = $repo->get_movimientoEntrega($id);
            $data_movimientoEntregaArti = $repo->get_movement_articulo_printVenta($id);
        }
        $operacion = $repo->get_movimiento($id);
        $data_compania = $repcom->get_compania();

        $data = $repo->find($id);
        $data_movimiento_Articulo = $repo->get_movement_articulo_print($id);
        $data_movimiento_lote = $repo->get_movemen_lote($id);
        $data_movimiento_serie = $repo->get_movemen_Serie($id);
        if ($data['fecha_proceso']) {
            $data['fecha_proceso'] = date("d/m/Y", strtotime($data['fecha_proceso']));
        } else {
            $data['fecha_proceso'] = '';
        };
        $data['fecha_impresion'] = date("d/m/Y");
        $path = public_path('/' . $data_compania[0]->ruta_logo);
        $type_image = pathinfo($path, PATHINFO_EXTENSION);
        $image = file_get_contents($path);
        $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);
        return response()->json([
            'status' => true,
            'data_compania' => $data_compania,
            'data' => $data,
            'operacion' => $operacion,
            'movimiento_Ar' => $data_movimiento_Articulo,
            'data_movimiento_lote' => $data_movimiento_lote,
            'data_movimiento_serie' => $data_movimiento_serie,
            'estado' => $id,
            'img' => $image,
            'data_movimientoEntrega' => $data_movimientoEntrega,
            'data_movimientoEntregaArti' => $data_movimientoEntregaArti,
        ]);
    }

    public function getDataArticulo($id, SolicitudCompraInterface $repo)
    {
        try {

            $data = $repo->dataProducto($id);
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

    public function getLocaStock($id, SolicitudCompraInterface $repo)
    {

        try {

            $data = $repo->getLocaStock($id);
            $LocalizacionAlmacen = $repo->getLocalizacioAlmacen($id);
            return response()->json([
                'status' => true,
                'data' => $data,

                'LocalizacionAlmacen' => $LocalizacionAlmacen,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

//    public function validaDetalle($id, SolicitudCompraInterface $repo)
//    {
//        try {
//            $data = $repo->getDetalle($id);
//            if (empty($data)) {
//                throw new \Exception("Debe registrar los artículos del movimiento");
//            }
//
//            DB::commit();
//            return response()->json([
//                'status' => true,
//            ]);
//
//        } catch (\Exception $e) {
//            return response()->json([
//                'status' => false,
//                'message' => $e->getMessage()
//            ]);
//        }
//    }

    public function getKit($id, SolicitudCompraInterface $repo, ProductInterface $repoPro)
    {
        try {

            $info = $repoPro->getidArticuloKit($id);
            $idkit = $info[0]->idArticuloKit;
            $data = $repoPro->getDetalleKitCom($idkit, $id);
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
