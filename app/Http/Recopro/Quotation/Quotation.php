<?php namespace App\Http\Recopro\Quotation;

use App\Http\Recopro\ContestAutonomyApproval\ContestAutonomyApproval;
use App\Http\Recopro\ContestConsolidated\ContestConsolidated;
use App\Http\Recopro\ContestProvider\ContestProvider;
use App\Http\Recopro\ContestProviderDetail\ContestProviderDetail;
use App\Http\Recopro\ContestRequirement\ContestRequirement;
use App\Http\Recopro\QuotationState\QuotationState;
use App\Http\Recopro\TypeChange\TypeChange;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 22/06/2017
 * Time: 12:54 PM
 */
class Quotation extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_Concursos';

    protected $fillable = ['code', 'description', 'quotation_state_id', 'type_change_id', 'approved_by', 'comment_reject',
        'state', 'total', 'user_created', 'user_updated', 'user_deleted', 'deleted_at'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at', 'user_updated', 'user_deleted'];

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    public function quotation_state()
    {
        return $this->belongsTo(QuotationState::class);
    }

    public function contest_requirements()
    {
        return $this->hasMany(ContestRequirement::class, 'contest_id');
    }

    public function contest_providers()
    {
        return $this->hasMany(ContestProvider::class, 'contest_id');
    }

    public function compare_contest_consolidated()
    {
        return $this->hasMany(ContestConsolidated::class, 'contest_id');
    }

    public function type_change()
    {
        return $this->belongsTo(TypeChange::class, 'type_change_id', 'Fecha');
    }

    public function contest_autonomy_approval()
    {
        return $this->hasMany(ContestAutonomyApproval::class, 'contest_id');
    }
}