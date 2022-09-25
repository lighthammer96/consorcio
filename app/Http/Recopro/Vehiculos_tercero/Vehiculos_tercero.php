<?php namespace App\Http\Recopro\Vehiculos_tercero;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Recopro\Modelo\Modelo;
use App\Http\Recopro\Type_vehiculo\Type_vehiculo;
use App\Http\Recopro\Brand\Brand;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Vehiculos_tercero extends Model
{
  
    protected $table = 'ERP_VehTerceros';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['id', 'idModelo','idMarca','n_chasis','anio_fabricacion','color','placa','user_created','user_updated','motor'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }
    public function marca()
    {
        return $this->belongsTo(Brand::class,'idMarca');
    }
     public function modelo()
    {
        return $this->belongsTo(Modelo::class,'idModelo');
    }
      public function type_vehi()
    {
        return $this->belongsTo(Type_vehiculo::class,'idTipoVehiculo');
    }

}