<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 5/19/2017
 * Time: 5:07 PM
 */

namespace App\Http\Recopro\Param;


interface ParamInterface
{
    public function search($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);

    public function getByDescription($key, $value);
}