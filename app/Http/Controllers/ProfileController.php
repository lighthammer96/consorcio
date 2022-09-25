<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/3/2017
 * Time: 12:24 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Profile\ProfileInterface;
use App\Http\Requests\ProfileRequest;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('ajax', ['except' => ['getAll']]);
    }

    public function all(Request $request, ProfileInterface $repo)
    {
        $s = $request->input('search', '');
        return parseList($repo->search($s), $request, 'id', ['id','description as perfil']);
    }

    public function create(ProfileInterface $repo, ProfileRequest $request)
    {
        $data = $request->all();
        $data['description'] = $data['perfil'];
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }
    public function update(ProfileInterface $repo, ProfileRequest $request)
    {
        $data = $request->all();
        $id = $data['id'];
        $data['description'] = $data['perfil'];
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(ProfileInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(ProfileInterface $repo)
    {
        return parseSelect($repo->all(), 'id', 'description');
    }
}
