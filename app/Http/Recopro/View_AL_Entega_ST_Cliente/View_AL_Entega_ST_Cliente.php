<?php namespace App\Http\Recopro\View_AL_Entega_ST_Cliente;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class View_AL_Entega_ST_Cliente extends Model
{
  
    protected $table = 'AL_Entega_ST_Cliente';

    public $timestamps = true;

    protected $primaryKey = 'nro';

    // protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['nro', 'fecha', 'tipooperacion', 'Usuario', 'estado', 'documento', 'cliente'];
    
    // public function user_u()
    // {
    //     return $this->belongsTo(User::class, 'idUsuario');
    // }
}