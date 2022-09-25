<?php namespace App\Http\Recopro\View_comprobantes_caja_detalle;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class View_comprobantes_caja_detalle extends Model
{
  
    protected $table = 'ERP_view_comprobantes_caja_detalle';

    public $timestamps = true;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['documento','razonsocial_cliente','serie_comprobante','numero_comprobante','monto', 'fecha','idcajero','idmoneda','comprobante','IdTipoDocumento'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}