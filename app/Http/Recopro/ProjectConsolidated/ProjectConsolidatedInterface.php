<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 13/06/2017
 * Time: 11:24 AM
 */

namespace App\Http\Recopro\ProjectConsolidated;

interface ProjectConsolidatedInterface
{
    public function search($data);

    public function search_available($data);

    public function getByProject($project_id);

    public function findByProject($project_id);

    public function loadMatrix($project_id);

    public function find($id);

    public function update($id, array $attributes);
}