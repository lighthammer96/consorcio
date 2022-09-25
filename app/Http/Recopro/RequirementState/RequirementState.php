<?php namespace App\Http\Recopro\RequirementState;

use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: Jair
 * Date: 06/06/2017
 * Time: 10:14 AM
 */
class RequirementState extends Model
{
    protected $table = 'ERP_RequerimientoEstados';

    protected $fillable = ['description'];

    protected $hidden = ['created_at', 'updated_at'];
}