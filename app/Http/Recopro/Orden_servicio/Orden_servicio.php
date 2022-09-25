<?php namespace App\Http\Recopro\Orden_servicio;
use App\Http\Recopro\User\User;
use App\Http\Recopro\TypeServicioMant\TypeServicioMant;
use App\Http\Recopro\Currency\Currency;
use App\Http\Recopro\Tipo_mantenimiento\Tipo_mantenimiento;
use App\Http\Recopro\Type_vehiculo\Type_vehiculo;
use App\Http\Recopro\PaymentCondition\PaymentCondition;
use App\Http\Recopro\Customer\Customer;
use App\Http\Recopro\Technician\Technician;
use App\Http\Recopro\Adviser\Adviser;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Orden_servicio extends Model
{
  
    protected $table = 'ERP_OrdenServicio';

    public $timestamps = true;

    protected $primaryKey = 'cCodConsecutivo';

    protected $keyType = 'string';

    public $incrementing = false;
    
    const CREATED_AT = 'dFecCre';
    const UPDATED_AT = 'dFecMod';

    protected $fillable = ['cCodConsecutivo', 'nConsecutivo','id_tipo','id_tipomant','IdMoneda','id_tipoveh', 'horaRec','dFecEntrega','horaEnt','cPlacaVeh','cMotor','cChasis','iAnioFab','cColor','idCliente','cObservaciones','idAsesor','iEstado','mo_revision','mo_mecanica','terceros','otros_mo','respuestos','accesorios','lubricantes','otros_rep','total','idcCondicionPago','nkilometraje','idTecnico','dFecRec','cIdUsuMod','IdTipoDocumento'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }
      public function tipo_serv_man()
    {
        return $this->belongsTo(TypeServicioMant::class, 'id_tipo');
    }
  
     public function tipo_mantinimiento()
    {
        return $this->belongsTo(Tipo_mantenimiento::class, 'id_tipomant');
    } 
     public function tipo_moneda()
    {
        return $this->belongsTo(Currency::class, 'IdMoneda');
    } 
     public function tipo_vehiculo()
    {
        return $this->belongsTo(Type_vehiculo::class, 'id_tipoveh');
    }

     public function id_cliente()
    {
        return $this->belongsTo(Customer::class, 'idCliente');
    } 
     public function id_asesor()
    {
        return $this->belongsTo(Adviser::class, 'idAsesor');
    } 
     public function id_tecnico()
    {
        return $this->belongsTo(Technician::class, 'idTecnico');
    } 
     public function id_condicion_pago()
    {
        return $this->belongsTo(PaymentCondition::class, 'idcCondicionPago');
    } 
    //  public function orden_mantenimiento()
    // {
    //     return $this->hasMany(WarehouseUser::class);
    // }


}