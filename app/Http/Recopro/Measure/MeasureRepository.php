<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Measure;
use Illuminate\Support\Facades\DB;

class MeasureRepository implements MeasureInterface
{
    protected $model;

    public function __construct(Measure $model)
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
            $q->where('Descripcion', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('EquivalenciaSunat', 'LIKE', '%'.$s.'%');
             $q->orWhere('Abreviatura', 'LIKE', '%'.$s.'%');
         
        });

    }
      public function allActive()
    {
        
         return $this->model->get();
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
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
     
    }

}