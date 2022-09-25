<?php namespace App\Http\Recopro\ViewPersona;
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
class ViewPersona extends Model
{
  
    protected $table = 'ERP_VIEW_PERSONA';

    public $timestamps = true;

    protected $primaryKey = 'idPersona';

    protected $keyType = 'string'; 

    public $incrementing = false;

    protected $fillable = ['idPersona','cNumerodocumento','cTipopersona','cTipodocumento','cRazonsocial','cNombrePersona','cDepartamento','created_at','cProvincia','cDistrito','TipoPersona','cTipopersona','TipoDocumento','cNombres'];
    
     

}