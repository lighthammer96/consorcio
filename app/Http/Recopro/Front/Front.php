<?php namespace App\Http\Recopro\Front;

use App\Http\Recopro\Entity\Entity;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:54 PM
 */
class Front extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_Frentes';

    protected $fillable = ['code', 'description', 'detail', 'entity_id', 'state',
        'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];

    public function entity()
    {
        return $this->belongsTo(Entity::class, 'entity_id', 'IdEntidad');
    }

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

}
