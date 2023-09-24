<?php namespace App\Http\Recopro\ReturnPurchaseOrder;

use App\Http\Recopro\Currency\Currency;
use App\Http\Recopro\Operation\Operation;
use App\Http\Recopro\ReceptionPurchaseOrder\ReceptionPurchaseOrder;
use App\Http\Recopro\Register_movement\Register_movement;
use App\Http\Recopro\ReturnPurchaseOrderDetail\ReturnPurchaseOrderDetail;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Warehouse\Warehouse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReturnPurchaseOrder extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $table = 'ERP_DevolucionOrdenCompra';

    protected $fillable = ['id', 'state_id', 'code', 'date', 'reception_id', 'observation', 'total', 'warehouse_id',
        'operation_id', 'currency_id', 'mov_id',
        'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];

    public function detail()
    {
        return $this->hasMany(ReturnPurchaseOrderDetail::class, 'return_oc_id');
    }

    public function reception()
    {
        return $this->belongsTo(ReceptionPurchaseOrder::class, 'reception_id');
    }

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id');
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
}