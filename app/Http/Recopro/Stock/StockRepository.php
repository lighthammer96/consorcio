<?php
/**
 * Created by PhpStorm.
 * User: ever-pc
 * Date: 26/06/2017
 * Time: 10:52 PM
 */

namespace App\Http\Recopro\Stock;


class StockRepository implements StockInterface
{
    protected $model;

    public function __construct(Stock $model)
    {
        $this->model = $model;
    }

    public function search($filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';
        return $this->model->where(function ($q) use ($s) {
            $q->where('stock', 'LIKE', '%' . $s . '%');
            $q->orWhereHas('warehouse', function ($e) use ($s) {
                $e->where('description', 'LIKE', '%' . $s . '%');
            });
            $q->orWhereHas('product', function ($e) use ($s) {
                $e->where('description_detail', 'LIKE', '%' . $s . '%')
                    ->orWhere('code_article', 'LIKE', '%' . $s . '%');
            });
        })->where(function ($q) use ($filter) {
            $items = (isset($filter['warehouse_list'])) ? $filter['warehouse_list'] : [];
            if ($items != []) {
                if ((int)$items[0] !==0) {
                    $q->whereIn('warehouse_id', $items);
                }
            }
        });
    }

    public function all()
    {
        return $this->model->all();
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('warehouse_id', $attributes['warehouse_id'])
            ->where('product_id', $attributes['product_id'])
            ->withTrashed()
            ->first();

        $attributes['user_updated'] = auth()->id();
        $condition = $attributes['condition'];
        //  $state_id = $attributes['state_id'];
        unset($attributes['condition']);
        //unset($attributes['state_id']);
        if (isset($model)) {
            if ($model->trashed()) {
                $model->restore();
            }
//            if ($state_id != 1) {
//                $this->model->where('product_id', $attributes['product_id'])->sum('stock');
//                $attributes['stock'] = ($condition == 1) ? $model->stock + $attributes['stock'] : $model->stock - $attributes['stock'];
//            } else {
//                unset($attributes['stock']);
//            }
            $this->model->where('product_id', $attributes['product_id'])->sum('stock');
            $attributes['stock'] = ($condition == 1) ? $model->stock + $attributes['stock'] : $model->stock - $attributes['stock'];

            $model->update($attributes);
        } else {
            $attributes['user_created'] = auth()->id();
            $model = $this->model->create($attributes);
        }
        return $model;
    }


    public function findByStock($id)
    {
        return $this->model->where('product_id', $id)->sum('stock');
    }

    public function findByWareHouseProduct($product_id, $warehouse_id)
    {
        return $this->model->where('product_id', $product_id)
            ->where('warehouse_id', $warehouse_id)->first();
    }
}