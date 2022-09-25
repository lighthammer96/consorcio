<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/07/2017
 * Time: 06:10 PM
 */

namespace App\Http\Recopro\MotiveTransfer;


interface MotiveTransferInterface
{
    public function search($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);
}