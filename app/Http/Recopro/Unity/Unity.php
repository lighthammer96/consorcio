<?php namespace App\Http\Recopro\Unity;

use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/6/2017
 * Time: 5:28 PM
 */
class Unity extends Model
{
    protected $table = 'UnidadMedida';

    protected $keyType = 'string';

    protected $primaryKey = 'IdUnidadMedida';

    protected $fillable = ['Descripcion', 'EquivalenciaSunat', 'symbol'];

    protected $hidden = [];
}