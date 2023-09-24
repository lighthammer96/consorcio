<?php namespace App\Http\Recopro\ReturnPurchaseOrderDetail;

use App\Http\Recopro\Localizacion\Localizacion;
use App\Http\Recopro\Lot\Lot;
use App\Http\Recopro\Product\Product;
use App\Http\Recopro\ReceptionPurchaseOrderDetail\ReceptionPurchaseOrderDetail;
use App\Http\Recopro\ReturnPurchaseOrder\ReturnPurchaseOrder;
use App\Http\Recopro\ReturnPurchaseOrderSeries\ReturnPurchaseOrderSeries;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReturnPurchaseOrderDetail extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $table = 'ERP_DevolucionOrdenCompraDetalle';

    protected $fillable = ['id', 'return_oc_id', 'reception_detail_id', 'product_id', 'localization_id', 'reception',
        'pending', 'return', 'motive', 'price', 'lote_id',
        'user_created', 'user_updated', 'user_deleted', 'deleted_at'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at', 'user_created', 'user_updated', 'user_deleted'];

    public function receptionDetail()
    {
        return $this->belongsTo(ReceptionPurchaseOrderDetail::class, 'reception_detail_id');
    }

    public function returnPurchaseOrder()
    {
        return $this->belongsTo(ReturnPurchaseOrder::class, 'return_oc_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function localization()
    {
        return $this->belongsTo(Localizacion::class, 'localization_id');
    }

    public function lote()
    {
        return $this->belongsTo(Lot::class, 'lote_id');
    }

    public function retDSeries()
    {
        return $this->hasMany(ReturnPurchaseOrderSeries::class, 'return_detail_id');
    }
}