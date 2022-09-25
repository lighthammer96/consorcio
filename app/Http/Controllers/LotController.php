<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Lot\LotTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Lot\LotInterface;
use App\Http\Requests\LotRequest;
use Carbon\Carbon;
use DB;
class LotController extends Controller
{
     use LotTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, LotInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idLote', 'Lote','fechaIngreso','FechaVencimiento','cantidad','idArticulo'];
        return parseList($repo->search($s), $request, 'idLote', $params);
    }

    public function create(LotInterface $repo, LotRequest $request)
    {
        $data = $request->all();
        $table="ERP_SubFamilia";
        $id='idSubFamilia';
        $data['idSubFamilia'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['SubFamilia']);
        $data['idFamilia'] = $data['idFamilia'];
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

    public function update(LotInterface $repo, LotRequest $request)
    {
        $data = $request->all();
        $id = $data['idSubFamilia'];
        $data['descripcion'] = strtoupper($data['SubFamilia']);
        $data['idFamilia'] = $data['idFamilia'];
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(LotInterface $repo, Request $request)
    {
        $id = $request->input('idLote');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(LotInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE LOTES', 'Lotes');
    }

    public function createUpdate($id, LotInterface $repo, LotRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
             $table="ERP_Lote";
             $idt='idLote';
             $data['Lote'] = strtoupper($data['lote']);
             $data['fechaIngreso'] = $data['fech_ingreso'];
             $data['fechaVencimiento'] =$data['fecha_vencimiento'];
             $data['cantidad'] = $data['cantidad'];
             $data['idArticulo'] = $data['producto'];
             $w = $repo->findByCode($data['Lote']);
            if ($id != 0) {
                if ($w && $w->idLote != $id) {
                    throw new \Exception('Ya existe un Lote con este código. Por favor ingrese otro código.');
                }
                $repo->update($id, $data);
            } else {
                 if ($w) {
                    throw new \Exception('Ya existe un Lote con este código. Por favor ingrese otro código.');
                }
                $data['idLote'] = $repo->get_consecutivo($table,$idt);
                $repo->create($data);
            };
            DB::commit();
            return response()->json([
                'status' => true,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
     public function find($id, LotInterface $repo)
    {
        try {
            $data = $repo->find($id);
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
}
