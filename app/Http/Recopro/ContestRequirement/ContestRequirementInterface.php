<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 03/07/2017
 * Time: 11:42 AM
 */

namespace App\Http\Recopro\ContestRequirement;

interface ContestRequirementInterface
{
    public function deleteExcept(array $ids, $contest_id);

    public function createUpdate(array $data);
}