<?php namespace App\Http\Recopro\Stock;

/**
 * Created by PhpStorm.
 * User: ever-pc
 * Date: 26/06/2017
 * Time: 07:50 PM
 */
use App\Http\Recopro\Product\Product;
use App\Http\Recopro\Product\ProductInterface;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Warehouse\Warehouse;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Stock extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_Stock';

    protected $fillable = ['product_id', 'warehouse_id', 'stock', 'stock_transit', 'stock_available', 'condition', 'state_id', 'user_created',
        'user_updated', 'user_deleted', 'deleted_at'];

    protected $hidden = ['deleted_at'];

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
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