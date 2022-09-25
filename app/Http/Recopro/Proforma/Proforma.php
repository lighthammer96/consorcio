<?php namespace App\Http\Recopro\Proforma;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Proforma extends Model
{
  
    protected $table = 'ERP_Proforma';

    public $timestamps = true;

    protected $primaryKey = 'cCodConsecutivo';

    protected $keyType = 'string';

    public $incrementing = false;

     const CREATED_AT = 'dFecCre';
    const UPDATED_AT = 'dFecMod';

    protected $fillable = ['cCodConsecutivo', 'nConsecutivo','cCodConsecutivoOS','nConsecutivoOS','dFechaRegistro','nTotalMO','nTotalDetalle','nSubTotal','nImpuesto','nTotal','iEstado','cIdUsuCre','cIdUsuMod'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }

}