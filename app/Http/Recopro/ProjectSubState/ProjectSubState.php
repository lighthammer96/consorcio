<?php namespace App\Http\Recopro\ProjectSubState;

use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 09/08/2017
 * Time: 11:35 AM
 */
class ProjectSubState extends Model
{
    public $timestamps = false;

    protected $table = 'ERP_ProyectoSubEstados';

    protected $fillable = ['description'];
}