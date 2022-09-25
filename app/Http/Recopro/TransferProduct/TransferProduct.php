<?php

namespace App\Http\Recopro\TransferProduct;


/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 07/07/2017
 * Time: 09:30 AM
 */
use App\Http\Recopro\Product\Product;
use App\Http\Recopro\Transfer\Transfer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TransferProduct extends Model
{
    use  SoftDeletes;

    protected $table = 'ERP_TransferenciaProducto';

    protected $fillable = ['transfer_id', 'product_id', 'available', 'transferred', 'toTransfer', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function transfer()
    {
        return $this->belongsTo(Transfer::class);
    }
}