<?php namespace App\Http\Recopro\Departure;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 22/06/2017
 * Time: 09:35 AM
 */
use App\Http\Recopro\DepartureProduct\DepartureProduct;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Warehouse\Warehouse;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Departure extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_Salida';

    protected $fillable = ['departure_date', 'warehouse_id', 'user_id', 'observation', 'state_departure', 'code_departure',
        'state_description', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];

    public function DepartureProduct()
    {
        return $this->hasMany(DepartureProduct::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }
}