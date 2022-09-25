<?php namespace App\Http\Recopro\Register_movement;
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
class Register_movement extends Model
{
  
    protected $table = 'ERP_Movimiento';

    public $timestamps = true;

    protected $primaryKey = 'idMovimiento';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idMovimiento','idTipoOperacion','fecha_registro','fecha_proceso','idUsuario','naturaleza','observaciones','consecutivo','idMoneda','estado','user_created','user_updated','cCodConsecutivo','nConsecutivo'];
    
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