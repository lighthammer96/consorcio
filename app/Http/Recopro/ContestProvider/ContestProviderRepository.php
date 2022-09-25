<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 27/07/2017
 * Time: 10:10 AM
 */

namespace App\Http\Recopro\ContestProvider;

class ContestProviderRepository implements ContestProviderInterface
{
    protected $model;

    public function __construct(ContestProvider $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->create($attributes);
        $count = $this->model->withTrashed()->count();
        $this->update($model->id, [
            'code' => 'CP' . str_pad($count, 8, '0', STR_PAD_LEFT)
        ]);
        return $this->find($model->id);
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
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


    public function deleteByQuotation( $id, array $contest_ids)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->where('contest_id', $id)
            ->whereNotIn('id', $contest_ids);
        $model->update($attributes);
        $model->delete();
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function findOrContest($contest_id)
    {
        return $this->model->where('contest_id', $contest_id)
            ->get();
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