<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 04/07/2017
 * Time: 12:20 PM
 */

namespace App\Http\Recopro\Petty_cash;

interface Petty_cashInterface
{
    public function search($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);

    public function findByCode($code);
}