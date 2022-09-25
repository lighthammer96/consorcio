<?php namespace App\Http\Recopro\ReporteOrdenDiario;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class ReporteOrdenDiario extends Model
{
  
    protected $table = 'ERP_view_reporte_ordenes_diarios';

    public $timestamps = true;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['servicios', 'dFecRec','cCodConsecutivo','nConsecutivo','codigo_consecutivo','nKilometraje','odMo','pro_totaSer','pro_totalRepu','modelo_serie','marca_serie','idMarca_serie','modelo_vet','marca_vet','idMarca_vet','id_tipoveh','descripcion','cChasis','iAnioFab','cPlacaVeh','razonsocial_cliente','celular','telefono','correo_electronico','direccion','moneda','Simbolo','IdMoneda'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}