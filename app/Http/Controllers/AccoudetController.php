<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Accoudet\AccoudetTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Accoudet\AccoudetInterface;
use App\Http\Requests\AccoudetRequest;
class AccoudetController extends Controller
{
     use AccoudetTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, AccoudetInterface $repo)
    {
        $s = $request->input('search', '');
         $params = ['idGrupoContableCabecera as Contabledet','IdTipoOperacion as Operacion','cuenta','centrocosto','idGrupoContableCabecera as idgrup','IdTipoOperacion as idoper' , 'IdTipoOperacion as ideOliminar', 'idGrupoContableCabecera as ideGliminar' , 'identificador'];
        return parseList($repo->search($s), $request, 'idGrupoContableCabecera', $params);
    }

    public function create(AccoudetInterface $repo, AccoudetRequest $request)
    {
        $data = $request->all();
        $table="ERP_GrupoContableCabecera";
        $id='idGrupoContableCabecera';
        $data['idGrupoContableCabecera'] = $data['Contabledet'];
        $data['idTipoOperacion'] = $data['Operacion'];
        $data['cuenta'] =strtoupper( $data['cuenta']);
        $data['centrocosto'] = strtoupper($data['centrocosto']);
        $data['identificador'] = uniqid();
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }
    
    public function update(AccoudetInterface $repo, Request $request)
    { 
        $data = $request->all();

        $idA = $data['idgrup'];
        $idB = $data['idoper'];
        $dato['cuenta'] = strtoupper($data['cuenta']);
        $dato['centrocosto'] = strtoupper($data['centrocosto']);
        $repo->update($idA,$idB, $dato);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(AccoudetInterface $repo, Request $request)
    {
        // $ideliminar = strval();
        // $valores = explode("/", $ideliminar);
        $id = $request->input('identificador');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(AccoudetInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA CONTABLE DETALLE', 'Contable Detalle');
    }
}
