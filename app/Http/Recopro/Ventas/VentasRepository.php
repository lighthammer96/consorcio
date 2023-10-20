<?php

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\Ventas;


use Illuminate\Support\Facades\DB;

class VentasRepository implements VentasInterface
{
    protected $model;
    private static $_ACTIVE = 'A';

    public function __construct(Ventas $model)
    {
        $this->model = $model;
    }

    public function search($filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';

        return $this->model
            ->where(function ($q) use ($s) {
                $q->where('comprobante', 'LIKE', '%' . $s . '%');
                $q->orWhere('cliente', 'LIKE', '%' . $s . '%');
                $q->orWhere('fecha_emision', 'LIKE', '%' . $s . '%');
                $q->orWhere('numero_documento', 'LIKE', '%' . $s . '%');
            })
            ->where(function ($q) use ($filter) {
                if (isset($filter['check']) && $filter['check'] == 'true') {
                    $from = $filter['from'] . ' 00:00:00';
                    $to = $filter['to'] . ' 23:59:59';
                    $q->whereBetween('fecha_emision_server', [$from, $to]);
                }
                $date_start = (isset($filter['FechaInicioFiltro'])) ? $filter['FechaInicioFiltro'] : '';
                $date_end = (isset($filter['FechaFinFiltro'])) ? $filter['FechaFinFiltro'] : '';
                if ($date_start != '' && $date_end != '') {
                    $q->whereBetween('fecha_emision_server', [$date_start, $date_end]);
                }
                $client_id = (isset($filter['idClienteFiltro'])) ? $filter['idClienteFiltro'] : '';
                if ($client_id != '') {
                    $q->where('idcliente', $client_id);
                }
                $type_doc_id = (isset($filter['id_tipo_doc'])) ? $filter['id_tipo_doc'] : '';
                if ($type_doc_id != '') {
                    $q->where('IdTipoDocumento', $type_doc_id);
                }
                $state_cpe = (isset($filter['estado_cpe'])) ? $filter['estado_cpe'] : '';
                if ($state_cpe != '') {
                    $q->where('estado_cpe', $state_cpe);
                }
                $null = (isset($filter['anulado'])) ? $filter['anulado'] : '';
                if ($null != '') {
                    $q->where('anulado', $null);
                }
            })
            ->orderBy('fecha_emision', 'DESC');
    }

    public function search_creditos($s)
    {
        return $this->model->whereIn('estado', [2, 4])->where(function ($q) use ($s) {
            $q->where('serie_comprobante', 'LIKE', '%' . $s . '%');
            $q->orWhere('numero_comprobante', 'LIKE', '%' . $s . '%');
            $q->orWhere('fecha_emision', 'LIKE', '%' . $s . '%');
            $q->orWhere('numero_documento', 'LIKE', '%' . $s . '%');
        })->orderBy('fecha_emision', 'DESC');
    }


    public function search_documentos($filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';
        return $this->model
            ->whereIn('IdTipoDocumento', ['01', '03', '07', '08', '12'])
            ->where(function ($q) use ($s) {
                $q->where('serie_comprobante', 'LIKE', '%' . $s . '%');
                $q->orWhere('numero_comprobante', 'LIKE', '%' . $s . '%');
                $q->orWhere('comprobante', 'LIKE', '%' . $s . '%');
                $q->orWhere('fecha_emision', 'LIKE', '%' . $s . '%');
                $q->orWhere('numero_documento', 'LIKE', '%' . $s . '%');
                $q->orWhere('cliente', 'LIKE', '%' . $s . '%');
            })
            ->where(function ($q) use ($filter) {
                if (isset($filter['check']) && $filter['check'] == 'true') {
                    $from = $filter['from'] . ' 00:00:00';
                    $to = $filter['to'] . ' 23:59:59';
                    $q->whereBetween('fecha_emision_server', [$from, $to]);
                }
                $client_id = (isset($filter['idClienteFiltro'])) ? $filter['idClienteFiltro'] : '';
                if ($client_id != '') {
                    $q->where('idcliente', $client_id);
                }
                $type_doc_id = (isset($filter['id_tipo_doc'])) ? $filter['id_tipo_doc'] : '';
                if ($type_doc_id != '') {
                    $q->where('IdTipoDocumento', $type_doc_id);
                }
                $state_cpe = (isset($filter['estado_cpe'])) ? $filter['estado_cpe'] : '';
                if ($state_cpe != '') {
                    $q->where('estado_cpe', $state_cpe);
                }
                $null = (isset($filter['anulado'])) ? $filter['anulado'] : '';
                if ($null != '') {
                    $q->where('anulado', $null);
                }
            })
            ->orderBy('fecha_emision', 'DESC');
    }

