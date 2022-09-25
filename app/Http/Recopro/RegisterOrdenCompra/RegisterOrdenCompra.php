<?php namespace App\Http\Recopro\RegisterOrdenCompra;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Operation\Operation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class RegisterOrdenCompra extends Model
{
  
    protected $table = 'ERP_OrdenCompra';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;


    protected $fillable = ['id','cCodConsecutivo','nConsecutivo','dFecRegistro','prioridad','dFecRequerida','idProveedor','idMoneda','idcondicion_pago','subtotal','nDescuento','nPorcDescuento','nIdDscto','valorCompra','nImpuesto','total','direccionEntrega','iEstado','user_created','created_at','user_updated','updated_at','impuesto','comentario','comentarioAprobacion'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }
    public function user_d()
    {
        return $this->belongsTo(User::class, 'idUsuario');
    }
    public function Operation()
    {
        return $this->belongsTo(Operation::class, 'idTipoOperacion');
    }
    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}