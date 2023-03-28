<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Conceptos\ConceptosTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Conceptos\ConceptosInterface;
use App\Http\Requests\ConceptosRequest;
class ConceptosController extends Controller
{
     use ConceptosTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ConceptosInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idconcepto', 'descripcion', 'cuenta_contable', 'centro_costo','estado'];
        return parseList($repo->search($s), $request, 'idconcepto', $params);
    }

    public function create(ConceptosInterface $repo, ConceptosRequest $request)
    {
        $data = $request->all();
        $table="ERP_Conceptos";
        $id='idconcepto';
        $data['idconcepto'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['descripcion']);
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

    public function update(ConceptosInterface $repo, ConceptosRequest $request)
    {
        $data = $request->all();
        $id = $data['idconcepto'];
        $data['descripcion'] = strtoupper($data['descripcion']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(ConceptosInterface $repo, Request $request)
    {
        $id = $request->input('idconcepto');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(ConceptosInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CONCEPTOS', 'Concepto');
    }
}
