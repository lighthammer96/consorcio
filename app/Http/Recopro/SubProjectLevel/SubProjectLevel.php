<?php namespace App\Http\Recopro\SubProjectLevel;

use App\Http\Recopro\AnalysisUnitaryPrice\AnalysisUnitaryPrice;
use App\Http\Recopro\Level\Level;
use App\Http\Recopro\Product\Product;
use App\Http\Recopro\SubProject\SubProject;
use App\Http\Recopro\SubProjectFrontDetail\SubProjectFrontDetail;
use App\Http\Recopro\Unity\Unity;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 01/08/2017
 * Time: 05:00 PM
 */
class SubProjectLevel extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_SubProyectoNiveles';

    protected $fillable = ['sub_project_id', 'parent_id', 'level_id', 'code', 'description', 'type', 'type_progress',
        'um_id', 'lb_price', 'lb_quantity', 'lb_total',
        'pv_um_id', 'pv_price', 'pv_quantity', 'pv_total',
        'me_um_id', 'me_price', 'me_quantity', 'me_total',
        'apu_hours_day', 'apu_mo', 'apu_eq', 'apu_hh', 'apu_hq',
        'apu_total_mo', 'apu_total_mat', 'apu_total_eq', 'apu_total_sc',
        'pv_apu_hours_day', 'pv_apu_mo', 'pv_apu_eq', 'pv_apu_hh', 'pv_apu_hq',
        'pv_apu_total_mo', 'pv_apu_total_mat', 'pv_apu_total_eq', 'pv_apu_total_sc',
        'me_apu_hours_day', 'me_apu_mo', 'me_apu_eq', 'me_apu_hh', 'me_apu_hq',
        'me_apu_total_mo', 'me_apu_total_mat', 'me_apu_total_eq', 'me_apu_total_sc',
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

    public function subProject()
    {
        return $this->belongsTo(SubProject::class);
    }

    public function children()
    {
        return $this->hasMany(SubProjectLevel::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(SubProjectLevel::class, 'parent_id');
    }

    public function level()
    {
        return $this->belongsTo(Level::class, 'level_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'level_id', 'code_matrix');
    }

    public function unity()
    {
        return $this->belongsTo(Unity::class, 'um_id', 'IdUnidadMedida');
    }

    public function unity_pv()
    {
        return $this->belongsTo(Unity::class, 'pv_um_id', 'IdUnidadMedida');
    }

    public function unity_me()
    {
        return $this->belongsTo(Unity::class, 'me_um_id', 'IdUnidadMedida');
    }

    public function apu()
    {
        return $this->hasMany(AnalysisUnitaryPrice::class);
    }

    public function front_detail()
    {
        return $this->hasMany(SubProjectFrontDetail::class);
    }
}