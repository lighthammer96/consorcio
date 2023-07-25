<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Compania\CompaniaInterface;
use App\Http\Recopro\ConfigJerarquiaCompra\ConfigJerarquiaCompraInterface;
use App\Http\Recopro\Consecutive\ConsecutiveInterface;
use App\Http\Recopro\Orden_servicio\Orden_servicioInterface;
use App\Http\Recopro\OrdenCompraConformidad\OrdenCompraConformidadInterface;
use App\Http\Recopro\Param\ParamInterface;
use App\Http\Recopro\Proforma\ProformaInterface;
use App\Http\Recopro\RegisterOrdenCompra\RegisterOrdenCompraTrait;
use App\Http\Recopro\SolicitudCompra\SolicitudCompraInterface;
use Illuminate\Http\Request;
use App\Http\Recopro\RegisterOrdenCompra\RegisterOrdenCompraInterface;
use App\Http\Recopro\Currency\CurrencyInterface;
use App\Http\Recopro\Warehouse\WarehouseInterface;
use App\Http\Recopro\Operation\OperationInterface;
use App\Http\Recopro\Lot\LotInterface;
use App\Http\Recopro\Localizacion\LocalizacionInterface;
use App\Http\Recopro\PaymentCondition\PaymentConditionInterface;
use App\Http\Recopro\Proveedor\ProveedorInterface;
use App\Http\Recopro\Serie\SerieInterface;
use App\Http\Recopro\RegisterOrdenCompraArticulo\RegisterOrdenCompraArticuloInterface;
use App\Http\Recopro\ViewScomprArticulo\ViewScomprArticuloInterface;
use App\Http\Recopro\View_OrdenCompra\View_OrdenCompraInterface;
use App\Http\Recopro\SolicitudCompraArticulo\SolicitudCompraArticuloInterface;
use Carbon\Carbon;
use DB;
use \PDF;

class RegisterOrdenCompraController extends Controller
{
    use RegisterOrdenCompraTrait;

    public function __construct()
    {
        $this->middleware('ajax', ['only' => ['all']]);
    }

