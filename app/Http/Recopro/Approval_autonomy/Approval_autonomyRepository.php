<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\Approval_autonomy;

class Approval_autonomyRepository implements Approval_autonomyInterface
{
    protected $model;

    public function __construct(Approval_autonomy $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('from', 'LIKE', '%'.$s.'%');
            $q->orWhere('to', 'LIKE', '%'.$s.'%');
            $q->orWhereHas('user', function ($e) use ($s) {
                $e->where('username', 'LIKE', '%' . $s . '%');
            });
        });
    }

    public function all()
    {
        return $this->model->all();
    }

    public function create(array $attributes)
    {
        $model = $this->model->where('user_id', $attributes['user_id'])
                            ->where('from', $attributes['from'])
                            ->where('to', $attributes['to'])
                            ->withTrashed()
                            ->first();
        if ($model) {
            if ($model->trashed()) {
                $model->restore();
            }
        } else {
            $this->model->create($attributes);
        }
//        return $this->model->firstOrCreate($attributes);
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function deleteByAAutonomy(array $ids)
    {
        $this->model->whereNotIn('id', $ids)
                    ->delete();
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
