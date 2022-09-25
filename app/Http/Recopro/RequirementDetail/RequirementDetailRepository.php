<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 14/06/2017
 * Time: 10:09 AM
 */

namespace App\Http\Recopro\RequirementDetail;

class RequirementDetailRepository implements RequirementDetailInterface
{
    protected $model;

    public function __construct(RequirementDetail $model)
    {
        $this->model = $model;
    }

    public function deleteExcept(array $ids, $requirement_id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->where('requirement_id', $requirement_id)
                    ->whereNotIn('project_consolidated_id', $ids);
        $model->update($attributes);
        $model->delete();
    }

    public function findByRequirement($consolidated_id, $requirement_id)
    {
        return $this->model->where('requirement_id', $requirement_id)
                            ->where('project_consolidated_id', $consolidated_id)->first();
    }

    public function getByRequirement($requirement_id)
    {
        return $this->model->where('requirement_id', $requirement_id)->get();
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('requirement_id', $attributes['requirement_id'])
                            ->where('project_consolidated_id', $attributes['project_consolidated_id'])
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