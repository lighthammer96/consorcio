<?php namespace App\Http\Recopro\Measure;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Measure extends Model
{
    
    protected $table = 'ERP_UnidadMedida';

    public $timestamps = true;

    protected $primaryKey = 'IdUnidadMedida';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['IdUnidadMedida', 'Descripcion','EquivalenciaSunat','user_created','user_updated','user_deleted','deleted_at','Abreviatura'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}