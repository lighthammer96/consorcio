<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\CajaDiaria;
use Illuminate\Support\Facades\DB;

class CajaDiariaRepository implements CajaDiariaInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(CajaDiaria $model)
    {
        $this->model = $model; 
       
    }
      public function find($id)
    {
        return $this->model->find($id);
    }

    public function all()
    {
        return $this->model->get();
    }
     public function search($s)
    {
        return $this->model->where(function($q) use ($s){ 
            $q->where('idCajaDiaria', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('idCajaDiaria', 'LIKE', '%'.$s.'%');
        })->orderBy('fechaCaja','desc');

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
    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }
    public function destroy($id)
    {
        $attributes = [];
        $model = $this->model->findOrFail($id);
        DB::table('ERP_CajaDiariaDetalle')->where('idCajaDiaria',$id)->delete();
        DB::table('ERP_CajaDiariaDenominaciones')->where('idCajaDiaria',$id)->delete();
        $model->update($attributes);
        $model->delete();
     
    }
    public function getDenominacion()
    {   
        $mostrar=DB::select("select * from ERP_Denominaciones");
        return $mostrar; 
    }
    public function getcajas($idUser)
    {   
        $mostrar=DB::select("SELECT * FROM ERP_Cajas as c inner join ERP_CajaUsuario as cu on c.idcaja=cu.idCaja where c.activo='S' and cu.idUsuario='$idUser' ");
        return $mostrar; 
    }
    public function getDetalle($id)
    {   
        $mostrar=DB::select("select * from ERP_CajaDiariaDetalle where idCajaDiaria='$id'");
        return $mostrar; 
    }
    public function getDenominaciones_actual($id,$estado)
    {   
        $mostrar=DB::select("select * from ERP_CajaDiariaDenominaciones as cd INNER JOIN ERP_Denominaciones as de on cd.idDenominacion=de.id_denominacion where cd.idCajaDiaria='$id' and tipo='$estado'");
        return $mostrar; 
    }
     public function getDenominaciones($id)
    {   
        $mostrar=DB::select("select * from ERP_CajaDiariaDenominaciones as cd INNER JOIN ERP_Denominaciones as de on cd.idDenominacion=de.id_denominacion where cd.idCajaDiaria='$id'");
        return $mostrar; 
    }
    public function getCajaDiario($id){
        $mostrar=DB::select("select cd.*, FORMAT(cd.fechaCaja, 'yyyy-MM-dd') AS fechaCaja_server, FORMAT(cd.fechaCaja, 'dd/MM/yyyy') AS fechaCaja_user from ERP_CajaDiaria as cd inner join ERP_Cajas as c on cd.idCaja=c.idcaja where cd.idCajaDiaria='$id'");
        return $mostrar; 
    }
    public function get_cajaActual($date,$usuario){
        $mostrar=DB::select("select * from ERP_CajaDiaria as cd inner join ERP_Cajas as c on cd.idCaja=c.idcaja where cd.fechaCaja='$date' and cd.idUsuario='$usuario'");
        return $mostrar; 
    }
    public function getCajaAbierta($date,$usuario){
        $mostrar=DB::select("select CONVERT(DATE, fechaCaja)  as fecha,* from ERP_CajaDiaria where estado=1 and fechaCaja!='$date' and idUsuario='$usuario'");
        return $mostrar; 
    }
    public function get_tienda($idcaja){
        $mostrar=DB::select("select * from ERP_Cajas as c inner join ERP_Tienda as t on c.idtienda=t.idTienda INNER JOIN ERP_Ubigeo as u on u.cCodUbigeo=t.ubigeo where idcaja='$idcaja'");
        return $mostrar; 
    }
    public function getCajaDetalle($date,$usuario){
        $mostrar=DB::select("select * from ERP_CajaDiariaDetalle as cd inner join ERP_TiposMovimiento as tm on cd.codigoTipo=tm.codigo_tipo INNER JOIN ERP_FormasPago as fp on cd.codigoFormaPago=fp.codigo_formapago inner join ERP_CajaDiaria as c on cd.idCajaDiaria=c.idCajaDiaria where c.fechaCaja='$date' and c.idUsuario='$usuario'");
        return $mostrar; 
    }
    public function get_ventaComproTipoPago($date,$usuario){
        $mostrar=DB::select("select SUM(vp.monto_pago) as total,cp.id as idCondicionPago,cp.description as condicionPago,v.idmoneda from ERP_VentaFormaPago as vp inner join erp_venta as v on vp.idventa=v.idventa inner join ERP_Clientes as cl on v.idcliente=cl.id inner join ERP_FormasPago as fp on fp.codigo_formapago=vp.codigo_formapago inner join ERP_CondicionPago as cp on cp.id=v.condicion_pago inner join erp_venta as tiket on (tiket.idventa_comprobante=v.idventa)  where convert(date,v.fecha_emision)='$date' and v.idcajero='$usuario' and  v.idTipoDocumento in (03,01) and v.condicion_pago='1' GROUP BY v.idmoneda,v.condicion_pago ,cp.id,cp.description");
        return $mostrar; 
    }
    public function get_ventaCancelaCuota($date,$usuario,$idarticulo){
        $mostrar=DB::select("select SUM(valor_cuota_pagada) as total, v.idmoneda from ERP_VentaDetalle as vd INNER JOIN erp_venta as v on (v.idventa=vd.idventa) where  convert(date,v.fecha_emision)='$date' and  v.idcajero='$usuario'  and v.idTipoDocumento in (12) and vd.idarticulo='$idarticulo' GROUP BY v.idmoneda");
        return $mostrar; 
    }
     public function get_ventaCancelaMora($date,$usuario,$idarticulo){
        $mostrar=DB::select("select SUM(int_moratorio_pagado) as total, v.idmoneda from ERP_VentaDetalle as vd INNER JOIN erp_venta as v on (v.idventa=vd.idventa) where  convert(date,v.fecha_emision)='$date' and  v.idcajero='$usuario'  and v.idTipoDocumento in (12) and vd.idarticulo='$idarticulo' GROUP BY v.idmoneda");
        return $mostrar; 
    }
    public function get_ventaAnticipo($date,$usuario,$idarticulo){
        $mostrar=DB::select("
select sum(vd.monto_total) as total ,v.idmoneda from ERP_VentaDetalle as vd INNER JOIN erp_venta as v on (v.idventa=vd.idventa)  where  convert(date,v.fecha_emision)='$date' and    v.idcajero='$usuario'  and v.idTipoDocumento in (03,01) and vd.idarticulo='$idarticulo' GROUP BY v.idmoneda");
        return $mostrar; 
    }
    public function get_ventaDevolucion($date,$usuario){
        $mostrar=DB::select("
select sum(vd.monto_total) as total ,v.idmoneda from ERP_VentaDetalle as vd INNER JOIN erp_venta as v on (v.idventa=vd.idventa)  where  convert(date,v.fecha_emision)='$date' and    v.idcajero='$usuario'  and v.idTipoDocumento in (07)  and v.idmotivo in (06,07)  GROUP BY v.idmoneda");
        return $mostrar; 
    }


    public function get_ventaSeparacion($date,$usuario,$idarticulo){
        $mostrar=DB::select("
select sum(vd.monto_total) as total ,v.idmoneda from ERP_VentaDetalle as vd INNER JOIN erp_venta as v on (v.idventa=vd.idventa)  where  convert(date,v.fecha_emision)='$date' and    v.idcajero='$usuario'  and v.idTipoDocumento in (03,01) and vd.idarticulo='$idarticulo' GROUP BY v.idmoneda");
        return $mostrar; 
    }

    public function get_idArtiCuota(){
        $mostrar=DB::select("select * from ERP_Parametros where id='7'");
        return $mostrar; 
    }
    public function get_idArtiAnticipo(){
        $mostrar=DB::select("select * from ERP_Parametros where id='5'");
        return $mostrar; 
    }

    public function get_idArtiSeparacin(){
        $mostrar=DB::select("select * from ERP_Parametros where id='8'");
        return $mostrar; 
    }

    public function get_ventaCompro($date,$usuario){
        $mostrar=DB::select(" select v.idmoneda ,tiket.numero_comprobante as nro_recibo,cp.id as idCondicionPago,cp.description as condicionPago , v.fecha_emision,vp.codigo_formapago,fp.descripcion_subtipo,vp.monto_pago,v.idventa,concat(v.serie_comprobante,'-',v.numero_comprobante) as serie_comprobante,v.numero_comprobante,v.idcliente,cl.razonsocial_cliente from ERP_VentaFormaPago as vp inner join erp_venta as v on vp.idventa=v.idventa inner join ERP_Clientes as cl on v.idcliente=cl.id inner join ERP_FormasPago as fp on fp.codigo_formapago=vp.codigo_formapago inner join ERP_CondicionPago as cp on cp.id=v.condicion_pago  inner join erp_venta as tiket on (tiket.idventa_comprobante=v.idventa)  where convert(date,v.fecha_emision)='$date' and v.idcajero='$usuario' ORDER BY codigo_formapago");
        return $mostrar; 
    }
    public function get_ventaCajaCompro($date,$usuario){
        $mostrar=DB::select("select * from ERP_CajaDiariaDetalle as cd inner join ERP_TiposMovimiento as tm on cd.codigoTipo=tm.codigo_tipo INNER JOIN ERP_FormasPago as fp on cd.codigoFormaPago=fp.codigo_formapago inner join ERP_CajaDiaria as c on cd.idCajaDiaria=c.idCajaDiaria where c.fechaCaja='$date' and c.idUsuario='$usuario'");
        return $mostrar; 
    }
   
    public function getCajaDetForSol($date,$usuario){
        $mostrar=DB::select("select cd.codigoFormaPago as codigoFormaPago,sum(CASE  
             WHEN cd.naturaleza='E' THEN cd.monto 
              ELSE 0 
           END)-sum(CASE  
             WHEN cd.naturaleza='S' THEN cd.monto 
              ELSE 0 
           END) as monto,fp.descripcion_subtipo as descripcion_subtipo from ERP_CajaDiariaDetalle as cd inner join ERP_TiposMovimiento as tm on cd.codigoTipo=tm.codigo_tipo INNER JOIN ERP_FormasPago as fp on cd.codigoFormaPago=fp.codigo_formapago inner join ERP_CajaDiaria as c on cd.idCajaDiaria=c.idCajaDiaria where c.fechaCaja='$date' and c.idUsuario='$usuario' and cd.idMoneda='1' /*and cd.codigoTipo='VTA'*/ GROUP BY cd.codigoFormaPago,fp.descripcion_subtipo");
        return $mostrar; 
    }
    public function getCajaDetEfeSol($date,$usuario){
        $mostrar=DB::select("select cd.codigoTipo as codigoTipo,sum(CASE  
             WHEN cd.naturaleza='E' THEN cd.monto 
              ELSE 0 
           END)-sum(CASE  
             WHEN cd.naturaleza='S' THEN cd.monto 
              ELSE 0 
           END) as monto ,tm.descripcion_tipo as descripcion_tipo from ERP_CajaDiariaDetalle as cd inner join ERP_TiposMovimiento as tm on cd.codigoTipo=tm.codigo_tipo INNER JOIN ERP_FormasPago as fp on cd.codigoFormaPago=fp.codigo_formapago inner join ERP_CajaDiaria as c on cd.idCajaDiaria=c.idCajaDiaria where c.fechaCaja='$date' and c.idUsuario='$usuario' and cd.idMoneda='1' and cd.codigoFormaPago='EFE'  GROUP BY cd.codigoTipo,tm.descripcion_tipo");
        return $mostrar; 
    }
    public function getCajaDetForDol($date,$usuario){
        $mostrar=DB::select("select cd.codigoFormaPago as codigoFormaPago,sum(CASE  
             WHEN cd.naturaleza='E' THEN cd.monto 
              ELSE 0 
           END)-sum(CASE  
             WHEN cd.naturaleza='S' THEN cd.monto 
              ELSE 0 
           END) as monto,fp.descripcion_subtipo as descripcion_subtipo from ERP_CajaDiariaDetalle as cd inner join ERP_TiposMovimiento as tm on cd.codigoTipo=tm.codigo_tipo INNER JOIN ERP_FormasPago as fp on cd.codigoFormaPago=fp.codigo_formapago inner join ERP_CajaDiaria as c on cd.idCajaDiaria=c.idCajaDiaria where c.fechaCaja='$date' and c.idUsuario='$usuario' and cd.idMoneda='2' /*and cd.codigoTipo='VTA' */GROUP BY cd.codigoFormaPago,fp.descripcion_subtipo");
        return $mostrar; 
    }
    public function getCajaDetEfeSolAper($date,$usuario){
        $mostrar=DB::select("select sum(cden.monto) as monto from ERP_CajaDiariaDenominaciones as cden inner join ERP_CajaDiaria as c on c.idCajaDiaria=cden.idCajaDiaria  INNER JOIN ERP_Denominaciones as den on cden.idDenominacion=den.id_denominacion where c.fechaCaja='$date' and c.idUsuario='$usuario' and cden.tipo='1' and den.IdMoneda='1' GROUP BY cden.Tipo ");
        return $mostrar; 
    }
    public function getCajaDetEfeDolAper($date,$usuario){
        $mostrar=DB::select("select sum(cden.monto) as monto from ERP_CajaDiariaDenominaciones as cden inner join ERP_CajaDiaria as c on c.idCajaDiaria=cden.idCajaDiaria  INNER JOIN ERP_Denominaciones as den on cden.idDenominacion=den.id_denominacion where c.fechaCaja='$date' and c.idUsuario='$usuario' and cden.tipo='1' and den.IdMoneda='2' GROUP BY cden.Tipo ");
        return $mostrar; 
    }
    public function getCajaDetEfeDol($date,$usuario){
        $mostrar=DB::select("select cd.codigoTipo as codigoTipo,sum(CASE  
             WHEN cd.naturaleza='E' THEN cd.monto 
              ELSE 0 
           END)-sum(CASE  
             WHEN cd.naturaleza='S' THEN cd.monto 
              ELSE 0 
           END) as monto,tm.descripcion_tipo as descripcion_tipo from ERP_CajaDiariaDetalle as cd inner join ERP_TiposMovimiento as tm on cd.codigoTipo=tm.codigo_tipo INNER JOIN ERP_FormasPago as fp on cd.codigoFormaPago=fp.codigo_formapago inner join ERP_CajaDiaria as c on cd.idCajaDiaria=c.idCajaDiaria where c.fechaCaja='$date' and c.idUsuario='$usuario' and cd.idMoneda='2' and cd.codigoFormaPago='EFE' GROUP BY cd.codigoTipo,tm.descripcion_tipo");
        return $mostrar; 
    }
    public function getDataTipo(){
        $mostrar=DB::select("select * from ERP_TiposMovimiento");
        return $mostrar; 
    }
    public function getDataMoneda(){
        $mostrar=DB::select("select * from ERP_Moneda");
        return $mostrar; 
    }

    public function update_totales($data) {

        $sql_update = "UPDATE ERP_CajaDiaria SET totalEfectivo = totalEfectivo + {$data["totalEfectivo"]},
        totalNoEfectivo = totalNoEfectivo + {$data["totalNoEfectivo"]},
        totalEfectivoDol = totalEfectivoDol + {$data["totalEfectivoDol"]},
        totalNoEfectivoDol = totalNoEfectivoDol + {$data["totalNoEfectivoDol"]}
        WHERE idCajaDiaria={$data["idCajaDiaria"]}";
        // die($sql_update);

        $result = DB::statement($sql_update);
        
        return $result; 
    }

    public function update_saldos_venta($data) {
        $sql_update = "UPDATE ERP_Venta SET saldo = saldo - {$data["monto_pagar_credito"]},
        pagado = pagado + {$data["monto_pagar_credito"]}       
        WHERE cCodConsecutivo_solicitud='{$data["cCodConsecutivo"]}' AND nConsecutivo_solicitud={$data["nConsecutivo"]} AND /*anticipo > 0*/ comprobante_x_saldo='S' AND IdTipoDocumento IN('01', '03', '12')";

        $result = DB::statement($sql_update);
        
        return $result; 
    }

    //  public function getDenominacionView($id)
    // {   
    //     $mostrar=DB::select("select * from ERP_CajaDiariaDenominaciones as cd INNER JOIN ERP_Denominaciones as de on cd.idDenominacion=de.id_denominacion where cd.idCajaDiaria='$id'");
    //     return $mostrar; 
    // }
    
    public function getDataConceptos() {
        $mostrar=DB::select("select * from ERP_Conceptos WHERE estado='A'");
        return $mostrar; 
    }
}