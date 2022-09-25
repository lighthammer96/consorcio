<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Ubigeo\UbigeoTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Ubigeo\UbigeoInterface;
use App\Http\Requests\UbigeoRequest;
class UbigeoController extends Controller
{
     use UbigeoTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    // public function all(Request $request, UbigeoInterface $repo)
    // {
    //     $s = $request->input('search', '');
    //     $params = ['idCategoria', 'descripcion as Categoria','estado'];
    //     return parseList($repo->search($s), $request, 'idCategoria', $params);
    // }

    // public function create(UbigeoInterface $repo, UbigeoRequest $request)
    // {
    //     $data = $request->all();
    //     $table="ERP_Categoria";
    //     $id='idCategoria';
    //     $data['idCategoria'] = $repo->get_consecutivo($table,$id);
    //     $data['descripcion'] = strtoupper($data['Categoria']);
    //     $estado='A';
    //     if(!isset($data['estado'])){
    //         $estado='I';
    //     };
    //     $data['estado'] =  $estado;
    //     $repo->create($data);

    //     return response()->json([
    //         'Result' => 'OK',
    //         'Record' => []
    //     ]);
    // }

    // public function update(UbigeoInterface $repo, UbigeoRequest $request)
    // {
    //     $data = $request->all();
    //     $id = $data['idCategoria'];
    //     $data['descripcion'] = strtoupper($data['Categoria']);
    //     $estado='A';
    //     if(!isset($data['estado'])){
    //         $estado='I';
    //     };
    //     $data['estado'] =  $estado;
    //     $repo->update($id, $data);

    //     return response()->json(['Result' => 'OK']);
    // }

    // public function destroy(UbigeoInterface $repo, Request $request)
    // {
    //     $id = $request->input('idCategoria');
    //     $repo->destroy($id);
    //     return response()->json(['Result' => 'OK']);
    // }

    public function getAll(UbigeoInterface $repo)
    {
        return parseSelect($repo->all(), 'id', 'description');
    }
     public function getDepartamento(UbigeoInterface $repo)
    {
        return parseSelect($repo->all(), 'cCodUbigeo', 'cDepartamento');
    }
     public function getProvincia(UbigeoInterface $repo)
    {
        return parseSelect($repo->all(), 'cCodUbigeo', 'cProvincia');
    }
    public function getDistrito(UbigeoInterface $repo)
    {
        return parseSelect($repo->all(), 'cCodUbigeo', 'cDistrito');
    }
    public function TraerDepartamentos($id, UbigeoInterface $repo)
    {
       try {
            $data = $repo->TraerDepartamentos();

            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
     public function TraerProvincias($id, UbigeoInterface $repo)
    {
       try {
            $data = $repo->TraerProvincias($id);

            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function TraerDistritos($id, UbigeoInterface $repo)
    {
       try {
            $data = $repo->TraerDistritos($id);

            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
     public function traerSectorli($id, UbigeoInterface $repo)
    {
       try {
            $data = $repo->TraerSectores($id);

            return response()->json([
                'status' => true,
                'data' => $data
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    // public function excel(UbigeoInterface $repo)
    // {
    //     return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CATEGORÍAS', 'Categoría');
    // }
}
