<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\List_precio_detalle;
use Illuminate\Support\Facades\DB;

class List_precio_detalleRepository implements List_precio_detalleInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(List_precio_detalle $model)
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
     public function create(array $attributes)
    {
        $attributes['cIdUsuCre'] = auth()->id();
        $attributes['cIdUsuMod'] = auth()->id();
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
   public function update($ida,$idb, array $attributes)
    {
      $this->model->where('id_lista', $ida)->where('idProducto', $idb)->update($attributes);
    }
    public function destroy_detalle($id_lista,$idProducto)
    {
        $this->model->where('id_lista',$id_lista)->where('idProducto',$idProducto)->delete();
    }

}