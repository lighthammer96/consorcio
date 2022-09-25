<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 01/08/2017
 * Time: 05:03 PM
 */

namespace App\Http\Recopro\SubProjectLevel;

class SubProjectLevelRepository implements SubProjectLevelInterface
{
    protected $model;

    public function __construct(SubProjectLevel $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->create($attributes);
        return $model;
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }

    public function deleteExcept(array $ids, $sub_project_id)
    {
        $this->model->where('sub_project_id', $sub_project_id)
                    ->whereNotIn('id', $ids)
                    ->forceDelete();
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function findByCode($code, $sub_project_id)
    {
        return $this->model->where('code', $code)->where('sub_project_id', $sub_project_id)->first();
    }

    public function findByParent($parent, $sub_project_id)
    {
        return $this->model->where('parent_id', $parent)->where('sub_project_id', $sub_project_id)->get();
    }

    public function findByLevelProject($level, $project_id)
    {
        return $this->model->where('level_id', $level)
                    ->whereHas('subProject', function ($sp) use ($project_id){
                        $sp->where('project_id', $project_id);
                    })->first();
    }

    public function findBySubPLProject($id, $project_id)
    {
        return $this->model->where('id', $id)
                    ->whereHas('subProject', function ($sp) use ($project_id){
                        $sp->where('project_id', $project_id);
                    })->first();
    }
}