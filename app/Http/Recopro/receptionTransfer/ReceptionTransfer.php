<?php

namespace App\Http\Recopro\ReceptionTransfer;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 01/08/2017
 * Time: 10:27 AM
 */
use App\Http\Recopro\ReceptionTransferProduct\ReceptionTransferProduct;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Warehouse\Warehouse;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReceptionTransfer extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_RecepcionTransferencia';

    protected $fillable = ['date', 'code_reception', 'user_id', 'warehouse_origin_id', 'warehouse_destination_id', 'transfer_id',
        'state_description', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];

    public function warehouseOrigin()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_origin_id');
    }

    public function warehouseDestination()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_destination_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ReceptionTransferProduct()
    {
        return $this->hasMany(ReceptionTransferProduct::class);
    }

//    public function ReceptionTransferProductDetail()
//    {
//        return $this->hasMany(ReceptionTransferProduct::class);
//    }


    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }
}