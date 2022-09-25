<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/3/2017
 * Time: 12:21 PM
 */

namespace App\Http\Recopro\Profile;


interface ProfileInterface
{
    public function search($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);
}