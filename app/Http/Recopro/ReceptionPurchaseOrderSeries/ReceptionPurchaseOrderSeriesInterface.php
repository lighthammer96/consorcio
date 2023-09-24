<?php

namespace App\Http\Recopro\ReceptionPurchaseOrderSeries;

interface ReceptionPurchaseOrderSeriesInterface
{
    public function search($filter);

    public function createUpdate(array $attributes);

    public function destroyExcept($id, $ids);

    public function update($id, array $attributes);
}