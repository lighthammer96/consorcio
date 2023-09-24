<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\Buyer;

class BuyerRepository implements BuyerInterface
{
    protected $model;

    public function __construct(Buyer $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('code', 'LIKE', '%'.$s.'%');
            $q->orWhere('description', 'LIKE', '%'.$s.'%');
            $q->orWhereHas('user', function ($e) use ($s) {
                $e->where('name', 'LIKE', '%' . $s . '%');
            });
            $q->orWhereHas('_state', function ($e) use ($s) {
                $e->where('description', 'LIKE', '%' . $s . '%');
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
        return $this->model->create($attributes);
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

    public function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }

    public function findByCode($code)
    {
        return $this->model->where('code', $code)->first();
    }

    public function getActiveByUser($user_id)
    {
        return $this->model->where('user_id', $user_id)
            ->where('state', '1')
            ->first();
    }
}
