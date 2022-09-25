<?php

namespace App\Http\Recopro\PurchaseOrderDetail;
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/09/2017
 * Time: 10:12 AM
 */
interface PurchaseOrderDetailInterface
{

    public function createUpdate(array $attributes);

    public function deleteByOC($order_purchase_id, array $ids);
}