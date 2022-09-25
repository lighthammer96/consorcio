<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 16/08/2017
 * Time: 10:28 AM
 */

namespace App\Http\Recopro\ConsumptionProduct;

class ConsumptionProductRepository implements ConsumptionProductInterface
{

    protected $model;

    public function __construct(ConsumptionProduct $model)
    {
        $this->model = $model;
    }

    public function deleteByConsumption($consumption_id, array $ids)
    {
        $this->model->where('consumption_id', $consumption_id)
            ->whereNotIn('product_id', $ids)
            ->delete();
    }


    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('consumption_id', $attributes['consumption_id'])
            ->where('product_id', $attributes['product_id'])
            ->withTrashed()
            ->first();

        $attributes['user_updated'] = auth()->id();
        if (isset($model)) {
            if ($model->trashed()) {
                $model->restore();
            }
            if ($attributes['state'] === 1) {
                $attributes['consumption'] = $model->consumption + $attributes['toConsume'];
            }
            $model->update($attributes);
        } else {
            $attributes['user_created'] = auth()->id();
            $model = $this->model->create($attributes);
        }
        return $model;

    }


}