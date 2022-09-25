<?php namespace App\Http\Recopro\View_OrdenServicio;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class View_OrdenServicio extends Model
{
  
    protected $table = 'ST_VWOrdenServicio';

    public $timestamps = true;

    protected $primaryKey = 'ident';

    protected $keyType = 'string';

    public $incrementing = false;

 
    protected $fillable = ['cCodConsecutivo', 'nConsecutivo','cPlacaVeh','iEstado','dFecRec','cliente'];

}