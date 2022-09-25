<?php namespace App\Http\Recopro\Aprobacion;

use App\Http\Recopro\User\User;
use App\Http\Recopro\Shop\Shop;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Recopro\AprobacionUsuario\AprobacionUsuario;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:54 PM
 */
class Aprobacion extends Model
{
   

    protected $table = 'ERP_Aprobacion';

    protected $fillable = ['idaprobacion', 'nombre_aprobacion', 'user_created', 'user_updated', 'user_deleted', 'idtienda'];
    protected $primaryKey = 'idaprobacion';
    // protected $keyType = 'string';
    public $timestamps = true;
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

    public function tienda_d()
    {
        return $this->belongsTo(Shop::class,'idtienda');
    }
     public function usuarios()
    {
        return $this->hasMany(AprobacionUsuario::class, 'idAprobacion','idaprobacion');
    }
}