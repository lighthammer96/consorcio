<?php

namespace App\Http\Recopro\ReturnPurchaseOrderSeries;

interface ReturnPurchaseOrderSeriesInterface
{
    public function createUpdate(array $attributes);

    public function destroyExcept($id, $ids);
}