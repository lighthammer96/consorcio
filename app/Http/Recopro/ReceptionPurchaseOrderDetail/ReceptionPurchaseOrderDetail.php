<?php

namespace App\Http\Recopro\ReceptionPurchaseOrderDetail;

use App\Http\Recopro\ContestConsolidated\ContestConsolidated;
use App\Http\Recopro\ContestProviderDetail\ContestProviderDetail;
use App\Http\Recopro\Localizacion\Localizacion;
use App\Http\Recopro\Lot\Lot;
use App\Http\Recopro\Product\Product;
use App\Http\Recopro\PurchaseOrderActive\PurchaseOrderActive;
use App\Http\Recopro\PurchaseOrderDetail\PurchaseOrderDetail;
use App\Http\Recopro\ReceptionPurchaseOrder\ReceptionPurchaseOrder;
use App\Http\Recopro\ReceptionPurchaseOrderSeries\ReceptionPurchaseOrderSeries;
use App\Http\Recopro\RegisterOrdenCompraArticulo\RegisterOrdenCompraArticulo;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReceptionPurchaseOrderDetail extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $table = 'ERP_RecepcionOrdenCompraDetalle';

    protected $fillable = ['id', 'reception_oc_id', 'purchase_order_detail_id', 'product_id', 'localization_id',
        'quantity', 'quantity_pending', 'balance', 'reception', 'price', 'lote_id',
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

    public function receptionPurchaseOrder()
    {
        return $this->belongsTo(ReceptionPurchaseOrder::class, 'reception_oc_id');
    }

    public function localization()
    {
        return $this->belongsTo(Localizacion::class, 'localization_id');
    }

    public function lote()
    {
        return $this->belongsTo(Lot::class, 'lote_id');
    }

    public function rPodSeries()
    {
        return $this->hasMany(ReceptionPurchaseOrderSeries::class, 'roc_detail_id');
    }
}