<?php namespace App\Http\Recopro\Query_stock;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Query_stock extends Model
{
  
    protected $table = 'ERP_VWStockDetalle';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['tipoCompraVenta','code_article','id', 'Articulo','Categoria','Unidad','Almacen','Localizacion','Lote','Serie','Disponible','Remitido','Total','Transito','Costo_Promedio_Unitario','Costo_Total', 'Chasis', 'Motor', 'Color', 'Ano'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}