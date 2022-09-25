<?php namespace App\Http\Recopro\ProjectGGT;

use App\Http\Recopro\Level\Level;
use App\Http\Recopro\Product\Product;
use App\Http\Recopro\Project\Project;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 14/09/2017
 * Time: 04:51 PM
 */
class ProjectGGT extends Model
{
    protected $table = 'ERP_ProyectoGGT';

    protected $fillable = ['project_id', 'type', 'level_id', 'price', 'quantity', 'total', 'participation', 'months',
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

    public function product()
    {
        return $this->belongsTo(Product::class, 'level_id', 'code_matrix');
    }

    public function level()
    {
        return $this->belongsTo(Level::class, 'level_id');
    }
}