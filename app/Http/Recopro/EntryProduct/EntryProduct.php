<?php namespace App\Http\Recopro\EntryProduct;

use App\Http\Recopro\Entry\Entry;
use App\Http\Recopro\Product\Product;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 *
 * Created by PhpStorm.
 * User: ever-pc
 * Date: 21/06/2017
 * Time: 10:17 PM
 */
class EntryProduct extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_IngresoProducto';

    protected $fillable = ['entry_id', 'product_id', 'price', 'quantity', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function entry()
    {
        return $this->belongsTo(Entry::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}