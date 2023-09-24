<?php

namespace App\Http\Recopro\DocumentType;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/07/2017
 * Time: 10:24 AM
 */
use \Illuminate\Database\Eloquent\Model;

class DocumentType extends Model
{

    protected $table = 'ERP_TipoDocumento';

    protected $primaryKey = 'IdTipoDocumento';

    protected $keyType = 'string';

    protected $fillable = ['IdTipoDocumento','Descripcion', 'EquivalenciaSunat', 'Referencia'];

    public $timestamps = false;

}