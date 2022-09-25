<?php namespace App\Http\Recopro\WarehouseUser;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Warehouse\Warehouse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/6/2017
 * Time: 4:21 PM
 */
class WarehouseUser extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_AlmacenUsuario';

    protected $fillable = ['warehouse_id', 'user_id', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

//    public function getDateFormat()
//    {
//        return config('app.datetime_format');
//    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}