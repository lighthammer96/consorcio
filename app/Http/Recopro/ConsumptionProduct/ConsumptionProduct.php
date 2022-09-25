<?php

namespace App\Http\Recopro\ConsumptionProduct;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 16/08/2017
 * Time: 10:27 AM
 */
use App\Http\Recopro\Consumption\Consumption;
use App\Http\Recopro\Product\Product;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConsumptionProduct extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_ConsumoProducto';

    protected $fillable = ['consumption_id', 'product_id', 'available', 'consumption', 'toConsume', 'code',
        'description', 'unit', 'cost', 'user_created', 'user_created', 'user_deleted'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function Product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function consumption()
    {
        return $this->belongsTo(Consumption::class, 'consumption_id');
    }
}