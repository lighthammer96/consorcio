<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 5/19/2017
 * Time: 6:35 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Param\ParamInterface;
use App\Http\Requests\ParamRequest;
use Illuminate\Http\Request;

class ParamController extends Controller
{
    public function __construct()
    {
        $this->middleware('ajax');
    }

    public function all(Request $request, ParamInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'value', 'description'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(ParamInterface $repo, Request $request)
    {
        $data = $request->all();
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(ParamInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['id'];
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(ParamInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }
}