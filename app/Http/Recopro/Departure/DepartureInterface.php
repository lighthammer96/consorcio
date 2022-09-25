<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 22/06/2017
 * Time: 09:41 AM
 */

namespace App\Http\Recopro\Departure;


interface DepartureInterface
{
    public function search($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);
}