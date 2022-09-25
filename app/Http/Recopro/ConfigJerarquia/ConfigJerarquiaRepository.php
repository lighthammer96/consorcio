<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\ConfigJerarquia;
use Illuminate\Support\Facades\DB;

class ConfigJerarquiaRepository implements ConfigJerarquiaInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(ConfigJerarquia $model)
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
     public function getTienda()
    {   
        $mostrar=DB::select("select * from ERP_Tienda where estado='A'");
        return $mostrar; 
    }
    public function getDetalle($id)
    {   
        $mostrar=DB::select("select * from ERP_ConfiguraAprobCreDet as de inner join ERP_Usuarios as us on us.id=de.nIdUsuario where de.nIdAprob='$id'");
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
        DB::table('ERP_ConfiguraAprobCreDet')->where('nIdAprob',$id)->delete();
        $model->update($attributes);
        $model->delete();
     
    }
     public function destroy_jerarquiaDetalle($id,$usua)
    {
       
        DB::table('ERP_ConfiguraAprobCreDet')->where('nIdAprob',$id)->where('nIdUsuario',$usua)->delete();
    }

}