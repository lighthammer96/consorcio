<?php

namespace App\Http\Recopro\PettyCashExpense;

/**
 * Created by PhpStorm.
 * User: EVER C.R
 * Date: 24/10/2017
 * Time: 06:26 PM
 */

use App\Http\Recopro\AccountPay\AccountPay;
use App\Http\Recopro\GasVoucher\GasVoucher;
use App\Http\Recopro\Petty_cash\Petty_cash;
use App\Http\Recopro\PettyCashExpenseClose\PettyCashExpenseClose;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PettyCashExpense extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $table = 'ERP_GastosCajaChica';

    protected $fillable = ['id', 'code', 'accounting_period', 'date', 'petty_cash_id', 'state_id',
        'total', 'observation', 'pc_balance_initial',
        'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function petty_cash()
    {
        return $this->belongsTo(Petty_cash::class, 'petty_cash_id');
    }

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    public function documents()
    {
        return $this->hasMany(AccountPay::class, 'petty_cash_expense_id');
    }

    public function documentsOrder()
    {
        return $this->hasMany(AccountPay::class, 'petty_cash_expense_id')
            ->orderBy('created_at', 'DESC');
    }

    public function vouchers()
    {
        return $this->hasMany(GasVoucher::class, 'petty_cash_expense_id');
    }

    public function pceCloses()
    {
        return $this->hasMany(PettyCashExpenseClose::class, 'petty_cash_expense_id');
    }
}