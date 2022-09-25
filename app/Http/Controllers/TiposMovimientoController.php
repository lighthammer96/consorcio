<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\TiposMovimiento\TiposMovimientoInterface;
use App\Http\Recopro\TiposMovimiento\TiposMovimientoTrait;
use App\Http\Requests\TiposMovimientoRequest;
use Illuminate\Http\Request;

class TiposMovimientoController extends Controller
{
    use TiposMovimientoTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, TiposMovimientoInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['codigo_tipo', 'descripcion_tipo as tipo_movimiento'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'codigo_tipo', $params);
    }

    public function create(TiposMovimientoInterface $repo, TiposMovimientoRequest $request)
    {
        $data = $request->all();
        // $data['codigo_tipo'] = $data['codigo_tipo'];
        $data['descripcion_tipo'] = $data['tipo_movimiento'];
        // print_r($data);
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(TiposMovimientoInterface $repo, TiposMovimientoRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $codigo_tipo = $data['codigo_tipo'];
        $data['descripcion_tipo'] = $data['tipo_movimiento'];
        $repo->update($codigo_tipo, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(TiposMovimientoInterface $repo, Request $request)
    {
        $codigo_tipo = $request->input('codigo_tipo');
        $repo->destroy($codigo_tipo);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(TiposMovimientoInterface $repo)
    {
        return parseSelect($repo->all(), 'codigo_tipo', 'descripcion_tipo');
    }

    public function excel(TiposMovimientoInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE TIPOS MOVIMIENTO', 'TiposMovimiento');
    }
}
