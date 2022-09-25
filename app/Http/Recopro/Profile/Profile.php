<?php namespace App\Http\Recopro\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/3/2017
 * Time: 12:10 PM
 */
class Profile extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_Perfiles';

    protected $fillable = ['description', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];
}
