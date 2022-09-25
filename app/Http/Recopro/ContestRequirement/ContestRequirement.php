<?php namespace App\Http\Recopro\ContestRequirement;

use App\Http\Recopro\Quotation\Quotation;
use App\Http\Recopro\Requirement\Requirement;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 03/07/2017
 * Time: 11:37 AM
 */

class ContestRequirement extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_ConcursoRequerimiento';

    protected $fillable = ['contest_id', 'requirement_id',
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

    public function contest()
    {
        return $this->belongsTo(Quotation::class, 'contest_id');
    }

    public function requirement()
    {
        return $this->belongsTo(Requirement::class,'requirement_id');
    }

}