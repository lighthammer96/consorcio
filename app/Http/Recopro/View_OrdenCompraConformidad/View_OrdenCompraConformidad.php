<?php namespace App\Http\Recopro\View_OrdenCompraConformidad;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class View_OrdenCompraConformidad extends Model
{
    protected $table = 'COM_VWPorAprobarOrden';

    public $timestamps = true;

    protected $primaryKey = 'idCategoria';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idOrdenCompra','Conformidad', 'Codigo','Consecutivo','IdUsuario','Usuario', 'EstadoAprob','Fecha','FechaReq','TipoDoc', 'NumeroDoc','Proveedor','Moneda','Total', 'EstadoOC'];
    
}