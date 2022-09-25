<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\View_Movimiento_Conformidad_Compra;
use Illuminate\Support\Facades\DB;

class View_Movimiento_Conformidad_CompraRepository implements View_Movimiento_Conformidad_CompraInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(View_Movimiento_Conformidad_Compra $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    {
        return $this->model->get();
    }

    public function search_recepcionCompraConformidad($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('idMovimiento', 'LIKE', '%'.$s.'%');
            $q->orWhere('idUsuario', 'LIKE', '%'.$s.'%');
            $q->orWhere('estado', 'LIKE', '%'.$s.'%');
            $q->orWhere('idTipoOperacion', 'LIKE', '%'.$s.'%');
        })->Where('idTipoOperacion','1')->where('cCodConsecutivo','ORDC')->orderBy("created_at", "DESC");

    }
      public function all_orden_compraConformidad()
    {
        return $this->model->get()->where('cCodConsecutivo','ORDC')->Where('idTipoOperacion','1');
    }
     public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        // print_r($attributes); exit;
        return $this->model->create($attributes);
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
     
    

}