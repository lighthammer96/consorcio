<?php

namespace App\Http\Recopro\ContestAutonomyApproval;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 15/09/2017
 * Time: 03:13 PM
 */
use App\Http\Recopro\Approval_autonomy\Approval_autonomy;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContestAutonomyApproval extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_ConcursoAutonomiaAprobacion';

    protected $fillable = ['contest_id', 'approval_autonomy_id', 'state', 'user_created', 'user_created', 'user_deleted'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function autonomy_approval()
    {
        return $this->belongsTo(Approval_autonomy::class, 'approval_autonomy_id');
    }
}