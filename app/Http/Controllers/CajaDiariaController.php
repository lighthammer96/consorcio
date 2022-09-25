<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\CajaDiaria\CajaDiariaTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\CajaDiaria\CajaDiariaInterface;
use App\Http\Recopro\CajaDiariaDetalle\CajaDiariaDetalleInterface;
use App\Http\Recopro\CajaDiariaDenominaciones\CajaDiariaDenominacionesInterface;
use App\Http\Recopro\Ventas\VentasInterface;
use App\Http\Requests\CajaDiariaRequest;
use DB;
class CajaDiariaController extends Controller
{
     use CajaDiariaTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, CajaDiariaInterface $repo)
    { 
        $s = $request->input('search', '');
        $params = ['idCajaDiaria', 'idCaja','fechaCaja','idUsuario','estado','totalEfectivo','totalEfectivoDol'];
        return parseList($repo->search($s), $request, 'idCategoria', $params);
    }
    public function find($id, CajaDiariaInterface $repo)
    {
        try {
            $data = $repo->find($id);
            $data['fechaCaja2']=date("Y-m-d", strtotime($data->fechaCaja));
            $dataDetalle=$repo->getDetalle($id);
            $dataDenominacion=$repo->getDenominaciones($id);
            return response()->json([
                'status' => true,
                'data' => $data,
                'dataDetalle' => $dataDetalle,
                'dataDenominacion' => $dataDenominacion,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function getDenominaciones($id, CajaDiariaInterface $repo)
    {
        try {
            $dataDenominacion=$repo->getDenominacion($id);
            return response()->json([
                'status' => true,
                'dataDenominacion' => $dataDenominacion,
              
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function getDenominacionesView($id, CajaDiariaInterface $repo)
    {
        try {
            $dataDenominacion=$repo->getDenominaciones($id);
            return response()->json([
                'status' => true,
                'dataDenominacion' => $dataDenominacion,
              
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function data_form (CajaDiariaInterface $moventRepo, CajaDiariaDetalleInterface $caja_diaria_repo)
    {
        $usuario=auth()->id();
        $cajas = $moventRepo->getcajas($usuario);
        $clientes = $caja_diaria_repo->get_clientes();
        
        return response()->json([
            'status' => true,
            'cajas' => $cajas,
            'clientes' => $clientes,
            'usuario'=>$usuario,
           
        ]);
    }


    public function createUpdate($id, CajaDiariaInterface $repo, CajaDiariaDetalleInterface $repoDet,CajaDiariaDenominacionesInterface $repoDeno , request $request, VentasInterface $ventas_repo)
    {
        DB::beginTransaction();
        try {

            // $comprobantes = $ventas_repo->obtener_comprobantes();
            // // print_r($comprobantes );
            // foreach ($comprobantes as $key => $value) {
            //     $res = $this->consultar_cdr($value->documento_cpe);
            //     $statusMessage = utf8_decode(str_replace("'", "", $res["statusCdr"]["statusMessage"]));
            //     $sql_update = "UPDATE ERP_Venta SET statusCode='{$res["statusCdr"]["statusCode"]}', statusMessage='{$statusMessage}' WHERE idventa={$value->idventa}";
            //     DB::statement($sql_update);
            //     // print_r($sql_update);
            // }
            // exit;

            $data = $request->all();
            $data['fechaCaja'] = strtoupper($data['fechaCaja']);
            $data['idCaja'] = strtoupper($data['idCaja']);
            $data['idUsuario'] = strtoupper($data['idUsuario']);
            $data['totalEfectivo'] = strtoupper($data['totalEfectivo']);
            $data['totalEgresos'] = strtoupper($data['totalEgresos']);
            $data['totalOtrosIngresos'] = strtoupper($data['totalOtrosIngresos']);
            $data['totalNoEfectivo'] = strtoupper($data['totalNoEfectivo']);

            $data['totalEfectivoDol'] = strtoupper($data['totalEfectivoDol']);
            $data['totalEgresosDol'] = strtoupper($data['totalEgresosDol']);
            $data['totalOtrosIngresosDol'] = strtoupper($data['totalOtrosIngresosDol']);
            $data['totalNoEfectivoDol'] = strtoupper($data['totalNoEfectivoDol']);

            $data['estado'] = strtoupper($data['estado']);
            $estadoTem= $data['estado'];
            $tipo=0;
            if($data['estado']==''){
              $data['estado']=1;
               $tipo=1;
            }else{
                $data['estado']=0; 
            }
            if ($id != 0) {
                $repo->update($id, $data);
            } else {
                $idt = 'idCajaDiaria';
                $table = "ERP_CajaDiaria";
                $data['idCajaDiaria'] = $repo->get_consecutivo($table, $idt);
                $grup = $repo->create($data);
                $id = $grup->idCajaDiaria;
            };
            $datoDet = [];
            $datoDet['codigoFormaPago'] ='EFE';
            if($estadoTem==1){
                $datoDet['codigoTipo'] ='CIE';
                $iddet = 'consecutivo';
                $tabledet = "ERP_CajaDiariaDetalle";
                $datoDet['idCajaDiaria'] =$id;
                $datoDet['consecutivo'] = $repoDet->get_consecutivo($tabledet, $iddet);
                $grupdet = $repoDet->create($datoDet);
            }else{
                $datoDet['codigoTipo'] ='APE';
                $iddet = 'consecutivo';
                $tabledet = "ERP_CajaDiariaDetalle";
                $datoDet['idCajaDiaria'] =$id;
                $datoDet['consecutivo'] = $repoDet->get_consecutivo($tabledet, $iddet);
                $grupdet = $repoDet->create($datoDet);
                // $id = $grupdet->idCajaDiaria;
            }
           
            
            $idDenominacionS = $data['idDenominacionS'];
            $idDenominacionS = explode(',', $idDenominacionS);

            $cantidadS = $data['cantidadS'];
            $cantidadS = explode(',', $cantidadS);

            $montoS = $data['montoS'];
            $montoS = explode(',', $montoS);


            $idDenominacionD = $data['idDenominacionD'];
            $idDenominacionD = explode(',', $idDenominacionD);

            $cantidadD = $data['cantidadD'];
            $cantidadD = explode(',', $cantidadD);

            $montoD = $data['montoD'];
            $montoD = explode(',', $montoD);

            for ($i = 0; $i < count($idDenominacionS); $i++) {
                $datoDeno = [];
                $datoDeno['idCajaDiaria'] = $id;
                $datoDeno['tipo'] = $tipo;
                $datoDeno['idDenominacion'] = $idDenominacionS[$i];
                $datoDeno['cantidad'] = $cantidadS[$i];
                $datoDeno['monto'] = $montoS[$i];  
                $repoDeno->create($datoDeno);
            };
            for ($i = 0; $i < count($idDenominacionD); $i++) {
                $datoDeno = [];
                $datoDeno['idCajaDiaria'] = $id;
                $datoDeno['tipo'] = $tipo;
                $datoDeno['idDenominacion'] = $idDenominacionD[$i];
                $datoDeno['cantidad'] = $cantidadD[$i];
                $datoDeno['monto'] = $montoD[$i];  
                $repoDeno->create($datoDeno);
            };

            $dataCaja=$repo->getCajaDiario($id);


            DB::commit();
            return response()->json([
                'status' => true,
                'dataCaja'=>$dataCaja,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
    public function create(CajaDiariaInterface $repo, CajaDiariaRequest $request)
    {
        $data = $request->all();
        $table="ERP_Categoria";
        $id='idCategoria';
        $data['idCategoria'] = $repo->get_consecutivo($table,$id);
        $data['descripcion'] = strtoupper($data['Categoria']);
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

    public function update(CajaDiariaInterface $repo, CajaDiariaRequest $request)
    {
        $data = $request->all();
        $id = $data['idCategoria'];
        $data['descripcion'] = strtoupper($data['Categoria']);
        $estado='A';
        if(!isset($data['estado'])){
            $estado='I';
        };
        $data['estado'] =  $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(CajaDiariaInterface $repo, Request $request)
    {
        $id = $request->input('idCajaDiaria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(CajaDiariaInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE APERTURA DE CAJAS', 'Apertura de cajas');
    }
}
