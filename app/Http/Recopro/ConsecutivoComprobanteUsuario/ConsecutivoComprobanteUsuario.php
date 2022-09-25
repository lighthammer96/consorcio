<?php namespace App\Http\Recopro\ConsecutivoComprobanteUsuario;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class ConsecutivoComprobanteUsuario extends Model
{
  
    protected $table = 'ERP_ConsecutivoComprobanteUsuario';

    public $timestamps = true;

    protected $primaryKey = 'idConsecutivo';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idConsecutivo', 'idUsuario','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }
    public function user_comp()
    {
        return $this->belongsTo(User::class, 'idUsuario');
    }

}