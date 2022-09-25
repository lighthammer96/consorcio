<?php namespace App\Http\Recopro\View_movimiento;
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
class View_movimiento extends Model
{
  
    // protected $table = 'ERP_view_movimiento';
    protected $table = 'AL_Movimientos';

    public $timestamps = true;

    // protected $primaryKey = 'idMovimiento';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['Id','Fecha','Usuario','Operacion','Estado', 'Observacion'];
    
    //  public function user_c()
    // {
    //     return $this->belongsTo(User::class, 'user_created');
    // }
    // public function user_d()
    // {
    //     return $this->belongsTo(User::class, 'idUsuario');
    // }
    // public function Operation()
    // {
    //     return $this->belongsTo(Operation::class, 'idTipoOperacion');
    // }
    // public function user_u()
    // {
    //     return $this->belongsTo(User::class, 'user_updated');
    // }

}