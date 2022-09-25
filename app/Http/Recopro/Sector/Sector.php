<?php namespace App\Http\Recopro\Sector;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Ubigeo\Ubigeo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Sector extends Model
{
    protected $table = 'ERP_Sector';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['id', 'descripcion', 'ubigeo', 'estado','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }
     public function ubigeo_u()
    {
        return $this->belongsTo(Ubigeo::class, 'ubigeo');
    }

}