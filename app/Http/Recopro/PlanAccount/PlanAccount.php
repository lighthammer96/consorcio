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

    protected $keyType = 'string';

    protected $primaryKey = 'IdCuenta';

    protected $fillable = [];

    protected $hidden = [];



}