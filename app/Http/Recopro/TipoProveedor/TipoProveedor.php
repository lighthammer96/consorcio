<?php namespace App\Http\Recopro\TipoProveedor;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class TipoProveedor extends Model
{
  
    protected $table = 'ERP_TipoProveedor';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';
 
    public $incrementing = false;

    const CREATED_AT = 'dFecCre';
    const UPDATED_AT = 'dFecMod';

    protected $fillable = ['id', 'descripcion','cuentaPagar','cuentaCierreDevito','cuentaCierreCredito','estado','cIdUsuCre','cIdUsuMod','cCostoCuentaPagar','cCostoCuentaCieDev','cCostoCuentaCieCre'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }

}