<?php

namespace App\Http\Recopro\PurchaseOrderDetail;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/09/2017
 * Time: 10:12 AM
 */
use App\Http\Recopro\ContestProviderDetail\ContestProviderDetail;
use App\Http\Recopro\Product\Product;
use App\Http\Recopro\PurchaseOrder\PurchaseOrder;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseOrderDetail extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_OrdenCompraDetalle';

    protected $fillable = ['order_purchase_id', 'detail_provider_id', 'consolidated_id', 'quantity', 'price',
        'discount_percentage', 'discount', 'description', 'product_id',
        'description', 'total', 'total_local', 'total_dollar'];

    public function order_purchase()
    {
        return $this->belongsTo(PurchaseOrder::class, 'order_purchase_id');
    }

    public function detail_provider()
    {
        return $this->belongsTo(ContestProviderDetail::class, 'detail_provider_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

}