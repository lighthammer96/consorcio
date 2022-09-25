<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\CajaDiariaDetalle;
use Illuminate\Support\Facades\DB;

class CajaDiariaDetalleRepository implements CajaDiariaDetalleInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(CajaDiariaDetalle $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    {
        return $this->model->get();
    }
     public function getcuentas_bancarias()
    {   
        $mostrar=DB::select("select * from ERP_CuentasBancarias");
        return $mostrar; 
    }
     public function getbancos()
    {   
        $mostrar=DB::select("select * from ERP_Bancos");
        return $mostrar; 
    }
    public function allExcel()
    {   $idusuario=auth()->id();
        date_default_timezone_set('UTC');
        $fechacA= date("Y-m-d");
        $query=DB::select("select * from ERP_CajaDiaria where idUsuario='$idusuario' and fechaCaja='$fechacA'");
        $idCajaDia=0;
        if(!empty($query)){
            $idCajaDia=$query[0]->idCajaDiaria;   
        }
        return $this->model->where('idCajaDiaria',$idCajaDia)->get();
    }
     public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('consecutivo', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('codigoTipo', 'LIKE', '%'.$s.'%');
            $q->orWhere('codigoFormaPago', 'LIKE', '%'.$s.'%');
            $q->orWhere('idMoneda', 'LIKE', '%'.$s.'%');
            $q->orWhere('descripcion', 'LIKE', '%'.$s.'%');
        });

    }
    public function search_movimiento_diario($s,$filtro_tipoMovi,$filtro_monedaMovi)
    {   $idusuario=auth()->id();
        date_default_timezone_set('America/Lima');
        $fechacA= date("Y-m-d");
        $query=DB::select("select * from ERP_CajaDiaria where idUsuario='$idusuario' and fechaCaja='$fechacA'");
        $idCajaDia=0;
        if(!empty($query)){
            $idCajaDia=$query[0]->idCajaDiaria;   
        }
       
        // return $this->model->where(function($q) use ($s,$idCajaDia,$fechacA,$filtro_tipoMovi,$filtro_monedaMovi){

            
        //     $q->where('consecutivo', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC')->where('idCajaDiaria',$idCajaDia);
        //     $q->orWhere('codigoTipo', 'LIKE', '%'.$s.'%')->where('idCajaDiaria',$idCajaDia);
        //     $q->orWhere('codigoFormaPago', 'LIKE', '%'.$s.'%')->where('idCajaDiaria',$idCajaDia);
        //     $q->orWhere('idMoneda', 'LIKE', '%'.$s.'%')->where('idCajaDiaria',$idCajaDia);
        //     $q->orWhere('descripcion', 'LIKE', '%'.$s.'%')->where('idCajaDiaria',$idCajaDia);
        //      $q->orWhere('codigoTipo', 'LIKE', '%'.$filtro_tipoMovi.'%')->where('idCajaDiaria',$idCajaDia);
        //       $q->orWhere('idMoneda', 'LIKE', '%'.$filtro_monedaMovi.'%')->where('idCajaDiaria',$idCajaDia);
        //     if(!empty($filtro_tipoMovi)){
        //      $q=
        //     }
        //     if(!empty($filtro_monedaMovi)){
        //      $q=
        //     }
        // });

        return $this->model->where(function($q) use ($s,$idCajaDia,$fechacA,$filtro_tipoMovi,$filtro_monedaMovi) {
            $q->orderByRaw('created_at DESC')->where('idCajaDiaria',$idCajaDia);
            if(!empty($filtro_tipoMovi)){
              $q->Where('codigoTipo',$filtro_tipoMovi);
            }
            if(!empty($filtro_monedaMovi)){
              $q->Where('idMoneda',$filtro_monedaMovi);
            }
            if(!empty($s)){
              $q->Where('descripcion',$s);
            }
          
            // $q->orWhere('Almacen', 'LIKE', '%'.$s.'%');
            // $q->orWhere('Categoria', 'LIKE', '%'.$s.'%');
        });

    }
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
    public function get_consecutivo($table,$id)
    {     $mostrar=DB::select("select top 1 * from $table order by CONVERT(INT, $id) DESC");
         $actu=0;
         if(!$mostrar){
            $actu=0;
         }else{
            $actu=intval($mostrar[0]->$id);
         };
        $new=$actu+1;
        return $new; 
    }
    public function update($id,$consecutivo, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id)->where('consecutivo',$consecutivo)->where('idCajaDiaria',$id);
        $model->update($attributes);
    }
    public function destroy($id)
    {
        $attributes = [];
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
     


    }
    

    public function get_condicion_pago($dias) {
        $sql = "SELECT * FROM ERP_CondicionPago AS cp WHERE cp.days={$dias}";

        $result = DB::select($sql);

        return $result;
    }

    public function get_caja_diaria() {
        $idusuario = auth()->id();
        $fechacA = date("Y-m-d");
        $sql = "SELECT * FROM ERP_CajaDiaria AS cd
        INNER JOIN ERP_Cajas AS c ON(c.idcaja=cd.idCaja)
        WHERE cd.idUsuario='$idusuario' AND FORMAT(cd.fechaCaja, 'yyyy-MM-dd')='$fechacA'";
        $result = DB::select($sql);
        return $result;
    }

    public function get_caja_tienda() {
        $idusuario = auth()->id();
        // $fechacA = date("Y-m-d");
        $sql = "SELECT c.* FROM  ERP_Cajas AS c
        INNER JOIN ERP_CajaUsuario AS cu ON(c.idcaja=cu.idCaja)
        WHERE cu.idUsuario='$idusuario'";
      
        $result = DB::select($sql);
        return $result;
    }

    public function get_cajero() {
        $idusuario = auth()->id();
        $fechacA = date("Y-m-d");
        $sql = "SELECT u.* FROM ERP_CajaDiaria AS cd
        INNER JOIN ERP_Usuarios AS u ON(cd.idUsuario=u.id)
        WHERE cd.idUsuario='$idusuario' AND FORMAT(fechaCaja, 'yyyy-MM-dd')='$fechacA'";
        $result = DB::select($sql);
        return $result;
    }


    public function get_empresa() {
        $sql = "SELECT * FROM ERP_Compania";
        $result = DB::select($sql);
        return $result;
    }

    public function get_tiendas() {
        $sql = "SELECT * FROM ERP_Tienda WHERE estado='A'";
        $result = DB::select($sql);
        return $result;
    }
    

    public function get_tienda() {
        $caja_diaria = $this->get_caja_diaria();
        $sql = "SELECT t.* FROM ERP_Cajas AS c
        INNER JOIN ERP_Tienda AS t ON(c.idtienda=t.idTienda)
        WHERE c.idcaja={$caja_diaria[0]->idCaja}";

        $result = DB::select($sql);
        return $result;
    }

    public function get_venta($idventa) {
        $sql = "SELECT v.*, m.Descripcion AS moneda, td.Descripcion AS tipo_documento, c.description AS condicion_pago, m.*, u.name AS cajero, t.descripcion AS tienda, t.direccion AS direccion_tienda, cc.nombre_caja, ISNULL(v.t_impuestos, 0) AS t_impuestos, mo.descripcion AS motivo, FORMAT(v.fecha_emision, 'dd/MM/yyyy') AS fecha_emision_user, FORMAT(v.fecha_emision, 'dd/MM/yyyy hh:mm:ss') AS fecha_emision_user_full, FORMAT(v.fecha_emision, 'yyyy-MM-dd') AS fecha_emision_server, FORMAT(v.fecha_emision, 'hh:mm:ss') AS hora_server, cl.*, v.condicion_pago AS codcondicionpago, mo.descripcion AS motivo_descripcion, c.days AS dias, FORMAT(v.fecha_anulacion, 'yyyy-MM-dd') AS fecha_anulacion_server, v.IdTipoDocumento
        FROM ERP_Venta AS v 
        INNER JOIN ERP_Moneda AS m ON(v.idmoneda=m.IdMoneda)
        INNER JOIN ERP_TipoDocumento AS td ON(td.idTipoDocumento=v.idTipoDocumento)
        INNER JOIN ERP_CondicionPago AS c ON(c.id=v.condicion_pago)
        LEFT JOIN ERP_Usuarios AS u ON(v.idcajero=u.id)
        LEFT JOIN ERP_Tienda AS t ON(v.idtienda=t.idTienda)
        LEFT JOIN ERP_Cajas AS cc ON(cc.idcaja=v.idcaja)
        LEFT JOIN ERP_Motivos AS mo ON(mo.codigo=v.idmotivo)
        LEFT JOIN ERP_Clientes as cl ON(cl.id=v.idcliente)
        WHERE v.idventa={$idventa}";
        $result = DB::select($sql);
        return $result;
    }


    public function get_segunda_venta_credito($cCodConsecutivo, $nConsecutivo) {
        $sql = "SELECT v.*, m.Descripcion AS moneda, td.Descripcion AS tipo_documento, c.description AS condicion_pago, m.*, u.name AS cajero, t.descripcion AS tienda, t.direccion AS direccion_tienda, cc.nombre_caja, FORMAT(v.fecha_emision, 'dd/MM/yyyy') AS fecha_emision_user, v.condicion_pago AS idcondicionpago
        FROM ERP_Venta AS v 
        INNER JOIN ERP_Moneda AS m ON(v.idmoneda=m.IdMoneda)
        INNER JOIN ERP_TipoDocumento AS td ON(td.idTipoDocumento=v.idTipoDocumento)
        INNER JOIN ERP_CondicionPago AS c ON(c.id=v.condicion_pago)
        LEFT JOIN ERP_Usuarios AS u ON(v.idcajero=u.id)
        LEFT JOIN ERP_Tienda AS t ON(v.idtienda=t.idTienda)
        LEFT JOIN ERP_Cajas AS cc ON(cc.idcaja=v.idcaja)
        WHERE  v.cCodConsecutivo_solicitud='{$cCodConsecutivo}' AND v.nConsecutivo_solicitud={$nConsecutivo} AND /*v.anticipo > 0*/ v.comprobante_x_saldo='S' AND v.IdTipoDocumento IN('01', '03', '12')";
        // die($sql);
        $result = DB::select($sql);
        return $result;
    }

    public function get_venta_anticipo($cCodConsecutivo, $nConsecutivo) {
        $sql = "SELECT v.*, m.Descripcion AS moneda, td.Descripcion AS tipo_documento, c.description AS condicion_pago, m.*, u.name AS cajero, t.descripcion AS tienda, t.direccion AS direccion_tienda, cc.nombre_caja, cl.*, FORMAT(v.fecha_emision, 'yyyy-MM-dd') AS fecha_emision_server
        FROM ERP_Venta AS v 
        INNER JOIN ERP_Moneda AS m ON(v.idmoneda=m.IdMoneda)
        INNER JOIN ERP_TipoDocumento AS td ON(td.idTipoDocumento=v.idTipoDocumento)
        INNER JOIN ERP_CondicionPago AS c ON(c.id=v.condicion_pago)
        LEFT JOIN ERP_Usuarios AS u ON(v.idcajero=u.id)
        LEFT JOIN ERP_Tienda AS t ON(v.idtienda=t.idTienda)
        LEFT JOIN ERP_Cajas AS cc ON(cc.idcaja=v.idcaja)
        LEFT JOIN ERP_Clientes AS cl ON(cl.id=v.idcliente)
        WHERE  v.cCodConsecutivo_solicitud='{$cCodConsecutivo}' AND v.nConsecutivo_solicitud={$nConsecutivo} AND v.tipo_comprobante = '1'";
        // die($sql);
        $result = DB::select($sql);
        return $result;
    }

    public function get_venta_anticipo_separacion($idventa) {
        $sql = "SELECT v.*, m.Descripcion AS moneda, td.Descripcion AS tipo_documento, c.description AS condicion_pago, m.*, u.name AS cajero, t.descripcion AS tienda, t.direccion AS direccion_tienda, cc.nombre_caja
        FROM ERP_Venta AS v 
        INNER JOIN ERP_Moneda AS m ON(v.idmoneda=m.IdMoneda)
        INNER JOIN ERP_TipoDocumento AS td ON(td.idTipoDocumento=v.idTipoDocumento)
        INNER JOIN ERP_CondicionPago AS c ON(c.id=v.condicion_pago)
        LEFT JOIN ERP_Usuarios AS u ON(v.idcajero=u.id)
        LEFT JOIN ERP_Tienda AS t ON(v.idtienda=t.idTienda)
        LEFT JOIN ERP_Cajas AS cc ON(cc.idcaja=v.idcaja)
        WHERE  v.idventa={$idventa} AND v.tipo_comprobante = '1'";
        // die($sql);
        $result = DB::select($sql);
        return $result;
    }

  

    public function get_venta_detalle($idventa) {
        $sql = "SELECT vd.*, p.description AS producto, um.Abreviatura AS unidad_medida, p.serie, p.code_article, p.id AS idproducto
        FROM ERP_Venta AS v 
        INNER JOIN ERP_VentaDetalle AS vd ON(vd.idventa=v.idventa)
        INNER JOIN ERP_Productos AS p ON(p.id=vd.idarticulo)
        LEFT JOIN ERP_UnidadMedida AS um ON(um.IdUnidadMedida=vd.um_id)
       
       
        WHERE v.idventa={$idventa}";
        // die($sql);
        $result = DB::select($sql);
        return $result;
    }


    

    public function get_venta_formas_pago($idventa) {
        $sql = "SELECT vfp.*, m.Descripcion AS moneda
        FROM ERP_Venta AS v 
        INNER JOIN ERP_VentaFormaPago AS vfp ON(v.idventa=vfp.idventa)
        LEFT JOIN ERP_Moneda AS m ON(vfp.IdMoneda=m.IdMoneda)
        WHERE v.idventa={$idventa}";
        $result = DB::select($sql);
        return $result;
    }

    public function get_parametro_anticipo() {
        $sql = "SELECT * FROM ERP_Parametros WHERE id=5";
        $result = DB::select($sql);
        return $result;
    }

    public function get_parametro_interes() {
        $sql = "SELECT * FROM ERP_Parametros WHERE id=26";
        $result = DB::select($sql);
        return $result;
    }

    public function get_parametro_cuota() {
        $sql = "SELECT * FROM ERP_Parametros WHERE id=7";
        $result = DB::select($sql);
        return $result;
    }

    public function get_parametro_separacion() {
        $sql = "SELECT * FROM ERP_Parametros WHERE id=8";
        $result = DB::select($sql);
        return $result;
    }

    public function get_parametro_alquiler() {
        $sql = "SELECT * FROM ERP_Parametros WHERE id=24";
        $result = DB::select($sql);
        return $result;
    }

    public function get_parametro_tramite() {
        $sql = "SELECT * FROM ERP_Parametros WHERE id=25";
        $result = DB::select($sql);
        return $result;
    }

    public function get_parametro_articulo_movimiento_caja() {
        $sql = "SELECT * FROM ERP_Parametros WHERE id=14";
        $result = DB::select($sql);
        return $result;
    }


    public function update_stock($idventa)
    {
        $sql = "
        DECLARE	@return_value int

        SET NOCOUNT ON; EXEC	@return_value = [dbo].[VTA_Registra_Movimiento_Vta_OS]
                @nIdVenta = ".$idventa."

        SELECT	'Return Value' = @return_value";

        // echo $sql; exit;
        $res = DB::select($sql);

        // print_r($res);
        return $res;
    }

    public function get_parametro_igv()
    {
        $param = DB::select("select * from ERP_Parametros WHERE id=1");
        return $param;
    }

    public function get_clientes() {
        $sql = "SELECT * FROM ERP_Clientes";
        $result = DB::select($sql);
        return $result;
    }
  
    

}