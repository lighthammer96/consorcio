<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Motivos\MotivosInterface;
use App\Http\Recopro\Motivos\MotivosTrait;
use App\Http\Requests\MotivosRequest;
use Illuminate\Http\Request;

class MotivosController extends Controller
{
    use MotivosTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, MotivosInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['codigo', 'descripcion', 'estado'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'codigo', $params);
    }

    public function create(MotivosInterface $repo, MotivosRequest $request)
    {
        $data = $request->all();
        // $data['codigo_formapago'] = $data['codigo_formapago'];
        // $data['descripcion_subtipo'] = $data['forma_pago'];
        // print_r($data);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(MotivosInterface $repo, MotivosRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $codigo = $data['codigo'];
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        // $data['descripcion_subtipo'] = $data['forma_pago'];
        $repo->update($codigo, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(MotivosInterface $repo, Request $request)
    {
        $codigo = $request->input('codigo');
        $repo->destroy($codigo);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(MotivosInterface $repo)
    {
        return parseSelect($repo->all(), 'codigo', 'descripcion');
    }

    public function excel(MotivosInterface $repo)
    {
        // echo "ola"; exit;
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE MOTIVOS', 'Motivos');
    }
}
