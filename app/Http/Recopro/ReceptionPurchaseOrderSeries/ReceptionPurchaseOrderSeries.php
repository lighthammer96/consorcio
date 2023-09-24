<?php

namespace App\Http\Recopro\ReceptionPurchaseOrderSeries;

use App\Http\Recopro\Product\Product;
use App\Http\Recopro\ReceptionPurchaseOrderDetail\ReceptionPurchaseOrderDetail;
use App\Http\Recopro\Serie\Serie;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReceptionPurchaseOrderSeries extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $table = 'ERP_RecepcionOrdenCompraSeries';

    protected $fillable = ['id', 'roc_detail_id', 'product_id', 'series_id', 'state_rec',
        'user_created', 'user_updated', 'user_deleted', 'deleted_at'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at', 'user_created', 'user_updated', 'user_deleted'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function series()
    {
        return $this->belongsTo(Serie::class, 'series_id');
    }

    public function receptionPurchaseOrderDetail()
    {
        return $this->belongsTo(ReceptionPurchaseOrderDetail::class, 'roc_detail_id');
    }

}