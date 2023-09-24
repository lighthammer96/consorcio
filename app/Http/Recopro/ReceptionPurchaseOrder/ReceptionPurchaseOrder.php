<?php namespace App\Http\Recopro\ReceptionPurchaseOrder;

use App\Http\Recopro\Currency\Currency;
use App\Http\Recopro\Operation\Operation;
use App\Http\Recopro\ReceptionPurchaseOrderDetail\ReceptionPurchaseOrderDetail;
use App\Http\Recopro\Register_movement\Register_movement;
use App\Http\Recopro\RegisterOrdenCompra\RegisterOrdenCompra;
use App\Http\Recopro\ReturnPurchaseOrder\ReturnPurchaseOrder;
use App\Http\Recopro\Warehouse\Warehouse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReceptionPurchaseOrder extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $table = 'ERP_RecepcionOrdenCompra';

    protected $fillable = ['id', 'code', 'date', 'state_id', 'purchase_order_id', 'warehouse_id', 'currency_id',
        'observation', 'total', 'operation_id', 'mov_id',
        'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];

    public function detail()
    {
        return $this->hasMany(ReceptionPurchaseOrderDetail::class, 'reception_oc_id');
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id');
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

    public function returnPurchaseOrder()
    {
        return $this->hasMany(ReturnPurchaseOrder::class, 'reception_id');
    }

}
