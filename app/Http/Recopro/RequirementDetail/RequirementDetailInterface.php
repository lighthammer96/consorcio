<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 14/06/2017
 * Time: 10:09 AM
 */

namespace App\Http\Recopro\RequirementDetail;

interface RequirementDetailInterface
{
    public function deleteExcept(array $ids, $requirement_id);

    public function findByRequirement($consolidated_id, $requirement_id);

    public function getByRequirement($requirement_id);

    public function createUpdate(array $data);
}