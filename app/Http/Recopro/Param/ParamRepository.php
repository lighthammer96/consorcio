<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 5/19/2017
 * Time: 5:08 PM
 */

namespace App\Http\Recopro\Param;


class ParamRepository implements ParamInterface
{
    protected $model;

    public function __construct(Param $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('description', 'LIKE', '%'.$s.'%');
            $q->orWhere('value', 'LIKE', '%'.$s.'%');
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

    public function getByDescription($key, $value)
    {
        $model = $this->model->where('description', $key)->first();
        return (isset($model)) ? (float) $model->value : $value;
    }
}