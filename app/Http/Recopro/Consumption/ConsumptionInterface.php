<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 16/08/2017
 * Time: 09:55 AM
 */

namespace App\Http\Recopro\Consumption;

interface ConsumptionInterface
{
    public function search($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);
}