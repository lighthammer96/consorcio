<?php

namespace App\Http\Recopro\Petty_cashUser;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 04/07/2017
 * Time: 03:34 PM
 */
use App\Http\Recopro\Petty_cash\Petty_cash;
use App\Http\Recopro\User\User;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Petty_cashUser extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_CajaChicaUsuario';

    protected $fillable = ['petty_cash_id', 'user_id', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function petty_cash()
    {
        return $this->belongsTo(Petty_cash::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}