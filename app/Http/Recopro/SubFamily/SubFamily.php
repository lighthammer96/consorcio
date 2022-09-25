<?php namespace App\Http\Recopro\SubFamily;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Family\Family;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class SubFamily extends Model
{
  
    protected $table = 'ERP_SubFamilia';

    public $timestamps = true;

    protected $primaryKey = 'idSubFamilia';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idSubFamilia', 'descripcion','estado','user_created','user_updated','idFamilia'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    } 
    public function family_d()
    {
        return $this->belongsTo(Family::class,'idFamilia');
    }

}