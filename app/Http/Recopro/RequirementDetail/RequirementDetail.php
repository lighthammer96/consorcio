<?php namespace App\Http\Recopro\RequirementDetail;

use App\Http\Recopro\ProjectConsolidated\ProjectConsolidated;
use App\Http\Recopro\Requirement\Requirement;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 14/06/2017
 * Time: 10:05 AM
 */
class RequirementDetail extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_RequerimientosDetalle';

    protected $fillable = ['requirement_id', 'project_consolidated_id', 'quantity_requested', 'quantity_served',
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

    public function requirement()
    {
        return $this->belongsTo(Requirement::class);
    }

    public function project_consolidated()
    {
        return $this->belongsTo(ProjectConsolidated::class);
    }

}