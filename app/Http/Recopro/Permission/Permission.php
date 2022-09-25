<?php namespace App\Http\Recopro\Permission;

use App\Http\Recopro\Module\Module;
use App\Http\Recopro\Profile\Profile;
use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/4/2017
 * Time: 6:08 PM
 */
class Permission extends Model
{
    protected $table = 'ERP_Permisos';

    protected $fillable = ['profile_id', 'module_id'];

    protected $hidden = ['created_at', 'updated_at'];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}