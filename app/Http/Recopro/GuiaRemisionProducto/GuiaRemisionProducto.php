<?php namespace App\Http\Recopro\GuiaRemisionProducto;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class GuiaRemisionProducto extends Model
{
  
    protected $table = 'ERP_GuiaRemisionProducto';

    public $timestamps = true;

    protected $primaryKey = 'cCodConsecutivo';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['cCodConsecutivo','idlote','idarticulo','cantidad','nConsecutivo','consecutivo','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}