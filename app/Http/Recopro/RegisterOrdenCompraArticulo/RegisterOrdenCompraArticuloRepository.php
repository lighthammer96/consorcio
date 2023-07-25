<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\RegisterOrdenCompraArticulo;

use Illuminate\Support\Facades\DB;

class RegisterOrdenCompraArticuloRepository implements RegisterOrdenCompraArticuloInterface
{
    protected $model;

    private static $_ACTIVE = 'A';

    public function __construct(RegisterOrdenCompraArticulo $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->get();
    }

    public function search($s)
    {
        return $this->model->where(function ($q) use ($s) {
                $q->where('descripcion', 'LIKE', '%' . $s . '%');
                $q->orWhere('estado', 'LIKE', '%' . $s . '%');
            })
            ->orderByRaw('created_at DESC');
    }

    public function getDataOrdeCompraArt($id)
    {
        $mostrar = DB::select("select * from ERP_OrdenCompraArticulo where id='$id'");
        return $mostrar;
    }

    public function allActive()
    {
        return $this->model->where('estado', self::$_ACTIVE)->get();
    }

    public function max()
    {
        return $this->model->max('id');
    }

    public function find($id)
    {
        return $this->model->find($id);
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
        $model = $this->model->find($id);
        $model->update($attributes);
        return $this->find($id);
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('idArticulo', $attributes['idArticulo'])
            ->where('idOrden', $attributes['idOrden'])
            ->first();

        if ($model) {
            $this->model->where('id', $model->id)->update($attributes);
        } else {
            $attributes = setIdTableByMax($this->max(), $attributes);
            $model = $this->model->create($attributes);
        }
        return $this->find($model->id);
    }

    public function destroyExcept($oc_id, array $ids)
    {
        $this->model->where('idOrden', $oc_id)
            ->whereNotIn('id', $ids)
            ->delete();
    }

    public function getExcept($oc_id, array $ids)
    {
        return $this->model->where('idOrden', $oc_id)
            ->whereNotIn('id', $ids)
            ->get();
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

    public function destroy($id)
    {
        $attributes = [];
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();

    }

    public function delete_articulo_detalle($id)
    {
        $mostrar = DB::table('ERP_Movimiento_Detalle')->where('idMovimiento', $id)->delete();

    }

    public function delete_detalle($id)
    {
        $mostrar = DB::table('ERP_Movimiento_Articulo')->where('idMovimiento', $id)->delete();
    }

    public function traerTipo($idArticulo)
    {
        $mostrar = DB::select("select serie from ERP_Productos where id='$idArticulo'");
        return $mostrar;

    }


}
