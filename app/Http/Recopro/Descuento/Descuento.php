<?php namespace App\Http\Recopro\Descuento;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Currency\Currency;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Descuento extends Model
{
  
    protected $table = 'ERP_Descuentos';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['id', 'descripcion','idTipo','nPorcDescuento','idMoneda','nMonto','estado','dFecIni','dFecFin','nLimiteUso','nCantUso','nSaldoUso','cTipoAplica','nTodosUsusarios','user_created','user_updated'];
    
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

}