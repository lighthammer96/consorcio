<?php namespace App\Http\Recopro\TiposMovimiento;

use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:54 PM
 */
class TiposMovimiento extends Model
{
   

    protected $table = 'ERP_TiposMovimiento';

    protected $fillable = ['codigo_tipo', 'descripcion_tipo', 'user_created', 'user_updated', 'user_deleted'];
    protected $primaryKey = 'codigo_tipo';
    protected $keyType = 'string';
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