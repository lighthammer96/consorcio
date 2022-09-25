<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\VW_CierreInventarioPeriodo;
use Illuminate\Support\Facades\DB;

class VW_CierreInventarioPeriodoRepository implements VW_CierreInventarioPeriodoInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(VW_CierreInventarioPeriodo $model)
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
  
    
     public function search($s,$perido_busquedad)
    {
        return $this->model->where(function($q) use ($s,$perido_busquedad){
            $q->where('id', 'LIKE', '%'.$s.'%')->where('Periodo',$perido_busquedad);
            $q->orWhere('Articulo', 'LIKE', '%'.$s.'%')->where('Periodo',$perido_busquedad);
            $q->orWhere('Unidad', 'LIKE', '%'.$s.'%')->where('Periodo',$perido_busquedad);
            $q->orWhere('Almacen', 'LIKE', '%'.$s.'%')->where('Periodo',$perido_busquedad);
            $q->orWhere('Localizacion', 'LIKE', '%'.$s.'%')->where('Periodo',$perido_busquedad);
            $q->orWhere('Lote', 'LIKE', '%'.$s.'%')->where('Periodo',$perido_busquedad);
            $q->orWhere('Serie', 'LIKE', '%'.$s.'%')->where('Periodo',$perido_busquedad);
            $q->orWhere('Disponible', 'LIKE', '%'.$s.'%')->where('Periodo',$perido_busquedad);
            $q->orWhere('Transito', 'LIKE', '%'.$s.'%')->where('Periodo',$perido_busquedad);
            $q->orWhere('Remitido', 'LIKE', '%'.$s.'%')->where('Periodo',$perido_busquedad);
            $q->orWhere('Total', 'LIKE', '%'.$s.'%')->where('Periodo',$perido_busquedad);
            $q->orWhere('CostoCierre', 'LIKE', '%'.$s.'%')->where('Periodo',$perido_busquedad);
            $q->orWhere('Periodo', 'LIKE', '%'.$s.'%')->where('Periodo',$perido_busquedad);
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