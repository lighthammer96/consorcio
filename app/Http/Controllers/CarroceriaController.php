<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Carroceria\CarroceriaInterface;
use App\Http\Recopro\Carroceria\CarroceriaTrait;
use App\Http\Requests\CarroceriaRequest;
use Illuminate\Http\Request;

class CarroceriaController extends Controller
{
    use CarroceriaTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, CarroceriaInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idcarroceria', 'descripcion as carroceria'];
        return parseList($repo->search($s), $request, 'idcarroceria', $params);
    }

    public function create(CarroceriaInterface $repo, CarroceriaRequest $request)
    {
        $data = $request->all();
        $table="ERP_Carroceria";
        $id='idcarroceria';
        $data['idcarroceria'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = $data['carroceria'];

       
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(CarroceriaInterface $repo, CarroceriaRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $idcarroceria = $data['idcarroceria'];
        $data['descripcion'] = $data['carroceria'];
        $repo->update($idcarroceria, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(CarroceriaInterface $repo, Request $request)
    {
        $idcarroceria = $request->input('idcarroceria');
        $repo->destroy($idcarroceria);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(CarroceriaInterface $repo)
    {
        return parseSelect($repo->all(), 'idcarroceria', 'descripcion');
    }

    public function excel(CarroceriaInterface $repo)
    {
        // echo "<pre>";
        // print_r($this->generateDataExcel($repo->all())); exit;
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE BANCOS', 'Carroceria');
    }
}