    public function search_comprobantes_pendientes($s)
    {
        return $this->model->whereIn('IdTipoDocumento', ['01', '03', '08'])->where('saldo', '>', '0')->where('anulado', '=', 'N')->where('tipo_solicitud', '<>', '2')->where(function ($q) use ($s) {
            $q->where('serie_comprobante', 'LIKE', '%' . $s . '%');
            $q->orWhere('numero_comprobante', 'LIKE', '%' . $s . '%');
            $q->orWhere('cliente', 'LIKE', '%' . $s . '%');
            $q->orWhere('fecha_emision', 'LIKE', '%' . $s . '%');
            $q->orWhere('numero_documento', 'LIKE', '%' . $s . '%');
        })->orderBy('fecha_emision', 'DESC');
    }

    public function all()
    {
        return $this->model->all();
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        // print_r($attributes); exit;
        return $this->model->create($attributes);
    }

    public function allActive()
    {

        return $this->model->where('estado', self::$_ACTIVE)->get();
    }

    public function update($id, array $attributes)
    {
        // print_r($attributes); exit;
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }

    public function find_documento($idventa)
    {
        $sql = "SELECT v.*, c.*, c.razonsocial_cliente AS cliente, m.Simbolo AS simbolo_moneda
        FROM ERP_Venta AS v
        INNER JOIN ERP_Clientes AS c ON(c.id=v.idcliente)
        LEFT JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda)
        WHERE v.idventa={$idventa}";

