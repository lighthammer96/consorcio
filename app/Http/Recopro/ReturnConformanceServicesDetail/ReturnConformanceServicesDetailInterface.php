<?php

namespace App\Http\Recopro\ReturnConformanceServicesDetail;

interface ReturnConformanceServicesDetailInterface
{
    public function createUpdate(array $attributes);

    public function deleteByDetail($rcs_id, $ids);

    public function all();

    public function destroyExcept($id, $ids);

    public function getExcept($id, $ids);
}