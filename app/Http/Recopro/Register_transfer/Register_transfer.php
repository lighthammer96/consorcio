<?php namespace App\Http\Recopro\Register_transfer;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Operation\Operation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Register_transfer extends Model
{
  
    protected $table = 'ERP_Transferencia';

    public $timestamps = true;

    protected $primaryKey = 'idTransferencia';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['idTransferencia','tipoTransferencia','fecha_proceso','fecha_registro','estado','observaciones','user_created','user_updated','idTipoOperacion'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }
    public function Operation()
    {
        return $this->belongsTo(Operation::class, 'idTipoOperacion');
    }
}