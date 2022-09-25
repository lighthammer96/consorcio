<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 22/06/2017
 * Time: 09:54 AM
 */

namespace App\Http\Recopro\DepartureProduct;


class DepartureProductRepository implements DepartureProductInterface
{
    protected $model;

    public function __construct(DepartureProduct $model)
    {
        $this->model = $model;
    }

    public function deleteByDeparture($entry_id, array $ids)
    {
        $this->model->where('departure_id', $entry_id)
            ->whereNotIn('product_id', $ids)
            ->delete();
    }

    public function createUpdate(array $attributes)
    {
//        return $this->model->firstOrCreate($attributes);
        $model = $this->model->where('departure_id', $attributes['departure_id'])
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
            $attributes['user_created'] = auth()->id();
            $model = $this->model->create($attributes);
        }
        return $model;
    }

    public function deleteByDepartureAll($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->where('departure_id', $id);
        $model->update($attributes);
        $model->delete();
    }
}