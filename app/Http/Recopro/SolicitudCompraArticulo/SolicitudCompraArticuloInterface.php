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
    public function all();

    public function create(array $attributes);

    public function deleteBySol($sol_id);

    public function getIDByLast();

    public function updateBySol($sol_id, $attributes);

}