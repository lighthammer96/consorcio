<?php namespace App\Http\Recopro\TypeConsecutive;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class TypeConsecutive extends Model
{
  
    protected $table = 'ERP_TipoConsecutivos';

    public $timestamps = true;

    protected $primaryKey = 'cCodTipoCons';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['cCodTipoCons', 'cTipoConsecutivo','cObservación','cIdUsuCre','cIdUsuMod'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }

}