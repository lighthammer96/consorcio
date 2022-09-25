<?php

namespace App\Http\Recopro\ConsumerReturn;

/**
 * Created by PhpStorm.
 * User: ever-pc
 * Date: 16/08/2017
 * Time: 10:45 PM
 */
use App\Http\Recopro\ConsumerReturnProduct\ConsumerReturnProduct;
use App\Http\Recopro\Front\Front;
use App\Http\Recopro\Project\Project;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Warehouse\Warehouse;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConsumerReturn extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_DevolucionConsumo';

    protected $fillable = ['date', 'user_id', 'warehouse_id', 'observation', 'project_id', 'front_id', 'state_description',
        'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];

    public function ConsumerReturnProduct()
    {
        return $this->hasMany(ConsumerReturnProduct::class);
    }

    public function front()
    {
        return $this->belongsTo(Front::class, 'front_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id');
    }

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
}


