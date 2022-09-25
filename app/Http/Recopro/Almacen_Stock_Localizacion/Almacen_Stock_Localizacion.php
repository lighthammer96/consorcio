<?php namespace App\Http\Recopro\Almacen_Stock_Localizacion;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Almacen_Stock_Localizacion extends Model
{
  
    protected $table = 'ERP_almacen_stock_localizacion';

    public $timestamps = true;

    protected $primaryKey = 'idArticulo';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idArticulo', 'idAlmacen','idLocalizacion','disponible','en_transito','remitido','total','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}