<?php namespace App\Http\Recopro\TypeTransfer;

/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 26/06/2017
 * Time: 12:04 PM
 */
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TypeTransfer extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_TipoTransferencia';

    protected $fillable = ['descripction', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];
}