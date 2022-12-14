<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\View_OrdenServicio;
use Illuminate\Support\Facades\DB;

class View_OrdenServicioRepository implements View_OrdenServicioInterface
{
    protected $model;
    private static $_ACTIVE = 'A';

    public function __construct(View_OrdenServicio $model)
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
            // $q->where('id', 'LIKE', '%'.$s.'%');
            $q->orWhere('cCodConsecutivo', 'LIKE', '%'.$s.'%');
            $q->orWhere('nConsecutivo', 'LIKE', '%'.$s.'%');
            $q->orWhere('dFecRec', 'LIKE', '%'.$s.'%');
            $q->orWhere('cliente', 'LIKE', '%'.$s.'%');
            $q->orWhere('iEstado', 'LIKE', '%'.$s.'%');
            $q->orWhere('cPlacaVeh', 'LIKE', '%'.$s.'%');
        })->orderBy("nConsecutivo", "DESC");

    }
       public function searchDocumentos($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('id', 'LIKE', '%'.$s.'%');
            $q->orWhere('cCodConsecutivo', 'LIKE', '%'.$s.'%');
            $q->orWhere('nConsecutivo', 'LIKE', '%'.$s.'%');
            $q->orWhere('iEstado', 'LIKE', '%'.$s.'%');
        })->whereIn('iEstado',['2', '3','5'])->orderBy("created_at", "DESC");

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

}