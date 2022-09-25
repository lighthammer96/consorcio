<?php namespace App\Http\Recopro\Modelo;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Brand\Brand;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Modelo extends Model
{
  
    protected $table = 'ERP_Modelo';

    public $timestamps = true;

    protected $primaryKey = 'idModelo';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idModelo', 'descripcion','idMarca','estado','user_created','user_updated'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    } 
    public function Brand_d()
    {
        return $this->belongsTo(Brand::class,'idMarca');
    }

}