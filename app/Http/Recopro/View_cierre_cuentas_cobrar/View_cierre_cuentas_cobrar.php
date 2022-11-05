<?php namespace App\Http\Recopro\View_cierre_cuentas_cobrar;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class View_cierre_cuentas_cobrar extends Model
{
  
    protected $table = 'ERP_VW_CierreCuentasCobrar';

    public $timestamps = true;

    protected $primaryKey = 'periodo';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['periodo','estado'];
    
    // public function user_u()
    // {
    //     return $this->belongsTo(User::class, 'idUsuario');
    // }
}