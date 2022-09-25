<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Vendedores\VendedoresInterface;
use App\Http\Recopro\Vendedores\VendedoresTrait;
use App\Http\Requests\VendedoresRequest;
use Illuminate\Http\Request;

class VendedoresController extends Controller
{
    use VendedoresTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, VendedoresInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idvendedor', 'descripcion', 'estado'];
        return parseList($repo->search($s), $request, 'idvendedor', $params);
    }

    public function create(VendedoresInterface $repo, VendedoresRequest $request)
    {
        $data = $request->all();
        $table="ERP_Vendedores";
        $id='idvendedor';
        $data['idvendedor'] = $repo->get_consecutivo($table,$id);
     

       
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(VendedoresInterface $repo, VendedoresRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $idvendedor = $data['idvendedor'];
        // $data['descripcion'] = $data['banco'];
        $repo->update($idvendedor, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(VendedoresInterface $repo, Request $request)
    {
        $idvendedor = $request->input('idvendedor');
        $repo->destroy($idvendedor);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(VendedoresInterface $repo)
    {
        return parseSelect($repo->all(), 'idvendedor', 'descripcion');
    }

    public function excel(VendedoresInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE VENDEDORES', 'Vendedores');
    }
}
