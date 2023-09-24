<?php

namespace App\Http\Recopro\ReturnPurchaseOrderDetail;

interface ReturnPurchaseOrderDetailInterface
{
    public function createUpdate(array $attributes);

    public function deleteByDetail($roc_id, $ids);

    public function all();

    public function destroyExcept($id, $ids);

    public function getExcept($id, $ids);
}