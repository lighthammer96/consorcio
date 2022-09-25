<?php namespace App\Http\Recopro\Approval_autonomy;

use App\Http\Recopro\ContestAutonomyApproval\ContestAutonomyApproval;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:54 PM
 */
class Approval_autonomy extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_AprobadoresAutonomia';

    protected $fillable = ['from', 'to', 'user_id', 'user_created', 'user_updated', 'user_deleted'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    public function contest_autonomy_approval()
    {
        return $this->hasMany(ContestAutonomyApproval::class);
    }
}
