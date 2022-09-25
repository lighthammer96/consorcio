<?php namespace App\Http\Recopro\VisitaCliente;

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
class VisitaCliente extends Model
{
   

    protected $table = 'ERP_view_visita_cliente';

    protected $fillable = ['id', 'fechareg', 'cobrador', 'estado'];
    protected $primaryKey = 'id';
    // protected $keyType = 'string';
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