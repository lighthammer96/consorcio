<?php namespace App\Http\Recopro\List_precio;
use App\Http\Recopro\User\User;
use App\Http\Recopro\TypeCostumer\TypeCostumer;
use App\Http\Recopro\Currency\Currency;
use App\Http\Recopro\List_precio_detalle\List_precio_detalle;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class List_precio extends Model
{
  
    protected $table = 'ERP_ListaPrecios';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;
    
     const CREATED_AT = 'dFecCre';
    const UPDATED_AT = 'dFecMod';

    protected $fillable = ['id', 'descripcion','iEstado','id_tpocli','IdMoneda','dFecVigIni','dFecVigFin','cIdUsuCre','cIdUsuMod'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }
    public function type_customer()
    {
        return $this->belongsTo(TypeCostumer::class, 'id_tpocli');
    }
      public function currency()
    {
        return $this->belongsTo(Currency::class, 'IdMoneda');
    }
     public function list_precDet()
    {
        return $this->hasMany(List_precio_detalle::class, 'id_lista','id');
    }

}