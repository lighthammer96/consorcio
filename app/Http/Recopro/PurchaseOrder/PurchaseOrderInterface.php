<?php

namespace App\Http\Recopro\PurchaseOrder;
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/09/2017
 * Time: 09:52 AM
 */
interface PurchaseOrderInterface
{
    public function search($filter);

    public function all();

    public function create(array $data);

    public function createUpdate(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);
}