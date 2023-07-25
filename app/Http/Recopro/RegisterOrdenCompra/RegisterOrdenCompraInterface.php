<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\RegisterOrdenCompra;

interface RegisterOrdenCompraInterface
{
    public function search($s);

    public function all();

    public function find($id);

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function destroy($id);

}