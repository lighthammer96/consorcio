<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 05/09/2018
 * Time: 05:51 PM
 */

namespace App\Http\Recopro\ConformanceServices;

interface ConformanceServicesInterface
{
    public function search($s);

    public function all();

    public function create(array $attributes);

    public function createUpdate(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);
}