    public function all(Request $request, RegisterOrdenCompraInterface $repo)
    {
        try {
            $filter = $request->all();
            $s = $request->input('search', '');
            $params = ['id', 'cCodConsecutivo', 'nConsecutivo', 'dFecRegistro', 'dFecRequerida', 'idProveedor',
                'idMoneda', 'idcondicion_pago', 'total', 'iEstado', 'comentario'];
            $info = parseDataList($repo->search($filter), $request, 'id', $params);

            $data = $info[1];

            foreach ($data as $d) {
                $d->dFecRegistro = Carbon::parse($d->dFecRegistro)->format('d/m/Y');
                $d->dFecRequerida = Carbon::parse($d->dFecRequerida)->format('d/m/Y');
                $d->provider_ = ($d->provider) ? $d->provider->razonsocial : '';
                $d->currency_ = ($d->currency) ? $d->currency->Descripcion : '';
                $d->total = formatNumberTotal($d->total, 2);
                $d->payment_condition_ = ($d->paymentCondition) ? $d->paymentCondition->description : '';
                $state = 'Registrado';
                if ($d->iEstado == 2) {
                    $state = 'Por Aprobar';
                } elseif ($d->iEstado == 3) {
                    $state = 'Aprobado';
                } elseif ($d->iEstado == 4) {
                    $state = 'Recibido';
                } elseif ($d->iEstado == 5) {
                    $state = 'Backorder';
                } elseif ($d->iEstado == 6) {
                    $state = 'Cerrado';
                } elseif ($d->iEstado == 7) {
                    $state = 'Cancelado';
                } elseif ($d->iEstado == 8) {
                    $state = 'Rechazado';
                }
                $d->state = $state;
                $d->comentario = (is_null($d->comentario)) ? '' : $d->comentario;
                unset($d->provider, $d->idProveedor, $d->currency, $d->idMoneda);
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

    public function data_form(RegisterOrdenCompraInterface $moventRepo, CurrencyInterface $currencyRepo,
                              Orden_servicioInterface $osRepo, ConsecutiveInterface $conRepo, ParamInterface $parRepo)
    {
        try {
            $user_id = auth()->id();
            $currency = parseSelectOnly($currencyRepo->allActive(), 'IdMoneda', 'Descripcion');
            $providers = $moventRepo->getProveedor();
            $discounts = $osRepo->get_descuentos($user_id);
            $payment_condition = $osRepo->getcondicion_pago();
            $data_con = [];
            foreach ($conRepo->getByType('ORDCOMPRA') as $con) {
                $data_con[] = $con->cCodConsecutivo;
            }
            return response()->json([
                'status' => true,
                'discounts' => $discounts,
                'payment_condition' => $payment_condition,
                'currency' => $currency,
                'consecutive' => $data_con,
                'providers' => $providers,
                'igv' => $parRepo->getByDescription('Impuesto General a las Ventas (IGV)', 18),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function createUpdate($id, Request $request, RegisterOrdenCompraInterface $ocRepo, ConsecutiveInterface $conRepo,
                                 RegisterOrdenCompraArticuloInterface $ocaRepo, SolicitudCompraArticuloInterface $scaRepo,
                                 SolicitudCompraInterface $scRepo, ConfigJerarquiaCompraInterface $cjcRepo,
                                 OrdenCompraConformidadInterface $occRepo)
    {
        ini_set('max_execution_time', 6000);
        DB::beginTransaction();
        try {
            $data = $request->except(['state', 'dFecRegistro', 'dFecRequerida', 'detail']);
            $date_register = $request->input('dFecRegistro', '');
            $date_register = Carbon::createFromFormat('d/m/Y', $date_register);
            $data['dFecRegistro'] = $date_register;
            $date_required = $request->input('dFecRequerida', '');
            $date_required = Carbon::createFromFormat('d/m/Y', $date_required);
            $data['dFecRequerida'] = $date_required;
            $state = $request->input('state', 1);
            $data['iEstado'] = $state;
            if ($id != 0) {
                $oc = $ocRepo->find($id);
                if ($oc && $oc->iEstado != 1) {
                    throw new \Exception('No puede modificar esta orden');
                }
            }
            if ($id == 0) {
                $number_con = $conRepo->getIDByConsecutive($data['cCodConsecutivo']);
                $data['nConsecutivo'] = $number_con;
                $oc = $ocRepo->create($data);
                $id = $oc->id;
                $conRepo->update($data['cCodConsecutivo'], [
                    'nConsecutivo' => $number_con
                ]);
            } else {
                $oc = $ocRepo->update($id, $data);
            }
            $detail = $request->input('detail', []);
            if ($state == 2 && count($detail) == 0) {
                throw new \Exception('Debe agregar minimo 1 articulo');
            }
            $det_ids = [];
            foreach ($detail as $det) {
                $p_id = $det['id'];
                $sol_id = $det['sol_id'];
                $date_required_ = $det['date'];
                $date_required_ = Carbon::createFromFormat('d/m/Y', $date_required_);
                $oca_ = $ocaRepo->createUpdate([
                    'idArticulo' => $p_id,
                    'idOrden' => $id,
                    'codSolicitud' => $sol_id,
                    'cantidad' => $det['q'],
                    'cantidadPendiente' => $det['qp'],
                    'cantidadRecibida' => $det['qr'],
                    'cantidadDevuelta' => $det['qd'],
                    'precioUnitario' => $det['p'],
                    'precioTotal' => $det['pt'],
                    'nPorcDescuento' => $det['per_disc'],
                    'nDescuento' => $det['tot_disc'],
                    'valorCompra' => $det['vc'],
                    'valorCompraDescuento' => $det['vcd'],
                    'nImpuesto' => $det['imp'],
                    'total' => $det['tf'],
                    'dFecRequerida' => $date_required_,
                    'iEstado' => $state,
                ]);
                $det_ids[] = $oca_->id;
                if (!is_null($sol_id) && $sol_id != '') {
                    $sca = $scaRepo->update($sol_id, [
                        'estado' => 2
                    ]);
                    $sc = $sca->movement;
                    if ($sc->estado > 2) {
                        $scRepo->update($sc->idMovimiento, [
                            'estado' => 2
                        ]);
                    }
                }
            }
            foreach ($ocaRepo->getExcept($id, $det_ids) as $oca) {
                $sol_id = $oca->codSolicitud;
                if (!is_null($sol_id) && $sol_id != '') {
                    $scaRepo->update($sol_id, [
                        'estado' => 1
                    ]);
                }
            }
            $ocaRepo->destroyExcept($id, $det_ids);

            // Create Conformidad
            if ($state == 2) {
                $oc = $ocRepo->find($id);
                $params = [
                    'nIdTienda' => $oc->consecutive->nCodTienda,
                    'nIdMoneda' => $oc->idMoneda,
                    'total' => (float)$oc->total,
                    'date' => $oc->dFecRequerida
                ];
                $data_app = [];
                foreach ($cjcRepo->findBy($params) as $cjc) {
                    foreach ($cjc->detail as $det) {
                        $data_app[] = [
                            'id' => $cjc->nIdAprob,
                            'user_id' => $det->nIdUsuario,
                            'order' => (int)$det->nOrden
                        ];
                    }
                }
                if (count($data_app) == 0) {
                    throw new \Exception('No existe un nivel de aprobación configurado para esta Orden, ' .
                        'comuniquese con su Adminstrador');
                }
                foreach ($data_app as $d) {
                    $occRepo->create([
                        'cCodConsecutivo' => $oc->cCodConsecutivo,
                        'nConsecutivo' => $oc->nConsecutivo,
                        'nIdAprob' => $d['id'],
                        'nOrden' => $d['order'],
                        'nIdUsuario' => $d['user_id'],
                        'dFecReg' => Carbon::now(),
                        'iEstado' => 0
                    ]);
                }
            }

            $data_return = [];
            if ($state == 1) {
                $data_return = [
                    'code' => $id,
                    'number' => $oc->nConsecutivo
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

    public function find($id, Request $request, RegisterOrdenCompraInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $data->fecha_registro = Carbon::parse($data->dFecRegistro)->format('d/m/Y');
            $data->fecha_requerida = Carbon::parse($data->dFecRequerida)->format('d/m/Y');

            $data->nPorcDescuento = (is_null($data->nPorcDescuento)) ? 0 : (float)$data->nPorcDescuento;
            $data->nDescuento = (is_null($data->nDescuento)) ? 0 : (float)$data->nDescuento;
            $data->total = (is_null($data->total)) ? 0 : (float)$data->total;

            $detail = [];
            foreach ($data->detailArticle as $det) {
                $article = $det->article;

                $detail[] = [
                    'id' => $det->idArticulo,
                    'sol_id' => (is_null($det->codSolicitud)) ? '' : $det->codSolicitud,
                    'description' => $article->description,
                    'q' => (float)$det->cantidad,
                    'qp' => (float)$det->cantidadPendiente,
                    'qr' => (float)$det->cantidadRecibida,
                    'qd' => (float)$det->cantidadDevuelta,
                    'p' => (float)$det->precioUnitario,
                    'per_disc' => (float)$det->nPorcDescuento,
                    'tot_disc' => (float)$det->nDescuento,
                    'imp' => (float)$det->nImpuesto,
                    'date' => Carbon::parse($det->dFecRequerida)->format('d/m/Y'),
                    'state_id' => (int)$det->iEstado
                ];
            }
            $data->detail = $detail;

            if ($request->input('approval', '0') == '1') {
                $state = 'Registrado';
                if ($data->iEstado == 2) {
                    $state = 'Por Aprobar';
                } elseif ($data->iEstado == 3) {
                    $state = 'Aprobado';
                } elseif ($data->iEstado == 4) {
                    $state = 'Recibido';
                } elseif ($data->iEstado == 5) {
                    $state = 'Backorder';
                } elseif ($data->iEstado == 6) {
                    $state = 'Cerrado';
                } elseif ($data->iEstado == 7) {
                    $state = 'Cancelado';
                } elseif ($data->iEstado == 8) {
                    $state = 'Rechazado';
                }
                $data->iEstado = $state;
                $data->prioridad = ($data->prioridad == 'A') ? 'Alta' : (($data->prioridad == 'M') ? 'Media' : 'Baja');
                $data->idMoneda = $data->currency->Descripcion;
                $data->idProveedor = $data->provider->razonsocial;
                $data->idcondicion_pago = $data->paymentCondition->description;

                unset($data->currency, $data->provider, $data->paymentCondition);
            }

            unset ($data->detailArticle);

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

    public function destroy(Request $request, RegisterOrdenCompraInterface $ocRepo, SolicitudCompraArticuloInterface $repoSolComp,
                            RegisterOrdenCompraArticuloInterface $ocaRepo)
    {
        DB::beginTransaction();
        try {
            $id = $request->input('id');
            $oc = $ocRepo->find($id);
            if (!$oc || $oc->iEstado != 1) {
                throw new \Exception('No puede eliminar esta orden');
            }
            foreach ($oc->detailArticle as $det) {
                $dataSo = [];
                $dataSo['estado'] = 1;
                $repoSolComp->update_estado($det->codSolicitud, $dataSo);

                $this->cambiarEstadoSolicitud($det->idOrden, $repoSolComp);
            }
            $ocaRepo->destroyExcept($id, []);
//            $dataArticulos = $repo->getDetalleArticulos($id);
//            foreach ($dataArticulos as $row) {
//                $dataSo = [];
//                $dataSo['estado'] = 1;
//                $repoSolComp->update_estado($row->codSolicitud, $dataSo);
//            }
//            $this->cambiarEstadoSolicitud($id, $repoSolComp);
//            $scaRepo->deleteBySol($id);
            $ocRepo->destroy($id);

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

    public function format($id, RegisterOrdenCompraInterface $ocRepo, CompaniaInterface $coRepo, ParamInterface $parRepo)
    {
        try {
            $oc = $ocRepo->find($id);
            if (!$oc) {
                throw new \Exception('La orden de compra no existe');
            }
            $company = $coRepo->first();
            $provider_ = $oc->provider;
            $pc_ = $oc->paymentCondition;
            $state = 'Registrado';
            if ($oc->iEstado == 2) {
                $state = 'Por Aprobar';
            } elseif ($oc->iEstado == 3) {
                $state = 'Aprobado';
            } elseif ($oc->iEstado == 4) {
                $state = 'Recibido';
            } elseif ($oc->iEstado == 5) {
                $state = 'Backorder';
            } elseif ($oc->iEstado == 6) {
                $state = 'Cerrado';
            } elseif ($oc->iEstado == 7) {
                $state = 'Cancelado';
            } elseif ($oc->iEstado == 8) {
                $state = 'Rechazado';
            }

            $detail_ = []; $discount_ = 0;
            foreach ($oc->detailArticle as $det) {
                $article = $det->article;
                $u = $article->unity;
                $detail_[] = [
                    'code' => $article->code_article,
                    'description' => $article->description,
                    'und' => (is_null($u->symbol)) ? $u->Descripcion : $u->symbol,
                    'q' => (float)$det->cantidad,
                    'p' => (float)$det->precioUnitario,
                    't' => (float)$det->cantidad * (float)$det->precioUnitario,
                ];
                $discount_ += (float)$det->nDescuento;
            }
            $data = [
                'company' => [
                    'name' => ($company) ? $company->NombreComercial : '',
                    'ruc' => ($company) ? $company->Ruc : '',
                    'address' => ($company) ? $company->Direccion : '',
                    'phone' => ($company) ? $company->Telefono1 : '',
                    'img' => ($company) ? $company->ruta_logo : '',
                ],
                'order' => [
                    'code' => $oc->cCodConsecutivo . ' ' . $oc->nConsecutivo,
                    'date_req' => Carbon::parse($oc->dFecRequerida)->format('d/m/Y'),
                    'date_emi' => Carbon::parse($oc->dFecRegistro)->format('d/m/Y'),
                    'address' => trim($oc->direccionEntrega),
                    'provider' => ($provider_) ? $provider_->razonsocial : '',
                    'payment_condition' => ($pc_) ? $pc_->description : '',
                    'prov_address' => ($provider_) ? $provider_->direccion : '',
                    'currency' => ($oc->currency) ? $oc->currency->Descripcion : '',
                    'ruc' => ($provider_) ? $provider_->documento : '',
                    'buyer' => '',
                    'contact' => ($provider_) ? trim($provider_->contacto) : '',
                    'comment' => (is_null($oc->comentario)) ? '' : $oc->comentario,
                    'state' => $state
                ],
                'detail' => $detail_,
                'totals' => [
                    'subtotal1' => (float)$oc->subtotal,
                    'discount' => $discount_,
                    'vc' => (float)$oc->valorCompra,
                    'discount_tot' => (float)$oc->nDescuento,
                    'vcd' => (float)$oc->valorCompraDescuento,
                    'imp' => (float)$oc->nImpuesto,
                    'imp_per' => (float)$parRepo->getByDescription('Impuesto General a las Ventas (IGV)', 18),
                    'total' => (float)$oc->total
                ]
            ];
//            dd($data);
            $pdf = PDF::loadView('orden_compra.format', $data)->setPaper('a4');
            return $pdf->stream();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


    public function getDetalle_ordenCompra($id, RegisterOrdenCompraInterface $repo, Request $request)
    {
        try {

            $val = $repo->get_detalleOrdenCompra($id);
            $valDev = $repo->get_detalleOrdenCompraDevolucion($id);

            $valConf = $repo->get_detalleOrdenCompraConformidad($id);
            // $val_dataDev=$repo->get_detalle_entrada_Devolucion($valtodo[0],$valtodo[1]);
            return response()->json([
                'status' => true,
                'data' => $val,
                'valDev' => $valDev,
                'valConf' => $valConf
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getDataOrdenComprasRecepcion(RegisterOrdenCompraInterface $repo)
    {
        try {
            $dataOrdenes = $repo->getOrdeneRecepcion();

            $dataOrdenesDevolucion = $repo->getOrdeneDevolucion();

            $dataOrdenesConformidad = $repo->getOrdeneConformidad();

            return response()->json([
                'status' => true,
                'dataOrdenes' => $dataOrdenes,
                'dataOrdenesDevolucion' => $dataOrdenesDevolucion,
                'dataOrdenesConformidad' => $dataOrdenesConformidad,

            ]);
        } catch (\Exception $e) {
//            throw new \Exception($e);
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function deleteDetalleST($id, SolicitudCompraArticuloInterface $repoSolComp, RegisterOrdenCompraInterface $repo,
                                    RegisterOrdenCompraArticuloInterface $repoOart, Request $request)
    {
        try {
            $dataSo = [];
            $dataSo['estado'] = 1;

            $art = $repoOart->getDataOrdeCompraArt($id);


            $repoSolComp->update_estado($art[0]->codSolicitud, $dataSo);


            $this->cambiarEstadoSolicitud($art[0]->idOrden, $repoSolComp);

            $val = $repo->destroy_ordenCompra($id);

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

    public function cambiarEstadoTotal($id, RegisterOrdenCompraInterface $repo, Request $request)
    {
        try {
            $mensaje = '';
            $estado = $request->input('state');
            $cCodConsecutivo = $request->input('cCodConsecutivo');
            $nConsecutivo = $request->input('nConsecutivo');

            $val = $repo->cambiar_estado_porAprobar($id, $estado, $cCodConsecutivo, $nConsecutivo);
            if ($estado == 1) {
                $mensaje = 'Aprobó';
            } else if ($estado == 3) {
                $mensaje = 'Cerró';
            } else if ($estado == 4) {
                $mensaje = 'Canceló';
            }
            return response()->json([
                'status' => true,
                'mensaje' => $mensaje,
                'val' => $val
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    protected function cambiarEstadoSolicitud($id, $repo)
    {
        $idSolicitud = $repo->getidSolicitud($id);
        foreach ($idSolicitud as $value) {
            $dataArticulos = $repo->getDetalleArticulosSolicitud($value->idMovimiento);

            $cont = $dataArticulos[0]->estado;
            foreach ($dataArticulos as $row) {
                if ($cont > $row->estado) {
                    $cont = $row->estado;
                }
            }
            $dataSo = [];
            $dataSo['estado'] = $cont;
            $repo->update_estadoSolicitudCompra($value->idMovimiento, $dataSo);
        }
    }

    public function allScomprArticulo(Request $request, SolicitudCompraArticuloInterface $scaRepo)
    {
        try {
            $filter = $request->all();
            $params = ['id', 'idArticulo', 'cantidad', 'fecha_requerida', 'consecutivo', 'idMovimiento'];
            $info = parseDataList($scaRepo->search($filter), $request, 'id', $params);

            $data = $info[1];

            foreach ($data as $d) {
                $product = $d->article;
                $movement = $d->movement;
                $u = $product->unity;
                $d->und = (is_null($u->symbol)) ? $u->Descripcion : $u->symbol;
                $d->fecha_requerida = Carbon::parse($d->fecha_requerida)->format('d/m/Y');
                $d->cod_consecutive = $movement->cCodConsecutivo;
                $d->nConsecutivo = $movement->nConsecutivo;
                $d->product = $product->description;
                $d->cantidad = (float)$d->cantidad;
                unset($d->article, $d->movement);
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

    public function create(RegisterOrdenCompraInterface $repo, RegisterOrdenCompraRequest $request)
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

    public function xmlcargar(Request $request, RegisterOrdenCompraInterface $repo)
    {
        // $s = $request->input('search', '');
        $imagePath = 'xml/';
        $fileXml = $request->file('file');
        $nombre = $fileXml->getClientOriginalName();
        $ruta = public_path("xml/" . $nombre);
        copy($fileXml, $ruta);
        // $xmlString = file_get_contents(public_path("img/products/".$nombre));
        // $xmlObject = simplexml_load_string($xmlString);

        // $json = json_encode($xmlObject);
        // $phpArray = json_decode($json, true);
        // $nombre='catalogo.xml'; 
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


        // var_dump($arrayCodProdE);
        // echo("-------");
        // var_dump($arrayCodProdN);
        // echo($valor[0]->__toString());
        // $namespaces =$xml->Invoice->getNameSpaces(true);
        // $media = $xml->Invoice->children($namespaces['cac']);


        // $media = $xml->Invoice->children($namespaces['media']);
        // echo "El thumbnail es:" .$media->thumbnail."<br>";

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

    public function procesarTransferencia($id, RegisterOrdenCompraInterface $repo, Request $request)
    {
        try {
            $val = $repo->procesarTransferencia($id);
            // throw new \Exception('Ya existe un almacen con este código interno. Por favor ingrese otro código.');
            //     DB::commit();
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

    public function update(RegisterOrdenCompraInterface $repo, RegisterOrdenCompraRequest $request)
    {
        $data = $request->all();
        $id = $data['idCategoria'];
        $data['descripcion'] = strtoupper($data['Categoria']);
        $estado = 'A';
        if (!isset($data['estado'])) {
            $estado = 'I';
        };
        $data['estado'] = $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }


    public function cambiarEstado($id, RegisterOrdenCompraInterface $repo, SolicitudCompraArticuloInterface $repoSolComp, Request $request)
    {
        try {
            $mensaje = '';
            $estado = $request->input('estadoCambio');

            $val = $repo->cambiar_estado($id, $estado);
            if ($estado == 7) {
                $dataArticulos = $repo->getDetalleArticulos($id);
                foreach ($dataArticulos as $row) {
                    $dataSo = [];
                    $dataSo['estado'] = 1;
                    $repoSolComp->update_estado($row->codSolicitud, $dataSo);
                }

                $this->cambiarEstadoSolicitud($id, $repoSolComp);
            }
            if ($estado == 1) {
                $mensaje = 'Aprobó';
            } else if ($estado == 3) {
                $mensaje = 'Cerró';
            } else if ($estado == 4) {
                $mensaje = 'Canceló';
            }
            return response()->json([
                'status' => true,
                'mensaje' => $mensaje,
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


    public function excel(RegisterOrdenCompraInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE ORDENES DE COMPRA', 'Lista de ordenes de compra');
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

    // public function getStockLoc($id, RegisterOrdenCompraInterface $repo){

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
    public function pdf(Request $request, RegisterOrdenCompraInterface $repo, CurrencyInterface $currencyRepo, ProveedorInterface $proveedorRepo, PaymentConditionInterface $paymentRepo)
    {
        $id = $request->input('id');
        $orden = $repo->find($id);
        //$detalleOrden = $repo->getDetalleArticulos($id);
        $moneda = $currencyRepo->find($orden['idMoneda']);
        $proveedor = $proveedorRepo->find($orden['idProveedor']);
        $condicionPago = $paymentRepo->find($orden['idcondicion_pago']);
        $detalleOrden = $repo->get_movement_articulo($id);

        // NOTE: Los siguientes campos no tiene su propia tabla en la base de datos - Vea registerOrdenCompra/base.html
        $prioridad = $this->getPrioridad($orden['prioridad']);
        $estado = $this->getEstado($orden['iEstado']);

        // Modificamos los campos relacionados para presentarlos
        $orden['dFecRegistro'] = date('d/m/y', strtotime($orden['dFecRegistro']));
        $orden['dFecRequerida'] = date('d/m/y', strtotime($orden['dFecRequerida']));
        $orden['fecha_impresion'] = date("d/m/Y");
        $orden['idMoneda'] = $moneda['Descripcion'];
        $orden['prioridad'] = $prioridad;
        $orden['iEstado'] = $estado;
        $orden['idProveedor'] = $proveedor[0]->razonsocial;
        $orden['idcondicion_pago'] = $condicionPago['description'];
        $orden['impuesto'] = ($orden['impuesto'] == '0' ? 'NO' : 'SI');

        return response()->json([
            'status' => true,
            'orden' => $orden,
            'detalleOrden' => $detalleOrden,
            'estado' => $id
        ]);
    }

    public function deleteDetalle($id, RegisterOrdenCompraInterface $repo, Request $request)
    {
        try {

            $repo->destroy_detalle_Orden($id);
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

    public function getDataArticulo($id, RegisterOrdenCompraInterface $repo)
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

    public function getLocaStock($id, RegisterOrdenCompraInterface $repo)
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

    public function validaDetalle($id, RegisterOrdenCompraInterface $repo)
    {
        try {
            $data = $repo->getDetalle($id);
            if (empty($data)) {
                throw new \Exception("Debe registrar los artículos del movimiento");
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

    private function getPrioridad($id)
    {
        $data = [
            'A' => 'ALTA',
            'M' => 'MEDIA',
            'B' => 'BAJA'
        ];
        return $data[$id];
    }

    private function getEstado($id)
    {
        $data = [
            '1' => 'REGISTRADO',
            '2' => 'POR APROBAR',
            '3' => 'APROBADO',
            '4' => 'RECIBIDO',
            '5' => 'BACKORDEN',
            '6' => 'CERRADO',
            '7' => 'CANCELADO',
            '8' => 'RECHAZADO'
        ];
        return $data[$id];
    }
}
