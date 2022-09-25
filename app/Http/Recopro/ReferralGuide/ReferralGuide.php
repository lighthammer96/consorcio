<?php

namespace App\Http\Recopro\ReferralGuide;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 25/07/2017
 * Time: 10:54 AM
 */
use App\Http\Recopro\Entity\Entity;
use App\Http\Recopro\MotiveTransfer\MotiveTransfer;
use App\Http\Recopro\Project\Project;
use App\Http\Recopro\ReferralGuideProduct\ReferralGuideProduct;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Warehouse\Warehouse;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReferralGuide extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_GuiaRemision';

    protected $fillable = ['date', 'document_type_id', 'entity_id', 'transport_company_id', 'transport_unit', 'license_plate', 'license',
        'driver', 'type_entity', 'warehouse_origin_id', 'warehouse_destination_id', 'date_transfer', 'motive_id', 'observation',
        'serial', 'number', 'project_id', 'order_purchase', 'code_guide', 'origin_guide', 'transfer_id', 'state_description',
        'state_ReferralGuide', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];

    public function entity()
    {
        return $this->belongsTo(Entity::class, 'entity_id', 'IdEntidad');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id', 'id');
    }

    public function transport_company()
    {
        return $this->belongsTo(Entity::class, 'transport_company_id', 'IdEntidad');
    }

    public function ReferralGuideProduct()
    {
        return $this->hasMany(ReferralGuideProduct::class);
    }

    public function warehouse_origin()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_origin_id');
    }

    public function warehouse_destination()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_destination_id');
    }

    public function motive()
    {
        return $this->belongsTo(MotiveTransfer::class, 'motive_id');
    }

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }
}