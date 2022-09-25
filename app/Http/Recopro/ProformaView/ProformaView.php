<?php namespace App\Http\Recopro\ProformaView;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class ProformaView extends Model
{
  
    protected $table = 'ERP_view_proforma';



    protected $fillable = ['cCodConsecutivo', 'nConsecutivo','cCodConsecutivoOS','nConsecutivoOS','dFechaRegistro','nTotalMO','nTotalDetalle','nSubTotal','nImpuesto','nTotal','iEstado','cIdUsuCre','cIdUsuMod', 'razonsocial_cliente'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }

}