<?php namespace App\Http\Recopro\AprobacionTotal;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class AprobacionTotal extends Model
{
  
    protected $table = 'ERP_VW_AprobacionTotal';

    public $timestamps = true;

    protected $primaryKey = 'idcliente';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idcliente', 'idMoneda','moneda','saldoTotal'];
    
     

}