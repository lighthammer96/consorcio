<?php namespace App\Http\Recopro\Precios_producto;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Precios_producto extends Model
{
  
    protected $table = 'ERP_VW_Productos_Precios';

    public $timestamps = true;

    protected $primaryKey = 'idProducto';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idProducto', 'Producto','Codigo_Articulo','Precio','idTipoCliente','Cliente','idMoneda','Moneda'];
    
    //  public function user_c()
    // {
    //     return $this->belongsTo(User::class, 'user_created');
    // }

    // public function user_u()
    // {
    //     return $this->belongsTo(User::class, 'user_updated');
    // }

}