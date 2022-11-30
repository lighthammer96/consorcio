<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Currency;
use Illuminate\Support\Facades\DB;

class CurrencyRepository implements CurrencyInterface
{
    protected $model;

    private static $_ACTIVE = 'A';

    public function __construct(Currency $model)
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
            $q->orWhere('Simbolo', 'LIKE', '%'.$s.'%');
            $q->orWhere('EquivalenciaSunat', 'LIKE', '%'.$s.'%');
            $q->orWhere('Abreviatura', 'LIKE', '%'.$s.'%');
        });

    }
     public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        return $this->model->create($attributes);
    }
    public function get_consecutivo($table)
    {     $mostrar=DB::select('select top 1 * from ERP_Moneda order by CONVERT(INT, IdMoneda) DESC');
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
     public function allActive()
    {
        return $this->model->where('Estado', self::$_ACTIVE)->get();
    }
    public function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $attributes['Estado'] ='I';
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
     
    }

    public function find($id)
    {
        return $this->model->find($id);
    }
}
