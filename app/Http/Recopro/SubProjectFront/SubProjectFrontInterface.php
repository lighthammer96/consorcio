<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 01/08/2017
 * Time: 04:58 PM
 */

namespace App\Http\Recopro\SubProjectFront;

interface SubProjectFrontInterface
{
    public function deleteExcept(array $ids, $sub_project_id);

    public function createUpdate(array $data);

    public function findByProjectFront($project_id, $front_id);
}