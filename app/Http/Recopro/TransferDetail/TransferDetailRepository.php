<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 26/06/2017
 * Time: 03:53 PM
 */

namespace App\Http\Recopro\TransferDetail;

class TransferDetailRepository implements TransferDetailInterface
{
    protected $model;

    public function __construct(TransferDetail $model)
    {
        $this->model = $model;
    }

    public function findByCode($code, $product_id)
    {
        return $this->model->where('code_transfer', $code)
            ->where('product_id', $product_id)
            ->first();
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('code_transfer', $attributes['code_transfer'])
            ->where('product_id', $attributes['product_id'])
            ->withTrashed()
            ->first();

        $attributes['user_updated'] = auth()->id();
        $attributes['user_id'] = auth()->id();
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

    public function deleteByTransfer($code_transfer, array $ids)
    {
        $this->model->where('code_transfer', $code_transfer)
            ->whereNotIn('product_id', $ids)
            ->delete();
    }

    public function destroy($id)
    {

        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }

    public function deleteByCode($code)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $attributes['user_id'] = auth()->id();
        $model = $this->model->where('code_transfer', $code);
        $model->update($attributes);
        $model->delete();
    }
}


