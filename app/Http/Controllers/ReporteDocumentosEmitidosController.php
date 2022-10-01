<?php


namespace App\Http\Controllers;

use App\Http\Recopro\CajaDiariaDetalle\CajaDiariaDetalleInterface;

use App\Http\Recopro\ReporteDocumentosEmitidos\ReporteDocumentosEmitidosInterface;
use App\Http\Recopro\ReporteDocumentosEmitidos\ReporteDocumentosEmitidosTrait;
use App\Http\Requests\ReporteDocumentosEmitidosRequest;

use App\Http\Recopro\ReporteDocumentosEmitidos\ReporteDocumentosEmitidos;


use App\Models\BaseModel;
use Illuminate\Http\Request;

class ReporteDocumentosEmitidosController extends Controller
{
    use ReporteDocumentosEmitidosTrait;

    public function __construct()
    {
        $this->base_model = new BaseModel();
//        $this->middleware('json');
    }

    public function all(Request $request, ReporteDocumentosEmitidosInterface $repo)
    {
        /*
        $model = new ReporteDocumentosEmitidos;
        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => count($model->all()),
            'Records' => $model->all()]);
        */

        $s      = $request->input('search', '');
        $params = ['TipoDoc', 'TipoDocumento',  'Documento', 'FechaEmision', 'NumeroDoc', 'Cliente', 'Moneda', 'Total', 'Solarizado', 'Glosa', 'Anulado', 'EstadoSunat', 'TipoDocRef', 'DocumentoRef', 'FechaEmisionRef'];

        return parseList($repo->search($s), $request, 'TipoDoc', $params);
    }

    // Se deberia borrar...en este contralador no se crea ni edita nada
    public function create(ReporteDocumentosEmitidosInterface $repo, ReporteDocumentosEmitidosRequest $request)
    {

    }

    public function update(ReporteDocumentosEmitidosInterface $repo, ReporteDocumentosEmitidosRequest $request)
    {

    }

    public function destroy(ReporteDocumentosEmitidosInterface $repo, Request $request)
    {

    }

    public function getAll(ReporteDocumentosEmitidosInterface $repo)
    {
        return parseSelect($repo->all(), 'idbanco', 'descripcion');
    }

    public function excel(ReporteDocumentosEmitidosInterface $repo, Request $request)
    {
        $filter = $request->all();
        $data = $repo->search_documentos_excel($filter)->get();
        return generateExcel($this->generateDataExcel($data), 'REPORTE DE DOCUMENTOS EMITIDOS', 'Documentos Emitidos');
    }

    public function find_documento(ReporteDocumentosEmitidosInterface $Repo, Request $request)
    {
        $data = $request->all();

        $response["documento"] = $Repo->find_documento($data["idventa"]);

        return response()->json($response);
    }

    public function data_form(ReporteDocumentosEmitidosInterface $Repo, CajaDiariaDetalleInterface $caja_diaria_repo)
    {

        $clientes = $caja_diaria_repo->get_clientes();

        // $cambio_tipo = $repo_orden->cambio_tipo(2, date("Y-m-d"));

        return response()->json([
            'status'  => true,
            'clientes' => $clientes
        ]);
    }

    public function prueba()
    {
        $model = new ReporteDocumentosEmitidos;
        return $model->all();
    }
}
