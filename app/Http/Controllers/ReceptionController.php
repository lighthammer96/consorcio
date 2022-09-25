<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/04/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\Reception\ReceptionInterface;
//use App\Http\Recopro\Warehouse\ReceptionTrait;
use App\Http\Requests\ReceptionRequest;
use Illuminate\Http\Request;

class ReceptionController extends Controller
{
    //use ReceptionTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ReceptionInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'code_internal as codigo_interno','description as almacen', 'type as tipo','address as direccion','frozen as congelado',
                  'date_frozen as fecha_congelacion','state as estado'];
        return parseList($repo->search($s), $request, 'id', $params);
    }

    public function create(ReceptionInterface $repo, ReceptionRequest $request)
    {
        $data = $request->all();
        $data['code_internal'] = $data['codigo_interno'];
        $data['description'] = $data['almacen'];
        $data['type'] = $data['tipo'];
        $data['address'] = $data['direccion'];
        $data['state'] = ($request->has('estado'));
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(WarehouseInterface $repo, WarehouseRequest $request)
    {
        $data = $request->all();
        $id = $data['id'];
        $data['code_internal'] = $data['codigo_interno'];
        $data['description'] = $data['almacen'];
        $data['type'] = $data['tipo'];
        $data['address'] = $data['direccion'];
        $data['state'] = ($request->has('estado'));
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(WarehouseInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(WarehouseInterface $repo)
    {
        return parseSelect($repo->all(), 'id', 'description');
    }

    public function excel(WarehouseInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE ALMACENES', 'Almacenes');
    }
}
