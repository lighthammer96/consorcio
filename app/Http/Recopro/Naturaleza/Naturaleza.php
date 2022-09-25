<?php namespace App\Http\Recopro\Naturaleza;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Naturaleza extends Model
{
  
    protected $table = 'ERP_Naturaleza_Operacion';

    public $timestamps = true;

    protected $primaryKey = 'idNaturaleza';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idNaturaleza', 'descripcion','estado','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}