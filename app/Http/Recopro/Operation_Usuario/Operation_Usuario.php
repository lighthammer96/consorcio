<?php namespace App\Http\Recopro\Operation_Usuario;
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
class Operation_Usuario extends Model
{
  
    protected $table = 'ERP_TipoOperacionUsuario';

    public $timestamps = true;

    protected $primaryKey = 'idTipoOperacion';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idTipoOperacion', 'idUsuario','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

     public function user_p()
    {
        return $this->belongsTo(User::class, 'idUsuario');
    }
     
     public function operation()
    {
        return $this->belongsTo(Operation::class, 'idTipoOperacion');
    }

}