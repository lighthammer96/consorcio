<?php
/**
 * Created by PhpStorm.
 * User: EVER C.R
 * Date: 24/11/2017
 * Time: 05:38 PM
 */

namespace App\Http\Recopro\ReplenishmentPettyCash;

class ReplenishmentPettyCashRepository implements ReplenishmentPettyCashInterface
{
    protected $model;

    public function __construct(ReplenishmentPettyCash $model)
    {
        $this->model = $model;
    }

    public function search($filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';

        return $this->model->where(function ($q) use ($s) {
            $q->where('accounting_period', 'LIKE', '%' . $s . '%');
            $q->orWhere('period_id', 'LIKE', '%' . $s . '%');
            $q->orWhere('number', 'LIKE', '%' . $s . '%');
            $q->orWhere('concept', 'LIKE', '%' . $s . '%');
            $q->orWhereHas('petty_cash', function ($e) use ($s) {
                $e->where('description', 'LIKE', '%' . $s . '%');
            });
            $q->orWhereHas('payment_method', function ($e) use ($s) {
                $e->where('descripcion_subtipo', 'LIKE', '%' . $s . '%');
            });
            $q->orWhereHas('bank', function ($e) use ($s) {
                $e->where('descripcion', 'LIKE', '%' . $s . '%');
            });
            $q->orWhereHas('current_account', function ($e) use ($s) {
                $e->where('descripcion_cuenta', 'LIKE', '%' . $s . '%');
            });
        })->where(function ($q) use ($filter) {
            if (isset($filter['check']) && $filter['check'] == 'true') {
                $from = $filter['from'] . ' 00:00:00';
                $to = $filter['to'] . ' 23:59:59';
                $q->whereBetween('created_at', [$from, $to]);
            }
            $state = (isset($filter['state'])) ? $filter['state'] : '';
            if ($state != '') {
                $q->where('state_id', $state);
            }
            $liable_id = (isset($filter['liable_id'])) ? $filter['liable_id'] : '';
            if ($liable_id != '') {
                $q->whereHas('petty_cash', function ($pc) use ($liable_id) {
                    $pc->where('liable_id', $liable_id);
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
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        $attributes = setIdTableByMax($this->max(), $attributes);
        $model = $this->model->create($attributes);
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

    public function forceDelete($id)
    {
        $this->model->find($id)->forceDelete();
    }

    public function lastByPCState($pc_id, $state, array $except)
    {
        return $this->model->where(function ($q) use ($state, $except) {
                if ($state != '') {
                    $q->where('state_id', $state);
                }
                if (count($except) > 0) {
                    $q->whereNotIn('id', $except);
                }
            })
            ->where('petty_cash_id', $pc_id)
            ->orderBy('date', 'DESC')
            ->first();
    }
}