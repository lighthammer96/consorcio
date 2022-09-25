<?php namespace App\Http\Recopro\RequirementLineState;

use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: Jair
 * Date: 06/06/2017
 * Time: 10:48 AM
 */
class RequirementLineState extends Model
{
    protected $table = 'ERP_RequerimientoLineaEstados';

    protected $fillable = ['description'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];
}