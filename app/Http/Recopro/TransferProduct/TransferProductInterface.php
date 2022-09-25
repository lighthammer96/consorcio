<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 07/07/2017
 * Time: 09:30 AM
 */

namespace App\Http\Recopro\TransferProduct;

interface TransferProductInterface
{
    public function deleteByTransfer($Transfer_id, array $ids);

    public function createUpdate(array $data);

    public function deleteByTransferAll($id);

    public function findByTransfer($transfer_id, $ids);
}