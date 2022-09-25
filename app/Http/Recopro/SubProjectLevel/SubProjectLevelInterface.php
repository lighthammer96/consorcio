<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 01/08/2017
 * Time: 05:03 PM
 */

namespace App\Http\Recopro\SubProjectLevel;

interface SubProjectLevelInterface
{
    public function create(array $attributes);

    public function update($id, array $attributes);

    public function destroy($id);

    public function deleteExcept(array $ids, $sub_project_id);

    public function find($id);

    public function findByCode($code, $sub_project_id);

    public function findByLevelProject($level, $project_id);

    public function findByParent($parent, $sub_project_id);

    public function findBySubPLProject($id, $sub_project_id);
}