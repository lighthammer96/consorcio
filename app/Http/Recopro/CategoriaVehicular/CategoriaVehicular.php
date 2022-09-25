<?php namespace App\Http\Recopro\CategoriaVehicular;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class CategoriaVehicular extends Model
{
  
    protected $table = 'ERP_CategoriaVeh';

    public $timestamps = true;

    protected $primaryKey = 'idCatVeh';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idCatVeh', 'descripcion','estado','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}