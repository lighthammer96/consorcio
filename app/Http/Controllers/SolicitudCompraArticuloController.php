<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\SolicitudCompraArticulo\SolicitudCompraArticuloTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\SolicitudCompraArticulo\SolicitudCompraArticuloInterface;
use App\Http\Requests\SolicitudCompraArticuloRequest;
use App\Http\Recopro\SolicitudCompra_Detalle\SolicitudCompra_DetalleInterface;
use App\Http\Recopro\Register_Transfer_Articulo\Register_Transfer_ArticuloInterface;
use App\Http\Recopro\Serie\SerieInterface;
use App\Http\Recopro\Lot\LotInterface;
use Carbon\Carbon;
use DB;

class SolicitudCompraArticuloController extends Controller
{
    use SolicitudCompraArticuloTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, SolicitudCompraArticuloInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idCategoria', 'descripcion as Categoria', 'estado'];
        return parseList($repo->search($s), $request, 'idCategoria', $params);
    }

    public function createUpdate($id, SolicitudCompraArticuloInterface $repo, Request $request, LotInterface $lorepo, SolicitudCompra_DetalleInterface $redm, SerieInterface $seri, Register_Transfer_ArticuloInterface $vali)
    {
        try {
            $data = $request->all();

            $idArticulo = $data['idArticulo'];
            $idArticulo = explode(',', $idArticulo);

            $cantidad = $data['cantidad'];
            $cantidad = explode(',', $cantidad);

            $dataObserva = $data['dataObserva'];
            $dataObserva = explode(',', $dataObserva);
            $idTipoCompraVenta = $data['idTipoCompraVenta'];
            $idTipoCompraVenta = explode(',', $idTipoCompraVenta);

            $nPoliza = $data['nPoliza'];
            $nPoliza = explode(',', $nPoliza);

            $nLoteCompra = $data['nLoteCompra'];
            $nLoteCompra = explode(',', $nLoteCompra);

            $idLote = $data['idLote'];
            $idLote = explode(',', $idLote);

            $dataLote = $data['dataLote'];
            $dataLote = explode(',', $dataLote);

            $idProductoSe = $data['idProductoSe'];
            $idProductoSe = explode(',', $idProductoSe);

            $serieSe = $data['serieSe'];
            $serieSe = explode(',', $serieSe);

            $idSerieSe = $data['idSerieSe'];
            $idSerieSe = explode(',', $idSerieSe);

            $identificador_serie_bd = $data['identificador_serie_bd'];
            $identificador_serie_bd = explode(',', $identificador_serie_bd);

            $ident_serie_bd_serie = $data['ident_serie_bd_serie'];
            $ident_serie_bd_serie = explode(',', $ident_serie_bd_serie);

            $ident_serie_bd_serie2 = $data['ident_serie_bd_serie2'];
            $ident_serie_bd_serie2 = explode(',', $ident_serie_bd_serie2);

            $serieNenv = $data['serieNenv'];
            $serieNenv = explode(',', $serieNenv);

            $idProductoSeN = $data['idProductoSeN'];
            $idProductoSeN = explode(',', $idProductoSeN);

            $estadodeta = $data['estadodeta'];
            $estadodeta = explode(',', $estadodeta);

            $fecharequeridadeta = $data['fecharequeridadeta'];
            $fecharequeridadeta = explode(',', $fecharequeridadeta);

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

            if ($idArticulo != '') {
                $repo->delete_detalle($id);

                if ($data['naturaleza'] == "C") {
                    for ($i = 0; $i < count($idArticulo); $i++) {
                        $tablelMd = "ERP_SolicitudCompra_Articulo";
                        $idtMd = "consecutivo";
                        $repo->create([
                            'idArticulo' => $idArticulo[$i],
                            'idMovimiento' => $id,
                            'consecutivo' => $lorepo->get_consecutivo($tablelMd, $idtMd),
                            'costo' => $costo[$i],
                        ]);
                    }
                } else {
                    for ($i = 0; $i < count($idArticulo); $i++) {
                        $esta = $estadodeta[$i];
                        if ($estadodeta[$i] == 'N') {
                            $esta = 0;
                        }
                        $idLB = $idLote[$i];
                        if ($idLote[$i] == "") {
                            if ($dataLote[$i] != "") {
                                $lotn = explode('*', $dataLote[$i]);
                                $tablelot = "ERP_Lote";
                                $idtlote = 'idLote';
                                $datosLote['Lote'] = strtoupper($lotn[2]);
                                $datosLote['fechaIngreso'] = $lotn[3];
                                $datosLote['fechaVencimiento'] = $lotn[4];
                                $datosLote['cantidad'] = $lotn[1];
                                $datosLote['idArticulo'] = $lotn[0];
                                $datosLote['idLote'] = $lorepo->get_consecutivo($tablelot, $idtlote);
                                $contLot = $lorepo->create($datosLote);
                                $idLB = $contLot->idLote;
                            } else {
                                $idLB = null;
                            }
                        }
                        $tablelMd = "ERP_SolicitudCompra_Articulo";
                        $idtMd = "consecutivo";
                        $varinfo = $repo->create([
                            'idMovimiento' => $id,
                            'idArticulo' => $idArticulo[$i],
                            'consecutivo' => $lorepo->get_consecutivo($tablelMd, $idtMd),
                            'cantidad' => $cantidad[$i],
                            'observaciones' => $dataObserva[$i],
                            'estado' => $esta,
                            'fecha_requerida' => $fecharequeridadeta[$i],
                        ]);
                        $tipo = $repo->traerTipo($idArticulo[$i]);
                        $conse = $varinfo->consecutivo;
                        if ($tipo[0]->serie == "1") {
                            if ($idProductoSe != '') {
                                for ($j = 0; $j < count($idProductoSe); $j++) {
                                    if ($ident_serie_bd_serie[$j] == $identificador_serie_bd[$i]) {
                                        $redm->create([
                                            'idMovimiento' => $id,
                                            'idArticulo' => $idProductoSe[$j],
                                            'consecutivo' => $conse,
                                            'serie' => $idSerieSe[$j],
                                        ]);
                                    }

                                }

                            }
                            $tablese = "ERP_Serie";
                            $idtse = 'idSerie';

                            for ($k = 0; $k < count($serieNenv); $k++) {
                                if ($ident_serie_bd_serie2[$k] == $identificador_serie_bd[$i]) {
                                    $contserie = $seri->create([
                                        'idSerie' => $seri->get_consecutivo($tablese, $idtse),
                                        'nombreSerie' => strtoupper($serieNenv[$k]),
                                        'idArticulo' => $idProductoSeN[$k],
                                        'chasis' => strtoupper($chasiNs[$k]),
                                        'motor' => strtoupper($motorNs[$k]),
                                        'anio_fabricacion' => $anioNFs[$k],
                                        'anio_modelo' => $anioNVs[$k],
                                        'color' => strtoupper($colorNs[$k]),
                                        'idTipoCompraVenta' => strtoupper($idTipoCompraVenta[$k]),
                                        'nPoliza' => strtoupper($nPoliza[$k]),
                                        'nLoteCompra' => strtoupper($nLoteCompra[$k]),
                                    ]);
                                    $conseSn = $varinfo->consecutivo;
                                    $redm->create([
                                        'idMovimiento' => $id,
                                        'idArticulo' => $idProductoSeN[$k],
                                        'consecutivo' => $conseSn,
                                        'serie' => $contserie->idSerie,
                                    ]);
                                }
                            }
                        }
                    }
                }
            }

            DB::commit();
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


    public function destroy(SolicitudCompraArticuloInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }


    public function excel(SolicitudCompraArticuloInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CATEGORÍAS', 'Categoría');
    }
}
