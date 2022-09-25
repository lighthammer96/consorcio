<?php namespace App\Http\Recopro\ConfigJerarquia;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Shop\Shop;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class ConfigJerarquia extends Model
{
  
    protected $table = 'ERP_ConfiguraAprobCre';

    public $timestamps = true;

    protected $primaryKey = 'nIdAprob';

    protected $keyType = 'string';

    public $incrementing = false;
    
    const CREATED_AT = 'dFecCre';
    const UPDATED_AT = 'dFecMod';
    protected $fillable = ['nIdAprob', 'nIdTienda','dFecIni','dFecFin','nIdTipoSolicitud','cIdUsuCre','cIdUsuMod'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }
     public function shop_u()
    {
        return $this->belongsTo(Shop::class, 'nIdTienda');
    }

}