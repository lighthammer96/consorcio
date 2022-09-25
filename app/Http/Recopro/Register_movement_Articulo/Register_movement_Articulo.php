<?php namespace App\Http\Recopro\Register_movement_Articulo;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Register_movement_Articulo extends Model
{
  
    protected $table = 'ERP_Movimiento_Articulo';

    public $timestamps = true;

    protected $primaryKey = 'idMovimiento';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idMovimiento', 'idArticulo','idAlmacen','idLocalizacion','idLote','cantidad','costo','costo_total','user_created','user_updated','consecutivo','precio','precio_total'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}