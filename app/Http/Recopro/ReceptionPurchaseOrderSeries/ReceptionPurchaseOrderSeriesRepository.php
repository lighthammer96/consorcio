<?php

namespace App\Http\Recopro\ReceptionPurchaseOrderSeries;

class ReceptionPurchaseOrderSeriesRepository implements ReceptionPurchaseOrderSeriesInterface
{
    protected $model;

    public function __construct(ReceptionPurchaseOrderSeries $model)
    {
        $this->model = $model;
    }

    public function search($filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';

        return $this->model->where(function ($q) use ($s) {
            $q->whereHas('series', function ($se) use ($s) {
                $se->where('nombreserie', 'LIKE', '%'.$s.'%');
                $se->orWhere('chasis', 'LIKE', '%'.$s.'%');
                $se->orWhere('motor', 'LIKE', '%'.$s.'%');
                $se->orWhere('anio_fabricacion', 'LIKE', '%'.$s.'%');
            });
        })->where(function ($q) use ($filter) {
            $product = (isset($filter['product_id'])) ? $filter['product_id'] : '';
            if ($product != '') {
                $q->where('product_id', $product);
            }
            $rod = (isset($filter['rod_id'])) ? $filter['rod_id'] : '';
            if ($rod != '') {
                $q->where('roc_detail_id', $rod);
            }
            $rod_state = (isset($filter['rod_active'])) ? $filter['rod_active'] : '';
            if ($rod_state != '') {
                $q->where('state_rec', '1');
            }
        });
    }

    public function max()
    {
        return $this->model->withTrashed()->max('id');
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('roc_detail_id', $attributes['roc_detail_id'])
            ->where('product_id', $attributes['product_id'])
            ->where('series_id', $attributes['series_id'])
            ->withTrashed()
            ->first();

        $attributes['user_updated'] = auth()->id();
        if (isset($model)) {
            if ($model->trashed()) {
                $model->restore();
            }
            $model->update($attributes);
        } else {
            $attributes = setIdTableByMax($this->max(), $attributes);
            $attributes['user_created'] = auth()->id();
            $model = $this->model->create($attributes);
        }
        return $this->find($model->id);
    }

    public function destroyExcept($id, $ids)
    {
        $this->model->where('roc_detail_id', $id)
            ->whereNotIn('id', $ids)
            ->delete();
    }

    public function update($id, array $attributes)
    {
        $model = $this->model->where('id', $id)
            ->withTrashed()
            ->first();

        $attributes['user_updated'] = auth()->id();
        if (isset($model)) {
            if ($model->trashed()) {
                $model->restore();
            }
            $model->update($attributes);
        }
        return $model;
    }

}