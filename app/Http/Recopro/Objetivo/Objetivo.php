<?php namespace App\Http\Recopro\Objetivo;
use App\Http\Recopro\User\User;
use App\Http\Recopro\TypeObjet\TypeObjet;
use App\Http\Recopro\Currency\Currency;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Objetivo extends Model
{
  
    protected $table = 'ERP_Objetivos';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    const CREATED_AT = 'dFecCre';
    const UPDATED_AT = 'dFecMod';
    protected $fillable = ['id', 'descripcion','id_tipoobj','nAno','IdMoneda','cIdUsuCre','cIdUsuMod','iEstado'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }
      public function tipoObjet_c()
    {
        return $this->belongsTo(TypeObjet::class, 'id_tipoobj');
    }
     public function moneda_c()
    {
        return $this->belongsTo(Currency::class, 'IdMoneda');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }

}