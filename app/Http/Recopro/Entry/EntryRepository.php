<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\Entry;

class EntryRepository implements EntryInterface
{
    protected $model;

    public function __construct(Entry $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('entry_date', 'LIKE', '%' . $s . '%');
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
                'code_entry' => 'I' . str_pad($count, 8, "0", STR_PAD_LEFT)
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
