<?php namespace App\Http\Recopro\ProjectState;

use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 31/07/2017
 * Time: 09:59 AM
 */
class ProjectState extends Model
{
    protected $table = 'ERP_ProyectoEstados';

    protected $fillable = ['description'];

    protected $hidden = ['created_at', 'updated_at'];
}