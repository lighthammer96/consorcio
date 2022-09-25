<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\ConfigJerarquiaCompra;
use Illuminate\Support\Facades\DB;

class ConfigJerarquiaCompraRepository implements ConfigJerarquiaCompraInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(ConfigJerarquiaCompra $model)
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
     public function find($id)
    {
        return $this->model->find($id);
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
     public function getMoneda()
    {   
        $mostrar=DB::select("select * from ERP_Moneda where estado='A'");
        return $mostrar; 
    }
     public function getArea()
    {   
        $mostrar=DB::select("select * from erp_area where estado='A'");
        return $mostrar; 
    }
     public function getTienda()
    {   
        $mostrar=DB::select("select * from ERP_Tienda where estado='A'");
        return $mostrar; 
    }
    public function getDetalle($id)
    {   
        $mostrar=DB::select("select * from ERP_AprobacionCompraDetalle as de inner join ERP_Usuarios as us on us.id=de.nIdUsuario where de.nIdAprob='$id'");
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
        DB::table('ERP_AprobacionCompraDetalle')->where('nIdAprob',$id)->delete();
        $model->update($attributes);
        $model->delete();
     
    }
     public function destroy_jerarquiaDetalle($id,$usua)
    {
       
        DB::table('ERP_AprobacionCompraDetalle')->where('nIdAprob',$id)->where('nIdUsuario',$usua)->delete();
    }

}