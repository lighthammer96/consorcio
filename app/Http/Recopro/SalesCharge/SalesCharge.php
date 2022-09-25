<?php namespace App\Http\Recopro\SalesCharge;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:54 PM
 */
class SalesCharge extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_Almacen';

    protected $fillable = ['code_internal','description','type_id','address','physical_location','state','frozen','date_frozen','user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];


}
