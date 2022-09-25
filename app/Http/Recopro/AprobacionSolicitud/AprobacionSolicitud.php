<?php namespace App\Http\Recopro\AprobacionSolicitud;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class AprobacionSolicitud extends Model
{
  
    protected $table = 'VTA_VWPorAprobarSolicitud';

    public $timestamps = true;

    protected $primaryKey = 'Conformidad';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['Conformidad','Codigo','Consecutivo','IdUsuario','Usuario','EstadoAprob','Fecha','FechaVenc','EstadoSol','Saldo','Total','Moneda','Cliente','NumeroDoc','TipoDoc','TipoSolicitud'];
    
}