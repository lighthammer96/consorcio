<?php namespace App\Http\Recopro\ReporteComisiones;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class ReporteComisiones extends Model
{ 
  
    protected $table = 'VTA_ReporteComision';

    public $timestamps = true;

    protected $primaryKey = 'IdVendedor';

    protected $keyType = 'string';
 
    public $incrementing = false; 

    protected $fillable = ['IdVendedor','Vendedor','IdCliente', 'Cliente','Documento','Numero', 'FechaDoc','Monto','TipoCambio','Moneda','PorcComision','ComisionSoles','CondPago','Vehiculo','Convenio','PrecioLista','Descuento'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}