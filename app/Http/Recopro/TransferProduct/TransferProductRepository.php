<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 07/07/2017
 * Time: 09:30 AM
 */

namespace App\Http\Recopro\TransferProduct;
class TransferProductRepository implements TransferProductInterface
{
    protected $model;

    public function __construct(TransferProduct $model)
    {
        $this->model = $model;
    }

    public function deleteByTransfer($transfer_id, array $ids)
    {
        $this->model->where('transfer_id', $transfer_id)
            ->whereNotIn('product_id', $ids)
            ->delete();
    }

    public function createUpdate(array $attributes)
    {
//        return $this->model->firstOrCreate($attributes);
        $model = $this->model->where('transfer_id', $attributes['transfer_id'])
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
            $attributes['user_id'] = auth()->id();
            $model = $this->model->create($attributes);
        }
        return $model;

    }

    public function findByTransfer($transfer_id, $ids)
    {
        $model = $this->model->where('transfer_id', $transfer_id)
            ->where('product_id', $ids)->first();

        if (isset($model)) {
            return $model->transferred;
        }else{
            return 0;
        }
        // dd($model->quantity);
    }

    public function deleteByTransferAll($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->where('entry_id', $id);
        $model->update($attributes);
        $model->delete();
    }
}