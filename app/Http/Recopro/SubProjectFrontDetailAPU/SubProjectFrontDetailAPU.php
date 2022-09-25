<?php namespace App\Http\Recopro\SubProjectFrontDetailAPU;

use App\Http\Recopro\AnalysisUnitaryPrice\AnalysisUnitaryPrice;
use App\Http\Recopro\SubProjectFrontDetail\SubProjectFrontDetail;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 26/09/2017
 * Time: 12:47 PM
 */
class SubProjectFrontDetailAPU extends Model
{
    protected $table = 'ERP_SubProyectoFrenteDetalleAPU';

    protected $fillable = ['sub_project_front_detail_id', 'apu_id',
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

    public function subProjectFrontDetail()
    {
        return $this->belongsTo(SubProjectFrontDetail::class);
    }

    public function apu()
    {
        return $this->belongsTo(AnalysisUnitaryPrice::class);
    }
}