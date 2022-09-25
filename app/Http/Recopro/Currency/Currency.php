<?php namespace App\Http\Recopro\Currency;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Currency extends Model
{
  
    protected $table = 'ERP_Moneda';

    public $timestamps = true;

    protected $primaryKey = 'IdMoneda';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [ 'Descripcion', 'Simbolo', 'EquivalenciaSunat', 'Estado', 'Abreviatura','user_created','user_updated','user_deleted','deleted_at'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}