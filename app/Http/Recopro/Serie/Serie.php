<?php namespace App\Http\Recopro\Serie;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use App\Http\Recopro\Product\Product;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Serie extends Model
{
  
    protected $table = 'ERP_Serie';

    public $timestamps = true;

    protected $primaryKey = 'idSerie';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idSerie', 'nombreSerie','idArticulo','chasis','motor','anio_fabricacion','anio_modelo','color','user_created','user_updated','idTipoCompraVenta','nPoliza','nLoteCompra','cPlacaVeh'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    } 
    public function Product_d()
    {
        return $this->belongsTo(Product::class,'idArticulo');
    }

}