<?php namespace App\Http\Recopro\SolicitudCronograma;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class SolicitudCronograma extends Model
{
  
    protected $table = 'ERP_SolicitudCronograma';

    public $timestamps = true;

    protected $primaryKey = 'cCodConsecutivo';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['cCodConsecutivo', 'nConsecutivo','nrocuota','fecha_vencimiento','valor_cuota','int_moratorio','saldo_cuota','monto_pago','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}