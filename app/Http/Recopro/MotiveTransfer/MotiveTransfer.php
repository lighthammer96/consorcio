<?php

namespace App\Http\Recopro\MotiveTransfer;

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/07/2017
 * Time: 05:55 PM
 */
use \Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MotiveTransfer extends Model
{
    use SoftDeletes;

    protected $table = 'ERP_MotivoTraslado';

    protected $fillable = ['description', 'user_created', 'user_updated', 'user_deleted'];

    protected $hidden = ['deleted_at'];
}