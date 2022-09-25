<?php namespace App\Http\Recopro\UserPassword;

use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 30/05/2017
 * Time: 12:21 PM
 */
class UserPassword extends Model
{
    protected $table = 'ERP_Usuarios_Claves';

    protected $fillable = ['user_id', 'password', 'incidence'];
}