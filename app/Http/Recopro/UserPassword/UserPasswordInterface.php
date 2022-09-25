<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 30/05/2017
 * Time: 12:25 PM
 */

namespace App\Http\Recopro\UserPassword;

interface UserPasswordInterface
{
    public function checkPassword($user_id, $pass, $attempts);
}