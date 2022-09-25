<?php namespace App\Http\Recopro\ReporteCreditosAprobado;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class ReporteCreditosAprobado extends Model
{
  
    protected $table = 'ERP_view_reporte_creditos_aprobados';

    public $timestamps = true;

    protected $primaryKey = 'idtienda';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idtienda','financiado', 'Credito','total_financiado','cuota','inicial','precio_lista','intereses','nro_cuotas','IdMoneda','moneda','Simbolo','cCodConsecutivo','nConsecutivo','fecha_solicitud','vendedor','idvendedor','idcliente','razonsocial_cliente','idTipoCliente','documento_ven','tipocliente','fecdoc','serie_comprobante','numero_comprobante','estado'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}