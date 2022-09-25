<?php namespace App\Http\Recopro\TypeWarehouse;

use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 5/17/2017
 * Time: 9:33 AM
 */
class TypeWarehouse extends Model
{
    protected $table = 'ERP_TipoAlmacen';

    protected $fillable = ['description'];

    public $timestamps = false;
}