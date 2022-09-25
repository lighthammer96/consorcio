<?php namespace App\Http\Recopro\ContestProvider;

use App\Http\Recopro\ContestProviderDetail\ContestProviderDetail;
use App\Http\Recopro\Currency\Currency;
use App\Http\Recopro\Entity\Entity;
use App\Http\Recopro\PaymentCondition\PaymentCondition;
use App\Http\Recopro\Quotation\Quotation;
use App\Http\Recopro\TypeChange\TypeChange;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 27/07/2017
 * Time: 10:03 AM
 */
class ContestProvider extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_ConcursoProveedor';

    protected $fillable = ['contest_id', 'number', 'delivery_days', 'delivery_date', 'file', 'provider_id',
        'payment_condition_id', 'payment_advance', 'shipping_date', 'currency_id', 'is_igv', 'subtotal', 'igv', 'total',
        'subtotal_local', 'igv_local', 'total_local', 'subtotal_dollar', 'igv_dollar', 'total_dollar', 'type_change_id',
        'user_created', 'user_updated', 'user_deleted', 'deleted_at'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at', 'user_created', 'user_updated', 'user_deleted'];

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    public function contest()
    {
        return $this->belongsTo(Quotation::class, 'contest_id');
    }

    public function provider()
    {
        return $this->belongsTo(Entity::class, 'provider_id', 'IdEntidad');
    }

    public function payment_condition()
    {
        return $this->belongsTo(PaymentCondition::class);
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function contests_provider_detail()
    {
        return $this->hasMany(ContestProviderDetail::class);
    }

}