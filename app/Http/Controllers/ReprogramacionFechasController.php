<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\CajaDiariaDetalle\CajaDiariaDetalleInterface;
use App\Http\Recopro\CajaDiaria\CajaDiariaInterface;
use App\Http\Recopro\ConsecutivosComprobantes\ConsecutivosComprobantesInterface;
use App\Http\Recopro\Solicitud\SolicitudInterface;
// use App\Http\Recopro\ReprogramacionFechas\ReprogramacionFechasInterface;
// use App\Http\Recopro\ReprogramacionFechas\ReprogramacionFechasTrait;
// use App\Http\Requests\ReprogramacionFechasRequest;
use App\Models\BaseModel;
use DB;
use Illuminate\Http\Request;
use Exception;

class ReprogramacionFechasController extends Controller
{
    // use ReprogramacionFechasTrait;

    public function __construct()
    {
        $this->base_model = new BaseModel();
//        $this->middleware('json');
    }

 



    public function guardar_reprogramacion_fechas(Request $request, SolicitudInterface $solicitud_repositorio)
    {

        $data = $request->all();

        $result = array();

        // print_r($data); exit;

        try {
            DB::beginTransaction();
            
          
            for ($i=0; $i < count($data["valor_cuota"]); $i++) { 

                 //ACTUALIZAR MONTOS EN solicitud cronograma
                $update = array();
                $update["cCodConsecutivo"] = $data["cCodConsecutivo_credito"];
                $update["nConsecutivo"] = $data["nConsecutivo_credito"];
                $update["nrocuota"] = $data["nrocuota"][$i];
                $update["fecha_vencimiento"] = $data["fecha_vencimiento"][$i];
                $update["valor_cuota"] = round($data["valor_cuota"][$i], 2);
                $update["saldo_cuota"] = round($data["saldo_cuota"][$i], 2);
                $solicitud_repositorio->update_reprogramacion($update);

        
            
            

            }

            
           
            $result["status"] = "i";
            DB::commit();
            return response()->json($result);
        } catch (\Exception $e) {
            DB::rollBack();
            $response["status"] = "ei";
            $response["msg"]    = $e->getMessage();
            return response()->json($response);
        }
    }

    
}
