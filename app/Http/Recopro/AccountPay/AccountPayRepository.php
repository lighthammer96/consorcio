<?php

namespace App\Http\Recopro\AccountPay;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use \DB;

class AccountPayRepository implements AccountPayInterface
{
    protected $model;

    public function __construct(AccountPay $model)
    {
        $this->model = $model;
    }

    public function find($id)
    {
        return $this->model->find($id);
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

    public function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }

    public function deleteByPettyCashExpense($id, array $ids)
    {
        $this->model->where('petty_cash_expense_id', $id)
            ->whereNotIn('id', $ids)
            ->delete();
    }
}