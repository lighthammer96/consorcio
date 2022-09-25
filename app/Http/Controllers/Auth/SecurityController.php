<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 29/05/2017
 * Time: 03:31 PM
 */

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Recopro\Config\ConfigInterface;
use App\Http\Recopro\UserPassword\UserPasswordInterface;
use App\Http\Requests\PasswordRequest;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SecurityController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('csrf')->only('change_password_post');
    }

    public function verify_login(ConfigInterface $configRepo)
    {
        $user = auth()->user();
        $change = false;
        if ($user->reset) {
            $change = true;
        } elseif ($user->expiration_password) {
            $config = $configRepo->findByDescription('TIME_EXPIRATION_PASSWORD');
            if (isset($config) && $config->check) {
                $days = (int)$config->value;
                $change = ($user->change_password_date == null);
                if (!$change) {
                    $now = Carbon::now('America/Lima');
                    $date_user = Carbon::parse($user->change_password_date);
                    if ($date_user->diffInDays($now) >= $days) {
                        $change = true;
                    }
                }
            }
        }
        if ($change) {
            session(['change_password' => true]);
            return redirect()->route('change_password');
        }
        return redirect()->route('admin.index');
    }

    public function change_password_get(ConfigInterface $configRepo)
    {
        if (session()->has('change_password')) {
            $text = $configRepo->messageStructure();
            return view('security.change_password', compact('text'));
        }
        return redirect()->route('admin.index');
    }

    public function change_password_post(PasswordRequest $request, UserPasswordInterface $userPassword,
                                         ConfigInterface $configRepo)
    {
        try {
            $user = auth()->user();
            $data = $request->all();

            if ($data['new_pass'] != '' && $data['re_pass'] != '') {
                if ($data['new_pass'] != $data['re_pass']) {
                    throw new Exception ('Las contraseñas deben ser iguales.');
                }
            } elseif ($data['new_pass'] == '' || $data['re_pass'] == '') {
                throw new Exception ('Si desea cambiar la contraseña llene los campos correspondientes.');
            }

            $config = $configRepo->findByDescription('STRUCTURE_PASSWORD');
            $values = (isset($config)) ? $config->value : '1-0-0-0-0';
            $this->validateTextPass($data['new_pass'], $values);

            $config = $configRepo->findByDescription('USES_PASSWORD');
            $attempts = (isset($config)) ? (int)$config->value : 5;

            $userPassword->checkPassword($user->id, $data['new_pass'], $attempts);

            $user->password = bcrypt($data['new_pass']);
            $user->change_password_date = Carbon::now('America/Lima');
            $user->reset = false;
            $user->save();

            session()->forget('change_password');

            return redirect()->route('admin.index')->with('info', 'La contraseña se cambió correctamente.');
        }
        catch (Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors([
                    'error' => $e->getMessage()
                ]);
        }
    }
    

    public function validateTextPass($text, $values)
    {
        $value = explode('-', $values);
        if ($value[0] != 1) {
            if ($value[1] == '1') {
                if(!preg_match('/[A-Z]/', $text)){
                    throw new Exception ('La nueva contraseña debe contener por lo menos una letra en mayúscula.');
                }
            }
            if ($value[2] == '1') {
                if(!preg_match('/[a-z]/', $text)){
                    throw new Exception ('La nueva contraseña debe contener por lo menos una letra en minúscula.');
                }
            }
            if ($value[3] == '1') {
                if(!preg_match('/[^a-zA-Z\d]/', $text)){
                    throw new Exception ('La nueva contraseña debe contener por lo menos un carácter especial.');
                }
            }
            if ($value[4] == '1') {
                if(!preg_match('/\d/', $text)){
                    throw new Exception ('La nueva contraseña debe contener por lo menos un número.');
                }
            }
        }
    }
}