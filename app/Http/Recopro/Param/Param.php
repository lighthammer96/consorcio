<?php namespace App\Http\Recopro\Param;

use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 5/19/2017
 * Time: 5:04 PM
 */
class Param extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_Parametros';

    protected $fillable = ['value', 'description', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];


    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }
}