<?php

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\ReporteComisiones;

use Illuminate\Support\Facades\DB;

class ReporteComisionesRepository implements ReporteComisionesInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(ReporteComisiones $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->get();
    }
    public function allFiltro($s, $idClienteFiltro, $idVendedorFiltro, $FechaInicioFiltro, $FechaFinFiltro)
    {
        $dato = $this->model;
        if (!empty($FechaInicioFiltro) and !empty($FechaFinFiltro)) {
            $dato = $dato->whereDate('FechaDoc', '>=', $FechaInicioFiltro);
            $dato = $dato->whereDate('FechaDoc', '<=', $FechaFinFiltro);
        }

        if ($idVendedorFiltro != '') {
            $dato = $dato->where('IdVendedor', $idVendedorFiltro);
        }
        if ($idClienteFiltro != '') {
            $dato = $dato->where('IdCliente', $idClienteFiltro);
        }


        // echo $dato->Sql(); exit;
        return $dato->get();
    }
    public function search($s, $idClienteFiltro, $idVendedorFiltro, $FechaInicioFiltro, $FechaFinFiltro)
    {
        $result = $this->model->where(function ($q) use ($s, $idClienteFiltro, $idVendedorFiltro, $FechaInicioFiltro, $FechaFinFiltro) {
            if (!empty($FechaInicioFiltro) and !empty($FechaFinFiltro)) {
                $q->whereDate('FechaDoc', '>=', $FechaInicioFiltro);
                $q->whereDate('FechaDoc', '<=', $FechaFinFiltro);
            }
           
            if ($idVendedorFiltro != '') {
                $q->where('IdVendedor', $idVendedorFiltro);
            }
            if ($idClienteFiltro != '') {
                $q->where('IdCliente', $idClienteFiltro);
            }
            
        });


        return $result;
    }
    public function allActive()
    {
        return $this->model->where('estado', self::$_ACTIVE)->get();
    }
    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        return $this->model->create($attributes);
    }
    public function get_consecutivo($table, $id)
    {
        $mostrar = DB::select("select top 1 * from $table order by CONVERT(INT, $id) DESC");
        $actu = 0;
        if (!$mostrar) {
            $actu = 0;
        } else {
            $actu = intval($mostrar[0]->$id);
        };
        $new = $actu + 1;
        return $new;
    }
    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }
    public function destroy($id)
    {
        $attributes = [];
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }
}
