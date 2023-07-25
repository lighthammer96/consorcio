<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\SolicitudCompraArticulo;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class SolicitudCompraArticuloRepository implements SolicitudCompraArticuloInterface
{
    protected $model;

    private static $_ACTIVE = 'A';

    public function __construct(SolicitudCompraArticulo $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->get();
    }

    public function search(array $filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';
        return $this->model->where(function ($q) use ($s) {
            $q->whereHas('article', function ($art) use ($s) {
                $art->where('description', 'LIKE', '%' . $s . '%');
            });
//            $q->orWhere('estado', 'LIKE', '%' . $s . '%');
        })->where(function ($q) use ($filter) {
            $cons = (isset($filter['consecutive'])) ? $filter['consecutive'] : '';
            $date_req = (isset($filter['date_required'])) ? $filter['date_required'] : '';
            if ($cons != '' || $date_req != '') {
                $q->whereHas('movement', function ($mov) use ($cons, $date_req) {
                    if ($cons != '') {
                        $mov->where('nConsecutivo', $cons);
                    }
                    if ($date_req != '') {
                        $date_req = Carbon::createFromFormat('d/m/Y', $date_req)->toDateString();
                        $mov->whereDate('fecha_requerida', $date_req);
                    }
                });
            }
            if (isset($filter['is_process'])) {
                $q->where('estado', 1);
//                $q->whereHas('movement', function ($m) {
//                    $m->where('estado', 1);
//                });
            }
        });
    }

    public function max()
    {
        return $this->model->max('id');
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('idArticulo', $attributes['idArticulo'])
            ->where('idMovimiento', $attributes['idMovimiento'])
            ->first();

        $attributes['user_updated'] = auth()->id();
        if ($model) {
            $this->model->where('id', $model->id)->update($attributes);
        } else {
            $attributes['user_created'] = auth()->id();
            $attributes = setIdTableByMax($this->max(), $attributes);
            $model = $this->model->create($attributes);
        }
        return $this->model->find($model->id);
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        return $this->model->create($attributes);
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);

        return $this->model->find($id);
    }

    public function deleteBySol($sol_id)
    {
        return $this->model->where('idMovimiento', $sol_id)->delete();
    }

    public function deleteByExcept($sol_id, array $ids)
    {
        return $this->model->where('idMovimiento', $sol_id)
            ->whereNotIn('id', $ids)
            ->delete();
    }

    public function getIDByLast()
    {
        $last = $this->model->orderByRaw('CONVERT(INT, consecutivo) DESC')->first();
        return ($last) ? (int)$last->consecutivo + 1 : 1;
    }

    public function updateBySol($sol_id, $attributes)
    {
        $this->model->where('idMovimiento', $sol_id)->update($attributes);
    }

    public function allActive()
    {
        return $this->model->where('estado', self::$_ACTIVE)->get();
    }

    public function getDetalleArticulosSolicitud($id)
    {
        $mostrar = DB::select("select * from ERP_SolicitudCompra_Articulo where idMovimiento='$id'");
        return $mostrar;
    }

    public function getidSolicitud($id)
    {
        $mostrar = DB::select("select sca.idMovimiento from  ERP_OrdenCompraArticulo as oca inner join ERP_SolicitudCompra_Articulo as sca on sca.consecutivo=oca.codSolicitud where oca.idOrden='$id' 
");
        return $mostrar;
    }

    public function update_estado($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $this->model->where('consecutivo', $id)->update($attributes);
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

    public function update_estadoSolicitudCompra($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        DB::table('ERP_SolicitudCompra')->where('idMovimiento', $id)->update($attributes);

    }

    public function destroy($id)
    {
        $attributes = [];
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();

    }

    public function delete_articulo_detalle($id)
    {
        $mostrar = DB::table('ERP_SolicitudCompra_Detalle')->where('idMovimiento', $id)->delete();

    }

    public function delete_detalle($id)
    {
        $mostrar = DB::table('ERP_SolicitudCompra_Articulo')->where('idMovimiento', $id)->delete();
    }

    public function traerTipo($idArticulo)
    {
        $mostrar = DB::select("select serie from ERP_Productos where id='$idArticulo'");
        return $mostrar;

    }


}