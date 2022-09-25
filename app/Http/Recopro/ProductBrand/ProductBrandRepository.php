<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/11/2017
 * Time: 3:27 PM
 */

namespace App\Http\Recopro\ProductBrand;


class ProductBrandRepository implements ProductBrandInterface
{
    protected $model;

    /**
     * ProductBrandRepository constructor.
     * @param $model
     */
    public function __construct(ProductBrand $model)
    {
        $this->model = $model;
    }

    public function deleteByProduct($product_id, array $ids)
    {
        $this->model->where('product_id', $product_id)
                    ->whereNotIn('brand_id', $ids)
                    ->delete();
    }

    public function create(array $attributes)
    {
        $model = $this->model->where('product_id', $attributes['product_id'])
                            ->where('brand_id', $attributes['brand_id'])
                            ->withTrashed()
                            ->first();
        if ($model) {
            if ($model->trashed()) {
                $model->restore();
            }
        } else {
            $this->model->create($attributes);
        }
//        return $this->model->firstOrCreate($attributes);
    }
}