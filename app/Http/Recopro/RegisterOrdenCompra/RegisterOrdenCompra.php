<?php namespace App\Http\Recopro\RegisterOrdenCompra;

use App\Http\Recopro\Buyer\Buyer;
use App\Http\Recopro\Consecutive\Consecutive;
use App\Http\Recopro\Currency\Currency;
use App\Http\Recopro\Entity\Entity;
use App\Http\Recopro\OrdenCompraConformidad\OrdenCompraConformidad;
use App\Http\Recopro\PaymentCondition\PaymentCondition;
use App\Http\Recopro\Proveedor\Proveedor;
use App\Http\Recopro\RegisterOrdenCompraArticulo\RegisterOrdenCompraArticulo;
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

    protected $fillable = ['id', 'cCodConsecutivo', 'nConsecutivo', 'dFecRegistro', 'prioridad', 'dFecRequerida',
        'idProveedor', 'idMoneda', 'idcondicion_pago', 'subtotal', 'nDescuento', 'nPorcDescuento', 'nIdDscto',
        'valorCompra', 'nImpuesto', 'total', 'direccionEntrega', 'iEstado', 'impuesto', 'comentario', 'comentarioAprobacion',
        'valorCompraDescuento', 'buyer_id',
        'user_created', 'created_at', 'user_updated', 'updated_at'];

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

    public function provider()
    {
        return $this->belongsTo(Proveedor::class, 'idProveedor');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'idMoneda');
    }

    public function paymentCondition()
    {
        return $this->belongsTo(PaymentCondition::class, 'idcondicion_pago');
    }

    public function detailArticle()
    {
        return $this->hasMany(RegisterOrdenCompraArticulo::class, 'idOrden');
    }

    public function consecutive()
    {
        return $this->belongsTo(Consecutive::class, 'cCodConsecutivo');
    }

    public function conformidad()
    {
        return $this->hasMany(OrdenCompraConformidad::class, 'idOrden');
    }

    public function buyer()
    {
        return $this->belongsTo(Buyer::class, 'buyer_id');
    }

}