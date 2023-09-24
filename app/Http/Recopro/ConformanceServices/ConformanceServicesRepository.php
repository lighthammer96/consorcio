<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 05/09/2018
 * Time: 05:51 PM
 */

namespace App\Http\Recopro\ConformanceServices;

class ConformanceServicesRepository implements ConformanceServicesInterface
{
    use ConformanceServicesTrait;

    protected $model;

    public function __construct(ConformanceServices $model)
    {
        $this->model = $model;
    }

    public function search($filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';

        return $this->model->where(function ($q) use ($s) {
            $q->where('code', 'LIKE', '%' . $s . '%');
            $q->orWhereHas('purchaseOrder', function ($e) use ($s) {
                $e->where('cCodConsecutivo', 'LIKE', '%' . $s . '%');
                $e->orWhere('nConsecutivo', 'LIKE', '%' . $s . '%');
                $e->orWhereHas('provider', function ($p) use ($s) {
                    $p->where('razonsocial', 'LIKE', '%' . $s . '%');
                });
            });
        })->where(function ($q) use ($filter) {
            if (isset($filter['check']) && $filter['check'] == 'true') {
                $from = $filter['from'] . ' 00:00:00';
                $to = $filter['to'] . ' 23:59:59';
                $q->whereBetween('date', [$from, $to]);
            }
            $rec = (isset($filter['rec'])) ? $filter['rec'] : '';
            if ($rec != '') {
                $q->where('id', $rec);
            }
            $po = (isset($filter['po'])) ? $filter['po'] : '';
            if ($po != '') {
                $q->where('purchase_order_id', $po);
            }
            if (isset($filter['return_valid'])) {
                $q->where('state_id', 2);
//                    $q->where('state_associated', 0);
                $q->whereHas('detail', function ($d) {
                    $d->where('balance', '>', 0);
                });
            }
            if (isset($filter['no_associated_return'])) {
                $q->whereDoesntHave('returnConformanceServices', function ($ret) {
                    $ret->where('state_id', 0);
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
        $code = 'CS' . str_pad($count, 6, "0", STR_PAD_LEFT);
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

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('id', $attributes['cs_id'])
            ->withTrashed()
            ->first();

        $attributes['user_updated'] = auth()->id();
        if (isset($model)) {
            if ($model->trashed()) {
                $model->restore();
            }
            $model->update($attributes);
        } else {
            $attributes = setIdTableByMax($this->max(), $attributes);
            $attributes['user_created'] = auth()->id();
            $model = $this->model->create($attributes);
        }
        return $model;
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