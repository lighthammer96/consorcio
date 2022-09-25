<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 16/08/2017
 * Time: 10:28 AM
 */

namespace App\Http\Recopro\ConsumptionProduct;

interface ConsumptionProductInterface
{
    public function deleteByConsumption($consumption_id, array $ids);

    public function createUpdate(array $data);
}