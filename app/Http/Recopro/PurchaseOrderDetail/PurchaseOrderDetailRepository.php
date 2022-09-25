<?php

namespace App\Http\Recopro\PurchaseOrderDetail;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/09/2017
 * Time: 10:14 AM
 */
class PurchaseOrderDetailRepository implements PurchaseOrderDetailInterface
{
    protected $model;

    public function __construct(PurchaseOrderDetail $model)
    {
        $this->model = $model;
    }

    public function createUpdate(array $attributes)
    {
        if (isset($attributes['detail_provider_id'])) {
            $detail = $attributes['detail_provider_id'];
        } else {
            $detail = $attributes['product_id'];
        }

        $model = $this->model->where('order_purchase_id', $attributes['order_purchase_id'])
            ->where('detail_provider_id', $detail)
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

    public function deleteByOC($oc_id, array $ids)
    {
        $this->model->where('order_purchase_id', $oc_id)
            ->whereNotIn('product_id', $ids)
            ->delete();
    }


}