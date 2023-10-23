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

    public function search($filter)
    {
        return $this->model
            ->where(function ($q) use ($filter) {
                if (isset($filter['check']) && $filter['check'] == 'true') {
//                    $from = $filter['from'] . ' 00:00:00';
//                    $to = $filter['to'] . ' 23:59:59';
                    $q->whereDate('fecha', '>=', $filter['from']);
                    $q->whereDate('fecha', '<=', $filter['to']);
//                    $q->whereBetween('fecha', [$from, $to]);
                }
                $filtro_tienda = (isset($filter['filtro_tienda'])) ? $filter['filtro_tienda'] : '';
                if ($filtro_tienda != '') {
                    $q->where('idtienda', $filtro_tienda);
                }
                $idClienteFiltro = (isset($filter['idClienteFiltro'])) ? $filter['idClienteFiltro'] : '';
                if ($idClienteFiltro != '') {
                    $q->where('idcliente', $idClienteFiltro);
                }
                $idVendedorFiltro = (isset($filter['idVendedorFiltro'])) ? $filter['idVendedorFiltro'] : '';
                if ($idVendedorFiltro != '') {
                    $q->where('idvendedor', $idVendedorFiltro);
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