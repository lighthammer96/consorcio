<?php

namespace App\Http\Recopro\ReceptionTransferProduct;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 10/08/2017
 * Time: 12:38 PM
 */
use App\Http\Recopro\Product\Product;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReceptionTransferProduct extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_RecepcionTransferenciaProducto';


    protected $fillable = ['reception_transfer_id', 'product_id', 'available', 'received', 'toReceived', 'code', 'description',
        'unit', 'cost', 'user_created', 'user_updated', 'user_deleted', 'deleted_at'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at', 'user_created', 'user_updated', 'user_deleted'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}