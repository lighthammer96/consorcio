<?php

namespace App\Http\Recopro\ReturnPurchaseOrderSeries;

class ReturnPurchaseOrderSeriesRepository implements ReturnPurchaseOrderSeriesInterface
{
    protected $model;

    public function __construct(ReturnPurchaseOrderSeries $model)
    {
        $this->model = $model;
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
        $model = $this->model->where('return_detail_id', $attributes['return_detail_id'])
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
        $this->model->where('return_detail_id', $id)
            ->whereNotIn('id', $ids)
            ->delete();
    }
}