<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\CuentasBancarias\CuentasBancariasInterface;
use App\Http\Recopro\CuentasBancarias\CuentasBancariasTrait;
use App\Http\Requests\CuentasBancariasRequest;
use Illuminate\Http\Request;

class CuentasBancariasController extends Controller
{
    use CuentasBancariasTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, CuentasBancariasInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id_cuentabancaria', 'numero_cuenta', 'descripcion_cuenta', 'idbanco','IdMoneda'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'id_cuentabancaria', $params);
    }

    public function create(CuentasBancariasInterface $repo, CuentasBancariasRequest $request)
    {
        $data = $request->all();

        $table="ERP_CuentasBancarias";
        $id='id_cuentabancaria';
        $data['id_cuentabancaria'] = $repo->get_consecutivo($table,$id);
        // $data['id_cuentabancaria'] = $data['id_cuentabancaria'];
        // $data['numero_cuenta'] = $data['convenio'];
        // print_r($data);
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(CuentasBancariasInterface $repo, CuentasBancariasRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $id_cuentabancaria = $data['id_cuentabancaria'];
        // $data['numero_cuenta'] = $data['convenio'];
        $repo->update($id_cuentabancaria, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(CuentasBancariasInterface $repo, Request $request)
    {
        $id_cuentabancaria = $request->input('id_cuentabancaria');
        $repo->destroy($id_cuentabancaria);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(CuentasBancariasInterface $repo)
    {
        return parseSelect($repo->all(), 'id_cuentabancaria', 'numero_cuenta');
    }

    public function excel(CuentasBancariasInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CUENTA BANCARIAS', 'CuentasBancarias');
    }
}
