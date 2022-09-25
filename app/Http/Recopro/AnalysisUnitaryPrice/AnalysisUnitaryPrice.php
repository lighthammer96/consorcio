<?php namespace App\Http\Recopro\AnalysisUnitaryPrice;

use App\Http\Recopro\Product\Product;
use App\Http\Recopro\SubProjectLevel\SubProjectLevel;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 18/08/2017
 * Time: 03:23 PM
 */
class AnalysisUnitaryPrice extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_AnalisisPreciosUnitarios';

    protected $fillable = ['sub_project_level_id', 'level_id', 'type', 'type_progress', 'is_del',
        'quantity', 'q_unity', 'price', 'partial',
        'pv_quantity', 'pv_q_unity', 'pv_price', 'pv_partial',
        'me_quantity', 'me_q_unity', 'me_price', 'me_partial',
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

    public function subProjectLevel()
    {
        return $this->belongsTo(SubProjectLevel::class);
    }

    public function level()
    {
        return $this->belongsTo(Product::class, 'level_id', 'code_matrix');
    }
}