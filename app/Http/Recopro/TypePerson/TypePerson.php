<?php namespace App\Http\Recopro\TypePerson;

use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/6/2017
 * Time: 9:23 AM
 */
class TypePerson extends Model
{
    protected $table = 'TipoPersona';

    protected $primaryKey = 'IdTipoPersona';

    protected $fillable = ['Descripcion', 'EquivalenciaSunat', 'Abreviatura'];

    protected $hidden = [];
}