<?php

namespace App\Http\Recopro\ReferralGuideProduct;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 25/07/2017
 * Time: 12:21 PM
 */
use App\Http\Recopro\Product\Product;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReferralGuideProduct extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_GuiaRemisionProducto';

    protected $fillable = ['referral_guide_id', 'transfer_id', 'product_id', 'code', 'description', 'unit', 'cost', 'quantity',
        'user_created', 'user_updated', 'user_deleted', 'deleted_at'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at', 'user_created', 'user_updated', 'user_deleted'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
