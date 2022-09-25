<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 05/07/2017
 * Time: 10:40 AM
 */

namespace App\Http\Recopro\PaymentCondition;
class PaymentConditionRepository implements PaymentConditionInterface
{


    protected $model;

    public function __construct(PaymentCondition $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('code', 'LIKE', '%' . $s . '%');
            $q->orWhere('days', 'LIKE', '%'.$s.'%');
            $q->orWhere('description', 'LIKE', '%'.$s.'%');
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
        $attributes['user_id'] = auth()->id();
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

    public function findByCode($code)
    {
        return $this->model->where('code', $code)->first();
    }
}