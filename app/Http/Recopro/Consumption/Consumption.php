<?php

namespace App\Http\Recopro\Consumption;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 16/08/2017
 * Time: 09:55 AM
 */
use App\Http\Recopro\ConsumptionProduct\ConsumptionProduct;
use App\Http\Recopro\Front\Front;
use App\Http\Recopro\Project\Project;
use App\Http\Recopro\Requirement\Requirement;
use App\Http\Recopro\User\User;
use App\Http\Recopro\Warehouse\Warehouse;
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Consumption extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_Consumo';

    protected $fillable = ['code', 'date', 'user_id', 'warehouse_id', 'observation', 'state_description', 'project_id',
        'requirement_id', 'front_id', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];

    public function consumptionProduct()
    {
        return $this->hasMany(ConsumptionProduct::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function requirement()
    {
        return $this->belongsTo(Requirement::class, 'requirement_id');
    }

    public function front()
    {
        return $this->belongsTo(Front::class, 'front_id');
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