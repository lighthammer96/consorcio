<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\RegisterOrdenCompraArticulo;

interface RegisterOrdenCompraArticuloInterface
{
    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function createUpdate(array $attributes);

    public function destroyExcept($oc_id, array $ids);

    public function getExcept($oc_id, array $ids);

}