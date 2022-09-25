<?php
namespace App\Http\Recopro\Petty_cashUser;
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 04/07/2017
 * Time: 03:35 PM
 */

class Petty_cashUserRepository implements Petty_cashUserInterface
{
    protected $model;

    /**
     * WarehouseUserRepository constructor.
     * @param $model
     */
    public function __construct(Petty_cashUser $model)
    {
        $this->model = $model;
    }

    public function deleteByPettyCash($petty_cash_id, array $ids)
    {
        $this->model->where('petty_cash_id', $petty_cash_id)
            ->whereNotIn('user_id', $ids)
            ->delete();
    }

    public function create(array $attributes)
    {
        $model = $this->model->where('petty_cash_id', $attributes['petty_cash_id'])
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