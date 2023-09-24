<?php

namespace App\Http\Recopro\ReturnConformanceServicesDetail;

use App\Http\Recopro\ConformanceServicesDetail\ConformanceServicesDetail;
use App\Http\Recopro\Product\Product;
use App\Http\Recopro\ReceptionPurchaseOrderDetail\ReceptionPurchaseOrderDetail;
use App\Http\Recopro\ReturnConformanceServices\ReturnConformanceServices;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReturnConformanceServicesDetail extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $table = 'ERP_DevolucionConformidadServiciosDetalle';

    protected $fillable = ['id', 'return_cs_id', 'reception_detail_id', 'product_id', 'reception',
        'pending', 'return', 'motive', 'price',
        'user_created', 'user_updated', 'user_deleted', 'deleted_at'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at', 'user_created', 'user_updated', 'user_deleted'];

    public function conformanceServiceDetail()
    {
        return $this->belongsTo(ConformanceServicesDetail::class, 'reception_detail_id');
    }

    public function returnConformanceServices()
    {
        return $this->belongsTo(ReturnConformanceServices::class, 'return_cs_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

}