<?php namespace App\Http\Recopro\Quality_control;
use App\Http\Recopro\User\User;
use App\Http\Recopro\QualitycontrolRevision\QualitycontrolRevision;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Quality_control extends Model
{
  
    protected $table = 'ERP_ControlCalidad';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    const CREATED_AT = 'dFecCre';
    const UPDATED_AT = 'dFecMod';
    
    protected $fillable = ['id', 'cCodConsecutivoOS','nConsecutivoOS','dFechaRegistro','iEstado','cOtros','cIdUsuCre','cIdUsuMod'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }
  
     public function Quality_control_revision()
    {
        return $this->hasMany(QualitycontrolRevision::class,'idControlCalidad');
    }

}