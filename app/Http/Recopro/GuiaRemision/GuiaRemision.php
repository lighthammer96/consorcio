<?php namespace App\Http\Recopro\GuiaRemision;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Operation\Operation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class GuiaRemision extends Model
{
  
    protected $table = 'ERP_GuiaRemision';

    public $timestamps = true;

    protected $primaryKey = 'cCodConsecutivo';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['cCodConsecutivo','cCodConsecutivo','puntoPartida','fechaEmision','fechaInicioTraslado','costoMini','puntoLlega','razonSocialDestinatario','rucDestinatario','estado','marca','placa','nroConstanciaInscripcion','nroLicenciaConductor','razonSocialEtransporte','rucEtransporte','idtraslado','user_created','user_updated','cCodConsecutivo','nConsecutivo'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }
    public function user_d()
    {
        return $this->belongsTo(User::class, 'idUsuario');
    }
    public function Operation()
    {
        return $this->belongsTo(Operation::class, 'idTipoOperacion');
    }
    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}