<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Brand\BrandInterface;
use App\Http\Recopro\Brand\BrandTrait;
use App\Http\Requests\BrandRequest;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    use BrandTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, BrandInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'description as marca'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(BrandInterface $repo, BrandRequest $request)
    {
        $data = $request->all();
        $data['description'] = $data['marca'];
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(BrandInterface $repo, BrandRequest $request)
    {
        $data = $request->all();
        $id = $data['id'];
        $data['description'] = $data['marca'];
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(BrandInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(BrandInterface $repo)
    {
        return parseSelect($repo->all(), 'id', 'description');
    }

    public function excel(BrandInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE MARCAS', 'Marcas');
    }
}
