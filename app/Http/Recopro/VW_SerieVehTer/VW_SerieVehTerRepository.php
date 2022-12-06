<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\VW_SerieVehTer;
use Illuminate\Support\Facades\DB;

class VW_SerieVehTerRepository implements VW_SerieVehTerInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(VW_SerieVehTer $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    {
        return $this->model->get();
    } 
    public function search_periodo($perido_busquedad)
    {
         return $this->model->where('Periodo',$perido_busquedad)->get();

    }
     public function allFiltro($filtroPerido)
    {       $dato=$this->model;
            if(!empty($filtroPerido)){ 
            $dato=$dato->Where('Periodo',$filtroPerido); 
            } 
           return $dato->get();
    }
  
    
     public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('serie', 'LIKE', '%'.$s.'%');
            $q->orWhere('chasis', 'LIKE', '%'.$s.'%');
            $q->orWhere('motor', 'LIKE', '%'.$s.'%');
            $q->orWhere('color', 'LIKE', '%'.$s.'%');
            $q->orWhere('aniofabriacion', 'LIKE', '%'.$s.'%');
            $q->orWhere('placa', 'LIKE', '%'.$s.'%');
            $q->orWhere('marca', 'LIKE', '%'.$s.'%');
            $q->orWhere('modelo', 'LIKE', '%'.$s.'%');
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
      public function findByCode($code)
    {
        return $this->model->where('periodo', $code)->first();
    }


}