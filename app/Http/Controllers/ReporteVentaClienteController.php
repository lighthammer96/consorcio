<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\ReporteVentaCliente\ReporteVentaClienteTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\ReporteVentaCliente\ReporteVentaClienteInterface;
use App\Http\Requests\ReporteVentaClienteRequest;
use App\Http\Recopro\Solicitud_Asignacion\Solicitud_AsignacionInterface;

class ReporteVentaClienteController extends Controller
{
    use ReporteVentaClienteTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, ReporteVentaClienteInterface $repo)
    {
        $filter = $request->all();
        $params = ['idCategoria', 'idtienda', 'cuota_inicial', 'idvendedor', 'usuario', 'IdMoneda', 'Moneda', 'idcondicion_pago', 'condicion_pago', 'precio_unitario', 'Motor', 'numero_serie', 'Documento', 'Color', 'idSerie', 'Modelo', 'serie_comprobante', 'numero_comprobante', 'idventa', 'Fecha', 'DocumentoCliente', 'Direccion', 'celular', 'razonsocial_cliente', 'convenio', 'tipo_solicitud', 'idconvenio',];
        return parseList($repo->search($filter), $request, 'idCategoria', $params);
    }

    public function create(ReporteVentaClienteInterface $repo, ReporteVentaClienteRequest $request)
    {
        $data = $request->all();
        $table = "ERP_Categoria";
        $id = 'idCategoria';
        $data['idCategoria'] = $repo->get_consecutivo($table, $id);
        $data['descripcion'] = strtoupper($data['Categoria']);
        $estado = 'A';
        if (!isset($data['estado'])) {
            $estado = 'I';
        };
        $data['estado'] = $estado;
        $repo->create($data);

        return response()->json([
            'Result' => 'OK',
            'Record' => []
        ]);
    }

    public function update(ReporteVentaClienteInterface $repo, ReporteVentaClienteRequest $request)
    {
        $data = $request->all();
        $id = $data['idCategoria'];
        $data['descripcion'] = strtoupper($data['Categoria']);
        $estado = 'A';
        if (!isset($data['estado'])) {
            $estado = 'I';
        };
        $data['estado'] = $estado;
        $repo->update($id, $data);

        return response()->json(['Result' => 'OK']);
    }

    public function destroy(ReporteVentaClienteInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    // // public function getAll(BrandInterface $repo)
    // // {
    // //     return parseSelect($repo->all(), 'id', 'description');
    // // }

    public function excel(ReporteVentaClienteInterface $repo, Request $request)
    {
        ini_set('max_execution_time', 6000);
        $filter = $request->all();
        return generateExcel($this->generateDataExcel($repo->search($filter)->get()), 'REPORTE DE VENTAS ',
            'VENTAS');
    }

    public function pdf(ReporteVentaClienteInterface $repo, Solicitud_AsignacionInterface $repcom, Request $request)
    {
        ini_set('max_execution_time', 6000);
        $filter = $request->all();
        $data_compania = $repcom->get_compania();

        $path = public_path('/' . $data_compania[0]->ruta_logo);
        if (!file_exists($path)) {
            $path = public_path('/img/a1.jpg');
        }
        $type_image = pathinfo($path, PATHINFO_EXTENSION);
        $image = file_get_contents($path);
        $image = 'data:image/' . $type_image . ';base64,' . base64_encode($image);

        $data = $this->generateDataExcel2($repo->search($filter)->get());
        return generateDataPDFVC($data, 'landscape', $image);
    }
} 
