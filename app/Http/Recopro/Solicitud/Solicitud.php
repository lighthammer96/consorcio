<?php namespace App\Http\Recopro\Solicitud;

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
class Solicitud extends Model
{
   

    protected $table = 'ERP_view_solicitud';

    protected $fillable = ['cCodConsecutivo', 'nConsecutivo', 'fecha_solicitud', 'tipo_solicitud', 'idcliente', 'idmoneda', 'estado', 'tipo_documento', 'documento', 'cliente', 'moneda', 'saldo', 'pagado', 'facturado', 'moneda', 't_monto_total','tipo_comprobante'];
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