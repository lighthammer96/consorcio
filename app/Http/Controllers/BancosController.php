<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Bancos\BancosInterface;
use App\Http\Recopro\Bancos\BancosTrait;
use App\Http\Requests\BancosRequest;
use Illuminate\Http\Request;

class BancosController extends Controller
{
    use BancosTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, BancosInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idbanco', 'descripcion as banco'];
        return parseList($repo->search($s), $request, 'idbanco', $params);
    }

    public function create(BancosInterface $repo, BancosRequest $request)
    {
        $data = $request->all();
        $table="ERP_Bancos";
        $id='idbanco';
        $data['idbanco'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = $data['banco'];

       
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(BancosInterface $repo, BancosRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $idbanco = $data['idbanco'];
        $data['descripcion'] = $data['banco'];
        $repo->update($idbanco, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(BancosInterface $repo, Request $request)
    {
        $idbanco = $request->input('idbanco');
        $repo->destroy($idbanco);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(BancosInterface $repo)
    {
        return parseSelect($repo->all(), 'idbanco', 'descripcion');
    }

    public function excel(BancosInterface $repo)
    {
        // echo "<pre>";
        // print_r($this->generateDataExcel($repo->all())); exit;
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE BANCOS', 'Bancos');
    }
}
