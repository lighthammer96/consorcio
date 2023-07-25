<?php

namespace App\Http\Recopro\OperationDestination;

use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: EVER C.R
 * Date: 11/10/2017
 * Time: 03:34 PM
 */
class OperationDestination extends Model
{
    protected $table = 'DestinoOperacion';

    protected $keyType = 'string';

    protected $primaryKey = 'IdDestinoOperacion';

    protected $fillable = ['IdDestinoOperacion', 'IdRegistro', 'Descripcion', 'DescripcionCompleta', 'GeneraIGV'];

    protected $hidden = [];
}