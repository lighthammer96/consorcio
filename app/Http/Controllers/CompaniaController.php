<?php

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Compania\CompaniaTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Compania\CompaniaInterface;
use App\Http\Requests\CompaniaRequest;
use DB;

class CompaniaController extends Controller
{
    use CompaniaTrait;

    public function __construct()
    {
        //        $this->middleware('json'); 
    }

    public function all(Request $request, CompaniaInterface $repo)
    {

        $s = $request->input('search', '');
        $params = ['IdCompania', 'RutaData', 'RutaLog', 'FechaUltBackup', 'Estado', 'Base', 'Correo', 'Contacto', 'Telefono4', 'Telefono3', 'Telefono2', 'RazonSocial', 'NombreComercial', 'Direccion', 'Ruc', 'Telefono1'];
        return parseList($repo->search($s), $request, 'IdCompania', $params);
    }
    public function createUpdate($id, CompaniaInterface $repo, Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $datos = array();
            $nombre = $data["RazonSocial"];
            $nombre = str_replace(" ", "_",  $nombre);
            $nombre = str_replace(".", "_",  $nombre);

            if (!empty($_FILES["file"]["name"])) {
                $response = $this->SubirArchivo($_FILES["file"],  base_path("public/logos/"), $nombre);
                $datos["ruta_logo"] = "logos/" . $response["NombreFile"];
            }

            $table = "ERP_Compania";
            $idt = 'IdCompania';
            $datos['RazonSocial'] = $data['RazonSocial'];
            $datos['direcciones_oficinas'] = $data['direcciones_oficinas'];
            $datos['Base'] = $data['Base'];
            $datos['FechaUltBackup'] = $data['FechaUltBackup'];
            $datos['RutaData'] = $data['RutaData'];
            $datos['RutaLog'] = $data['RutaLog'];
            $datos['Ruc'] = $data['Ruc'];
            $datos['NombreComercial'] = $data['NombreComercial'];
            $datos['Direccion'] = $data['Direccion'];
            $datos['Telefono1'] = $data['Telefono1'];
            $datos['Telefono2'] = $data['Telefono2'];
            $datos['Telefono3'] = $data['Telefono3'];
            $datos['Telefono4'] = $data['Telefono4'];
            $datos['Estado'] = $data['Estado'];
            $datos['Contacto'] = $data['Contacto'];
            $datos['Correo'] = $data['Correo'];
            $datos['lema1'] = $data['lema1'];
            $datos['lema2'] = $data['lema2'];
            $datos['ubigeo'] = $data['ubigeo'];
            $datos['departamento'] = $data['departamento'];
            $datos['provincia'] = $data['provincia'];
            $datos['distrito'] = $data['distrito'];
            $datos['pie_1'] = $data['pie_1'];
            $datos['pie_2'] = $data['pie_2'];
            $datos['pie_3'] = $data['pie_3'];
            $w = $repo->findByCode($data['Ruc']);
            if ($id !== '0') {
                if ($w && $w->IdCompania != $id) {
                    throw new \Exception('Ya existe un documento con este Ruc. Por favor ingrese otro documento.');
                }
                $repo->update($id, $datos);
            } else {

                if ($w) {
                    throw new \Exception('Ya existe un documento con este Ruc. Por favor ingrese otro documento.');
                }
                $datos['IdCompania'] = $repo->get_consecutivo($table, $idt);
                $repo->create($datos);
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

    public function create(CompaniaInterface $repo, Request $request)
    {
        $data = $request->all();
        $table = "ERP_Compania";
        $id = 'IdCompania';
        $data['IdCompania'] = $repo->get_consecutivo($table, $id);
        $data['RazonSocial'] = strtoupper($data['RazonSocial']);
        $data['NombreComercial'] = strtoupper($data['NombreComercial']);
        $data['Direccion'] = strtoupper($data['Direccion']);
        if (isset($data['FechaUltBackup'])) {
            $fecha = strval($data["FechaUltBackup"]);
            $valores = explode("/", $fecha);
            $fecha = $valores[2] . '-' . $valores[1] . '-' . $valores[0];
            $data['FechaUltBackup'] = $fecha;
        }
        $estado = '1';
        if (!isset($data['Estado'])) {
            $estado = '0';
        };
        $data['Estado'] =  $estado;
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }
    public function find($id, CompaniaInterface $repo)
    {
        try {
            $data = $repo->find($id);
            // $data['dFechacaducidad2']='';

            // if($data[0]->dFechacaducidad!=null){
            //     $data['dFechacaducidad2']=date("Y-m-d", strtotime($data[0]->dFechacaducidad));
            // }

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

    public function update(CompaniaInterface $repo, Request $request)
    {
        $data = $request->all();
        $id = $data['IdCompania'];
        $data['RazonSocial'] = strtoupper($data['RazonSocial']);
        $data['NombreComercial'] = strtoupper($data['NombreComercial']);
        $data['Direccion'] = strtoupper($data['Direccion']);
        if (isset($data['FechaUltBackup'])) {
            $fecha = strval($data["FechaUltBackup"]);
            $valores = explode("/", $fecha);
            $fecha = $valores[2] . '-' . $valores[1] . '-' . $valores[0];
            $data['FechaUltBackup'] = $fecha;
        }

        $estado = '1';
        if (!isset($data['Estado'])) {
            $estado = '0';
        };
        $data['Estado'] =  $estado;

        $repo->update($id, $data);
        return response()->json(['Result' => 'OK']);
    }

    public function destroy(CompaniaInterface $repo, Request $request)
    {
        $id = $request->input('IdCompania');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(CompaniaInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE COMPANIAS', 'COMPANIAS');
    }
}
