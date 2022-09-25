<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 14/09/2017
 * Time: 04:54 PM
 */

namespace App\Http\Recopro\ProjectGGT;

class ProjectGGTRepository implements ProjectGGTInterface
{
    protected $model;

    public function __construct(ProjectGGT $model)
    {
        $this->model = $model;
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('project_id', $attributes['project_id'])
            ->where('level_id', $attributes['level_id'])
            ->first();

        $attributes['user_updated'] = auth()->id();
        if (isset($model)) {
            $model->update($attributes);
        } else {
            $attributes['user_created'] = auth()->id();
            $model = $this->model->create($attributes);
        }
        return $model;
    }

    public function deleteByLevelType(array $attributes)
    {
        $this->model->where('project_id', $attributes['project_id'])
            ->where('level_id', $attributes['level_id'])
            ->delete();
    }
}