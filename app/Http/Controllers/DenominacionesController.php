<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Denominaciones\DenominacionesInterface;
use App\Http\Recopro\Denominaciones\DenominacionesTrait;
use App\Http\Requests\DenominacionesRequest;
use Illuminate\Http\Request;

class DenominacionesController extends Controller
{
    use DenominacionesTrait; 

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, DenominacionesInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id_denominacion', 'descripcion as denominacion', 'valor','idMoneda'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'id_denominacion', $params);
    }

    public function create(DenominacionesInterface $repo, DenominacionesRequest $request)
    {
        $data = $request->all();
        $table="ERP_Denominaciones";
        $id='id_denominacion';
        $data['id_denominacion'] = $repo->get_consecutivo($table,$id);
        // $data['id_denominacion'] = $data['id_denominacion'];
        $data['descripcion'] = $data['denominacion'];
        // print_r($data);
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(DenominacionesInterface $repo, DenominacionesRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $id_denominacion = $data['id_denominacion'];
        $data['descripcion'] = $data['denominacion'];
        $repo->update($id_denominacion, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(DenominacionesInterface $repo, Request $request)
    {
        $id_denominacion = $request->input('id_denominacion');
        $repo->destroy($id_denominacion);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(DenominacionesInterface $repo)
    {
        return parseSelect($repo->all(), 'id_denominacion', 'descripcion');
    }

    public function excel(DenominacionesInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE DENOMINACIONES', 'Denominaciones');
    }
}
