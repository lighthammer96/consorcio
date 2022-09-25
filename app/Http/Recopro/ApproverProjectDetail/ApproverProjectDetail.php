<?php namespace App\Http\Recopro\ApproverProjectDetail;

use App\Http\Recopro\ApproverProject\ApproverProject;
use App\Http\Recopro\Project\Project;
use App\Http\Recopro\ProjectSubState\ProjectSubState;
use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 28/08/2017
 * Time: 12:00 PM
 */
class ApproverProjectDetail extends Model
{
    protected $table = 'ERP_ProyectoAprobadoresDetalle';

    protected $fillable = ['project_id', 'approver_project_id', 'sub_state_id'];

    // SubState:
    // 2. LB
    // 4. PV
    // 6. Meta

    protected $hidden = ['created_at', 'updated_at'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function approver_project()
    {
        return $this->belongsTo(ApproverProject::class);
    }

    public function sub_state()
    {
        return $this->belongsTo(ProjectSubState::class);
    }
}