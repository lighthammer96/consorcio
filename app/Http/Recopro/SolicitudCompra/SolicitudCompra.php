<?php namespace App\Http\Recopro\SolicitudCompra;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Area\Area;
use App\Http\Recopro\Operation\Operation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class SolicitudCompra extends Model
{
  
    protected $table = 'ERP_SolicitudCompra';

    public $timestamps = true;

    protected $primaryKey = 'idMovimiento';

    protected $keyType = 'string';

    public $incrementing = false; 

    protected $fillable = ['idMovimiento','fecha_requerida','idTipoOperacion','fecha_registro','fecha_proceso','idUsuario','naturaleza','observaciones','idMoneda','estado','user_created','user_updated','cCodConsecutivo','nConsecutivo','prioridad','idArea'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }
    public function area_c()
    {
        return $this->belongsTo(Area::class, 'idArea');
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