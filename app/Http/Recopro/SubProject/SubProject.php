<?php namespace App\Http\Recopro\SubProject;

use App\Http\Recopro\Project\Project;
use App\Http\Recopro\SubProjectFront\SubProjectFront;
use App\Http\Recopro\SubProjectLevel\SubProjectLevel;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 01/08/2017
 * Time: 04:33 PM
 */
class SubProject extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_SubProyectos';

    protected $fillable = ['project_id', 'description',
        'user_created', 'user_updated', 'user_deleted', 'deleted_at'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at', 'user_created', 'user_updated', 'user_deleted'];

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function sub_project_fronts()
    {
        return $this->hasMany(SubProjectFront::class);
    }

    public function sub_project_levels()
    {
        return $this->hasMany(SubProjectLevel::class);
    }

    public function sub_project_levels_parents()
    {
        return $this->hasMany(SubProjectLevel::class)->whereNull('parent_id');
    }
}