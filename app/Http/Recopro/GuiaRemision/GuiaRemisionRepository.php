<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\GuiaRemision;
use Illuminate\Support\Facades\DB;

class GuiaRemisionRepository implements GuiaRemisionInterface
{
    protected $model;
    private static $_ACTIVE = 1;
    public function __construct(GuiaRemision $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    {
        return $this->model->get();
    }
      public function all_entrega_servicio()
    {
        return $this->model->get()->where('naturaleza','R');
    }
     public function all_devolucion_servicio()
    {
        return $this->model->get()->where('naturaleza','D');
    }
     public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('cCodConsecutivo', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
        });

    }
    public function searchMovCierre($s,$perido_busquedad)

    {   
        $anio='';
        $mes='';
        if($perido_busquedad){
            $valtodo=explode("-", $perido_busquedad);
            $anio=$valtodo[0];
            if(!isset($valtodo[1])){
              $anio='';  
              $mes='';  
            }else{
                $mes=$valtodo[1]; 
            }
            
        }
        return $this->model->where(function($q) use ($s,$anio,$mes){
            $q->where('idMovimiento', 'LIKE', '%'.$s.'%')->whereYear('fecha_registro',$anio)->whereMonth('fecha_registro',$mes)->orderByRaw('created_at DESC');
            $q->orWhere('idUsuario', 'LIKE', '%'.$s.'%')->whereYear('fecha_registro',$anio)->whereMonth('fecha_registro',$mes);
            $q->orWhere('estado', 'LIKE', '%'.$s.'%')->whereYear('fecha_registro',$anio)->whereMonth('fecha_registro',$mes);
            $q->orWhere('idTipoOperacion', 'LIKE', '%'.$s.'%')->whereYear('fecha_registro',$anio)->whereMonth('fecha_registro',$mes);
        });

    }
     
     
    
    public function getseriesGuia($idUsuario){
         $mostrar=DB::select("select * from ERP_ConsecutivosComprobantes as cc inner join ERP_ConsecutivoComprobanteUsuario as ccu on (ccu.idConsecutivo=cc.id_consecutivo) where ccu.idUsuario='$idUsuario' and cc.IdTipoDocumento='09'");
         return $mostrar; 
    }
    public function getTipoTraslado(){
         $mostrar=DB::select("SELECT * FROM ERP_TipoTraslado where estado='A'");
         return $mostrar; 
    }

    public function allActive()
    {
       return $this->model->where('estado', self::$_ACTIVE)->get();
    }
     public function delete_detalle($conse,$nConsecutivo)
    {
        $mostrar=DB::delete("DELETE FROM ERP_GuiaRemisionDetalle where cCodConsecutivo='$conse'and nConsecutivo='$nConsecutivo'");
         return $mostrar; 
    }
      public function destroy_guiaRemisionProduDetalle($conse,$nConsecutivo,$consecutivo)
    {
        $mostrar=DB::delete("DELETE FROM ERP_GuiaRemisionDetalle where cCodConsecutivo='$conse'and nConsecutivo='$nConsecutivo' and consecutivo=$consecutivo");

        $mostrar2=DB::delete("DELETE FROM ERP_GuiaRemisionProducto where cCodConsecutivo='$conse'and nConsecutivo='$nConsecutivo' and consecutivo=$consecutivo");

         return $mostrar; 
    }
    public function get_anularRemision($conse,$nConsecutivo)
    {
        $mostrar=DB::update("update ERP_GuiaRemision SET estado='2' where cCodConsecutivo='$conse'and nConsecutivo='$nConsecutivo'");
         return $mostrar; 
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
    public function update($ida,$idb ,array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
           $model =  $this->model ; 
        $model->where('cCodConsecutivo',$ida)->where('nConsecutivo',$idb)->update($attributes);
    }
     public function get_guiaRemision_articulo($id,$idb){
        $mostrar=DB::select("select pr.description,rm.cCodConsecutivo as cCodConsecutivo, rm.nConsecutivo,rm.consecutivo,rm.idarticulo,rm.cantidad ,*from ERP_GuiaRemisionProducto AS rm  inner join ERP_Productos as pr on rm.idarticulo=pr.id where rm.cCodConsecutivo='$id' and  rm.nConsecutivo='$idb'");
        return $mostrar; 
    }
    public function getOperationFind(){
        $mostrar=DB::select("select * from ERP_TipoOperacion");
        return $mostrar;
    }
     public function get_movement_articulo_entrega($id){
        $mostrar=DB::select("select  pr.type_id as type_id,pr.serie as serie,pr.lote as lote,pr.kit as kit,pd.nCantidadPendienteDevolver as nCantidadPendienteDevolver, pd.nCantidadPendienteEntregar as nCantidadPendienteEntregar ,mov.cCodConsecutivo as cCodConsecutivo, mov.nConsecutivo as nConsecutivo ,lot.Lote  as cod_lote,Mo.costo as costo2,Mo.idArticulo as idArticulo,Mo.idAlmacen as idAlmacen,Mo.idLocalizacion as idLocalizacion,Mo.idLote as idLote,Mo.cantidad as cantidad, Mo.costo as costo, Mo.costo_total as costo_total,Mo.consecutivo  as consecutivo,Mo.precio  as precio,Mo.precio_total  as precio_total,pr.description as description  from 
ERP_Movimiento_Articulo as Mo inner join ERP_Productos as pr on mo.idArticulo=pr.id LEFT JOIN ERP_Lote as lot on lot.idLote=Mo.idLote inner join ERP_Movimiento as mov on mov.idMovimiento=Mo.idMovimiento LEFT JOIN  ERP_ProformaDetalle as pd on pd.nConsecutivo=Mo.consecutivo where Mo.idMovimiento='$id'");
        return $mostrar; 
    }
    public function get_movimiento_Articulo_entrega_venta($id){
        $mostrar=DB::select("select  pr.type_id as type_id,pr.serie as serie,pr.lote as lote,pr.kit as kit,pd.nCantidadPendienteDevolver as nCantidadPendienteDevolver, pd.nCantidadPendienteEntregar as nCantidadPendienteEntregar ,mov.cCodConsecutivo as cCodConsecutivo, mov.nConsecutivo as nConsecutivo ,lot.Lote  as cod_lote,Mo.costo as costo2,Mo.idArticulo as idArticulo,Mo.idAlmacen as idAlmacen,Mo.idLocalizacion as idLocalizacion,Mo.idLote as idLote,Mo.cantidad as cantidad, Mo.costo as costo, Mo.costo_total as costo_total,Mo.consecutivo  as consecutivo,Mo.precio  as precio,Mo.precio_total  as precio_total,pr.description as description  from 
ERP_Movimiento_Articulo as Mo inner join ERP_Productos as pr on mo.idArticulo=pr.id LEFT JOIN ERP_Lote as lot on lot.idLote=Mo.idLote inner join ERP_Movimiento as mov on mov.idMovimiento=Mo.idMovimiento LEFT JOIN  ERP_ProformaDetalle as pd on pd.nConsecutivo=Mo.consecutivo where Mo.idMovimiento='$id'");
        return $mostrar; 
    }
    public function procesarTransferencia($id)
    {
      
        $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC AL_Registra_Movimiento '$id'");
         return $destroy;
    }
    public function getProductoFactura($codigo)
    {
      
         $mostrar=DB::select("select * from ERP_Productos where code_article='$codigo'");
         return $mostrar; 
    }
    public function destroy($id)
    {
      
        $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC AL_Elimina_Movimiento '$id'");
         return $destroy;
    }
     public function find($id)
    {
        return $this->model->find($id);
    }
     public function get_movimiento($id)
    {
        $mostrar=DB::select("select * from ERP_Movimiento as er inner join ERP_TipoOperacion as ti on er.idTipoOperacion=ti.idTipoOperacion where er.idMovimiento='$id'");
         return $mostrar; 
    }
     public function get_movement_articulo_print($id)
    {
        $mostrar=DB::select("SELECT ma.cantidad as cantidad, ma.consecutivo as consecutivo,pr.description as producto,al.description as almacen,lo.descripcion as localizacion,lot.Lote as lote,un.Abreviatura as unidad FROM ERP_Movimiento_Articulo as ma left JOIN ERP_Almacen  as al on al.id=ma.idAlmacen LEFT join ERP_Localizacion as lo on lo.idLocalizacion=ma.idLocalizacion inner join ERP_Productos as pr on pr.id=ma.idArticulo INNER JOIN ERP_UnidadMedida as un on pr.um_id=un.IdUnidadMedida LEFT JOIN ERP_Lote as lot  on lot.idLote=ma.idLote where ma.idMovimiento='$id'");
         return $mostrar; 
    }
    
    public function get_guiaRemision($cCodConsecutivo, $nConsecutivo)
    {

        $sql = "SELECT *,tt.descripcion as traslado , FORMAT(g.fechaEmision, 'yyyy-MM-dd') AS fechaEmision, FORMAT(g.fechaInicioTraslado, 'yyyy-MM-dd') AS fechaInicioTraslado from ERP_GuiaRemision as g inner join ERP_TipoTraslado as tt on (tt.id=g.idtraslado) WHERE g.cCodConsecutivo='{$cCodConsecutivo}' AND g.nConsecutivo={$nConsecutivo}";
        $result = DB::select($sql);
        return $result;
    }
    public function get_guiaArticuloNoser($cCodConsecutivo, $nConsecutivo)
    {

        $sql = "select pr.code_article,pr.description as producto,gp.cantidad,un.descripcion as unidadMedida from ERP_GuiaRemisionProducto as gp inner join ERP_Productos as pr on (pr.id =gp.idarticulo) inner join ERP_UnidadMedida as un on(un.IdUnidadMedida=pr.um_id) WHERE gp.cCodConsecutivo='$cCodConsecutivo' and gp.nConsecutivo='$nConsecutivo' and pr.serie=0";
        $result = DB::select($sql);
        return $result;
    }
     public function get_guiaArticuloser($cCodConsecutivo, $nConsecutivo)
    {

        $sql = "select pr.code_article,concat(pr.description,', Marca: ',mar.description,', Modelo: ',mod.descripcion, ', Color: ',se.color,', Chasis: ',se.chasis,',Motor: ',se.motor) as producto,gp.cantidad,un.descripcion as unidadMedida from ERP_GuiaRemisionProducto as gp inner join ERP_Productos as pr on (pr.id =gp.idarticulo) inner join ERP_GuiaRemisionDetalle as gd on (gp.cCodConsecutivo=gd.cCodConsecutivo and gp.nConsecutivo=gd.nConsecutivo and gd.consecutivo=gp.consecutivo) inner join ERP_UnidadMedida as un on(un.IdUnidadMedida=pr.um_id) left join ERP_Modelo as mod on(mod.idModelo=pr.idModelo) left join ERP_Marcas as mar on(mar.id=pr.idMarca) inner join ERP_Serie as se on (se.idSerie=gd.idSerie)  WHERE gp.cCodConsecutivo='$cCodConsecutivo' and gp.nConsecutivo='$nConsecutivo' and pr.serie=1";
        $result = DB::select($sql);
        return $result;
    }
     
    public function get_guia_Lote($cCodConsecutivo, $nConsecutivo){
         $mostrar=DB::select("select * from ERP_GuiaRemisionProducto as mo inner join ERP_Lote as l on mo.idLote=l.idLote WHERE mo.cCodConsecutivo='{$cCodConsecutivo}' AND mo.nConsecutivo={$nConsecutivo} ");
         return $mostrar; 
    }

     public function get_guia_Serie($cCodConsecutivo, $nConsecutivo)
    {

        $sql = "select md.consecutivo as identificador,ma.cantidad as cantiTotal,* from ERP_GuiaRemisionDetalle as md inner join ERP_Serie as s on md.idSerie=s.idserie  inner join ERP_GuiaRemisionProducto as ma on ma.consecutivo=md.consecutivo WHERE md.cCodConsecutivo='{$cCodConsecutivo}' AND md.nConsecutivo={$nConsecutivo}";
        $result = DB::select($sql);
        return $result;
    }


    public function getStockLoc($idl,$idArl){
         $mostrar=DB::select("select total from ERP_almacen_stock_localizacion where idArticulo=$idArl and idLocalizacion=$idl");
         return $mostrar; 
    }
    public function getLocaStock($idAlmacen){
         $mostrar=DB::select("select los.remitido as remitido,lo.idLocalizacion,lo.descripcion,los.idArticulo, los.total from ERP_Localizacion as lo LEFT JOIN ERP_almacen_stock_localizacion as los on lo.idLocalizacion=los.idLocalizacion where lo.idALmacen=$idAlmacen");
         return $mostrar;
    }
     public function getLocalizacioAlmacen($idAlmacen){
         $mostrar=DB::select("SELECT * FROM ERP_Localizacion where idAlmacen='$idAlmacen' AND estado='A'");
         return $mostrar;
    }
    public function getDetalle($idMovimiento){
         $mostrar=DB::select("select * from ERP_Movimiento_Articulo where idMovimiento=$idMovimiento");
         return $mostrar;
    }

}