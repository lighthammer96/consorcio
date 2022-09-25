<?php namespace App\Http\Recopro\QualitycontrolRevision;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Revision_ca\Revision_ca;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class QualitycontrolRevision extends Model
{
  
    protected $table = 'ERP_ControlCalidadRevision';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

    const CREATED_AT = 'dFecCre';
    const UPDATED_AT = 'dFecMod';

    protected $fillable = ['id', 'idControlCalidad','iRevisado','idrevision','cIdUsuCre','cIdUsuMod'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }
    public function revision()
    {
        return $this->belongsTo(Revision_ca::class, 'idrevision');
    }

}