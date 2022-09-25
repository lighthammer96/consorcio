<?php namespace App\Http\Recopro\ReporteVentaCliente;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class ReporteVentaCliente extends Model
{ 
  
    protected $table = 'ERP_VW_VentaClientes';

    public $timestamps = true;

    protected $primaryKey = 'idCategoria';

    protected $keyType = 'string';
 
    public $incrementing = false; 

    protected $fillable = ['convenio','tipo_solicitud','idconvenio','idCliente','idCategoria', 'idtienda','cuota_inicial','idvendedor','usuario','IdMoneda','Moneda','idcondicion_pago','condicion_pago','precio_unitario','Motor','numero_serie','Color','idSerie','Modelo','serie_comprobante','numero_comprobante','idventa','Fecha','DocumentoCliente','Direccion','celular','razonsocial_cliente','Documento','pagado','saldo','correo_electronico'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}