<?php namespace App\Http\Recopro\AnulacionOrdenCompra;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class AnulacionOrdenCompra extends Model
{
  
    protected $table = 'ERP_view_OrdenCompraAnulacion';

    public $timestamps = true;

    protected $primaryKey = 'idCategoria';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['Total', 'IdMoneda','Moneda','razonsocialProveedor','idProveedor','idOrden', 'cCodConsecutivo','nConsecutivo','dFecRegistro','prioridad','dFecRequerida','ident','iEstado'];
}