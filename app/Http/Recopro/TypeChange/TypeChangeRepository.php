<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\TypeChange;

use Carbon\Carbon;

class TypeChangeRepository implements TypeChangeInterface
{
    protected $model;

    public function __construct(TypeChange $model)
    {
        $this->model = $model;
    } 

    public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('Fecha', 'LIKE', '%'.$s.'%');
            $q->orWhere('Compra', 'LIKE', '%'.$s.'%');
            $q->orWhere('Venta', 'LIKE', '%'.$s.'%');
            $q->orWhere('cambioComercialCompra', 'LIKE', '%'.$s.'%');
            $q->orWhere('cambioComercialVenta', 'LIKE', '%'.$s.'%');
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
        return $this->model->create($attributes);
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $this->model->where('Fecha', $id)->update($attributes);
//        $model = $this->model->findOrFail($id);
//        if ($model) {
//            $model->Compra = $attributes['Compra'];
//            $model->Venta = $attributes['Venta'];
//            $model->user_updated = auth()->id();
//            $model->save();
//        }
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        $attributes = [];
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }

    public function getByDate($date)
    {
        $model = $this->model->where('Fecha', $date)->first();

        return (isset($model)) ? $model : $this->model->orderBy('Fecha', 'DESC')->first();
    }
}
