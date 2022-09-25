<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\ConfigJerarquiaCompraDetalle;
use Illuminate\Support\Facades\DB;

class ConfigJerarquiaCompraDetalleRepository implements ConfigJerarquiaCompraDetalleInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(ConfigJerarquiaCompraDetalle $model)
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
            $q->where('nIdAprob', 'LIKE', '%'.$s.'%')->orderByRaw('dFecCre DESC');
           
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
     public function getTienda()
    {   
        $mostrar=DB::select("select * from ERP_Tienda where estado='A'");
        return $mostrar; 
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
    public function update($id,$idUsuario,array $attributes)
    {
        $attributes['cIdUsuMod'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->where('nIdAprob', $id)->where('nIdUsuario', $idUsuario)->update($attributes);
        
       
    }
    public function destroy($id)
    {
        $attributes = [];
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
     
    }

}