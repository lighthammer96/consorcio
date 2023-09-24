<?php

namespace App\Http\Recopro\PurchaseOrder;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/09/2017
 * Time: 09:51 AM
 */

use App\Http\Recopro\Buyer\Buyer;
use App\Http\Recopro\ContestProvider\ContestProvider;
use App\Http\Recopro\Entity\Entity;
use App\Http\Recopro\Project\Project;
use App\Http\Recopro\PurchaseOrderDetail\PurchaseOrderDetail;
use App\Http\Recopro\PurchaseOrderState\PurchaseOrderState;
use App\Http\Recopro\Type\Type;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseOrder extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_OrdenCompra';

    protected $fillable = ['number_oc', 'project_id', 'contest_provider_id', 'date_emission', 'type_id', 'oc_state_id',
        'type_oc', 'payment_condition_id', 'payment_advance', 'currency_id', 'is_igv', 'subtotal', 'igv', 'total',
        'quote_provider', 'subtotal_local', 'igv_local', 'total_local', 'subtotal_dollar', 'igv_dollar', 'total_dollar',
        'delivery_days', 'provider_id', 'delivery_date', 'warehouse_id',
        'user_created', 'user_updated', 'user_deleted', 'deleted_at'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at', 'user_updated', 'user_deleted'];

    public function purchase_order_detail()
    {
        return $this->hasMany(PurchaseOrderDetail::class, 'order_purchase_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function state()
    {
        return $this->belongsTo(PurchaseOrderState::class, 'oc_state_id');
    }

    public function contest_provider()
    {
        return $this->belongsTo(ContestProvider::class, 'contest_provider_id');
    }

    public function provider()
    {
        return $this->belongsTo(Entity::class, 'idProveedor', 'IdEntidad');
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }

}