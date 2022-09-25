<?php namespace App\Http\Recopro\Denominaciones;

use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Recopro\Currency\Currency;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:54 PM
 */
class Denominaciones extends Model
{
   

    protected $table = 'ERP_Denominaciones';

    protected $fillable = ['id_denominacion', 'descripcion','idMoneda', 'valor', 'user_created', 'user_updated', 'user_deleted'];
    protected $primaryKey = 'id_denominacion';
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
     public function currency_u()
    {
        return $this->belongsTo(Currency::class, 'idMoneda');
    }
}