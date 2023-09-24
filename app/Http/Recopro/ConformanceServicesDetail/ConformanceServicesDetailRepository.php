<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 05/09/2018
 * Time: 06:07 PM
 */

namespace App\Http\Recopro\ConformanceServicesDetail;

class ConformanceServicesDetailRepository implements ConformanceServicesDetailInterface
{
    use ConformanceServicesDetailTrait;

    protected $model;

    public function __construct(ConformanceServicesDetail $model)
    {
        $this->model = $model;
    }

    public function max()
    {
        return $this->model->withTrashed()->max('id');
    }

    public function create(array $attributes)
    {
        $attributes = setIdTableByMax($this->max(), $attributes);
        return $this->model->create($attributes);
    }

    public function findByOC($purchase_id, $article_id)
    {
        return $this->model->where('cs_id', $purchase_id)
            ->where('product_id', $article_id)
            ->first();
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function deleteByProduct($cs_id, $ids)
    {
        $this->model->where('cs_id', $cs_id)
            ->whereNotIn('product_id', $ids)
            ->delete();
    }

    public function deleteByPOD($cs_id, $ids)
    {
        $this->model->where('cs_id', $cs_id)
            ->whereNotIn('purchase_order_detail_id', $ids)
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

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('cs_id', $attributes['cs_id'])
            ->where('purchase_order_detail_id', $attributes['purchase_order_detail_id'])
            ->withTrashed()
            ->first();

        $attributes['user_updated'] = auth()->id();
        if ($model) {
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

    public function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }

    public function destroyExcept($id, $ids)
    {
        $this->model->where('cs_id', $id)
            ->whereNotIn('id', $ids)
            ->delete();
    }

    public function getExcept($id, $ids)
    {
        return $this->model->where('cs_id', $id)
            ->whereNotIn('id', $ids)
            ->get();
    }
}