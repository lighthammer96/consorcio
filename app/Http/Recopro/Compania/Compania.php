<?php namespace App\Http\Recopro\Compania;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Compania extends Model
{
  
    protected $table = 'ERP_Compania';

    public $timestamps = true;

    protected $primaryKey = 'IdCompania';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['IdCompania','RutaLog','RutaData','FechaUltBackup','Estado','Base','Correo','Contacto','lema1','lema2','direcciones_oficinas','Telefono4','Telefono3','Telefono2','RazonSocial','NombreComercial','Direccion','Ruc','Telefono1','user_created','user_updated', 'ruta_logo', 'ubigeo', 'departamento', 'provincia', 'distrito', 'pie_1', 'pie_2', 'pie_3'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}