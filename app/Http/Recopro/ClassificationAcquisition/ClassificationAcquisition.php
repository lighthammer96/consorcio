<?php

namespace App\Http\Recopro\ClassificationAcquisition;

use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: EVER C.R.
 * Date: 11/10/2017
 * Time: 12:35 PM
 */
class ClassificationAcquisition extends Model
{
    protected $table = 'ClasificacionBSAdquiridos';

    protected $primaryKey = 'IdClasificacionBSAdquiridos';

    protected $keyType = 'string';

    protected $fillable = ['IdClasificacionBSAdquiridos', 'Descripcion', 'EquivalenciaSunat', 'Estado'];

    protected $hidden = [];

}