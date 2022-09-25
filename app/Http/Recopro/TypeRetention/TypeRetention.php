<?php namespace App\Http\Recopro\TypeRetention;

use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/6/2017
 * Time: 5:36 PM
 */
class TypeRetention extends Model
{
    protected $table = 'TipoRetencion';

    protected $keyType = 'string';

    protected $primaryKey = 'IdTipoRetencion';

    protected $fillable = ['IdTipoRetencion', 'Descripcion', 'Porcentaje', 'IdCuenta', 'Minimo', 'AfectaSaldo', 'IdRegistro'];

    protected $hidden = [];
}