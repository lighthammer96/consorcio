<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/09/2017
 * Time: 10:02 AM
 */

namespace App\Http\Recopro\PurchaseOrder;


class PurchaseOrderRepository implements PurchaseOrderInterface
{
    protected $model;

    public function __construct(PurchaseOrder $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('number_oc', 'LIKE', '%' . $s . '%');
            $q->orWhereHas('project', function ($e) use ($s) {
                $e->where('description', 'LIKE', '%' . $s . '%');
            });
//            $q->orWhereHas('provider', function ($e) use ($s) {
//                $e->where('NombreEntidad', 'LIKE', '%' . $s . '%');
//            });
        });
    }

    public function all()
    {
        return $this->model->all();
    }

    public function create(array $attributes)
    {
//        $attributes['user_created'] = auth()->id();
//        $model = $this->model->create($attributes);
//        return $model;
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->create($attributes);
        $count = $this->model->withTrashed()->count();
        $number = date("Ym");
        $this->update($model->id, [
            'number_oc' => $number . str_pad($count, 3, "0", STR_PAD_LEFT)
        ]);
        return $model;
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        return $model;
    }

    public function createUpdate(array $attributes)
    {
//        return $this->model->firstOrCreate($attributes);
        $model = $this->model->where('id', $attributes['id'])
            ->withTrashed()
            ->first();

        $attributes['user_updated'] = auth()->id();
        if (isset($model)) {
            if ($model->trashed()) {
                $model->restore();
            }
            $model->update($attributes);
        } else {
//            $model = $this->model->create($attributes);
//            $count = $this->model->withTrashed()->count();
//            $number = date("Ym");
//            $this->update($model->id, [
//                'number_oc' => $number . str_pad($count, 3, "0", STR_PAD_LEFT)
//            ]);
//            $attributes['user_created'] = auth()->id();
        }
        return $model;
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }
}