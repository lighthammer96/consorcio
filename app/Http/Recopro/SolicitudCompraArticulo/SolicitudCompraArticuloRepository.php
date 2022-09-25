<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\SolicitudCompraArticulo;
use Illuminate\Support\Facades\DB;

class SolicitudCompraArticuloRepository implements SolicitudCompraArticuloInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(SolicitudCompraArticulo $model)
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
            $q->where('descripcion', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('estado', 'LIKE', '%'.$s.'%');
        });

    }
    public function allActive()
    {
       return $this->model->where('estado', self::$_ACTIVE)->get();
    }
    public function getDetalleArticulosSolicitud($id)
    {
        $mostrar=DB::select("select * from ERP_SolicitudCompra_Articulo where idMovimiento='$id'");
        return $mostrar; 
    }
     public function getidSolicitud($id)
    {
        $mostrar=DB::select("select sca.idMovimiento from  ERP_OrdenCompraArticulo as oca inner join ERP_SolicitudCompra_Articulo as sca on sca.consecutivo=oca.codSolicitud where oca.idOrden='$id' 
");
        return $mostrar; 
    }
     public function update_estado($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $this->model->where('consecutivo',$id)->update($attributes);
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
     public function update_estadoSolicitudCompra($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        DB::table('ERP_SolicitudCompra')->where('idMovimiento',$id)->update($attributes);
        
    }

    public function destroy($id)
    {
        $attributes = [];
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
     
    }
    public function delete_articulo_detalle($id)
    {
        $mostrar=DB::table('ERP_SolicitudCompra_Detalle')->where('idMovimiento', $id)->delete();
     
    }
    public function delete_detalle($id){
        $mostrar=DB::table('ERP_SolicitudCompra_Articulo')->where('idMovimiento', $id)->delete();
    }
    public function traerTipo($idArticulo){
         $mostrar=DB::select("select serie from ERP_Productos where id='$idArticulo'");
         return $mostrar;

    }


}