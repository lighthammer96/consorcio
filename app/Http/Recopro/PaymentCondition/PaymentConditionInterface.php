<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 05/07/2017
 * Time: 10:39 AM
 */

namespace App\Http\Recopro\PaymentCondition;

interface PaymentConditionInterface
{
    public function search($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);

    public function findByCode($code);
}