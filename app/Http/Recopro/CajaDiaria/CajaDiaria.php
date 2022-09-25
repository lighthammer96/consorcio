<?php namespace App\Http\Recopro\CajaDiaria;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Cajas\Cajas;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class CajaDiaria extends Model
{
  
    protected $table = 'ERP_CajaDiaria';

    public $timestamps = true;

    protected $primaryKey = 'idCajaDiaria';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idCajaDiaria','idCaja','fechaCaja','idUsuario','estado','totalEfectivo','totalEgresos','totalOtrosIngresos','totalNoEfectivo','totalEfectivoDol','totalEgresosDol','totalOtrosIngresosDol','totalNoEfectivoDol','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }
     public function caja_u()
    {
        return $this->belongsTo(Cajas::class, 'idCaja');
    }
     public function usuario_u()
    {
        return $this->belongsTo(User::class, 'idUsuario');
    }

}