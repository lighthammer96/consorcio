<?php namespace App\Http\Recopro\Shop;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Ubigeo\Ubigeo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Shop extends Model
{
    protected $table = 'ERP_Tienda';

    public $timestamps = true;

    protected $primaryKey = 'idTienda';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idTienda', 'descripcion', 'direccion', 'ubigeo', 'estado','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }
     public function ubigeo_u()
    {
        return $this->belongsTo(Ubigeo::class, 'ubigeo');
    }

}