<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 13/10/2017
 * Time: 04:34 PM
 */

namespace App\Http\Recopro\CostCenter;

interface CostCenterInterface
{
    public function create(array $attributes);

    public function find($id);

    public function allByActive();

    public function search($search);
}