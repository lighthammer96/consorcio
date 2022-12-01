<?php

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\ReporteDocumentosEmitidos;

class ReporteDocumentosEmitidosRepository implements ReporteDocumentosEmitidosInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(ReporteDocumentosEmitidos $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        // print_r($_REQUEST);
        $model = $this->model;

        if(!empty($_REQUEST["FechaInicioFiltro"]) && !empty($_REQUEST["FechaFinFiltro"])) {
            // $inicio = str_replace("-", "/", $_REQUEST["FechaInicioFiltro"]);
            // $fin = str_replace("-", "/", $_REQUEST["FechaFinFiltro"]);
            $inicio = $_REQUEST["FechaInicioFiltro"];
            $fin = $_REQUEST["FechaFinFiltro"];
            $model = $model->whereBetween('FechaEmisionServer', [$inicio, $fin]);
        }

        if(!empty($_REQUEST["idClienteFiltro"])) {
            $model = $model->where("Cliente", $_REQUEST["idClienteFiltro"]);
        }

        $tipo = [
            "03" => "BOLETA ELECTRÓNICA",
            "01" => "FACTURA ELECTRÓNICA",
            "07" => "NOTA DE CRÉDITO ELECTRÓNICA",
            "08" => "NOTA DE DÉBITO ELECTRÓNICA",
            "12" => "TICKET"
        ];

        if(!empty($_REQUEST["id_tipo_doc"])) {
            $model = $model->where("TipoDocumento", $tipo[$_REQUEST["id_tipo_doc"]]);
        }

        if(!empty($_REQUEST["estado_cpe"])) {
            $model = $model->where("EstadoSunat", $_REQUEST["estado_cpe"]);
        } 

        $anulado = [
            "S" => "Si",
            "N" => "No"
        ];

        if(!empty($_REQUEST["anulado"])) {
            $model = $model->where("Anulado", $anulado[$_REQUEST["anulado"]]);
        }

        return $model->where(function ($q) use ($s) {
            $q->orWhere('Documento', 'LIKE', '%' . $s . '%');
            $q->orWhere('Cliente', 'LIKE', '%' . $s . '%');
            $q->orWhere('FechaEmision', 'LIKE', '%' . $s . '%');
            $q->orWhere('Glosa', 'LIKE', '%' . $s . '%');
        })->orderBy('FechaEmision', 'DESC');
    }

    public function search_documentos_excel($filter)
    {
        // print_r($_REQUEST);
        $model = $this->model;
        $s = (isset($filter['search'])) ? $filter['search'] : '';
        if(!empty($_REQUEST["FechaInicioFiltro"]) && !empty($_REQUEST["FechaFinFiltro"])) {
            // $inicio = str_replace("-", "/", $_REQUEST["FechaInicioFiltro"]);
            // $fin = str_replace("-", "/", $_REQUEST["FechaFinFiltro"]);
            $inicio = $_REQUEST["FechaInicioFiltro"];
            $fin = $_REQUEST["FechaFinFiltro"];
           $model = $model->whereBetween('FechaEmision', [$inicio, $fin]);
        }

        if(!empty($_REQUEST["idClienteFiltro"])) {
            $model = $model->where("Cliente", $_REQUEST["idClienteFiltro"]);
        }

        $tipo = [
            "03" => "BOLETA ELECTRÓNICA",
            "01" => "FACTURA ELECTRÓNICA",
            "07" => "NOTA DE CRÉDITO ELECTRÓNICA",
            "08" => "NOTA DE DÉBITO ELECTRÓNICA",
            "12" => "TICKET"
        ];

        if(!empty($_REQUEST["id_tipo_doc"])) {
            $model = $model->where("TipoDocumento", $tipo[$_REQUEST["id_tipo_doc"]]);
        }

        if(!empty($_REQUEST["estado_cpe"])) {
            $model = $model->where("EstadoSunat", $_REQUEST["estado_cpe"]);
        }

        $anulado = [
            "S" => "Si",
            "N" => "No"
        ];

        if(!empty($_REQUEST["anulado"])) {
            $model = $model->where("Anulado", $anulado[$_REQUEST["anulado"]]);
        }

        return $model->where(function ($q) use ($s) {
            $q->orWhere('Documento', 'LIKE', '%' . $s . '%');
            $q->orWhere('Cliente', 'LIKE', '%' . $s . '%');
            $q->orWhere('FechaEmision', 'LIKE', '%' . $s . '%');
            $q->orWhere('Glosa', 'LIKE', '%' . $s . '%');
        })->orderBy('FechaEmision', 'DESC');
    }

    public function all()
    {
        return $this->model->all();
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        // print_r($attributes); exit;
        return $this->model->create($attributes);
    }
    public function allActive()
    {

        return $this->model->where('estado', self::$_ACTIVE)->get();
    }

    public function update($id, array $attributes)
    {
        // print_r($attributes); exit;
        $attributes['user_updated'] = auth()->id();
        $model                      = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        $attributes                 = [];
        $attributes['user_deleted'] = auth()->id();
        $model                      = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }

}
