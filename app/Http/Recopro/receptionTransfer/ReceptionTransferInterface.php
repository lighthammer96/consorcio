<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 01/08/2017
 * Time: 10:27 AM
 */

namespace App\Http\Recopro\ReceptionTransfer;
interface ReceptionTransferInterface
{
    public function search($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);
}