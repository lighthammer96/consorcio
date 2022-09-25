<?php namespace App\Http\Recopro\Module;

use App\Http\Recopro\Permission\Permission;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: Ever Carlos Rojas
 * Date: 03/04/2017
 * Time: 03:42 PM
 */
class Module extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_Modulos';

    protected $fillable = ['description', 'url', 'parent_id', 'icon', 'order'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function permissions()
    {
        return $this->hasMany(Permission::class);
    }

    public function parent()
    {
        return $this->belongsTo(Module::class, 'parent_id');
    }
}
