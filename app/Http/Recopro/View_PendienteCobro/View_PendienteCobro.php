<?php namespace App\Http\Recopro\View_PendienteCobro;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class View_PendienteCobro extends Model
{
  
    protected $table = 'ERP_VW_PendientesCobro';

    public $timestamps = true;

    protected $primaryKey = 'idCliente';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['IdMoneda','idCliente', 't_monto_total','pagado','saldo','serie_comprobante','numero_comprobante','razonsocial_cliente','fecha_emision','cCodConsecutivo_solicitud','nConsecutivo_solicitud','condicion_pago_text','tipoDocumento','moneda'];
    

}