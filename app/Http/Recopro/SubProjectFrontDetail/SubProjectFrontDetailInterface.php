<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 25/09/2017
 * Time: 05:54 PM
 */

namespace App\Http\Recopro\SubProjectFrontDetail;

interface SubProjectFrontDetailInterface
{
    public function createUpdate(array $data);

    public function findByFrontSP($front_id, $spl_id);

    public function update($id, array $attributes);
}