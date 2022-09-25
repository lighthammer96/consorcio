<?php namespace App\Http\Recopro\Accoudet;
use App\Http\Recopro\User\User;
use App\Http\Recopro\HeadAccountan\HeadAccountan;
use App\Http\Recopro\Operation\Operation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Accoudet extends Model
{
  
    protected $table = 'ERP_GruContableDetalle';

    public $timestamps = true;

    protected $primaryKey = 'idGrupoContableCabecera';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idGrupoContableCabecera', 'idTipoOperacion','cuenta','centrocosto','user_created','user_updated','identificador'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    } 

     public function grupoContable_c()
    {
        return $this->belongsTo(HeadAccountan::class, 'idGrupoContableCabecera');
    }

    public function operacion_u()
    {
        return $this->belongsTo(Operation::class, 'idTipoOperacion');
    } 
    // public function family_d()
    // {
    //     return $this->belongsTo(Family::class,'idFamilia');
    // }

}