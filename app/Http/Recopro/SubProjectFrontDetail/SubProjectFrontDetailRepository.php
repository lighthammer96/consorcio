<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 25/09/2017
 * Time: 05:54 PM
 */

namespace App\Http\Recopro\SubProjectFrontDetail;


class SubProjectFrontDetailRepository implements SubProjectFrontDetailInterface
{
    protected $model;

    public function __construct(SubProjectFrontDetail $model)
    {
        $this->model = $model;
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('sub_project_front_id', $attributes['sub_project_front_id'])
            ->where('sub_project_level_id', $attributes['sub_project_level_id'])
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

    public function findByFrontSP($front_id, $spl_id)
    {
        return $this->model->where('sub_project_front_id', $front_id)
            ->where('sub_project_level_id', $spl_id)
            ->first();
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }
}