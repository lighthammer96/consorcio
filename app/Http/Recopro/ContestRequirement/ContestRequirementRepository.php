<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 03/07/2017
 * Time: 11:42 AM
 */

namespace App\Http\Recopro\ContestRequirement;

class ContestRequirementRepository implements ContestRequirementInterface
{
    protected $model;

    public function __construct(ContestRequirement $model)
    {
        $this->model = $model;
    }

    public function deleteExcept(array $ids, $contest_id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->where('contest_id', $contest_id)
            ->whereNotIn('requirement_id', $ids);
        $model->update($attributes);
        $model->delete();
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('contest_id', $attributes['contest_id'])
            ->where('requirement_id', $attributes['requirement_id'])
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
}