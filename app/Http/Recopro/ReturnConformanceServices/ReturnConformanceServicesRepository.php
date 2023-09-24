<?php

namespace App\Http\Recopro\ReturnConformanceServices;

class ReturnConformanceServicesRepository implements ReturnConformanceServicesInterface
{
    protected $model;

    public function __construct(ReturnConformanceServices $model)
    {
        $this->model = $model;
    }

    public function search($filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';

        return $this->model
            ->where(function ($q) use ($s) {
                $q->where('code', 'LIKE', '%' . $s . '%');
                $q->orWhereHas('user_c', function ($e) use ($s) {
                    $e->where('name', 'LIKE', '%' . $s . '%');
                });
            })->where(function ($q) use ($filter) {
                if (isset($filter['check']) && $filter['check'] == 'true') {
                    $from = $filter['from'] . ' 00:00:00';
                    $to = $filter['to'] . ' 23:59:59';
                    $q->whereBetween('date', [$from, $to]);
                }
                $option = (isset($filter['option'])) ? $filter['option'] : '';
                if ($option != '' && $option == 1) {
                    $q->where('id', 0);
                }
                $rec = (isset($filter['cs'])) ? $filter['cs'] : '';
                if ($rec != '') {
                    $q->where('cs_id', $rec);
                }
                $po = (isset($filter['po'])) ? $filter['po'] : '';
                if ($po != '') {
                    $q->whereHas('conformanceServices', function ($p) use ($po) {
                        $p->where('purchase_order_id', $po);
                    });
                }
            });
    }

    public function all()
    {
        return $this->model->all();
    }

    public function max()
    {
        return $this->model->withTrashed()->max('id');
    }

    public function create(array $attributes)
    {
        $attributes = setIdTableByMax($this->max(), $attributes);
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->create($attributes);
        $count = $this->model->withTrashed()->count();
        $code = 'DCS' . str_pad($count, 8, "0", STR_PAD_LEFT);
        $this->update($model->id, [
            'code' => $code
        ]);
        return $this->find($model->id);
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