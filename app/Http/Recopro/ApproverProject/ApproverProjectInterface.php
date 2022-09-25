<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 22/08/2017
 * Time: 11:05 AM
 */

namespace App\Http\Recopro\ApproverProject;

interface ApproverProjectInterface
{
    public function getByProject($project_id);

    public function deleteExcept($project_id, array $users_id);

    public function createUpdate(array $data);

    public function getByProjectUser($project_id, $user_id);
}