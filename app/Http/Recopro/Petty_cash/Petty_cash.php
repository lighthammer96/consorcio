<?php

namespace App\Http\Recopro\Petty_cash;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 04/07/2017
 * Time: 12:20 PM
 */
use App\Http\Recopro\Petty_cashUser\Petty_cashUser;
use App\Http\Recopro\User\User;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Petty_cash extends Model
{
    use  SoftDeletes;

    protected $table = 'ERP_CajaChica';

    protected $fillable = ['code', 'description', 'liable_id', 'total', 'is_vale',
        'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];

    function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    public function PettyCashUser()
    {
        return $this->hasMany(Petty_cashUser::class);
    }

    public function liable()
    {
       return $this->belongsTo(User::class,'liable_id','id');
    }
}