<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 26/09/2017
 * Time: 12:52 PM
 */

namespace App\Http\Recopro\SubProjectFrontDetailAPU;

class SubProjectFrontDetailAPURepository implements SubProjectFrontDetailAPUInterface
{
    protected $model;

    public function __construct(SubProjectFrontDetailAPU $model)
    {
        $this->model = $model;
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('sub_project_front_detail_id', $attributes['sub_project_front_detail_id'])
            ->where('apu_id', $attributes['apu_id'])
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

    public function deleteExcept($ids, $sp_fd_id)
    {
        $this->model->where('sub_project_front_detail_id', $sp_fd_id)
            ->whereNotIn('id', $ids)
            ->delete();
    }

    public function findByFrontAPU($front_id, $apu)
    {
        return $this->model->where('sub_project_front_detail_id', $front_id)
            ->where('apu_id', $apu)
            ->first();
    }
}