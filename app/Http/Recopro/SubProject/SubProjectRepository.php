<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 01/08/2017
 * Time: 04:53 PM
 */

namespace App\Http\Recopro\SubProject;

class SubProjectRepository implements SubProjectInterface
{
    protected $model;

    public function __construct(SubProject $model)
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
        return $model;
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);

        return $this->find($id);
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