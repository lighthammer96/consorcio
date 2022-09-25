<?php namespace App\Http\Recopro\Ubigeo;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Ubigeo extends Model
{
  
    protected $table = 'ERP_Ubigeo';

    public $timestamps = true;

    protected $primaryKey = 'cCodUbigeo';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['cCodUbigeo', 'cDepartamento','cProvincia','cDistrito'];
    
    //  public function user_c()
    // {
    //     return $this->belongsTo(User::class, 'user_created');
    // }

    // public function user_u()
    // {
    //     return $this->belongsTo(User::class, 'user_updated');
    // }

}