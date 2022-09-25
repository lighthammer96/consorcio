<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/11/2017
 * Time: 3:27 PM
 */

namespace App\Http\Recopro\WarehouseUser;


class WarehouseUserRepository implements WarehouseUserInterface
{
    protected $model;

    /**
     * WarehouseUserRepository constructor.
     * @param $model
     */
    public function __construct(WarehouseUser $model)
    {
        $this->model = $model;
    }

    public function deleteByWarehouse($warehouse_id, array $ids)
    {
        $this->model->where('warehouse_id', $warehouse_id)
                    ->whereNotIn('user_id', $ids)
                    ->delete();
    }

    public function create(array $attributes)
    {
        $model = $this->model->where('warehouse_id', $attributes['warehouse_id'])
                            ->where('user_id', $attributes['user_id'])
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