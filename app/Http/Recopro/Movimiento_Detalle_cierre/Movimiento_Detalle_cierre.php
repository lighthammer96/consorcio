<?php namespace App\Http\Recopro\Movimiento_Detalle_cierre;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Movimiento_Detalle_cierre extends Model
{
  
    protected $table = 'ERP_almacen_stock_localizacion_detalle_cierre';

    public $timestamps = true;

    protected $primaryKey = 'idArticulo';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idArticulo','idAlmacen','idLocalizacion','TipoId','idDetalle','disponible','en_transito','remitido','total','reservado','periodo','costo','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}