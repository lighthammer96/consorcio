<?php namespace App\Http\Recopro\List_precio_detalle;
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
class List_precio_detalle extends Model
{
  
    protected $table = 'ERP_ListaPreciosDetalle';

    public $timestamps = true;

    protected $primaryKey = 'id_lista';

    protected $keyType = 'string';

    public $incrementing = false;
    const CREATED_AT = 'dFecCre';
    const UPDATED_AT = 'dFecMod';

    protected $fillable = ['id_lista', 'idProducto','nPrecio','cIdUsuCre','cIdUsuMod'];
    
    public function produc_b()
    {
        return $this->belongsTo(Product::class, 'idProducto');
    }
     public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }

}