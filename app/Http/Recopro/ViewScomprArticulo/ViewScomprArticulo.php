<?php namespace App\Http\Recopro\ViewScomprArticulo;

use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:20 AM
 */
class ViewScomprArticulo extends Model
{

    protected $table = 'ERP_view_solicitudCompraArticulo';

    public $timestamps = true;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['fecha_requerida', 'impuesto', 'cCodConsecutivo', 'nConsecutivo', 'idMovimiento', 'consecutivo',
        'idArticulo', 'unidadMedida', 'cantidad', 'articulo'];


}