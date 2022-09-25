<?php
/**
 * Created by PhpStorm.
 * User: ever-pc
 * Date: 26/06/2017
 * Time: 10:51 PM
 */

namespace App\Http\Recopro\Stock;


interface StockInterface
{
    public function search($s);

    public function all();

    public function createUpdate(array $data);

    public function findByStock($ids);

    public function findByWareHouseProduct($product_id, $warehouse_id);

}