<?php namespace App\Http\Recopro\SolicitudCredito;

use App\Http\Recopro\User\User;
// use App\Http\Recopro\Shop\Shop;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:54 PM
 */
class SolicitudCredito extends Model
{
   

    protected $table = 'ERP_view_solicitud_credito';

    protected $fillable = ['cCodConsecutivo', 'nConsecutivo', 'fecha_solicitud', 'tipo_solicitud', 'idcliente', 'idmoneda', 'estado', 'tipo_documento', 'numero_documento', 'cliente', 'moneda', 'saldo', 'pagado', 'facturado', 'moneda', 't_monto_total','tipo_comprobante', 'cuota', 'documento', 'serie'];
    protected $primaryKey = 'cCodConsecutivo';
    protected $keyType = 'string';
    public $incrementing = false;



    
    protected $hidden = ['deleted_at'];

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    // public function tienda_d()
    // {
    //     return $this->belongsTo(Shop::class,'idtienda');
    // }
}