<?php namespace App\Http\Recopro\View_Movimiento_Conformidad_Compra;
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
class View_Movimiento_Conformidad_Compra extends Model
{
  
    protected $table = 'ERP_View_Movimiento_Conformidad_Compra';

    public $timestamps = true;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idMovimiento', 'idTipoOperacion','idUsuario','estado','cCodConsecutivo','nConsecutivo','created_at','user_created','user_updated'];

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