<?php namespace App\Http\Recopro\Articulo_Kit;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Product\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Articulo_Kit extends Model
{
  
    protected $table = 'ERP_Articulo_kit';

    public $timestamps = true;

    protected $primaryKey = 'idArticuloKit';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idArticuloKit', 'idArticulo','cantidad','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }
     public function Product()
    {
        return $this->belongsTo(Product::class, 'idArticulo');
    }

}