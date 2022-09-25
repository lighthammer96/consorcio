<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 30/05/2017
 * Time: 12:25 PM
 */

namespace App\Http\Recopro\UserPassword;

use Illuminate\Support\Facades\Hash;

class UserPasswordRepository implements UserPasswordInterface
{
    protected $model;

    public function __construct(UserPassword $model)
    {
        $this->model = $model;
    }

    public function checkPassword($user_id, $pass, $attempts)
    {
        $all = $this->model->where('user_id', $user_id)->get();

        $isset = false;
        foreach ($all as $p) {
            if (Hash::check($pass, $p->password)) {
                $isset = true;
                if ($p->incidence + 1 >= $attempts) {
                    throw new \Exception('La contraseña que esta ingresando ha pasado el límite máximo de usos. Pör favor intente ingresando otra contraseña');
                }
                $p->incidence = $p->incidence + 1;
                $p->save();
                break;
            }
        }
        if (!$isset) {
            $this->model->create([
                'user_id' => $user_id,
                'password' => bcrypt($pass),
                'incidence' => 1
            ]);
        }
    }
}