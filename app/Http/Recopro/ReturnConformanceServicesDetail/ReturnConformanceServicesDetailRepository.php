<?php

namespace App\Http\Recopro\ReturnConformanceServicesDetail;

class ReturnConformanceServicesDetailRepository implements ReturnConformanceServicesDetailInterface
{
    protected $model;

    public function __construct(ReturnConformanceServicesDetail $model)
    {
        $this->model = $model;
    }

    public function max()
    {
        return $this->model->withTrashed()->max('id');
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('return_cs_id', $attributes['return_cs_id'])
            ->where('reception_detail_id', $attributes['reception_detail_id'])
            ->where('product_id', $attributes['product_id'])
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
        return $model;
    }

    public function deleteByDetail($rcs_id, $ids)
    {
        $this->model->where('return_cs_id', $rcs_id)
            ->whereNotIn('reception_detail_id', $ids)
            ->delete();
    }

    public function all()
    {
        return $this->model->all();
    }

    public function destroyExcept($id, $ids)
    {
        $this->model->where('return_cs_id', $id)
            ->whereNotIn('id', $ids)
            ->delete();
    }

    public function getExcept($id, $ids)
    {
        return $this->model->where('return_cs_id', $id)
            ->whereNotIn('id', $ids)
            ->get();
    }
}