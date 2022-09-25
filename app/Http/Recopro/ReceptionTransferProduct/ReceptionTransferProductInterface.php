<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 10/08/2017
 * Time: 12:39 PM
 */

namespace App\Http\Recopro\ReceptionTransferProduct;

interface ReceptionTransferProductInterface
{

    public function create(array $data);

    public function update(array $attributes);
}