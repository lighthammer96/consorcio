<?php namespace App\Http\Recopro\TypeDocumentIdentity;

use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/6/2017
 * Time: 9:32 AM
 */
class TypeDocumentIdentity extends Model
{
    protected $table = 'TipoDocumentoIdentidad';

    protected $primaryKey = 'IdTipoDocumentoIdentidad';

    protected $fillable = ['Descripcion', 'EquivalenciaSunat', 'Tamano', 'MostrarBotonSunat', 'Abreviatura'];

    protected $hidden = [];
}