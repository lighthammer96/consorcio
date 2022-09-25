<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 25/07/2017
 * Time: 10:54 AM
 */

namespace App\Http\Recopro\ReferralGuide;
class ReferralGuideRepository implements ReferralGuideInterface
{
    protected $model;

    public function __construct(ReferralGuide $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('date', 'LIKE', '%' . $s . '%');
            $q->orWhere('serial', 'LIKE', '%' . $s . '%');
            $q->orWhere('number', 'LIKE', '%' . $s . '%');
            $q->orWhere('origin_guide', 'LIKE', '%' . $s . '%');
            $q->orWhere('code_guide', 'LIKE', '%' . $s . '%');
            $q->orWhereHas('project', function ($e) use ($s) {
                $e->where('description', 'LIKE', '%' . $s . '%');
            });
            $q->orWhereHas('entity', function ($e) use ($s) {
                $e->where('NombreEntidad', 'LIKE', '%' . $s . '%');
            });
        });
    }

    public function all()
    {
        return $this->model->all();
    }


    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        $attributes['user_id'] = auth()->id();
        $model = $this->model->create($attributes);
        $count = $this->model->withTrashed()->count();
        $this->update($model->id, [
            'code_guide' => 'GR' . str_pad($count, 8, "0", STR_PAD_LEFT)
        ]);
        return $model;
    }


    public function create_(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        $attributes['user_id'] = auth()->id();
        return $this->model->create($attributes);
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $attributes['user_id'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }

}