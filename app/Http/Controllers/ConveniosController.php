<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Convenios\ConveniosInterface;
use App\Http\Recopro\Convenios\ConveniosTrait;
use App\Http\Requests\ConveniosRequest;
use Illuminate\Http\Request;

class ConveniosController extends Controller
{
    use ConveniosTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ConveniosInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idconvenio', 'descripcionconvenio as convenio', 'estado'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'idconvenio', $params);
    }

    public function create(ConveniosInterface $repo, ConveniosRequest $request)
    {
        $data = $request->all();
        // $data['idconvenio'] = $data['idconvenio'];
        $data['descripcionconvenio'] = $data['convenio'];
        $table="ERP_Convenios";
        $id='idconvenio';
        $data['idconvenio'] = $repo->get_consecutivo($table,$id);
        // print_r($data);
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(ConveniosInterface $repo, ConveniosRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $idconvenio = $data['idconvenio'];
        $data['descripcionconvenio'] = $data['convenio'];
        $repo->update($idconvenio, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(ConveniosInterface $repo, Request $request)
    {
        $idconvenio = $request->input('idconvenio');
        $repo->destroy($idconvenio);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(ConveniosInterface $repo)
    {
        return parseSelect($repo->all(), 'idconvenio', 'descripcionconvenio');
    }

    public function excel(ConveniosInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CONVENIOS', 'Convenios');
    }
}
