<?php namespace App\Http\Recopro\PaymentCondition;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 05/07/2017
 * Time: 10:39 AM
 */

use App\Http\Recopro\User\User;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaymentCondition extends Model
{
    public $timestamps = true;

    protected $table = 'ERP_CondicionPago';

    protected $primaryKey = 'id';

    protected $fillable = ['id', 'code', 'days', 'description', 'user_created', 'user_updated', 'user_deleted'];

    public $incrementing = false;

    protected $hidden = ['deleted_at'];

    function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}