<?php
/**
 * Created by PhpStorm.
 * User: ever-pc
 * Date: 21/06/2017
 * Time: 10:40 PM
 */

namespace App\Http\Recopro\EntryProduct;

class EntryProductRepository implements EntryProductInterface
{
    protected $model;

    public function __construct(EntryProduct $model)
    {
        $this->model = $model;
    }

    public function deleteByEntry($entry_id, array $ids)
    {
        $this->model->where('entry_id', $entry_id)
            ->whereNotIn('product_id', $ids)
            ->delete();
    }

    public function createUpdate(array $attributes)
    {
//        return $this->model->firstOrCreate($attributes);
        $model = $this->model->where('entry_id', $attributes['entry_id'])
            ->where('product_id', $attributes['product_id'])
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

    public function findByEntry($entry_id, $ids)
    {
        $model = $this->model->where('entry_id', $entry_id)
            ->where('product_id', $ids)->first();

        if (isset($model)) {
            return $model->quantity;
        }else{
            return 0;
        }
       // dd($model->quantity);
    }

    public function deleteByEntryAll($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->where('entry_id', $id);
        $model->update($attributes);
        $model->delete();
    }
}