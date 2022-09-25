<?php namespace App\Http\Recopro\Persona;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Ubigeo\Ubigeo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Recopro\TablaSunat\TablaSunat;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Persona extends Model
{
  
    protected $table = 'ERP_Persona';

    public $timestamps = true;

    protected $primaryKey = 'idPersona';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idPersona', 'cTipopersona','cTipodocumento','cNumerodocumento','dFechacaducidad','cDigitoVerificador','cDireccion','cReferencia','cRegion','cProvincia','cUbigeo','cEmail','cCelular','dFechanacimiento','cEstadoCivil','cApepat','cApemat','cNombres','cRazonsocial','cNombrePersona','cSexo','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }
      public function ubigeo_u()
    {
        return $this->belongsTo(Ubigeo::class, 'cUbigeo');
    }
       public function tipo_u()
    {
         
        $ft=$this->belongsTo(TablaSunat::class, 'cTipodocumento','cCodigo');
        return $ft->where('cnombretabla','TIPO_DOCUMENTO');
    }
      public function tipo_per()
    {
         
        $ft=$this->belongsTo(TablaSunat::class, 'cTipopersona','cCodigo');
        return $ft->where('cnombretabla','TIPO_PERSONA');
    }

}