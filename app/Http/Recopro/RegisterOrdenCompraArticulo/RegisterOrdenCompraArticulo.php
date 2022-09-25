<?php namespace App\Http\Recopro\RegisterOrdenCompraArticulo;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class RegisterOrdenCompraArticulo extends Model
{
  
    protected $table = 'ERP_OrdenCompraArticulo';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['id', 'idArticulo','idOrden','cantidad','cantidadPendiente','cantidadRecibida','cantidadDevuelta','precioUnitario','precioTotal','nImpuesto','nIdDscto','nDescuento','codSolicitud','nPorcDescuento','valorCompra','total','dFecRequerida','iEstado','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}