<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/11/2017
 * Time: 3:27 PM
 */

namespace App\Http\Recopro\WarehouseUser;

interface WarehouseUserInterface
{
    public function deleteByWarehouse($warehouse_id, array $ids);

    public function create(array $attributes);
}