<?php namespace App\Http\Recopro\ReporteRepuesto;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class ReporteRepuesto extends Model
{
  
    protected $table = 'ERP_VW_REPORTE_REPUESTO';

    public $timestamps = true;

    protected $primaryKey = 'idventa_ca';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['origen','fecha', 'idventa_ca','monto_total','estado','documento_ven','cCodConsecutivo','nConsecutivo','serie_comprobante','numero_comprobante','razonsocial_cliente','vendedor','REPUESTO','ACEITE','SERVICIO','TERCEROS'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}