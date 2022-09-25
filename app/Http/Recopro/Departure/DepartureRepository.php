<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 22/06/2017
 * Time: 09:43 AM
 */

namespace App\Http\Recopro\Departure;


class DepartureRepository implements DepartureInterface
{

    protected $model;

    public function __construct(Departure $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('departure_date', 'LIKE', '%' . $s . '%');
            $q->orWhere('state_description', 'LIKE', '%' . $s . '%');
            $q->orWhereHas('warehouse', function ($e) use ($s) {
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
        $attributes['user_id'] = auth()->id();
        $model = $this->model->create($attributes);
        $count = $this->model->withTrashed()->count();
        $this->update($model->id, [
            'code_departure' => 'S' . str_pad($count, 8, "0", STR_PAD_LEFT)
        ]);
        return $model;
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