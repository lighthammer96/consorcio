<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 18/08/2017
 * Time: 03:27 PM
 */

namespace App\Http\Recopro\AnalysisUnitaryPrice;

interface AnalysisUnitaryPriceInterface
{
    public function createUpdate(array $data);

    public function deleteExcept(array $ids, $sub_project_level_id, $type_progress);

    public function deleteDelExcept(array $ids, $sub_project_level_id);

    public function update($id, array $attributes);

    public function findBySPLLevel($sub_project_level_id, $level_id);

    public function findByLevelProject($level, $project_id);
}