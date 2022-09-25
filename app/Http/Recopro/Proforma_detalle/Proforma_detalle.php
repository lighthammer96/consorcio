<?php namespace App\Http\Recopro\Proforma_detalle;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class Proforma_detalle extends Model
{
  
    protected $table = 'ERP_ProformaDetalle';

    public $timestamps = true;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;
     const CREATED_AT = 'dFecCre';
    const UPDATED_AT = 'dFecMod';

    protected $fillable = ['id', 'cCodConsecutivo','nConsecutivo','idProducto','nCant','nPrecioUnitario','nTotal','nCantidadEntregada','nCantidadPendienteEntregar','nCantidadDevuelta','nCantidadPendienteDevolver','id_tipototal','cIdUsuCre','cIdUsuMod'];
    
     public function user_c()
    {
        return $this->belongsTo(User::class, 'cIdUsuCre');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'cIdUsuMod');
    }

}