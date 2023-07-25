<?php

namespace App\Http\Recopro\ReplenishmentPettyCash;

use App\Http\Recopro\Bancos\Bancos;
use App\Http\Recopro\CuentasBancarias\CuentasBancarias;
use App\Http\Recopro\Currency\Currency;
use App\Http\Recopro\FormasPago\FormasPago;
use App\Http\Recopro\Petty_cash\Petty_cash;
use App\Http\Recopro\TypeChange\TypeChange;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReplenishmentPettyCash extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $table = 'ERP_ReposicionCajaChica';

    protected $fillable = ['id', 'date', 'accounting_period', 'petty_cash_id', 'currency_id', 'number',
        'type_change_id', 'concept', 'payment_method_id', 'state_id', 'bank_id', 'current_account_id', 'total', 'liable_id',
        'period_id', 'delivered_to',
        'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function petty_cash()
    {
        return $this->belongsTo(Petty_cash::class, 'petty_cash_id');
    }

    public function liable()
    {
        return $this->belongsTo(User::class, 'liable_id');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public function payment_method()
    {
        return $this->belongsTo(FormasPago::class, 'payment_method_id');
    }

    public function bank()
    {
        return $this->belongsTo(Bancos::class, 'bank_id');
    }

    public function current_account()
    {
        return $this->belongsTo(CuentasBancarias::class, 'current_account_id');
    }

    public function type_change()
    {
        return $this->belongsTo(TypeChange::class, 'type_change_id', 'Fecha');
    }

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }
}