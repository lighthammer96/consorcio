<?php namespace App\Http\Recopro\PlanAccount;

use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/7/2017
 * Time: 12:24 AM
 */
class PlanAccount extends Model
{
    protected $table = 'PlanCuentas';

    public $timestamps = false;

    protected $primaryKey = 'IdCuenta';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['IdCuenta', 'NombreCuenta', 'IdCuentaPadre'];



}