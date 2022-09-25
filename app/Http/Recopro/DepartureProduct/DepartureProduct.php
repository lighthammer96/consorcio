<?php namespace App\Http\Recopro\DepartureProduct;


/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 22/06/2017
 * Time: 09:46 AM
 */
use App\Http\Recopro\Departure\Departure;
use App\Http\Recopro\Product\Product;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DepartureProduct extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_SalidaProducto';

    protected $fillable = ['departure_id', 'product_id', 'price', 'quantity', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function departure()
    {
        return $this->belongsTo(Departure::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}