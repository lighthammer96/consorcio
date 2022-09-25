<?php namespace App\Http\Recopro\Warehouse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:54 PM
 */
class Reception extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_Almacen';

    protected $fillable = ['code_internal','description','type','address','frozen','date_frozen','state', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];


}