        return DB::select($sql);
    }

    public function get_motivos()
    {
        $sql = "SELECT * 
        FROM ERP_Motivos 
        WHERE estado='A'";

        return DB::select($sql);
    }

    public function get_consecutivo($table, $id)
    {
        $mostrar = DB::select("select top 1 * from $table order by CONVERT(INT, $id) DESC");
        $actu = 0;
        if (!$mostrar) {
            $actu = 0;
        } else {
            $actu = intval($mostrar[0]->$id);
        };
        $new = $actu + 1;
        return $new;
    }


    public function update_saldos_venta($data)
    {
        $sql_update = "UPDATE ERP_Venta SET saldo = saldo - {$data["monto"]},
        pagado = pagado + {$data["monto"]}       
        WHERE cCodConsecutivo_solicitud='{$data["cCodConsecutivo"]}' AND nConsecutivo_solicitud={$data["nConsecutivo"]} AND /*anticipo > 0*/ comprobante_x_saldo='S' AND IdTipoDocumento IN('01', '03', '12')";
        // die($sql_update);
        $result = DB::statement($sql_update);

        return $result;
    }

    public function update_saldos_venta_pendiente($data)
    {
        $sql_update = "UPDATE ERP_Venta SET saldo = saldo - {$data["monto"]},
        pagado = pagado + {$data["monto"]}       
        WHERE idventa={$data["idventa"]}";

        $result = DB::statement($sql_update);

        return $result;
    }

    public function get_notas_devolucion()
    {
        $sql = "SELECT v.*, c.*, c.razonsocial_cliente AS cliente 
        FROM ERP_Venta AS v
        INNER JOIN ERP_Clientes AS c ON(c.id=v.idcliente)
        WHERE v.devolucion_producto='1' AND v.IdTipoDocumento='07'";

        return DB::select($sql);
    }

    public function get_notas_devolucion_find($conse, $numer, $idmoneda)
    {
        $sql = "SELECT v.*, c.*, c.razonsocial_cliente AS cliente 
        FROM ERP_Venta AS v
        INNER JOIN ERP_Clientes AS c ON(c.id=v.idcliente)
        WHERE v.serie_comprobante='$conse' AND v.numero_comprobante='$numer' and v.idmoneda='$idmoneda'";

        return DB::select($sql);
    }

    public function get_correlativo_anulacion()
    {
        $mostrar = DB::select("select correlativo_anulacion from ERP_Venta 
        WHERE FORMAT(fecha_anulacion, 'yyyy-MM-dd')='" . date("Y-m-d") . "'
        order by correlativo_anulacion DESC");
        $actu = 0;
        if (!$mostrar) {
            $actu = 0;
        } else {
            $actu = intval($mostrar[0]->correlativo_anulacion);
        };
        $new = $actu + 1;
        return $new;
    }


    public function anular_venta($id, $caja_repo)
    {
        $venta = $caja_repo->get_venta($id);
        $correlativo_anulacion = $this->get_correlativo_anulacion();
        $sql = "UPDATE ERP_Venta
                SET anulado = 'S', fecha_anulacion='" . date("Y-m-d H:i:s") . "', enviado_anulado=0,
                correlativo_anulacion=" . $correlativo_anulacion . "
                WHERE idventa='$id'";

        $sql_sp = "DECLARE	@return_value int
        SET NOCOUNT ON; EXEC @return_value = [dbo].[VT_Anulacion_Ventas]
		@cSerie = N'{$venta[0]->serie_comprobante}',
		@nNro = {$venta[0]->numero_comprobante}

        SELECT	'Return Value' = @return_value";
        // die($sql_sp);
        DB::select($sql_sp);

        return DB::update($sql);
    }

    public function get_venta_detalle($idventa)
    {

        $mostrar3 = DB::select("select pr.costo as costo2,pr.costo as costo_total,pr.id as idProducto, vd.consecutivo as idDetalleRepues,* 
        from ERP_VentaDetalle as vd 
        inner join ERP_Productos as pr on pr.id=vd.idarticulo  
        where vd.idventa={$idventa} AND pr.type_id=1");
        return $mostrar3;
    }

    public function get_venta_detalle_devolucion($serie_comprobante, $numero_comprobante)
    {

        $mostrar3 = DB::select("select pr.costo as costo2,pr.costo as costo_total,pr.id as idProducto, vd.consecutivo as idDetalleRepues,* 
        from ERP_VentaDetalle as vd 
        INNER JOIN ERP_Venta AS v ON(v.idventa=vd.idventa)
        inner join ERP_Productos as pr on pr.id=vd.idarticulo  
        where v.serie_comprobante='{$serie_comprobante}' AND v.numero_comprobante={$numero_comprobante}  AND pr.type_id=1");
        return $mostrar3;
    }

    public function get_venta_detalle_entrega($idventa)
    {

        $mostrar3 = DB::select("
select pr.kit as kit,lot.Lote  as cod_lote,sa.idLote as idLote, pr.serie,pr.lote, sa.costo as costo2,sa.costo_total,sa.precio_unitario as precio,sa.precio_total,sa.nCantidadPendienteEntregar,sa.idarticulo as idArticulo, pr.description as description, sa.cantidad,sa.id as consecutivo,sa.idAlmacen as idAlmacen,sa.idLocalizacion from erp_venta as v inner join ERP_SolicitudArticulo as sa on (v.cCodConsecutivo_solicitud=sa.cCodConsecutivo and v.nConsecutivo_solicitud=sa.nConsecutivo) inner join ERP_Productos as pr on(pr.id=sa.idArticulo) LEFT JOIN ERP_Lote as lot on lot.idLote=sa.idlote where v.idventa='$idventa' and pr.type_id ='1' and sa.nCantidadPendienteEntregar>0");
        return $mostrar3;
    }

    public function get_movemen_lote_entrega($id)
    {
        $mostrar = DB::select("select sa.id  as consecutivo,* from erp_venta as v inner join ERP_SolicitudArticulo as sa on (v.cCodConsecutivo_solicitud=sa.cCodConsecutivo and v.nConsecutivo_solicitud=sa.nConsecutivo) inner join ERP_Productos as pr on(pr.id=sa.idArticulo) inner JOIN ERP_Lote as lot on lot.idLote=sa.idlote  where v.idventa='$id'");
        return $mostrar;
    }

    public function get_movemen_Serie_entrega($id)
    {
        $mostrar = DB::select("select sd.id_solicitud_articulo  as identificador,sa.cantidad as cantiTotal ,* from erp_venta as v inner join ERP_SolicitudArticulo as sa on (v.cCodConsecutivo_solicitud=sa.cCodConsecutivo and v.nConsecutivo_solicitud=sa.nConsecutivo) inner join ERP_Productos as pr on(pr.id=sa.idArticulo) inner JOIN ERP_SolicitudDetalle as sd on(sa.id=sd.id_solicitud_articulo) inner join ERP_Serie as s on sd.idSerie=s.idserie  where v.idventa='$id'");
        return $mostrar;
    }

    public function get_venta_separacion($idcliente)
    {
        $sql = "SELECT v.*, ISNULL(v.devolucion_producto, '') AS devolucion_producto FROM ERP_Venta AS v
        INNER JOIN ERP_VentaDetalle AS vd ON(v.idventa=vd.idventa)
        WHERE v.idcliente={$idcliente} AND vd.idarticulo=1862 AND ISNULL(v.aplicado_separacion, 'N')<>'S' AND v.IdTipoDocumento IN('01', '03')";

        return DB::select($sql);
    }

    public function get_ventas_separacion($idcliente)
    {
        $sql = "SELECT v.*, ISNULL(v.devolucion_producto, '') AS devolucion_producto FROM ERP_Venta AS v
        INNER JOIN ERP_VentaDetalle AS vd ON(v.idventa=vd.idventa)
        WHERE vd.idarticulo=1862 AND ISNULL(v.aplicado_separacion, 'N')<>'S' AND v.IdTipoDocumento IN('01', '03') AND v.idcliente={$idcliente} AND ISNULL(v.anulado, 'N')='N'";
        // die($sql);
        return DB::select($sql);
    }

    public function get_venta_nota($idcliente)
    {
        $sql = "SELECT v.*, ISNULL(v.devolucion_producto, '') AS devolucion_producto FROM ERP_Venta AS v
        INNER JOIN ERP_VentaDetalle AS vd ON(v.idventa=vd.idventa)
        WHERE v.idcliente={$idcliente} AND v.IdTipoDocumento='07' AND vd.idarticulo<>1859 AND ISNULL(v.aplicado_nota, 'N')<>'S'"; // QUE NO SEA DE UNA VENTA ANTICIPO LA NOTA DE CREDITO
        // die($sql);
        return DB::select($sql);
    }


    public function obtener_comprobantes()
    {
        $sql = "SELECT * FROM ERP_Venta WHERE IdTipoDocumento IN('03', '01', '07', '08') AND documento_cpe IS NOT NULL AND ISNULL(statusCode, '')<>'0000' /* AND ISNULL(anulado, 'N')<>'S'AND ='2022-07-26'*/";
        return DB::select($sql);

    }


    public function obtener_comprobantes_anulados()
    {
        $sql = "SELECT * FROM ERP_Venta WHERE IdTipoDocumento IN('03', '01', '07', '08') AND documento_cpe IS NOT NULL AND ISNULL(statusCodeBaja, '')<>'0000' AND ISNULL(anulado, 'N')='S'/*AND FORMAT(fecha_emision, 'yyyy-MM-dd')='2022-07-26'*/";
        return DB::select($sql);

    }

    public function obtener_comprobantes_pendientes_envio()
    {
        $sql = "SELECT * FROM ERP_Venta WHERE IdTipoDocumento IN('03', '01', '07', '08') AND enviado_cpe=0/*AND FORMAT(fecha_emision, 'yyyy-MM-dd')='2022-07-26'*/";


        return DB::select($sql);

    }

    public function obtener_comprobantes_pendientes_envio_pdf()
    {
        $sql = "SELECT * FROM ERP_Venta WHERE IdTipoDocumento IN('03', '01', '07', '08') AND enviado_pdf=0 /*AND FORMAT(fecha_emision, 'yyyy-MM-dd')='2022-07-26'*/";


        return DB::select($sql);

    }

    public function obtener_comprobantes_anulados_pendientes()
    {
        $sql = "SELECT * FROM ERP_Venta WHERE IdTipoDocumento IN('03', '01', '07', '08') AND enviado_anulado=0 AND anulado='S' AND statusCode='0000'/*AND FORMAT(fecha_emision, 'yyyy-MM-dd')='2022-07-26'*/";
        return DB::select($sql);

    }

    public function obtener_ticket_pago_cuota($idventa, $idarticulo)
    {
        $sql = "SELECT * FROM ERP_Venta AS v
        INNER JOIN ERP_VentaDetalle AS dv ON(v.idventa=dv.idventa)
        WHERE v.idventa={$idventa} AND dv.idarticulo={$idarticulo}";
        return DB::select($sql);
    }

    public function obtener_totales_separaciones($cCodConsecutivo, $nConsecutivo)
    {
        $sql = "SELECT SUM(ISNULL(v.t_monto_total, 0)) AS t_monto_total FROM ERP_SolicitudSeparacion AS ss  
        INNER JOIN ERP_Venta AS v ON(ss.idventa=v.idventa)
        WHERE ss.cCodConsecutivo='{$cCodConsecutivo}' AND ss.nConsecutivo={$nConsecutivo}";
        // die($sql);
        return DB::select($sql);

    }

    public function validar_nota($idventa)
    {
        $sql = "SELECT v.*, c.*, c.razonsocial_cliente AS cliente, m.Simbolo AS simbolo_moneda
        FROM ERP_Venta AS v
        INNER JOIN ERP_Clientes AS c ON(c.id=v.idcliente)
        LEFT JOIN ERP_Moneda AS m ON(m.IdMoneda=v.idmoneda)
        WHERE v.idventa_referencia={$idventa} AND ISNULL(v.anulado, 'N')='N'";

        return DB::select($sql);
    }


}
