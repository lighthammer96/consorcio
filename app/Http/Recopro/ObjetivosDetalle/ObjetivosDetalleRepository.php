<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\ObjetivosDetalle;
use Illuminate\Support\Facades\DB;

class ObjetivosDetalleRepository implements ObjetivosDetalleInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(ObjetivosDetalle $model)
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
    public function update($ida,$idb,$idc,$idd, array $attributes)
    {
       $this->model->where('id_obj', $ida)->where('nPeriodo', $idb)->where('id_TipoPers', $idc)->where('id_Persona', $idd)->update($attributes);
    }
     public function destroy_detalle($id_obj,$nPeriodo,$id_TipoPers,$id_Persona)
    {
        $this->model->where('id_obj',$id_obj)->where('nPeriodo',$nPeriodo)->where('id_TipoPers',$id_TipoPers)->where('id_Persona',$id_Persona)->delete();
    }

}