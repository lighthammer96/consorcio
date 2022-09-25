<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Register_transfer;
use Illuminate\Support\Facades\DB;

class Register_transferRepository implements Register_transferInterface
{
    protected $model;
    private static $_ACTIVE = 1;
    public function __construct(Register_transfer $model)
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
            $q->where('idTransferencia', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('tipoTransferencia', 'LIKE', '%'.$s.'%');
            $q->orWhere('estado', 'LIKE', '%'.$s.'%');
        })->orderBy("created_at", "DESC");

    }
    public function get_movemen_lote($id){
         $mostrar=DB::select("select * from ERP_TransferenciaProducto as mo inner join ERP_Lote as l on mo.idlote=l.idLote where mo.idTransferencia='$id'");
         return $mostrar; 
    }
    public function get_movemen_Serie($id){
        $mostrar=DB::select("
select md.consecutivo as identificador,ma.cantidad as cantiTotal,* from ERP_Transferencia_Detalle as md inner join ERP_Serie as s on md.idSerie=s.idserie  inner join ERP_TransferenciaProducto as ma on ma.consecutivo=md.consecutivo where md.idTransferencia='$id'");
         return $mostrar; 
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
     public function get_movement_articulo($id){
        $mostrar=DB::select("select tr.costo as costo2,* from ERP_TransferenciaProducto as tr inner join ERP_Productos as pr on tr.idArticulo=pr.id where tr.idTransferencia='$id'");
        return $mostrar; 
    }
     public function get_movement_articulo_print($id){
        $mostrar=DB::select("
            select tr.consecutivo as consecutivo,pr.description as producto , l.Lote as lote,ao.description as almacenOrigen,lo.descripcion as localizacionOrigen,ad.description as almacenDestino,ld.descripcion as localizacionDestino,tr.cantidad as cantidad, un.Abreviatura as unidad from ERP_TransferenciaProducto as tr inner join ERP_Productos as pr on tr.idArticulo=pr.id inner join ERP_UnidadMedida as un on pr.um_id=un.IdUnidadMedida inner join ERP_Almacen as ao ON ao.id=tr.idAlmacenOrigen inner join ERP_Localizacion as lo on lo.idLocalizacion=tr.idLocalizacionOrigen inner join ERP_Almacen as ad ON ad.id=tr.idAlmacenDestino inner join ERP_Localizacion as ld on ld.idLocalizacion=tr.idLocalizacionDestino left JOIN ERP_Lote as l on l.idLote=tr.idlote where tr.idTransferencia='$id'");
        return $mostrar; 
    }

    public function destroy($id)
    {
      
        $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC AL_Elimina_Transferencia '$id'");
         return $destroy;
    }
    public function procesarTransferencia($id)
    {
      
        $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC AL_Registra_Transferencia '$id'");
         return $destroy;
    }
     public function find($id)
    {
        return $this->model->find($id);
    }
    public function getStockLoc($idl,$idArl){
         $mostrar=DB::select("select total from ERP_almacen_stock_localizacion where idArticulo=$idArl and idLocalizacion=$idl");
         return $mostrar;
    }
    public function getLocaStock($idAlmacen){
         $mostrar=DB::select("select lo.idLocalizacion,lo.descripcion,los.idArticulo, los.total from ERP_Localizacion as lo LEFT JOIN ERP_almacen_stock_localizacion as los on lo.idLocalizacion=los.idLocalizacion where lo.idALmacen=$idAlmacen");
         return $mostrar;
    }
    public function getLocalizacioAlmacen($idAlmacen){
         $mostrar=DB::select("SELECT * FROM ERP_Localizacion where idAlmacen='$idAlmacen' AND estado='A'");
         return $mostrar;
    }
    public function getDetalle($idTransferencia){
         $mostrar=DB::select("select * from ERP_TransferenciaProducto where idTransferencia=$idTransferencia");
         return $mostrar;
    }

}