<?php namespace App\Http\Recopro\Type;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 5:30 PM
 */
class Type extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_Tipos';

    protected $fillable = ['description', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];
}