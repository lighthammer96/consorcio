<?php namespace App\Http\Recopro\Buyer;

use App\Http\Recopro\State\State;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:54 PM
 */
class Buyer extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_Compradores';

    protected $fillable = ['code', 'state', 'description', 'user_id', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];

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

    public function _state()
    {
        return $this->belongsTo(State::class, 'state', 'id');
    }
}
