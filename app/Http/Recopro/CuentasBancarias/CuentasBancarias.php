<?php namespace App\Http\Recopro\CuentasBancarias;

use App\Http\Recopro\User\User;
use App\Http\Recopro\Bancos\Bancos;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Recopro\Currency\Currency;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:54 PM
 */
class CuentasBancarias extends Model
{
    protected $table = 'ERP_CuentasBancarias';

    protected $fillable = ['id_cuentabancaria', 'numero_cuenta', 'descripcion_cuenta',
        'user_created', 'user_updated', 'user_deleted', 'idbanco', 'IdMoneda'];
    protected $primaryKey = 'id_cuentabancaria';
    // protected $keyType = 'string';
    protected $hidden = ['deleted_at'];

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    public function banco_d()
    {
        return $this->belongsTo(Bancos::class, 'idbanco');
    }

    public function currency_cuenta()
    {
        return $this->belongsTo(Currency::class, 'IdMoneda');
    }
}