<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\FormasPago\FormasPagoInterface;
use App\Http\Recopro\FormasPago\FormasPagoTrait;
use App\Http\Requests\FormasPagoRequest;
use Illuminate\Http\Request;

class FormasPagoController extends Controller
{
    use FormasPagoTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, FormasPagoInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['codigo_formapago', 'descripcion_subtipo as forma_pago'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'codigo_formapago', $params);
    }

    public function create(FormasPagoInterface $repo, FormasPagoRequest $request)
    {
        $data = $request->all();
        // $data['codigo_formapago'] = $data['codigo_formapago'];
        $data['descripcion_subtipo'] = $data['forma_pago'];
        // print_r($data);
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(FormasPagoInterface $repo, FormasPagoRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $codigo_formapago = $data['codigo_formapago'];
        $data['descripcion_subtipo'] = $data['forma_pago'];
        $repo->update($codigo_formapago, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(FormasPagoInterface $repo, Request $request)
    {
        $codigo_formapago = $request->input('codigo_formapago');
        $repo->destroy($codigo_formapago);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(FormasPagoInterface $repo)
    {
        return parseSelect($repo->all(), 'codigo_formapago', 'descripcion_subtipo');
    }

    public function excel(FormasPagoInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE FORMAS PAGO', 'FormasPago');
    }
}
