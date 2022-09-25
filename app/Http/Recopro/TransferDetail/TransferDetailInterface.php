<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 26/06/2017
 * Time: 03:51 PM
 */

namespace App\Http\Recopro\TransferDetail;


interface TransferDetailInterface
{
    public function deleteByTransfer($code_transfer, array $ids);

    public function createUpdate(array $data);

    public function findByCode($code, $product_id);

    public function deleteByCode($id);
}