<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\View_movimiento;
use Illuminate\Support\Facades\DB;

class View_movimientoRepository implements View_movimientoInterface
{
    protected $model;
    private static $_ACTIVE = 1;
    public function __construct(View_movimiento $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    {
        return $this->model->get();
    }
     
      public function all_orden_compra()
    {
        return $this->model->get()->where('cCodConsecutivo','ORDC');
    }
    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        return $this->model->create($attributes);
    }
     public function search_recepcionCompra($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('idMovimiento', 'LIKE', '%'.$s.'%');
            $q->orWhere('idUsuario', 'LIKE', '%'.$s.'%');
            $q->orWhere('estado', 'LIKE', '%'.$s.'%');
            $q->orWhere('idTipoOperacion', 'LIKE', '%'.$s.'%');
        })->where('cCodConsecutivo','ORDC')->orderBy("created_at", "DESC");

    }

    public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('Id', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('Usuario', 'LIKE', '%'.$s.'%');
            $q->orWhere('Estado', 'LIKE', '%'.$s.'%');
            $q->orWhere('Operacion', 'LIKE', '%'.$s.'%');
            $q->orWhere('Fecha', 'LIKE', '%'.$s.'%');
            $q->orWhere('Observacion', 'LIKE', '%'.$s.'%');
        })->orderBy("created_at", "DESC");

    }
   
    

}