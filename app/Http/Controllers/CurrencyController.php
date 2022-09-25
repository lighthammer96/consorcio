<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Currency\CurrencyTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Currency\CurrencyInterface;
use App\Http\Requests\CurrencyRequest;
class CurrencyController extends Controller
{
     use CurrencyTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, CurrencyInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['IdMoneda', 'Descripcion as Moneda','Simbolo','EquivalenciaSunat as Equivalencia','Estado','Abreviatura'];
        return parseList($repo->search($s), $request, 'IdMoneda', $params);
    }

    public function create(CurrencyInterface $repo, CurrencyRequest $request)
    {
        $data = $request->all();
        $table='ERP_Moneda';
        $data['IdMoneda'] = $repo->get_consecutivo($table);
        $data['Descripcion'] = $data['Moneda'];
        $data['Simbolo'] = $data['Simbolo'];
        $data['EquivalenciaSunat'] = $data['Equivalencia'];
        $data['Abreviatura'] = $data['Abreviatura'];
        $data['Estado'] = 'A';
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(CurrencyInterface $repo, CurrencyRequest $request)
    {
        $data = $request->all();
        $id = $data['IdMoneda'];
        $data['Descripcion'] = $data['Moneda'];
        $data['Simbolo'] = $data['Simbolo'];
        $data['EquivalenciaSunat'] = $data['Equivalencia'];
        $data['Abreviatura'] = $data['Abreviatura'];
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(CurrencyInterface $repo, Request $request)
    {
        $id = $request->input('IdMoneda');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(CurrencyInterface $repo)
    {
        return parseSelect($repo->all(), 'IdMoneda', 'Descripcion');
    }

    public function excel(CurrencyInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE MONEDAS', 'Monedas');
    }
}
