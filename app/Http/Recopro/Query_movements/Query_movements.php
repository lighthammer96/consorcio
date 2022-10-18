<?php namespace App\Http\Recopro\Query_movements;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Query_movements extends Model
{
  
    protected $table = 'ERP_VWTransaccionDetalle';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['code_article','idTransaccion','id','fecha_registro','fecha_proceso_s','fecha_registro_s','idArticulo','Articulo','Unidad','Categoria','Tipo_Operacion','Naturaleza','Origen','idOrigen','Almacen','Localizacion','Cantidad','Costo_Unitario','Precio_Unitario','Costo_Total','Precio_Total','Lote','Serie', 'Obs'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}