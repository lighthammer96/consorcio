<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\ReceptionPurchaseOrder;

interface ReceptionPurchaseOrderInterface
{
    public function search($s);

    public function search_roc($s);

    public function all();

    public function create(array $attributes);

    public function createUpdate(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);
}
