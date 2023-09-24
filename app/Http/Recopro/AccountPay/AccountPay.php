<?php

namespace App\Http\Recopro\AccountPay;

use App\Http\Recopro\ClassificationAcquisition\ClassificationAcquisition;
use App\Http\Recopro\CostCenter\CostCenter;
use App\Http\Recopro\Currency\Currency;
use App\Http\Recopro\DocumentType\DocumentType;
use App\Http\Recopro\Entity\Entity;
use App\Http\Recopro\OperationDestination\OperationDestination;
use App\Http\Recopro\PaymentCondition\PaymentCondition;
use App\Http\Recopro\PettyCashExpense\PettyCashExpense;
use App\Http\Recopro\PlanAccount\PlanAccount;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AccountPay extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $table = 'ERP_Compras';

    protected $fillable = ['id', 'petty_cash_expense_id', 'register_date', 'emission_date', 'expiration_date',
        'accounting_period', 'type_change', 'currency_id', 'payment_condition_id', 'classification_acquisition_id',
        'provider_id', 'document_type_id', 'document_number', 'operation_destination_id', 'gloss', 'state_id',
        'affection', 'unaffected', 'exonerated', 'igv', 'amount', 'is_igv', 'per_igv', 'IdCuenta', 'IdCentroCosto',
        'created_at', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['updated_at', 'deleted_at'];

    public function provider()
    {
        return $this->belongsTo(Entity::class, 'provider_id');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id', 'IdMoneda');
    }

    public function documentType()
    {
        return $this->belongsTo(DocumentType::class, 'document_type_id', 'IdTipoDocumento');
    }

    public function operation_destination()
    {
        return $this->belongsTo(OperationDestination::class, 'operation_destination_id', 'IdDestinoOperacion');
    }

    public function classification_acquisition()
    {
        return $this->belongsTo(ClassificationAcquisition::class, 'classification_acquisition_id');
    }

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    public function pettyCashExpense()
    {
        return $this->belongsTo(PettyCashExpense::class, 'petty_cash_expense_id');
    }

    public function paymentCondition()
    {
        return $this->belongsTo(PaymentCondition::class, 'payment_condition_id');
    }

    public function account()
    {
        return $this->belongsTo(PlanAccount::class, 'IdCuenta');
    }

    public function costCenter()
    {
        return $this->belongsTo(CostCenter::class, 'IdCentroCosto');
    }
}