<?php namespace App\Http\Recopro\Cajas;

use App\Http\Recopro\User\User;
use App\Http\Recopro\CajaUsuario\CajaUsuario;
use App\Http\Recopro\Shop\Shop;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:54 PM
 */
class Cajas extends Model
{
   

    protected $table = 'ERP_Cajas';

    protected $fillable = ['idcaja', 'nombre_caja', 'usuario', 'activo', 'user_created', 'user_updated', 'user_deleted', 'idtienda'];
    protected $primaryKey = 'idcaja';
    // protected $keyType = 'string';
    protected $hidden = ['deleted_at'];

    public $timestamps = true;

    protected $keyType = 'string';

    public $incrementing = false;
    
    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    public function tienda_d()
    {
        return $this->belongsTo(Shop::class,'idtienda');
    }
    public function usuarios()
    {
        return $this->hasMany(CajaUsuario::class, 'idCaja','idcaja');
    }
}