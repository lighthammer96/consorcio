<?php namespace App\Http\Recopro\ProjectConsolidated;

use App\Http\Recopro\Product\Product;
use App\Http\Recopro\Project\Project;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 13/06/2017
 * Time: 10:34 AM
 */
class ProjectConsolidated extends Model
{
    protected $table = 'ERP_ProyectosConsolidado';

    protected $fillable = ['project_id', 'article_id', 'quantity_requested', 'quantity_served', 'price', 'is_del',
        'level_id', 'project_balance', 'total', 'lb_price', 'lb_quantity', 'lb_total', 'pv_price',
        'pv_quantity', 'pv_total',
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

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function article()
    {
        return $this->belongsTo(Product::class, 'article_id');
    }
}