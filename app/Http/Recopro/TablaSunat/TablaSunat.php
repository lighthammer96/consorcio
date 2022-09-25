<?php namespace App\Http\Recopro\TablaSunat;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class TablaSunat extends Model
{
  
    protected $table = 'ERP_TABLASUNAT';

    public $timestamps = true;

    protected $primaryKey = 'cNombretabla';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['cNombretabla', 'cCodigo','cDescripcion','cCodigosunat'];

}