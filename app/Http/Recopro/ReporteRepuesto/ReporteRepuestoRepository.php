<?php

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\ReporteRepuesto;

use Illuminate\Support\Facades\DB;

class ReporteRepuestoRepository implements ReporteRepuestoInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(ReporteRepuesto $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->get();
    }
    public function allFiltro($s, $filtro_tienda, $idClienteFiltro, $idVendedorFiltro, $FechaInicioFiltro, $FechaFinFiltro)
    {
        $dato = $this->model;
        if (!empty($FechaInicioFiltro) and !empty($FechaFinFiltro)) {
            $dato = $dato->whereDate('fecha', '>=', $FechaInicioFiltro);
            $dato = $dato->whereDate('fecha', '<=', $FechaFinFiltro);
        }
        if (!empty($filtro_tienda)) {
            $dato = $dato->Where('idtienda', $filtro_tienda);
        }
        if ($idVendedorFiltro != '') {
            $dato = $dato->where('idvendedor', $idVendedorFiltro);
        }
        if ($idClienteFiltro != '') {
            $dato = $dato->where('idcliente', $idClienteFiltro);
        }
      
        return $dato->orderBy('fecha', 'ASC')->orderBy('nConsecutivo', 'ASC')->get();
    }
    public function search($s, $filtro_tienda, $idClienteFiltro, $idVendedorFiltro, $FechaInicioFiltro, $FechaFinFiltro)
    {
        return $this->model->where(function ($q) use ($s, $filtro_tienda, $idClienteFiltro, $idVendedorFiltro, $FechaInicioFiltro, $FechaFinFiltro) {
            if (!empty($FechaInicioFiltro) and !empty($FechaFinFiltro)) {
                $q->whereDate('fecha', '>=', $FechaInicioFiltro);
                $q->whereDate('fecha', '<=', $FechaFinFiltro);
            }
            if (!empty($filtro_tienda)) {
                $q->Where('idtienda', $filtro_tienda);
            }
            if ($idVendedorFiltro != '') {
                $q->where('idvendedor', $idVendedorFiltro);
            }
            if ($idClienteFiltro != '') {
                $q->where('idcliente', $idClienteFiltro);
            }
        });
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
