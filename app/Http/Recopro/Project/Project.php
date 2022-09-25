<?php namespace App\Http\Recopro\Project;

use App\Http\Recopro\ApproverProject\ApproverProject;
use App\Http\Recopro\ApproverProjectDetail\ApproverProjectDetail;
use App\Http\Recopro\Entity\Entity;
use App\Http\Recopro\ProjectConsolidated\ProjectConsolidated;
use App\Http\Recopro\ProjectGGT\ProjectGGT;
use App\Http\Recopro\ProjectState\ProjectState;
use App\Http\Recopro\ProjectSubState\ProjectSubState;
use App\Http\Recopro\SubProject\SubProject;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Jair
 * Date: 08/06/2017
 * Time: 10:38 AM
 */
class Project extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_Proyectos';

    protected $fillable = ['code', 'description', 'project_state_id', 'client_id', 'date_start', 'date_end',
        'cost_load', 'gg_direct', 'gg_indirect', 'transport', 'utils', 'days', 'sub_state_id',
        'apu_materials', 'apu_equipment',
        'total_lb', 'total_pv', 'total_meta',
        'user_created', 'user_updated', 'user_deleted', 'deleted_at'];

    protected $hidden = ['updated_at', 'deleted_at', 'user_created', 'user_updated', 'user_deleted'];

    public function consolidated()
    {
        return $this->hasMany(ProjectConsolidated::class);
    }

    public function project_state()
    {
        return $this->belongsTo(ProjectState::class);
    }

    public function project_sub_state()
    {
        return $this->belongsTo(ProjectSubState::class, 'sub_state_id');
    }

    public function client()
    {
        return $this->belongsTo(Entity::class, 'client_id');
    }

    public function subProjects()
    {
        return $this->hasMany(SubProject::class);
    }

    public function approvers()
    {
        return $this->hasMany(ApproverProject::class);
    }

    public function approvers_detail_id()
    {
        return $this->hasMany(ApproverProjectDetail::class);
    }

    public function approvers_detail_sub_state()
    {
        return $this->hasMany(ApproverProjectDetail::class, 'sub_state_id', 'sub_state_id');
    }

    public function approvers_detail()
    {
        return $this->approvers_detail_sub_state()->union($this->approvers_detail_id()->toBase());
    }

    public function projectGGT()
    {
        return $this->hasMany(ProjectGGT::class);
    }

    public function projectGG()
    {
        return $this->hasMany(ProjectGGT::class);
    }

    public function projectT()
    {
        return $this->hasMany(ProjectGGT::class);
    }
}