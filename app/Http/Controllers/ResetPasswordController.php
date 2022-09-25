<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Config\ConfigInterface;
use App\Http\Recopro\UserPassword\UserPasswordInterface;
use App\Http\Requests\PasswordRequest;
use Carbon\Carbon;
use DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
class ResetPasswordController extends Controller
{
     

    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('csrf')->only('change_password_post');
    }

    public function all(Request $request, ResetPasswordInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idCategoria', 'descripcion as Categoria','estado'];
        return parseList($repo->search($s), $request, 'idCategoria', $params);
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

    public function change_password_post_user($id, UserPasswordInterface $userPassword,PasswordRequest $request, ConfigInterface $configRepo)
    {
        DB::beginTransaction();
        try {
            $user = auth()->user();
            $data = $request->all();

            if ($data['new_pass'] != '' && $data['re_pass'] != '') {
                if ($data['new_pass'] != $data['re_pass']) {
                    throw new \Exception ('Las contraseñas deben ser iguales.');
                }
            } elseif ($data['new_pass'] == '' || $data['re_pass'] == '') {
                throw new \Exception ('Si desea cambiar la contraseña llene los campos correspondientes.');
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

            DB::commit();
            return response()->json([
                'status' => true,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    // public function change_password_post_user( $id,Request $request, UserPasswordInterface $userPassword,
    //                                      ConfigInterface $configRepo)
    // {
    //     try {
    //         $user = auth()->user();
    //         $data = $request->all();
    //         $data['new_pass'];

    //         if ($data['new_pass'] != '' && $data['re_pass'] != '') {
    //             if ($data['new_pass'] != $data['re_pass']) {
    //                 throw new Exception ('Las contraseñas deben ser iguales.');
    //             }
    //         }
    //         // } elseif ($data['new_pass'] == '' || $data['re_pass'] == '') {
    //         //     throw new Exception ('Si desea cambiar la contraseña llene los campos correspondientes.');
    //         // }

    //         // $config = $configRepo->findByDescription('STRUCTURE_PASSWORD');
    //         // $values = (isset($config)) ? $config->value : '1-0-0-0-0';
    //         // $this->validateTextPass($data['new_pass'], $values);

    //         // $config = $configRepo->findByDescription('USES_PASSWORD');
    //         // $attempts = (isset($config)) ? (int)$config->value : 5;

    //         // $userPassword->checkPassword($user->id, $data['new_pass'], $attempts);

    //         // $user->password = bcrypt($data['new_pass']);
    //         // $user->change_password_date = Carbon::now('America/Lima');
    //         // $user->reset = false;
    //         // $user->save();

    //         // session()->forget('change_password');

    //         // return redirect()->route('admin.index')->with('info', 'La contraseña se cambió correctamente.');
    //     }
    //     catch (Exception $e) {
    //         return redirect()->back()
    //             ->withInput()
    //             ->withErrors([
    //                 'error' => $e->getMessage()
    //             ]);
    //     }
    // }

}
