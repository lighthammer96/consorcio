<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 01/08/2017
 * Time: 10:27 AM
 */

namespace App\Http\Recopro\ReceptionTransfer;
class ReceptionTransferRepository implements ReceptionTransferInterface
{

    protected $model;

    public function __construct(ReceptionTransfer $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('date', 'LIKE', '%' . $s . '%');
            $q->orWhere('state_description', 'LIKE', '%' . $s . '%');
            $q->orWhereHas('warehouseOrigin', function ($e) use ($s) {
                $e->where('description', 'LIKE', '%' . $s . '%');
            });
            $q->orWhereHas('warehouseDestination', function ($e) use ($s) {
                $e->where('description', 'LIKE', '%' . $s . '%');
            });
        });//->where('type_id', 2);
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
        $model = $this->model->create($attributes);
        $count = $this->model->withTrashed()->count();
        $this->update($model->id, [
            'code_reception' => 'R' . str_pad($count, 8, "0", STR_PAD_LEFT)
        ]);
        return $model;
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $attributes['user_id'] = auth()->id();
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