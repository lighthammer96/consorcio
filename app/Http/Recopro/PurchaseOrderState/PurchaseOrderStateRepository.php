<?php

namespace App\Http\Recopro\PurchaseOrderState;
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/09/2017
 * Time: 03:23 PM
 */
class OrderPurchaseStateRepository implements PurchaseOrderStateInterface
{
    protected $model;

    public function __construct(PurchaseOrderState $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }
}