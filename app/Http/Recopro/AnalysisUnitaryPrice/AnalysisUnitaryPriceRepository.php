<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 18/08/2017
 * Time: 03:28 PM
 */

namespace App\Http\Recopro\AnalysisUnitaryPrice;

class AnalysisUnitaryPriceRepository implements AnalysisUnitaryPriceInterface
{
    protected $model;

    public function __construct(AnalysisUnitaryPrice $model)
    {
        $this->model = $model;
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('sub_project_level_id', $attributes['sub_project_level_id'])
            ->where('level_id', $attributes['level_id'])
            ->first();

        $attributes['user_updated'] = auth()->id();
        $created_ = false;
        if (isset($model)) {
            $model->update($attributes);
        } else {
            $attributes['user_created'] = auth()->id();
            $model = $this->model->create($attributes);
            $created_ = true;
        }
        return [$model, $created_];
    }

    public function deleteExcept(array $ids, $sub_project_level_id, $type_progress)
    {
        $this->model->where('sub_project_level_id', $sub_project_level_id)
            ->where('type_progress', '<>', $type_progress)
            ->whereNotIn('level_id', $ids)
            ->forceDelete();
    }

    public function deleteDelExcept(array $ids, $sub_project_level_id)
    {
        $this->model->where('sub_project_level_id', $sub_project_level_id)
            ->where('type_progress', 3)
            ->whereNotIn('level_id', $ids)
//            ->delete();
            ->forceDelete();

        $this->model->where('sub_project_level_id', $sub_project_level_id)
            ->where(function ($tp) {
                $tp->where('type_progress', 1);
                $tp->orWhere('type_progress', 2);
            })
            ->whereNotIn('level_id', $ids)
            ->update(['is_del'=>true]);
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function findBySPLLevel($sub_project_level_id, $level_id)
    {
        return $this->model->where('sub_project_level_id', $sub_project_level_id)
                            ->where('level_id', $level_id)
                            ->first();
    }

    public function findByLevelProject($level, $project_id)
    {
        return $this->model->where('level_id', $level)
            ->whereHas('subProjectLevel', function ($spl) use ($project_id){
                $spl->whereHas('subProject', function ($sp) use ($project_id){
                    $sp->where('project_id', $project_id);
                });
            })
            ->first();
    }
}