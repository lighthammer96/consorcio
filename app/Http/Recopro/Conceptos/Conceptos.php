<?php namespace App\Http\Recopro\Conceptos;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Conceptos extends Model
{
  
    protected $table = 'ERP_Conceptos';

    public $timestamps = true;

    protected $primaryKey = 'idconcepto';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idconcepto', 'descripcion', 'cuenta_contable', 'centro_costo','estado','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}