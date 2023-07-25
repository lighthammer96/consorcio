<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\SolicitudCompraArticulo;

interface SolicitudCompraArticuloInterface
{
    public function search(array $filter);

    public function all();

    public function createUpdate(array $attributes);

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function deleteBySol($sol_id);

    public function deleteByExcept($sol_id, array $ids);

    public function getIDByLast();

    public function updateBySol($sol_id, $attributes);

}