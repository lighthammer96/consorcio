<?php

namespace App\Http\Recopro\PettyCashExpenseClose;

use App\Http\Recopro\PettyCashExpense\PettyCashExpense;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PettyCashExpenseClose extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $table = 'ERP_GastosCajaChicaCierre';

    protected $fillable = ['id', 'petty_cash_expense_id', 'number', 'gloss', 'responsible', 'total',
        'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function pettyCashExpense()
    {
        return $this->belongsTo(PettyCashExpense::class, 'petty_cash_expense_id');
    }
}