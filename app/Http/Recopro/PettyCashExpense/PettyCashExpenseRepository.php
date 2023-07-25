<?php
/**
 * Created by PhpStorm.
 * User: EVER C.R
 * Date: 24/10/2017
 * Time: 06:36 PM
 */

namespace App\Http\Recopro\PettyCashExpense;


class PettyCashExpenseRepository implements PettyCashExpenseInterface
{
    protected $model;

    public function __construct(PettyCashExpense $model)
    {
        $this->model = $model;
    }

    public function search($filter)
    {
        $s = isset($filter['search']) ? $filter['search'] : '';

        return $this->model->where(function ($q) use ($s) {
            $q->where('code', 'LIKE', '%' . $s . '%');
            $q->orWhere('accounting_period', 'LIKE', '%' . $s . '%');
            $q->orWhereHas('petty_cash', function ($e) use ($s) {
                $e->where('description', 'LIKE', '%' . $s . '%');
            });
        })->where(function ($q) use ($filter) {
            if (isset($filter['check']) && $filter['check'] == 'true') {
                $from = $filter['from'] . ' 00:00:00';
                $to = $filter['to'] . ' 23:59:59';
                $q->whereBetween('date', [$from, $to]);
            }
            if (isset($filter['pc']) && $filter['pc'] != '') {
                $q->where('petty_cash_id', $filter['pc']);
            }
            if (isset($filter['user']) && $filter['user'] != '') {
                $user = $filter['user'];
                $q->whereHas('user_c', function ($u) use ($user) {
                    $u->where('name', 'LIKE', '%' . $user . '%');
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
        $this->update($model->id, [
            'code' => 'R' . str_pad($model->id, 8, '0', STR_PAD_LEFT)
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

    public function findByCode($code)
    {
        return $this->model->where('code', $code)->first();
    }

    public function findByPCState($pc_id, $state)
    {
        return $this->model->where(function ($q) use ($state) {
                if ($state != '') {
                    $q->where('state_id', $state);
                }
            })
            ->where('petty_cash_id', $pc_id)
            ->get();
    }

    public function lastByPCState($pc_id, $state)
    {
        return $this->model->where(function ($q) use ($state) {
                if ($state != '') {
                    $q->where('state_id', $state);
                }
            })
            ->where('petty_cash_id', $pc_id)
            ->orderBy('date', 'DESC')
            ->first();
    }
}