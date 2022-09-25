<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 22/06/2017
 * Time: 09:51 AM
 */

namespace App\Http\Recopro\DepartureProduct;


interface DepartureProductInterface
{
    public function deleteByDeparture($departure_id, array $ids);

    public function createUpdate(array $attributes);

    public function deleteByDepartureAll($id);
}