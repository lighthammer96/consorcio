<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 22/08/2017
 * Time: 11:05 AM
 */

namespace App\Http\Recopro\ApproverProject;

class ApproverProjectRepository implements ApproverProjectInterface
{
    protected $model;

    public function __construct(ApproverProject $model)
    {
        $this->model = $model;
    }

    public function getByProject($project_id)
    {
        return $this->model->where('project_id', $project_id)->get();
    }

    public function deleteExcept($project_id, array $users_id)
    {
        $this->model->where('project_id', $project_id)
            ->whereNotIn('user_id', $users_id)
            ->delete();
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->getByProjectUser($attributes['project_id'], $attributes['user_id']);

        if (isset($model)) {
            $model->update($attributes);
        } else {
            $model = $this->model->create($attributes);
        }
        return $model;
    }

    public function getByProjectUser($project_id, $user_id)
    {
        return $this->model->where('project_id', $project_id)
                    ->where('user_id', $user_id)
                    ->first();
    }
}