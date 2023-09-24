<?php namespace App\Http\Recopro\ConformanceServices;

use App\Http\Recopro\ConformanceServicesDetail\ConformanceServicesDetail;
use App\Http\Recopro\Currency\Currency;
use App\Http\Recopro\Operation\Operation;
use App\Http\Recopro\Register_movement\Register_movement;
use App\Http\Recopro\RegisterOrdenCompra\RegisterOrdenCompra;
use App\Http\Recopro\ReturnConformanceServices\ReturnConformanceServices;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConformanceServices extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $table = 'ERP_ConformidadServicios';

    protected $fillable = ['id', 'code', 'date', 'state_id', 'purchase_order_id', 'currency_id',
        'observation', 'total', 'operation_id', 'mov_id',
        'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];

    public function detail()
    {
        return $this->hasMany(ConformanceServicesDetail::class, 'cs_id');
    }

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function purchaseOrder()
    {
        return $this->belongsTo(RegisterOrdenCompra::class, 'purchase_order_id');
    }

    public function operation()
    {
        return $this->belongsTo(Operation::class, 'operation_id');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public function movement()
    {
        return $this->belongsTo(Register_movement::class, 'mov_id');
    }

    public function returnConformanceServices()
    {
        return $this->hasMany(ReturnConformanceServices::class, 'cs_id');
    }

}