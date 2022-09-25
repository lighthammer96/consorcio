<?php

namespace App\Http\Recopro\ConsumerReturnProduct;

use App\Http\Recopro\ConsumerReturn\ConsumerReturn;
use App\Http\Recopro\Product\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: ever-pc
 * Date: 16/08/2017
 * Time: 11:00 PM
 */
class ConsumerReturnProduct extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_DevolucionConsumoProducto';

    protected $fillable = ['consumer_return_id', 'product_id', 'available', 'refund_amount', 'toReturn',
        'code', 'description', 'unit', 'cost', 'user_created', 'user_created', 'user_deleted'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function consumerReturn()
    {
        return $this->belongsTo(ConsumerReturn::class, 'consumer_return_id');
    }
}