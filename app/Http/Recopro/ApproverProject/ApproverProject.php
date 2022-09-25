<?php namespace App\Http\Recopro\ApproverProject;

use App\Http\Recopro\ApproverProjectDetail\ApproverProjectDetail;
use App\Http\Recopro\Project\Project;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 22/08/2017
 * Time: 10:56 AM
 */
class ApproverProject extends Model
{
    protected $table = 'ERP_ProyectoAprobadores';

    protected $fillable = ['project_id', 'user_id', 'approve'];

    // Approve:
    // 1. All
    // 2. LB
    // 3. PV
    // 4. Meta

    protected $hidden = ['created_at', 'updated_at'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function detail()
    {
        return $this->hasMany(ApproverProjectDetail::class);
    }
}