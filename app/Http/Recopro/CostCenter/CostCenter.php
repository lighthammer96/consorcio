<?php namespace App\Http\Recopro\CostCenter;

use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 13/10/2017
 * Time: 04:32 PM
 */
class CostCenter extends Model
{
    protected $table = 'CentroCosto';

    public $timestamps = false;

    protected $primaryKey = 'IdCentroCosto';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['IdCentroCosto', 'Descripcion', 'Estado'];
}