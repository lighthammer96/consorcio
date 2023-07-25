<?php namespace App\Http\Recopro\TypeChange;

use App\Http\Recopro\User\User;
use App\Http\Recopro\Currency\Currency;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Ever
 * Date: 4/4/2017
 * Time: 10:10 PM
 */
class TypeChange extends Model
{


//    protected $table = 'ERP_TipoCambios';
    protected $table = 'ERP_TipoCambio';

    protected $primaryKey = 'Fecha';

    public $incrementing = false;

//    protected $fillable = ['date_register','purchase','sale','state','user_created', 'user_updated', 'user_deleted'];
    protected $fillable = ['Fecha', 'cambioComercialCompra', 'cambioComercialVenta', 'IdMoneda', 'Compra', 'Venta',
        'user_created', 'user_updated', 'user_deleted'];

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
        return $this->belongsTo(Currency::class, 'IdMoneda');
    }
}
