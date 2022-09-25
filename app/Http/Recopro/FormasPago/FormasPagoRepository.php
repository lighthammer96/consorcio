<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\FormasPago;

class FormasPagoRepository implements FormasPagoInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(FormasPago $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->orWhere(function($q) use ($s){
            $q->where('codigo_formapago', 'LIKE', '%'.$s.'%')
                ->where('descripcion_subtipo', 'LIKE', '%'.$s.'%');
        });
    }

    public function all()
    { 
        return $this->model->all();
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        // print_r($attributes); exit;
        return $this->model->create($attributes);
    }
    public function allActive()
    {
        
         return $this->model->where('estado', self::$_ACTIVE)->get();
    }

    public function update($id, array $attributes)
    {
        // print_r($attributes); exit;
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function find($id)
    {
        return $this->model->find($id);
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