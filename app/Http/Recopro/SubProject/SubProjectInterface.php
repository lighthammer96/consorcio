<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 01/08/2017
 * Time: 04:53 PM
 */

namespace App\Http\Recopro\SubProject;

interface SubProjectInterface
{
    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);
}