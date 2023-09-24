<?php namespace App\Http\Recopro\ConformanceServicesDetail;

use App\Http\Recopro\ConformanceServices\ConformanceServices;
use App\Http\Recopro\ContestConsolidated\ContestConsolidated;
use App\Http\Recopro\Product\Product;
use App\Http\Recopro\PurchaseOrderDetail\PurchaseOrderDetail;
use App\Http\Recopro\RegisterOrdenCompraArticulo\RegisterOrdenCompraArticulo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConformanceServicesDetail extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $table = 'ERP_ConformidadServiciosDetalle';

    protected $fillable = ['id', 'cs_id', 'purchase_order_detail_id', 'product_id',
        'quantity', 'quantity_pending', 'balance', 'reception', 'price',
        'user_created', 'user_updated', 'user_deleted', 'deleted_at'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at', 'user_created', 'user_updated', 'user_deleted'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function purchaseOrderDetail()
    {
        return $this->belongsTo(RegisterOrdenCompraArticulo::class, 'purchase_order_detail_id');
    }

    public function conformanceService()
    {
        return $this->belongsTo(ConformanceServices::class, 'cs_id');
    }
}