<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/3/2017
 * Time: 12:16 PM
 */

namespace App\Http\Recopro\Profile;

class ProfileRepository implements ProfileInterface
{
    protected $model;

    public function __construct(Profile $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('description', 'LIKE', '%'.$s.'%');
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
}