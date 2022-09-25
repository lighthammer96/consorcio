<?php namespace App\Http\Recopro\ProductBrand;
use App\Http\Recopro\Brand\Brand;
use App\Http\Recopro\Product\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/6/2017
 * Time: 4:21 PM
 */
class ProductBrand extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_MarcaProducto';

    protected $fillable = ['product_id', 'brand_id', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}