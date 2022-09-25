<?php namespace App\Http\Recopro\Operation;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Naturaleza\Naturaleza;
use App\Http\Recopro\Operation_Usuario\Operation_Usuario;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */ 
class Operation extends Model
{
    protected $table = 'ERP_TipoOperacion';

    public $timestamps = true;

    protected $primaryKey = 'idTipoOperacion';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idTipoOperacion', 'descripcion','estado','idNaturaleza','user_created','user_updated','user_deleted','deleted_at'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

     public function naturaleza()
    {
        return $this->belongsTo(Naturaleza::class, 'idNaturaleza');
    }

    public function operacion_usuario()
    {
        return $this->hasMany(Operation_Usuario::class,'idTipoOperacion');
    }
}