<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Proforma;
use Illuminate\Support\Facades\DB;

class ProformaRepository implements ProformaInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(Proforma $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    {
        return $this->model->get();
    }
     public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('cCodConsecutivo', 'LIKE', '%'.$s.'%')->orderByRaw('dFecCre');
            $q->orWhere('nConsecutivo', 'LIKE', '%'.$s.'%');
             $q->orWhere('cCodConsecutivoOS', 'LIKE', '%'.$s.'%');
              $q->orWhere('nConsecutivoOS', 'LIKE', '%'.$s.'%');
               $q->orWhere('iEstado', 'LIKE', '%'.$s.'%');
        })->orderBy("dFecCre", "DESC");

    }
     public function search_Entrega($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('cCodConsecutivo', 'LIKE', '%'.$s.'%')->orderByRaw('dFecCre')->where('iEstado',1)->orWhere('iEstado',3)->orWhere('iEstado',4);
            $q->orWhere('nConsecutivo', 'LIKE', '%'.$s.'%')->where('iEstado',1)->orWhere('iEstado',3)->orWhere('iEstado',4);
            $q->orWhere('cPlacaVeh', 'LIKE', '%'.$s.'%')->where('iEstado',1)->orWhere('iEstado',3)->orWhere('iEstado',4);
            $q->orWhere('idCliente', 'LIKE', '%'.$s.'%')->where('iEstado',1)->orWhere('iEstado',3)->orWhere('iEstado',4);
            $q->orWhere('dFechaRegistro', 'LIKE', '%'.$s.'%')->where('iEstado',1)->orWhere('iEstado',3)->orWhere('iEstado',4);
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
        $model->update($attributes);
        $model->delete();
     
    }
    public function destroy_proforma_servicio($id,$no,$mant)
    {
         $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC ST_EliminaProformaMO '$id','$no','$mant'");
         return $destroy;
    }
    public function destroy_proforma_repuesto($id,$no,$mant)
    {
         $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC ST_EliminaProformaDetalle '$id','$no','$mant'");
         return $destroy;
    }
     public function cambiar_estado($id,$no,$estado,$usuario)
    {
         $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC ST_ActualizaEstadoProforma '$id','$no','$estado','$usuario'");
         return $destroy;
    }
     public function find_proforma($conse,$nro)
    {
        $mostrar3=DB::select("SELECT prof.nIdDscto as nIdDsctoPr, des.nPorcDescuento as porDes , des.nMonto as montoDes, prof.nEstimadoHoras as nEstimadoHoras,prof.idAsesor as idAsesorProforma, prof.cCodConsecutivo as cCodConsecutivo,prof.nConsecutivo as nConsecutivo,prof.dFechaRegistro as dFechaRegistro,prof.nTotalMO as nTotalMO,prof.nTotalDetalle as nTotalDetalle,prof.nSubTotal as nSubTotal,prof.nTotal as nTotal,prof.nImpuesto as nImpuesto,prof.iEstado as iEstado,os.iEstado as est ,os.idCliente as idCliente,os.cPlacaVeh as cPlacaVeh, os.cMotor as cMotor,os.nKilometraje as nKilometraje, os.cColor as cColor,  cl.id_tipocli as idTipoCliente,cl.documento as documento,cl.razonsocial_cliente as razonsocial_cliente, os.cCodConsecutivo as cCodConsecutivoOS, os.nConsecutivo as nConsecutivoOS, os.IdMoneda as IdMoneda,mo.Descripcion as moneda,os.idcCondicionPago as idcCondicionPago,cp.description as condicionPago,os.idAsesor as idAsesor,ase.descripcion as asesor FROM ERP_OrdenServicio as os inner join ERP_Moneda as mo on os.IdMoneda=mo.IdMoneda inner join ERP_CondicionPago as cp on cp.id=os.idcCondicionPago INNER JOIN ERP_Clientes as cl on cl.id=os.idCliente INNER JOIN ERP_TipoCliente as tc on tc.id=cl.id_tipocli inner join ERP_Proforma as prof on prof.cCodConsecutivoOS=os.cCodConsecutivo  inner join ERP_Asesores as ase on ase.id=os.idAsesor  left join ERP_Descuentos as des on des.id=prof.nIdDscto  where prof.nConsecutivoOS=os.nConsecutivo and prof.cCodConsecutivo='$conse' AND prof.nConsecutivo='$nro'");
          return $mostrar3;
    }
   
    public function find_proforma_repuestos($conse,$nro)
    { 
      $mostrar3=DB::select("select des.nPorcDescuento as porDes, des.nMonto as montoDes, od.id_tipototal as totaltipo,tit.descripcion as descripcioText, pr.id as idProducto, od.id as idDetalleRepues,* from ERP_ProformaDetalle as od inner join ERP_Productos as pr on pr.id=od.idProducto inner join ERP_TipoTotalOS as tit on tit.id=od.id_tipototal left join ERP_Descuentos as des on des.id=od.nIdDscto where od.cCodConsecutivo='$conse' and od.nConsecutivo='$nro'");
      return $mostrar3;

    } 
    public function find_proforma_servicios($conse,$nro)
    { 
      $mostrar3=DB::select("select des.nPorcDescuento as porDes, des.nMonto as montoDes,od.id_tipototal as totaltipo,tit.descripcion as descripcioText, pr.id as idProducto, od.id as idDetalleServicio,* from ERP_ProformaMO as od inner join ERP_Productos as pr on pr.id=od.idProducto inner join ERP_TipoTotalOS as tit on tit.id=od.id_tipototal left join ERP_Descuentos as des on des.id=od.nIdDscto  where od.cCodConsecutivo='$conse' and od.nConsecutivo='$nro'");
      return $mostrar3;

    }
    public function actualizar_proforma(
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
                $totalmo,
                $totaldetalle,
                $subtotal,
                $impuesto,
                $total,
                $nDescuento,
                $nPorcDescuento,
                $nIdDscto,
                $nOperGratuita,
                $modo,
                $usuario){

                  if($totaldetalle == "") {
                        $totaldetalle = "0";
                  }
         $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC ST_ActualizaProforma 
                '$cCod',
                '$nCons',
                '$cCodOS',
                '$nConsOS',
                '$cMoneda',
                '$nidCliente',
                '$nidAsesor',
                '$cPlacaVeh',
                '$dFecRec',
                '$nEstimado',
                '$totalmo',
                '$totaldetalle',
                '$subtotal',
                '$impuesto',
                '$total',
                '$nDescuento',
                '$nPorcDescuento',
                '$nIdDscto',
                '$nOperGratuita',
                '$modo',
                '$usuario'");
         return $destroy;
    }
    public function actualizar_Proforma_detalle(
                $cCod,$ncon,$cont,$id_repuesto_array,$id_repuesto_cantidad,$id_repuesto_precio,$total,$id_repuesto_impuesto,$id_repuesto_tipoTotal,$montoRepu,$porRepu,$idDescuenRepues,$staOperacionRepu,$operacionGraRep,$modo_array_repuesto,$usuario){
         $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC ST_ActualizaProformaDetalle 
                '$cCod','$ncon','$cont','$id_repuesto_array','$id_repuesto_cantidad','$id_repuesto_precio','$total','$id_repuesto_impuesto','$id_repuesto_tipoTotal','$montoRepu','$porRepu','$idDescuenRepues','$staOperacionRepu','$operacionGraRep','$modo_array_repuesto','$usuario'");
         // return $destroy;
    }
   public function actualizar_Proforma_MO($cCodConsecutivo,$res,$idDetalleGrup,$id_revision_array,$totald,$impuesto_servicio,$id_tipo_array,$montoDeta,$porDeta,$cantidDeta,$precio_array,$idDescuenDeta,$staOperacion,$totalO,$modo_array_serv,$usuario){
         $pdo=DB::connection()->getPdo();
         $destroy=DB::update("SET NOCOUNT ON; EXEC ST_ActualizaProformaMO 
                '$cCodConsecutivo','$res','$idDetalleGrup','$id_revision_array','$totald','$impuesto_servicio','$id_tipo_array','$montoDeta','$porDeta','$cantidDeta','$precio_array','$idDescuenDeta','$staOperacion','$totalO','$modo_array_serv','$usuario'"
          );
       } 
     public function destroy_Proforma_detalleSer($id,$no,$deta)
    {
         $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC ST_EliminaProformaMO '$id','$no','$deta'");
         return $destroy;
    }
     public function destroy_Proforma($id,$no)
    {
         $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC ST_EliminaProforma '$id','$no'");
         return $destroy;
    }
     public function destroy_Proforma_detalleRepuesto($id,$no,$deta)
    {
         $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC ST_EliminaProformaDetalle '$id','$no','$deta'");
         return $destroy;
    }
      public function getTotal_Orden(){
   
          $mostrar3=DB::select("  SELECT os.iEstado as est ,os.idCliente as idCliente,os.cPlacaVeh as cPlacaVeh, 
         os.cMotor as cMotor,os.nKilometraje as nKilometraje, os.cColor as cColor,  cl.id_tipocli as idTipoCliente,
         cl.documento as documento,cl.razonsocial_cliente as razonsocial_cliente, os.cCodConsecutivo as cCodConsecutivo,
         os.nConsecutivo as nConsecutivo, os.IdMoneda as IdMoneda,mo.Descripcion as moneda,
         os.idcCondicionPago as idcCondicionPago,cp.description as condicionPago,os.idAsesor as idAsesor,
         ase.descripcion as asesor FROM ERP_OrdenServicio as os inner join ERP_Moneda as mo on os.IdMoneda=mo.IdMoneda 
             inner join ERP_CondicionPago as cp on cp.id=os.idcCondicionPago 
             INNER JOIN ERP_Clientes as cl on cl.id=os.idCliente INNER JOIN ERP_TipoCliente as tc on tc.id=cl.id_tipocli 
             left join ERP_Asesores as ase on ase.id=os.idAsesor ");
          return $mostrar3;
    }
    public function getTotal_Orden_total(){
   
          $mostrar3=DB::select("  SELECT os.iEstado as est ,os.idCliente as idCliente,os.cPlacaVeh as cPlacaVeh, 
         os.cMotor as cMotor,os.nKilometraje as nKilometraje, os.cColor as cColor,  cl.id_tipocli as idTipoCliente,
         cl.documento as documento,cl.razonsocial_cliente as razonsocial_cliente, os.cCodConsecutivo as cCodConsecutivo, 
         os.nConsecutivo as nConsecutivo, os.IdMoneda as IdMoneda,mo.Descripcion as moneda,os.idcCondicionPago as idcCondicionPago,
         cp.description as condicionPago,os.idAsesor as idAsesor,ase.descripcion as asesor FROM ERP_OrdenServicio as os inner join ERP_Moneda as mo on os.IdMoneda=mo.IdMoneda inner join ERP_CondicionPago as cp on cp.id=os.idcCondicionPago INNER JOIN ERP_Clientes as cl on cl.id=os.idCliente INNER JOIN ERP_TipoCliente as tc on tc.id=cl.id_tipocli left join ERP_Asesores as ase on ase.id=os.idAsesor");
          return $mostrar3;
    }
    public function getTotal_Orden_total_calidad(){
   
          $mostrar3=DB::select("  SELECT os.iEstado as est ,os.idCliente as idCliente,os.cPlacaVeh as cPlacaVeh, os.cMotor as cMotor,os.nKilometraje as nKilometraje, os.cColor as cColor,  cl.id_tipocli as idTipoCliente,cl.documento as documento,cl.razonsocial_cliente as razonsocial_cliente, os.cCodConsecutivo as cCodConsecutivo, os.nConsecutivo as nConsecutivo, os.IdMoneda as IdMoneda,mo.Descripcion as moneda,os.idcCondicionPago as idcCondicionPago,cp.description as condicionPago,os.idAsesor as idAsesor,ase.descripcion as asesor FROM ERP_OrdenServicio as os inner join ERP_Moneda as mo on os.IdMoneda=mo.IdMoneda inner join ERP_CondicionPago as cp on cp.id=os.idcCondicionPago INNER JOIN ERP_Clientes as cl on cl.id=os.idCliente INNER JOIN ERP_TipoCliente as tc on tc.id=cl.id_tipocli left join ERP_Asesores as ase on ase.id=os.idAsesor where os.iEstado='2'");
          return $mostrar3;
    }
    public function getDataGeneralServicio(){
   
          $mostrar3=DB::select("select * from ERP_Parametros where id='18'");
          return $mostrar3;
    }
    public function get_proformas_entrega(){
   
          $mostrar3=DB::select("  
                SELECT os.iEstado as est ,os.idCliente as idCliente,os.cPlacaVeh as cPlacaVeh,  cl.id_tipocli as idTipoCliente,cl.documento as documento,cl.razonsocial_cliente as razonsocial_cliente, os.cCodConsecutivo as cCodConsecutivo, os.nConsecutivo as nConsecutivo, os.IdMoneda as IdMoneda,mo.Descripcion as moneda,os.idAsesor as idAsesor FROM ERP_Proforma as os inner join ERP_Moneda as mo on os.IdMoneda=mo.IdMoneda  INNER JOIN ERP_Clientes as cl on cl.id=os.idCliente where os.cfacturado ='N'");
          return $mostrar3;
           // and (os.iEstado='1' or os.iEstado='3')"
    }
    public function get_proformas_devolucion(){
   
          $mostrar3=DB::select("  
                SELECT os.iEstado as est ,os.idCliente as idCliente,os.cPlacaVeh as cPlacaVeh,  cl.id_tipocli as idTipoCliente,cl.documento as documento,cl.razonsocial_cliente as razonsocial_cliente, os.cCodConsecutivo as cCodConsecutivo, os.nConsecutivo as nConsecutivo, os.IdMoneda as IdMoneda,mo.Descripcion as moneda,os.idAsesor as idAsesor FROM ERP_Proforma as os inner join ERP_Moneda as mo on os.IdMoneda=mo.IdMoneda  INNER JOIN ERP_Clientes as cl on cl.id=os.idCliente where os.cfacturado ='N' and (os.iEstado='2' or os.iEstado='3')");
          return $mostrar3;
    }
     public function get_detalle_entrada($conse,$nro){ 
   
          $mostrar3=DB::select("select pr.costo as costo2,pr.costo as costo_total,pr.id as idProducto, od.id as idDetalleRepues,* from ERP_ProformaDetalle as od inner join ERP_Productos as pr on pr.id=od.idProducto  where   pr.type_id ='1' and od.nCantidadPendienteEntregar >0 and od.cCodConsecutivo='$conse' and od.nConsecutivo='$nro'
");
          return $mostrar3;
    }
     public function get_detalle_entrada_Devolucion($conse,$nro){ 
   
          $mostrar3=DB::select("select pr.costo as costo2,pr.costo as costo_total,pr.id as idProducto, od.id as idDetalleRepues,* from ERP_ProformaDetalle as od inner join ERP_Productos as pr on pr.id=od.idProducto  where   pr.type_id ='1'  and od.cCodConsecutivo='$conse' and od.nConsecutivo='$nro'
");
          return $mostrar3;
    }
    
     public function get_repuestos_consecutivo($conse){
   
          $mostrar3=DB::select("select SUM(als.disponible) AS stock,lipr.IdMoneda as IdMoneda,lipr.id_tpocli as id_tpocli ,pr.id as idProducto,pr.description as description,lip.nPrecio as nPrecio,pr.impuesto as impuesto,pr.code_article as code_article  from ERP_Consecutivos as con inner join ERP_Tienda as ti  on con.nCodTienda=ti.idTienda INNER JOIN ERP_Almacen as al on al.idTienda=ti.idTienda  INNER JOIN ERP_almacen_stock AS als on als.idAlmacen=al.id INNER JOIN ERP_Productos as pr on pr.id=als.idArticulo INNER JOIN ERP_ListaPreciosDetalle AS lip on lip.idProducto=pr.id inner join ERP_ListaPrecios as lipr on lipr.id=lip.id_lista where con.cCodConsecutivo='$conse' and als.disponible >0 GROUP BY pr.id, pr.description,lip.nPrecio, pr.impuesto,pr.code_article,lipr.IdMoneda,lipr.id_tpocli");
          return $mostrar3;
    }
    public function get_repuestos_consecutivo2($conse){
   
          $mostrar3=DB::select("select SUM(als.disponible) AS stock,pr.id as idProducto,pr.description as description,pr.impuesto as impuesto,pr.code_article as code_article  from ERP_Consecutivos as con inner join ERP_Tienda as ti  on con.nCodTienda=ti.idTienda INNER JOIN ERP_Almacen as al on al.idTienda=ti.idTienda  INNER JOIN ERP_almacen_stock AS als on als.idAlmacen=al.id INNER JOIN ERP_Productos as pr on pr.id=als.idArticulo  where con.cCodConsecutivo='$conse' and als.disponible >0 and pr.state='1' GROUP BY pr.id, pr.description, pr.impuesto,pr.code_article");
          return $mostrar3;
    }
    

    public function get_igv(){
          $mostrar3=DB::select(" 
                    select * from ERP_Parametros");
          return $mostrar3;
    }

}