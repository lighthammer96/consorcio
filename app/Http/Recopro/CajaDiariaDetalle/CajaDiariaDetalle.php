<?php namespace App\Http\Recopro\CajaDiariaDetalle;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Currency\Currency;
use App\Http\Recopro\FormasPago\FormasPago;
use App\Http\Recopro\TiposMovimiento\TiposMovimiento;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class CajaDiariaDetalle extends Model
{

    protected $table = 'ERP_CajaDiariaDetalle';

    public $timestamps = true;

    protected $primaryKey = 'idCajaDiaria';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idCajaDiaria','banco','numero_cuenta', 'consecutivo','codigoTipo','codigoFormaPago','idMoneda','monto','descripcion','nroTarjeta','nroOperacion','user_created','user_updated','created_at','naturaleza', 'idconcepto'];

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }
    public function moneda_u()
    {
        return $this->belongsTo(Currency::class, 'idMoneda');
    }
    public function formaPago_u()
    {
        return $this->belongsTo(FormasPago::class, 'codigoFormaPago');
    }
    public function codigoTipo_u()
    {
        return $this->belongsTo(TiposMovimiento::class, 'codigoTipo');
    }

}