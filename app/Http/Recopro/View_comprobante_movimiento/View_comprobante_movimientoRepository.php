<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\View_comprobante_movimiento;
use Illuminate\Support\Facades\DB;

class View_comprobante_movimientoRepository implements View_comprobante_movimientoInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(View_comprobante_movimiento $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    {
        return $this->model->get();
    }
     public function all_filtro($fechaActual,$usuario)
    {
          ;

           $dato=$this->model->where('idcajero',$usuario)->where('fecha',$fechaActual);
           return $dato->get();


    }
     public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('descripcion', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('estado', 'LIKE', '%'.$s.'%');
        });

    }
       public function searchComproMoviSol($usuario,$fechacA)
    {
        return $this->model->where(function($q) use ($usuario,$fechacA){
            $q->where('idcajero',$usuario)->where('fecha',$fechacA)->where('idmoneda',1);
        });

    }
       public function searchComproMoviDol($usuario,$fechacA)
    {
        return $this->model->where(function($q) use ($usuario,$fechacA){
            $q->where('idcajero',$usuario)->where('fecha',$fechacA)->where('idmoneda',2);
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

}