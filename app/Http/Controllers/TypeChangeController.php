<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:59 PM
 */ 

namespace App\Http\Controllers;

use App\Http\Recopro\TypeChange\TypeChangeInterface;
use App\Http\Recopro\TypeChange\TypeChangeTrait;
use App\Http\Requests\TypeChangeRequest;
use Illuminate\Http\Request;

class TypeChangeController extends Controller
{
    use TypeChangeTrait;

    private static $_IdMoneda = 2;

    public function __construct()
    {
//        $this->middleware('json');
    }
 
    public function all(Request $request, TypeChangeInterface $repo)
    { 
        $s = $request->input('search', '');
        $params = ['Fecha', 'Compra', 'Venta','IdMoneda','cambioComercialCompra','cambioComercialVenta','user_created', 'user_updated', 'created_at', 'updated_at','Fecha as id'];
        return parseList($repo->search($s), $request, 'Fecha', $params);
    }

    public function create(TypeChangeInterface $repo, TypeChangeRequest $request)
    {
        $data = $request->all();
        $data['IdMoneda'] = $data['IdMoneda'];
        $fecha = strval($data["Fecha"]);
        $valores = explode("/", $fecha);
        $fecha=$valores[2].'-'.$valores[1].'-'.$valores[0];
        $data['Fecha'] =$fecha;
        $repo->create($data);
        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(TypeChangeInterface $repo, TypeChangeRequest $request)
    {
        $data = $request->all();
        $id = $data['id'];
        unset($data['jtRecordKey']);
       $dato = [];
       $dato['Compra'] = $data['Compra'];
       $dato['Venta'] = $data['Venta'];
       $dato['cambioComercialCompra'] = $data['cambioComercialCompra'];
       $dato['cambioComercialVenta'] = $data['cambioComercialVenta'];
        $repo->update($id, $dato);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(TypeChangeInterface $repo, Request $request)
    {
        $id = $request->input('id');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(TypeChangeInterface $repo)
    {
         return parseSelect($repo->all(), 'id', 'Fecha');
    }

    public function excel(TypeChangeInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE TIPOS DE CAMBIOS', 'Tipos de Cambios');
    }
}
