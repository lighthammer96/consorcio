<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 04/07/2017
 * Time: 12:20 PM
 */

namespace App\Http\Recopro\Petty_cash;

class Petty_cashRepository implements Petty_cashInterface
{

    protected $model;

    public function __construct(Petty_cash $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('description', 'LIKE', '%' . $s . '%');
            $q->orWhere('code', 'LIKE', '%' . $s . '%');
            $q->orWhereHas('liable', function ($e) use ($s) {
                $e->where('name', 'LIKE', '%' . $s . '%');
            });
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

    public function findByCode($code)
    {
        return $this->model->where('code', $code)->first();
    }
}