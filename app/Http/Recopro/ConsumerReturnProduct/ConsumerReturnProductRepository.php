<?php
/**
 * Created by PhpStorm.
 * User: ever-pc
 * Date: 16/08/2017
 * Time: 11:02 PM
 */

namespace App\Http\Recopro\ConsumerReturnProduct;


class ConsumerReturnProductRepository implements ConsumerReturnProductInterface
{

    protected $model;

    public function __construct(ConsumerReturnProduct $model)
    {
        $this->model = $model;
    }

    public function deleteByConsumerReturn($consumption_id, array $ids)
    {
        $this->model->where('consumer_return_id', $consumption_id)
            ->whereNotIn('product_id', $ids)
            ->delete();
    }


    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('consumer_return_id', $attributes['consumer_return_id'])
            ->where('product_id', $attributes['product_id'])
            ->withTrashed()
            ->first();

        $attributes['user_updated'] = auth()->id();
        if (isset($model)) {
            if ($model->trashed()) {
                $model->restore();
            }
            if ($attributes['state'] === 1) {
                $attributes['refund_amount'] = $model->refund_amount + $attributes['toReturn'];
            }
            $model->update($attributes);
        } else {
            $attributes['user_created'] = auth()->id();
            $model = $this->model->create($attributes);
        }
        return $model;

    }
}