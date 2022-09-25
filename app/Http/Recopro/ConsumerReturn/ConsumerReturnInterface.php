<?php

/**
 * Created by PhpStorm.
 * User: ever-pc
 * Date: 16/08/2017
 * Time: 10:46 PM
 */

namespace App\Http\Recopro\ConsumerReturn;

interface ConsumerReturnInterface
{
    public function search($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);
}