<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 01/08/2017
 * Time: 04:58 PM
 */

namespace App\Http\Recopro\SubProjectFront;

class SubProjectFrontRepository implements SubProjectFrontInterface
{
    protected $model;

    public function __construct(SubProjectFront $model)
    {
        $this->model = $model;
    }

    public function deleteExcept(array $ids, $sub_project_id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->where('sub_project_id', $sub_project_id)
                            ->whereNotIn('front_id', $ids);
        $model->update($attributes);
        $model->delete();
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('sub_project_id', $attributes['sub_project_id'])
            ->where('front_id', $attributes['front_id'])
            ->withTrashed()
            ->first();

        $attributes['user_updated'] = auth()->id();
        if (isset($model)) {
            if ($model->trashed()) {
                $model->restore();
            }
            $model->update($attributes);
        } else {
            $attributes['user_created'] = auth()->id();
            $model = $this->model->create($attributes);
        }
        return $model;
    }

    public function findByProjectFront($project_id, $front_id)
    {
        return $this->model->where('id', $front_id)
                            ->whereHas('subProject', function ($sp) use ($project_id) {
                                $sp->where('project_id', $project_id);
                            })->first();
    }
}