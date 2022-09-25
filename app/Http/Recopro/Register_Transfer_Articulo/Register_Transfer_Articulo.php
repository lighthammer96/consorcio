<?php namespace App\Http\Recopro\Register_Transfer_Articulo;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Register_Transfer_Articulo extends Model
{
  
    protected $table = 'ERP_TransferenciaProducto';

    public $timestamps = true;

    protected $primaryKey = 'idTransferencia';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idTransferencia', 'idArticulo','idAlmacenOrigen','idLocalizacionDestino','idLocalizacionOrigen','idAlmacenDestino','idlote','cantidad','costo','costo_total','consecutivo','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}