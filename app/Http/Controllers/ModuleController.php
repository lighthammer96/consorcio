<?php
/**
 * Created by PhpStorm.
 * User: Lenovo
 * Date: 03/04/2017
 * Time: 04:21 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Module\ModuleInterface;
use App\Http\Requests\ModuleRequest;
use Illuminate\Http\Request;

class ModuleController extends  controller
{ 
    public function __construct()
    {
        $this->middleware('ajax');
    }

    public function all(Request $request, ModuleInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id','description as modulo','url','parent_id as modulo_padre','icon','order'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(ModuleInterface $repo, ModuleRequest $request)
    {
        $data = $request->all();
        $data['description'] = $data['modulo'];
        $data['parent_id'] = $data['modulo_padre'];
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(ModuleInterface $repo, ModuleRequest $request)
    {
        $data = $request->all();
        $id = $data['id'];
        $data['description'] = $data['modulo'];
        $data['parent_id'] = $data['modulo_padre'];

        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(ModuleInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function parents(ModuleInterface $repo)
    {
        return parseSelect($repo->getParentsAll(), 'id', 'description');
    }
}
