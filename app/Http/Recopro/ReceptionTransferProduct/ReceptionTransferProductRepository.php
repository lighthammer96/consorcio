<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 10/08/2017
 * Time: 12:40 PM
 */

namespace App\Http\Recopro\ReceptionTransferProduct;

class ReceptionTransferProductRepository implements ReceptionTransferProductInterface
{

    protected $model;

    public function __construct(ReceptionTransferProduct $model)
    {
        $this->model = $model;
    }


    public function create(array $attributes)
    {
        return $this->model->create($attributes);
    }


    public function update(array $attributes)
    {
        $model = $this->model->where('reception_transfer_id', $attributes['reception_transfer_id'])
            ->where('product_id', $attributes['product_id'])
            ->withTrashed()
            ->first();

        $attributes['user_updated'] = auth()->id();
        if (isset($model)) {
            if ($model->trashed()) {
                $model->restore();
            }
            if($attributes['state']===1){
                $attributes['available'] = $model->available - $attributes['toReceived'];
                $attributes['received'] = $model->received + $attributes['toReceived'];
            }

            $model->update($attributes);
        }
        return $model;
    }

}