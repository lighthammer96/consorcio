<?php namespace App\Http\Recopro\SolicitudCompraArticulo;

use App\Http\Recopro\Product\Product;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class SolicitudCompraArticulo extends Model
{
    protected $table = 'ERP_SolicitudCompra_Articulo';

    public $timestamps = true;

    protected $primaryKey = 'idMovimiento';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idMovimiento', 'idArticulo', 'cantidad', 'fecha_requerida', 'estado', 'consecutivo',
        'observaciones',
        'user_created', 'user_updated'];

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    public function article()
    {
        return $this->belongsTo(Product::class, 'idArticulo');
    }

}