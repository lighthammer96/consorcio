<?php namespace App\Http\Recopro\Warehouse;

use App\Http\Recopro\State\State;
use App\Http\Recopro\TypeWarehouse\TypeWarehouse;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Shop\Shop;
use App\Http\Recopro\WarehouseUser\WarehouseUser;
use App\Http\Recopro\Localizacion\Localizacion;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:54 PM
 */
class Warehouse extends Model
{
  

    protected $table = 'ERP_Almacen';

    protected $fillable = ['code_internal', 'description', 'type_id', 'project_id', 'local', 'address', 'physical_location',
        'state', 'frozen', 'date_frozen', 'user_created', 'user_updated', 'user_deleted','idTienda'];

    protected $hidden = ['deleted_at'];

//    public function getDateFormat()
//    {
//        return config('app.datetime_format');
//    }

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    public function type()
    {
        return $this->belongsTo(TypeWarehouse::class, 'type_id');
    }
     public function Shop_u()
    {
        return $this->belongsTo(Shop::class, 'idTienda');
    }

    public function warehouseUser()
    {
        return $this->hasMany(WarehouseUser::class);
    }

     public function ware_Localizacion()
    {
        return $this->hasMany(Localizacion::class,'idAlmacen');
    }

    public function _state()
    {
        return $this->belongsTo(State::class, 'state', 'id');
    }
}
