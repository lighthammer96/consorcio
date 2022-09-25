<?php namespace App\Http\Recopro\Requirement;

use App\Http\Recopro\Buyer\Buyer;
use App\Http\Recopro\ContestRequirement\ContestRequirement;
use App\Http\Recopro\Project\Project;
use App\Http\Recopro\RequirementDetail\RequirementDetail;
use App\Http\Recopro\RequirementLineState\RequirementLineState;
use App\Http\Recopro\RequirementState\RequirementState;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Jair
 * Date: 08/06/2017
 * Time: 12:36 PM
 */
class Requirement extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_Requerimientos';

    protected $fillable = ['code', 'date_registration', 'date_required', 'project_id', 'requirement_state_id',
        'requirement_line_state_id', 'requested_by', 'approved_by', 'observation', 'buyer_id',
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

    public function approved()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function requirement_state()
    {
        return $this->belongsTo(RequirementState::class);
    }

    public function requirement_state_line()
    {
        return $this->belongsTo(RequirementLineState::class, 'requirement_line_state_id');
    }

    public function detail()
    {
        return $this->hasMany(RequirementDetail::class);
    }

    public function buyer()
    {
        return $this->belongsTo(Buyer::class);
    }

    public function contest_requirements()
    {
        return $this->hasMany(ContestRequirement::class, 'requirement_id');
    }
}