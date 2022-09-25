<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\FactorCredito\FactorCreditoInterface;
use App\Http\Recopro\FactorCredito\FactorCreditoTrait;
use App\Http\Requests\FactorCreditoRequest;
use Illuminate\Http\Request;

class FactorCreditoController extends Controller
{
    use FactorCreditoTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, FactorCreditoInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idfactor', 'nrocuotas', 'porcentaje'];
        return parseList($repo->search($s), $request, 'idfactor', $params);
    }

    public function create(FactorCreditoInterface $repo, FactorCreditoRequest $request)
    {
        $data = $request->all();
        $table="ERP_FactorCredito";
        $id='idfactor';
        $data['idfactor'] = $repo->get_consecutivo($table,$id);
        // $data['descripcion'] = $data['banco'];

       
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(FactorCreditoInterface $repo, FactorCreditoRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $idfactor = $data['idfactor'];
        // $data['descripcion'] = $data['banco'];
        $repo->update($idfactor, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(FactorCreditoInterface $repo, Request $request)
    {
        $idfactor = $request->input('idfactor');
        $repo->destroy($idfactor);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(FactorCreditoInterface $repo)
    {
        return parseSelect($repo->all(), 'idfactor', 'nrocuotas');
    }

    public function excel(FactorCreditoInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE FACTORES DE CRÉDITO', 'FactorCredito');
    }
}
