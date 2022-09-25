<?php namespace App\Http\Recopro\SubProjectFrontDetail;

use App\Http\Recopro\SubProjectFront\SubProjectFront;
use App\Http\Recopro\SubProjectLevel\SubProjectLevel;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 25/09/2017
 * Time: 05:51 PM
 */
class SubProjectFrontDetail extends Model
{
    protected $table = 'ERP_SubProyectoFrenteDetalle';

    protected $fillable = ['sub_project_front_id', 'sub_project_level_id', 'quantity', 'total', 'price_apu', 'total_apu',
        'user_created', 'user_updated'];

    protected $hidden = ['created_at', 'updated_at', 'user_created', 'user_updated'];

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    public function subProjectFront()
    {
        return $this->belongsTo(SubProjectFront::class);
    }

    public function subProjectLevel()
    {
        return $this->belongsTo(SubProjectLevel::class);
    }

}