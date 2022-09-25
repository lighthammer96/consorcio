<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\CajaDiaria\CajaDiariaInterface;
use App\Http\Recopro\CajaDiariaDetalle\CajaDiariaDetalleInterface;
use App\Http\Recopro\ConsecutivosComprobantes\ConsecutivosComprobantesInterface;
use App\Http\Recopro\DocumentType\DocumentTypeInterface;
use App\Http\Recopro\ConsecutivoComprobanteUsuario\ConsecutivoComprobanteUsuarioInterface;
use App\Http\Recopro\ConsecutivosComprobantes\ConsecutivosComprobantesTrait;
use App\Http\Requests\ConsecutivosComprobantesRequest;
use Illuminate\Http\Request;
use DB;
class ConsecutivosComprobantesController extends Controller
{
    use ConsecutivosComprobantesTrait;

    public function __construct()
    {
//        $this->middleware('json');
    } 
     public function data_form (ConsecutivosComprobantesInterface $moventRepo)
    {
       
        $documento = $moventRepo->getDocumentos();
      
        return response()->json([
            'status' => true,
            'documento' => $documento,
           
        ]);
    }
     public function getDocumentos(Request $request, DocumentTypeInterface $repo)
    {
        return parseSelect($repo->all(), 'IdTipoDocumento', 'Descripcion');
    }

    public function all(Request $request, ConsecutivosComprobantesInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id_consecutivo','IdTipoDocumento', 'numero', 'serie', 'actual', 'ultimo', 'longitud', 'idtienda'];
        // print_r($repo->search($s)); exit;
        return parseList($repo->search($s), $request, 'id_consecutivo', $params);
    }
    public function find($id, ConsecutivosComprobantesInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $dataDetalle=$repo->getDetalle($id);
            return response()->json([
                'status' => true,
                'data' => $data,
                'dataDetalle' => $dataDetalle
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
     public function deleteDetalle($id, ConsecutivosComprobantesInterface $repo, Request $request)
    {

        DB::beginTransaction();
        try {
          
            $valtodo=explode("_", $id);
            $val=$repo->destroy_ConsecutivoDetalle($valtodo[0],$valtodo[1]);
            DB::commit();
            return response()->json([
                'status' => true,
                'dato'=>$val,
            
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function create(ConsecutivosComprobantesInterface $repo, ConsecutivosComprobantesRequest $request)
    {
        $data = $request->all();

        $table="ERP_ConsecutivosComprobantes";
        $id='id_consecutivo';
        $data['id_consecutivo'] = $repo->get_consecutivo($table,$id);
        // $data['id_consecutivo'] = $data['id_consecutivo'];
        // $data['nombre_caja'] = $data['convenio'];
        // print_r($data);
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }
      public function createUpdate($id, ConsecutivosComprobantesInterface $repo, ConsecutivoComprobanteUsuarioInterface $repoDet, request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $data['serie'] = strtoupper($data['serie']);
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $idt = 'id_consecutivo';
                $table = "ERP_ConsecutivosComprobantes";
                $data['id_consecutivo'] = $repo->get_consecutivo($table, $idt);
                $grup = $repo->create($data);
                $id = $grup->id_consecutivo;
            };


            $idUsuario = $data['idUsuario'];
            $idUsuario = explode(',', $idUsuario);

            $idConsedet = $data['idConsedet'];
            $idConsedet = explode(',', $idConsedet);

          

            for ($i = 0; $i < count($idUsuario); $i++) {
                $datoLo = [];
                $modo = 1;
                if ($idConsedet[$i] == '0') {
                    $modo = 0;
                };
                if ($modo == 0) {
                    $datoLo['idConsecutivo'] = $id;
                    $datoLo['idUsuario'] = $idUsuario[$i];
                    $repoDet->create($datoLo);
                }
                // else {
                //     $repoDet->update($id, $idUsuario[$i], $datoLo);
                // };
            };




            DB::commit();
            return response()->json([
                'status' => true,
               // 'data'=>$grup,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
    public function update(ConsecutivosComprobantesInterface $repo, ConsecutivosComprobantesRequest $request)
    {
        $data = $request->all();
        // print_r($data);
        $id_consecutivo = $data['id_consecutivo'];
        // $data['nombre_caja'] = $data['convenio'];
        $repo->update($id_consecutivo, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(ConsecutivosComprobantesInterface $repo, Request $request)
    {
        $id_consecutivo = $request->input('id_consecutivo');
        $repo->destroy($id_consecutivo);
        return response()->json(['Result' => 'OK']);
    }

    public function getAll(ConsecutivosComprobantesInterface $repo)
    {
        return parseSelect($repo->all(), 'id_consecutivo', 'nombre_caja');
    }

    public function excel(ConsecutivosComprobantesInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CONSECUTIVOS COMPROBANTES', 'ConsecutivosComprobantes');
    }

    public function obtener_consecutivo_comprobante(ConsecutivosComprobantesInterface $repo, Request $request, CajaDiariaDetalleInterface $caja_repo) {

        $data = $request->all();
        $caja_diaria = $caja_repo->get_caja_diaria();
        $consecutivo_comprobante = $repo->obtener_consecutivo_comprobante($data["tipo_documento"], $caja_diaria[0]->idtienda);

        return response()->json($consecutivo_comprobante);
    }
}
