<?php namespace App\Http\Recopro\HeadAccountan;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Http\Recopro\Accoudet\Accoudet;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class HeadAccountan extends Model
{
  
    protected $table = 'ERP_GrupoContableCabecera';

    public $timestamps = true;

    protected $primaryKey = 'idGrupoContableCabecera';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idGrupoContableCabecera', 'descripcion','estado','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }
     public function headDeta()
    {
        return $this->hasMany(Accoudet::class, 'idGrupoContableCabecera', 'idGrupoContableCabecera');
    }

}