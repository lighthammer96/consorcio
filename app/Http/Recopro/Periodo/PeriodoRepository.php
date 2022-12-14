<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Periodo;
use Illuminate\Support\Facades\DB;

class PeriodoRepository implements PeriodoInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(Periodo $model)
    {
        $this->model = $model; 
       
    }
      public function update_cc_mr($id)
    {
        $attributes['user_updated'] = auth()->id();
        $attributes['estado_cc'] = 'A';
        $this->model->where('periodo',$id)->update($attributes);
    }
     public function update_mc($id)
    {
        $attributes['user_updated'] = auth()->id();
        $attributes['estado'] = 'C';
        $this->model->where('periodo',$id)->update($attributes);
    }

    public function update_cc($id)
    {
        $attributes['user_updated'] = auth()->id();
        $attributes['estado_cc'] = 'C';
        $this->model->where('periodo',$id)->update($attributes);
    }

      public function update_pc($id)
    {
        $attributes['user_updated'] = auth()->id();
        $attributes['estado'] = 'P';
        $this->model->where('periodo',$id)->update($attributes);
    }

    public function all()
    {
        return $this->model->get();
    }
    public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('periodo', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('estado', 'LIKE', '%'.$s.'%');
            $q->orWhere('estado_cc', 'LIKE', '%'.$s.'%');
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