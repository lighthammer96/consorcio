<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/6/2017
 * Time: 10:22 AM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\User\UserInterface;
use App\Http\Requests\UserEditRequest;
use App\Http\Requests\UserNewRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use DB;
class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('ajax')->except('reset');
    }

    public function all(UserInterface $repo, Request $request)
    {
        $s = $request->input('search', '');
        $params = ['id', 'name', 'username', 'profile_id', 'expiration_password', 'supervisor'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(UserInterface $repo, UserNewRequest $request)
    {
        $data = $request->all();
        $data['password'] = bcrypt($data['password']);
        $data['expiration_password'] = (isset($data['expiration_password']));
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }
    

    public function update(UserInterface $repo, UserEditRequest $request)
    {
        try {
            $data = $request->all();
            $data['expiration_password'] = (isset($data['expiration_password']));
            $id = $data['id'];
            unset($data['id']);

            $repo->update($id, $data);

            return response()->json(['Result' => 'OK']);

        } catch (Exception $e) {
            return response()->json([
                'Result' => 'ERROR',
                'Message' => [$e->getMessage()]
            ]);
        }
    }

    public function destroy(UserInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function supervisors(UserInterface $repo)
    {
        $data = $repo->all();

        $users = [];
        $users[] = [
            'DisplayText' => 'No tiene supervisor',
            'Value' => ''
        ];
        foreach ($data as $d) {
            $users[] = [
                'DisplayText' => $d->name . ' (' . $d->username . ')',
                'Value' => $d->id
            ];
        }
        return response()->json([
            'Result' => 'OK',
            'Options' => $users
        ]);
    } 

    public function reset($id, Request $request, UserInterface $userRepo)
    {
        $userRepo->update($id, [
            'password' => bcrypt($request->input('pass')),
            'reset' => true
        ]);
        return response()->json(['status' => true]);
    }

     public function getAll(UserInterface $repo)
    {
        return parseSelect($repo->all(), 'id', 'name');
    }
}