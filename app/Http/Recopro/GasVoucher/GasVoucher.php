<?php

namespace App\Http\Recopro\GasVoucher;

use App\Http\Recopro\PettyCashExpense\PettyCashExpense;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GasVoucher extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $table = 'ERP_ValesGasolina';

    protected $fillable = ['id', 'petty_cash_expense_id', 'code', 'date', 'gloss', 'responsible', 'amount', 'is_consumed',
        'state_id',
        'created_at', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['updated_at', 'deleted_at'];

    public function pettyCashExpense()
    {
        return $this->belongsTo(PettyCashExpense::class, 'petty_cash_expense_id');
    }
}