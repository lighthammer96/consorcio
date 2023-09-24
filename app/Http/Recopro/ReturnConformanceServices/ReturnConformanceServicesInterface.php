<?php

namespace App\Http\Recopro\ReturnConformanceServices;

interface ReturnConformanceServicesInterface
{
    public function search($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);
}