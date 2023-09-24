<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Register_movement;

use Illuminate\Support\Facades\DB;

class Register_movementRepository implements Register_movementInterface
{
    protected $model;

    private static $_ACTIVE = 1;

    public function __construct(Register_movement $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->get();
    }

    public function all_entrega_servicio()
    {
        return $this->model->get()->where('naturaleza', 'R');
    }

    public function all_orden_compra()
    {
        return $this->model->get()->where('cCodConsecutivo', 'ORDC')->Where('idTipoOperacion', '1');
    }

    public function all_devolucion_oc()
    {
        return $this->model->get()->where('cCodConsecutivo', 'ORDC')->Where('idTipoOperacion', '10');
    }

    public function all_devolucion_servicio()
    {
        return $this->model->get()->where('naturaleza', 'D');
    }

    public function search($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('idMovimiento', 'LIKE', '%' . $s . '%')->orderByRaw('created_at DESC');
            $q->orWhere('idUsuario', 'LIKE', '%' . $s . '%');
            $q->orWhere('estado', 'LIKE', '%' . $s . '%');
            $q->orWhere('idTipoOperacion', 'LIKE', '%' . $s . '%');
        })->orderBy("created_at", "DESC");

    }

    public function search_recepcionCompra($s)
    {
        return $this->model
            ->where(function ($q) use ($s) {
                $q->where('idMovimiento', 'LIKE', '%' . $s . '%');
                $q->orWhere('idUsuario', 'LIKE', '%' . $s . '%');
                $q->orWhere('estado', 'LIKE', '%' . $s . '%');
                $q->orWhere('idTipoOperacion', 'LIKE', '%' . $s . '%');
            })
            ->where('idTipoOperacion', '1')
            ->where('cCodConsecutivo', 'ORDC')
            ->orderBy("created_at", "DESC");

    }

    public function search_devolucionCompra($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('idMovimiento', 'LIKE', '%' . $s . '%');
            $q->orWhere('idUsuario', 'LIKE', '%' . $s . '%');
            $q->orWhere('estado', 'LIKE', '%' . $s . '%');
            $q->orWhere('idTipoOperacion', 'LIKE', '%' . $s . '%');
        })->Where('idTipoOperacion', '10')->where('cCodConsecutivo', 'ORDC')->orderBy("created_at", "DESC");

    }

    public function searchMovCierre($s, $perido_busquedad)

    {
        $anio = '';
        $mes = '';
        if ($perido_busquedad) {
            $valtodo = explode("-", $perido_busquedad);
            $anio = $valtodo[0];
            if (!isset($valtodo[1])) {
                $anio = '';
                $mes = '';
            } else {
                $mes = $valtodo[1];
            }

        }
        return $this->model->where(function ($q) use ($s, $anio, $mes) {
            $q->where('idMovimiento', 'LIKE', '%' . $s . '%')->whereYear('fecha_registro', $anio)->whereMonth('fecha_registro', $mes)->orderByRaw('created_at DESC');
            $q->orWhere('idUsuario', 'LIKE', '%' . $s . '%')->whereYear('fecha_registro', $anio)->whereMonth('fecha_registro', $mes);
            $q->orWhere('estado', 'LIKE', '%' . $s . '%')->whereYear('fecha_registro', $anio)->whereMonth('fecha_registro', $mes);
            $q->orWhere('idTipoOperacion', 'LIKE', '%' . $s . '%')->whereYear('fecha_registro', $anio)->whereMonth('fecha_registro', $mes);
        });

    }

    public function search_entrega($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('idMovimiento', 'LIKE', '%' . $s . '%')->orderByRaw('created_at DESC')->where('naturaleza', 'R');
            $q->orWhere('idUsuario', 'LIKE', '%' . $s . '%')->where('naturaleza', 'R')->orWhere('idTipoOperacion', '2');
            $q->orWhere('estado', 'LIKE', '%' . $s . '%')->where('naturaleza', 'R')->orWhere('idTipoOperacion', '2');
            $q->orWhere('idTipoOperacion', 'LIKE', '%' . $s . '%')->where('naturaleza', 'R')->orWhere('idTipoOperacion', '2');
        })->orderBy('idMovimiento', 'DESC');

    }

    public function get_ventas_entrega()
    {
        $sql = "
select vt.numero_comprobante as tiket, ve.idventa as idventa,ve.serie_comprobante as serie_comprobante,ve.numero_comprobante as numero_comprobante,m.Descripcion as moneda ,so.idmoneda as IdMoneda, so.cCodConsecutivo as cCodConsecutivo,so.nConsecutivo as nConsecutivo,cli.razonsocial_cliente as razonsocial_cliente,ve.idcliente as idCliente,cli.id_tipocli as idTipoCliente,cli.documento as documento from ERP_Venta as ve  inner join ERP_Solicitud as so on (so.cCodConsecutivo=ve.cCodConsecutivo_solicitud and so.nConsecutivo=ve.nConsecutivo_solicitud) INNER JOIN ERP_Clientes as cli on (ve.idcliente=cli.id) inner join ERP_Moneda as m on m.IdMoneda=so.idmoneda inner join erp_venta as vt on(vt.idventa_comprobante=ve.idventa) inner join ERP_SolicitudArticulo as soa on (soa.cCodConsecutivo=so.cCodConsecutivo and soa.nConsecutivo=so.nConsecutivo) 
inner join ERP_Productos P on P.id = soa.idarticulo and p.idCategoria not in (6,7)
where ve.tipo_comprobante=0 and soa.nCantidadPendienteEntregar>0 and so.estado in (6,8) and so.t_monto_total=so.facturado ORDER BY numero_comprobante DESC";
// die($sql);

        return DB::select($sql);

    }

    public function get_ventas_entregaUnica($solitud)
    {

        if (empty($solitud)) {
            $solitud = '000';
        }

        $sql = "
      
    select ve.idventa as idventa,ve.serie_comprobante as serie_comprobante,ve.numero_comprobante as numero_comprobante,m.Descripcion as moneda ,so.idmoneda as IdMoneda, so.cCodConsecutivo as cCodConsecutivo,so.nConsecutivo as nConsecutivo,cli.razonsocial_cliente as razonsocial_cliente,ve.idcliente as idCliente,cli.id_tipocli as idTipoCliente,cli.documento as documento from ERP_Venta as ve  inner join ERP_Solicitud as so on (so.cCodConsecutivo=ve.cCodConsecutivo_solicitud and so.nConsecutivo=ve.nConsecutivo_solicitud) INNER JOIN ERP_Clientes as cli on (ve.idcliente=cli.id) inner join ERP_Moneda as m on m.IdMoneda=so.idmoneda  where ve.idventa IN ($solitud) ORDER BY numero_comprobante DESC

";

        return DB::select($sql);

    }

    public function search_devolucion($s)
    {
        return $this->model->where(function ($q) use ($s) {
            // $q->where('idMovimiento', 'LIKE', '%'.$s.'%')->where('naturaleza','D');
            // $q->orWhere('idUsuario', 'LIKE', '%'.$s.'%')->where('naturaleza','D');
            // $q->orWhere('estado', 'LIKE', '%'.$s.'%')->where('naturaleza','D');
            // $q->orWhere('idTipoOperacion', 'LIKE', '%'.$s.'%')->where('naturaleza','D');

            $q->where('idMovimiento', 'LIKE', '%' . $s . '%');
            $q->orWhere('idUsuario', 'LIKE', '%' . $s . '%');
            $q->orWhere('estado', 'LIKE', '%' . $s . '%');
            $q->orWhere('idTipoOperacion', 'LIKE', '%' . $s . '%');
        })->whereIn('idTipoOperacion', ['8', '9'])->orderBy('idMovimiento', 'DESC');

    }

    public function get_movemen_lote($id)
    {
        $mostrar = DB::select("select * from ERP_Movimiento_Articulo as mo inner join ERP_Lote as l on mo.idLote=l.idLote where mo.idMovimiento='$id'");
        return $mostrar;
    }

    public function get_movemen_lote_entrega($id)
    {
        $mostrar = DB::select("select * from erp_venta as v inner join ERP_SolicitudArticulo as sa on (v.cCodConsecutivo_solicitud=sa.cCodConsecutivo and v.nConsecutivo_solicitud=sa.nConsecutivo) inner join ERP_Productos as pr on(pr.id=sa.idArticulo) inner JOIN ERP_Lote as lot on lot.idLote=sa.idlote  where v.idventa='$id'");
        return $mostrar;
    }

    public function get_consecutivo_proforma($cod, $nro)
    {
        $mostrar = DB::select("select * from ERP_ProformaDetalle where cCodConsecutivo='$cod' and nConsecutivo='$nro'");
        return $mostrar;
    }
    // public function get_movemen_Serie($id){
    //     $mostrar=DB::select("select md.consecutivo as identificador,ma.cantidad as cantiTotal,* from ERP_Movimiento_Detalle as md inner join ERP_Serie as s on md.serie=s.idserie  inner join ERP_Movimiento_Articulo as ma on ma.consecutivo=md.consecutivo where md.idMovimiento='$id'");
    //      return $mostrar; 
    // } revisar error en movimientos;
    public function get_movemen_Serie($id)
    {
        $mostrar = DB::select("select md.consecutivo as identificador,ma.cantidad as cantiTotal,* from ERP_Movimiento_Detalle as md inner join ERP_Serie as s on md.serie=s.idserie  inner join ERP_Movimiento_Articulo as ma on (ma.consecutivo=md.consecutivo and md.idMovimiento=ma.idMovimiento) where md.idMovimiento='$id'");
        return $mostrar;
    }

    public function get_movemen_Serie_entrega($id)
    {
        $mostrar = DB::select(" select sd.id_solicitud_articulo  as identificador,sa.cantidad as cantiTotal ,* from erp_venta as v inner join ERP_SolicitudArticulo as sa on (v.cCodConsecutivo_solicitud=sa.cCodConsecutivo and v.nConsecutivo_solicitud=sa.nConsecutivo) inner join ERP_Productos as pr on(pr.id=sa.idArticulo) inner JOIN ERP_SolicitudDetalle as sd on(sa.id=sd.id_solicitud_articulo) inner join ERP_Serie as s on sd.idSerie=s.idserie  where v.idventa='$id'");
        return $mostrar;
    }

    public function get_movimientoVenta($id)
    {
        $mostrar = DB::select(
            "select m.nConsecutivo as nconse_ve,m.cCodConsecutivo as cCon_ve,* from ERP_Movimiento as m inner join erp_venta as v on m.cCodConsecutivo=v.serie_comprobante and m.nConsecutivo=v.numero_comprobante inner join ERP_Solicitud as soli on (v.cCodConsecutivo_solicitud=soli.cCodConsecutivo and v.nConsecutivo_solicitud=soli.nConsecutivo) inner join ERP_Clientes as cli on (cli.id = soli.idcliente ) where m.idMovimiento='$id'");
        return $mostrar;
    }

    public function get_movimientoCompra($id)
    {
        $mostrar = DB::select(
            "select prv.razonsocial AS proveedor,m.nConsecutivo as nconse_ve,m.cCodConsecutivo as cCon_ve,* from ERP_Movimiento as m inner join ERP_OrdenCompra as c on m.cCodConsecutivo=c.cCodConsecutivo and m.nConsecutivo=c.nConsecutivo inner join ERP_Proveedor as prv on (prv.id = c.idProveedor) where m.idMovimiento='$id'");
        return $mostrar;
    }

    public function get_movimientoCompraDevol($id)
    {
        $mostrar = DB::select(
            "select prv.razonsocial AS proveedor,m.nConsecutivo as nconse_ve,m.cCodConsecutivo as cCon_ve,* from ERP_Movimiento as m inner join ERP_OrdenCompra as c on m.cCodConsecutivo=c.cCodConsecutivo and m.nConsecutivo=c.nConsecutivo inner join ERP_Proveedor as prv on (prv.id = c.idProveedor) where m.idMovimiento='$id'");
        return $mostrar;
    }


    //  public function get_movemen_Serie($id){
    //     $mostrar=DB::select("select md.consecutivo as identificador,ma.cantidad as cantiTotal,* from ERP_Movimiento_Detalle as md inner join ERP_Serie as s on md.serie=s.idserie  inner join ERP_Movimiento_Articulo as ma on ma.consecutivo=md.consecutivo where md.idMovimiento='$id'");
    //      return $mostrar; 
    // }
    public function allActive()
    {
        return $this->model->where('estado', self::$_ACTIVE)->get();
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        return $this->model->create($attributes);
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

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function get_movement_articulo($id)
    {
        $mostrar = DB::select("select Mo.costo as costo2,* from ERP_Movimiento_Articulo as Mo inner join ERP_Productos as pr on mo.idArticulo=pr.id where mo.idMovimiento='$id'");
        return $mostrar;
    }

    public function getOperationFind()
    {
        $mostrar = DB::select("select * from ERP_TipoOperacion");
        return $mostrar;
    }

    public function destroy_detalle_movimiento($idMovimiento, $iddeta)
    {
        DB::table('ERP_Movimiento_Articulo')->where('idMovimiento', $idMovimiento)->where('consecutivo', $iddeta)->delete();
        DB::table('ERP_Movimiento_Detalle')->where('idMovimiento', $idMovimiento)->where('consecutivo', $iddeta)->delete();
    }

    public function get_movement_articulo_entrega($id)
    {
        $mostrar = DB::select(" select mov.idTipoOperacion AS idTipoOperacion ,mov.naturaleza as naturaleza,   pr.type_id as type_id,pr.serie as serie,pr.lote as lote,pr.kit as kit,pd.nCantidadPendienteDevolver as nCantidadPendienteDevolver, pd.nCantidadPendienteEntregar as nCantidadPendienteEntregar ,mov.cCodConsecutivo as cCodConsecutivo, mov.nConsecutivo as nConsecutivo ,lot.Lote  as cod_lote,Mo.costo as costo2,Mo.idArticulo as idArticulo,Mo.idAlmacen as idAlmacen,Mo.idLocalizacion as idLocalizacion,Mo.idLote as idLote,Mo.cantidad as cantidad, Mo.costo as costo, Mo.costo_total as costo_total,Mo.consecutivo  as consecutivo,Mo.precio  as precio,Mo.precio_total  as precio_total,pr.description as description from ERP_Movimiento_Articulo as Mo inner join ERP_Productos as pr on mo.idArticulo=pr.id LEFT JOIN ERP_Lote as lot on lot.idLote=Mo.idLote inner join ERP_Movimiento as mov on mov.idMovimiento=Mo.idMovimiento LEFT JOIN  ERP_ProformaDetalle as pd on( pd.cCodConsecutivo=mov.cCodConsecutivo and pd.nConsecutivo=mov.nConsecutivo and mo.idArticulo=pd.idProducto) where Mo.idMovimiento='$id'");
        return $mostrar;
    }

    public function get_movement_articulo_recepcionCompra($id)
    {
        $mostrar = DB::select("select mov.idTipoOperacion AS idTipoOperacion ,mov.naturaleza as naturaleza,   pr.type_id as type_id,pr.serie as serie,pr.lote as lote,pr.kit as kit,pd.cantidadDevuelta as nCantidadPendienteDevolver, pd.cantidadPendiente as nCantidadPendienteEntregar ,mov.cCodConsecutivo as cCodConsecutivo, mov.nConsecutivo as nConsecutivo ,lot.Lote  as cod_lote,Mo.costo as costo2,Mo.idArticulo as idArticulo,Mo.idAlmacen as idAlmacen,Mo.idLocalizacion as idLocalizacion,Mo.idLote as idLote,Mo.cantidad as cantidad, Mo.costo as costo, Mo.costo_total as costo_total,Mo.consecutivo  as consecutivo,Mo.precio  as precio,Mo.precio_total  as precio_total,pr.description as description from ERP_Movimiento_Articulo as Mo inner join ERP_Productos as pr on mo.idArticulo=pr.id LEFT JOIN ERP_Lote as lot on lot.idLote=Mo.idLote inner join ERP_Movimiento as mov on mov.idMovimiento=Mo.idMovimiento LEFT JOIN  ERP_OrdenCompra as occ on( occ.cCodConsecutivo=mov.cCodConsecutivo and occ.nConsecutivo=mov.nConsecutivo) inner join  ERP_OrdenCompraArticulo as pd on (pd.idOrden=occ.id and mo.idArticulo=pd.idArticulo ) where Mo.idMovimiento='$id'");
        return $mostrar;
    }

    public function get_movimiento_Articulo_entrega_venta($id)
    {
        $mostrar = DB::select("select mov.idTipoOperacion AS idTipoOperacion ,mov.naturaleza as naturaleza,   pr.type_id as type_id,pr.serie as serie,pr.lote as lote,pr.kit as kit,pd.nCantidadPendienteDevolver as nCantidadPendienteDevolver, pd.nCantidadPendienteEntregar as nCantidadPendienteEntregar ,mov.cCodConsecutivo as cCodConsecutivo, mov.nConsecutivo as nConsecutivo ,lot.Lote  as cod_lote,Mo.costo as costo2,Mo.idArticulo as idArticulo,Mo.idAlmacen as idAlmacen,Mo.idLocalizacion as idLocalizacion,Mo.idLote as idLote,Mo.cantidad as cantidad, Mo.costo as costo, Mo.costo_total as costo_total,Mo.consecutivo  as consecutivo,Mo.precio  as precio,Mo.precio_total  as precio_total,pr.description as description from ERP_Movimiento_Articulo as Mo inner join ERP_Productos as pr on mo.idArticulo=pr.id LEFT JOIN ERP_Lote as lot on lot.idLote=Mo.idLote inner join ERP_Movimiento as mov on mov.idMovimiento=Mo.idMovimiento INNER JOIN ERP_Venta As ven on (ven.serie_comprobante=mov.cCodConsecutivo and ven.numero_comprobante=mov.nConsecutivo) LEFT JOIN  ERP_SolicitudArticulo as pd on( pd.cCodConsecutivo=ven.cCodConsecutivo_solicitud and pd.nConsecutivo=ven.nConsecutivo_solicitud and mo.idArticulo=pd.idarticulo ) where Mo.idMovimiento='$id'");
        return $mostrar;
    }

    public function procesarTransferencia($id)
    {

        $pdo = DB::connection()->getPdo();
        $destroy = DB::select("SET NOCOUNT ON; EXEC AL_Registra_Movimiento '$id'");
        return $destroy;
    }

    public function getProductoFactura($codigo)
    {

        $mostrar = DB::select("select * from ERP_Productos where code_article='$codigo'");
        return $mostrar;
    }

    public function destroy($id)
    {

        $pdo = DB::connection()->getPdo();
        $destroy = DB::select("SET NOCOUNT ON; EXEC AL_Elimina_Movimiento '$id'");
        return $destroy;
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function get_movimiento($id)
    {
        $mostrar = DB::select("select * from ERP_Movimiento as er inner join ERP_TipoOperacion as ti on er.idTipoOperacion=ti.idTipoOperacion where er.idMovimiento='$id'");
        return $mostrar;
    }

    public function get_movimientoEntregaProf($id)
    {
        $mostrar = DB::select("select  ti.descripcion as tipoOperacion, cli.razonsocial_cliente,cli.direccion as direccion_cliente,cli.documento as documento_cliente,cli.celular as celular_cliente,ven.descripcion as vendedor,* from ERP_Movimiento as er inner join ERP_TipoOperacion as ti on er.idTipoOperacion=ti.idTipoOperacion left join ERP_Venta as v on (er.cCodConsecutivo=v.serie_comprobante AND er.nConsecutivo=v.numero_comprobante)
left join ERP_Solicitud as so on (so.cCodConsecutivo=v.cCodConsecutivo_solicitud and so.nConsecutivo = v.nConsecutivo_solicitud)
left join ERP_Vendedores as ven on (so.idvendedor=ven.idvendedor)
left join ERP_Proforma as pro on(er.cCodConsecutivo=pro.cCodConsecutivo AND er.nConsecutivo=pro.nConsecutivo)
left join ERP_Clientes as cli on (cli.id=pro.idcliente)
where er.idMovimiento='$id' ");
        return $mostrar;
    }

    public function get_movimientoEntrega($id)
    {
        $mostrar = DB::select("select ti.descripcion as tipoOperacion,cli.razonsocial_cliente,cli.direccion as direccion_cliente,cli.documento as documento_cliente,cli.celular as celular_cliente,ven.descripcion as vendedor,* from ERP_Movimiento as er inner join ERP_TipoOperacion as ti on er.idTipoOperacion=ti.idTipoOperacion left join ERP_Venta as v on (er.cCodConsecutivo=v.serie_comprobante AND er.nConsecutivo=v.numero_comprobante)
left join ERP_Solicitud as so on (so.cCodConsecutivo=v.cCodConsecutivo_solicitud and so.nConsecutivo = v.nConsecutivo_solicitud)
left join ERP_Vendedores as ven on (so.idvendedor=ven.idvendedor)
left join ERP_Clientes as cli on (cli.id=so.idcliente)
where er.idMovimiento='$id'");
        return $mostrar;
    }

    public function get_movimientoEntregaCompra($id)
    {
        $mostrar = DB::select("select ti.descripcion as tipoOperacion,prov.razonsocial as razonsocial_cliente,prov.direccion as direccion_cliente,prov.documento as documento_cliente,prov.celular as celular_cliente,rpo.code as number_reception,
com.description as vendedor, * 
from ERP_Movimiento as er 
inner join ERP_RecepcionOrdenCompra as rpo on rpo.mov_id=er.idMovimiento
inner join ERP_TipoOperacion as ti on er.idTipoOperacion=ti.idTipoOperacion 
left join ERP_OrdenCompra as oc on (er.cCodConsecutivo=oc.cCodConsecutivo AND er.nConsecutivo=oc.nConsecutivo)
left join ERP_Proveedor as prov on (prov.id=oc.idProveedor)
left join ERP_Compradores as com on oc.buyer_id=com.id
where er.idMovimiento='$id'");
        return $mostrar;
    }

    public function get_movimientoConformidadCompra($id)
    {
        $mostrar = DB::select("select ti.descripcion as tipoOperacion,prov.razonsocial as razonsocial_cliente,prov.direccion as direccion_cliente,prov.documento as documento_cliente,prov.celular as celular_cliente,cs.code as number_reception,
com.description as vendedor, * 
from ERP_Movimiento as er 
inner join ERP_ConformidadServicios as cs on cs.mov_id=er.idMovimiento
inner join ERP_TipoOperacion as ti on er.idTipoOperacion=ti.idTipoOperacion 
left join ERP_OrdenCompra as oc on (er.cCodConsecutivo=oc.cCodConsecutivo AND er.nConsecutivo=oc.nConsecutivo)
left join ERP_Proveedor as prov on (prov.id=oc.idProveedor)
left join ERP_Compradores as com on oc.buyer_id=com.id
where er.idMovimiento='$id'");
        return $mostrar;
    }

    public function get_movimientoDevolucionCompra($id)
    {
        $mostrar = DB::select("select ti.descripcion as tipoOperacion,prov.razonsocial as razonsocial_cliente,prov.direccion as direccion_cliente,prov.documento as documento_cliente,prov.celular as celular_cliente,ret.code as number_reception,
com.description as vendedor, * 
from ERP_Movimiento as er 
inner join ERP_DevolucionOrdenCompra as ret on ret.mov_id=er.idMovimiento
inner join ERP_TipoOperacion as ti on er.idTipoOperacion=ti.idTipoOperacion 
left join ERP_OrdenCompra as oc on (er.cCodConsecutivo=oc.cCodConsecutivo AND er.nConsecutivo=oc.nConsecutivo)
left join ERP_Proveedor as prov on (prov.id=oc.idProveedor)
left join ERP_Compradores as com on oc.buyer_id=com.id
where er.idMovimiento='$id'");
        return $mostrar;
    }

    public function get_movimientoDevolucionCS($id)
    {
        $mostrar = DB::select("select ti.descripcion as tipoOperacion,prov.razonsocial as razonsocial_cliente,prov.direccion as direccion_cliente,prov.documento as documento_cliente,prov.celular as celular_cliente,ret.code as number_reception,
com.description as vendedor, * 
from ERP_Movimiento as er 
inner join ERP_DevolucionConformidadServicios as ret on ret.mov_id=er.idMovimiento
inner join ERP_TipoOperacion as ti on er.idTipoOperacion=ti.idTipoOperacion 
left join ERP_OrdenCompra as oc on (er.cCodConsecutivo=oc.cCodConsecutivo AND er.nConsecutivo=oc.nConsecutivo)
left join ERP_Proveedor as prov on (prov.id=oc.idProveedor)
left join ERP_Compradores as com on oc.buyer_id=com.id
where er.idMovimiento='$id'");
        return $mostrar;
    }

    public function get_movement_articulo_print($id)
    {
        $mostrar = DB::select("SELECT ma.cantidad as cantidad, ma.consecutivo as consecutivo,pr.description as producto,al.description as almacen,lo.descripcion as localizacion,lot.Lote as lote,un.Abreviatura as unidad FROM ERP_Movimiento_Articulo as ma left JOIN ERP_Almacen  as al on al.id=ma.idAlmacen LEFT join ERP_Localizacion as lo on lo.idLocalizacion=ma.idLocalizacion inner join ERP_Productos as pr on pr.id=ma.idArticulo INNER JOIN ERP_UnidadMedida as un on pr.um_id=un.IdUnidadMedida LEFT JOIN ERP_Lote as lot  on lot.idLote=ma.idLote where ma.idMovimiento='$id'");
        return $mostrar;
    }

    public function get_movement_articulo_printProforma($id)
    {
        $mostrar = DB::select("
                 SELECT prd.nCant as cantidadRequeridad,prd.nCantidadPendienteEntregar,ma.cantidad as cantidad, ma.consecutivo as consecutivo,pr.description as producto,al.description as almacen,lo.descripcion as localizacion,lot.Lote as lote,un.Abreviatura as unidad FROM ERP_Movimiento_Articulo as ma left JOIN ERP_Almacen  as al on al.id=ma.idAlmacen LEFT join ERP_Localizacion as lo on lo.idLocalizacion=ma.idLocalizacion inner join ERP_Productos as pr on pr.id=ma.idArticulo INNER JOIN ERP_UnidadMedida as un on pr.um_id=un.IdUnidadMedida LEFT JOIN ERP_Lote as lot  on lot.idLote=ma.idLote inner join ERP_Movimiento as mov on(mov.idMovimiento=ma.idMovimiento) inner join ERP_ProformaDetalle as prd on(prd.cCodConsecutivo=mov.cCodConsecutivo and prd.nConsecutivo=mov.nConsecutivo and ma.idArticulo=prd.idProducto) where ma.idMovimiento='$id'");
        return $mostrar;
    }

    public function get_movement_articulo_printCompra($id)
    {
        $mostrar = DB::select("SELECT ma.cantidad as cantidadRequeridad, '0' as nCantidadPendienteEntregar,ma.cantidad as cantidad, ma.consecutivo as consecutivo,pr.description as producto,al.description as almacen,lo.descripcion as localizacion,lot.Lote as lote,un.Abreviatura as unidad 
FROM ERP_Movimiento_Articulo as ma 
left JOIN ERP_Almacen  as al on al.id=ma.idAlmacen 
LEFT join ERP_Localizacion as lo on lo.idLocalizacion=ma.idLocalizacion 
inner join ERP_Productos as pr on pr.id=ma.idArticulo 
INNER JOIN ERP_UnidadMedida as un on pr.um_id=un.IdUnidadMedida 
LEFT JOIN ERP_Lote as lot  on lot.idLote=ma.idLote 
inner join ERP_Movimiento as mov on(mov.idMovimiento=ma.idMovimiento) 
where ma.idMovimiento='$id'");
        return $mostrar;
    }

    public function get_movement_articulo_printVenta($id)
    {
        $mostrar = DB::select("SELECT sar.cantidad as cantidadRequeridad, sar.nCantidadPendienteEntregar,ma.cantidad as cantidad, ma.consecutivo as consecutivo,pr.description as producto,al.description as almacen,lo.descripcion as localizacion,lot.Lote as lote,un.Abreviatura as unidad FROM ERP_Movimiento_Articulo as ma left JOIN ERP_Almacen  as al on al.id=ma.idAlmacen LEFT join ERP_Localizacion as lo on lo.idLocalizacion=ma.idLocalizacion inner join ERP_Productos as pr on pr.id=ma.idArticulo INNER JOIN ERP_UnidadMedida as un on pr.um_id=un.IdUnidadMedida LEFT JOIN ERP_Lote as lot  on lot.idLote=ma.idLote inner join ERP_Movimiento as mov on(mov.idMovimiento=ma.idMovimiento) inner join ERP_Venta as ven on(ven.serie_comprobante=mov.cCodConsecutivo and ven.numero_comprobante=mov.nConsecutivo ) inner join ERP_Solicitud as solI ON (solI.nConsecutivo=ven.nConsecutivo_solicitud AND solI.cCodConsecutivo=ven.cCodConsecutivo_solicitud) inner join ERP_SolicitudArticulo as sar on (sar.nConsecutivo=solI.nConsecutivo AND sar.cCodConsecutivo=solI.cCodConsecutivo and sar.idarticulo=ma.idArticulo) where ma.idMovimiento='$id'");
        return $mostrar;
    }


    public function getStockLoc($idl, $idArl)
    {
        $mostrar = DB::select("select total from ERP_almacen_stock_localizacion where idArticulo=$idArl and idLocalizacion=$idl /*and idArticulo = 11*/");
    }

    public function getLocaStock($idAlmacen)
    {
        $mostrar = DB::select("select los.disponible as disponible,los.remitido as remitido,lo.idLocalizacion,lo.descripcion,los.idArticulo, los.total from ERP_Localizacion as lo LEFT JOIN ERP_almacen_stock_localizacion as los on lo.idLocalizacion=los.idLocalizacion where lo.idALmacen=$idAlmacen /*and los.idArticulo = 11*/");
        return $mostrar;
    }

    public function getLocalizacioAlmacen($idAlmacen)
    {
        $mostrar = DB::select("SELECT * FROM ERP_Localizacion where idAlmacen='$idAlmacen' AND estado='A'");
        return $mostrar;
    }

    public function getDetalle($idMovimiento)
    {
        $mostrar = DB::select("select * from ERP_Movimiento_Articulo where idMovimiento=$idMovimiento");
        return $mostrar;
    }

}