<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 27/07/2017
 * Time: 10:20 AM
 */

namespace App\Http\Recopro\ContestProviderDetail;

class ContestProviderDetailRepository implements ContestProviderDetailInterface
{
    protected $model;

    public function __construct(ContestProviderDetail $model)
    {
        $this->model = $model;
    }

    public function deleteExcept(array $ids, $contest_provider_id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->where('contest_provider_id', $contest_provider_id)
            ->whereNotIn('contest_consolidated_id', $ids);
        $model->update($attributes);
        $model->delete();
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('contest_id', $attributes['contest_id'])
            ->where('contest_provider_id', $attributes['contest_provider_id'])
            ->where('contest_consolidated_id', $attributes['contest_consolidated_id'])
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

    public function UpdateCompare(array $attributes)
    {
        //        return $this->model->firstOrCreate($attributes);
        $model = $this->model->where('id', $attributes['id'])
            ->withTrashed()
            ->first();

        $attributes['user_updated'] = auth()->id();
        if (isset($model)) {
            $model->update($attributes);
        }
        return $model;

//        $attributes['user_updated'] = auth()->id();
//        $attributes['user_id'] = auth()->id();
//        $model = $this->model->findOrFail($data['id']);
//        $model->update($attributes);
    }

    public function deleteByProvider($id, array $ids)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->where('contest_id', $id);
        $model->whereNotIn('contest_provider_id', $ids);
        $model->update($attributes);
        $model->delete();

//        $attributes = [];
//        $attributes['user_deleted'] = auth()->id();
////        $model = $this->model->findOrFail($id);
//        $model = $this->model->where('contest_provider_id', $id);
//        $model->update($attributes);
//        $model->delete();
    }


    public function findByDetail($contest_id)
    {
        return $this->model->where('contest_id', $contest_id)
            ->first();
    }
}