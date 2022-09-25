<?php namespace App\Http\Recopro\SubProjectFront;

use App\Http\Recopro\Front\Front;
use App\Http\Recopro\SubProject\SubProject;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 01/08/2017}
 * Time: 04:56 PM
 */
class SubProjectFront extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_SubProyectoFrentes';

    protected $fillable = ['sub_project_id', 'front_id',
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

    public function subProject()
    {
        return $this->belongsTo(SubProject::class);
    }

    public function front()
    {
        return $this->belongsTo(Front::class);
    }
}