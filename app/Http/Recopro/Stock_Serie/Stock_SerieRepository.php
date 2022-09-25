<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Stock_Serie;
use Illuminate\Support\Facades\DB;

class Stock_SerieRepository implements Stock_SerieInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(Stock_Serie $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    {
        return $this->model->get();
    }
    public function searchMovi($s,$idProducto)
    {
         
        $model = $this->model->where(function($q) use ($s){
            $q->where('nombreSerie', 'LIKE', '%'.$s.'%');
            $q->orWhere('chasis', 'LIKE', '%'.$s.'%');
            $q->orWhere('motor', 'LIKE', '%'.$s.'%');
            $q->orWhere('anio_fabricacion', 'LIKE', '%'.$s.'%');
            $q->orWhere('anio_modelo', 'LIKE', '%'.$s.'%');
            $q->orWhere('color', 'LIKE', '%'.$s.'%');
        });

        return $model->where('idArticulo',$idProducto);

    }
     public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        return $this->model->create($attributes);
    }
   

}