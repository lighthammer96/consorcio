<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\Warehouse;
use Illuminate\Support\Facades\DB;
class WarehouseRepository implements WarehouseInterface
{
    protected $model;
    private static $_ACTIVE = 1;
    public function __construct(Warehouse $model)
    {
        $this->model = $model;
    }


    public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('description', 'LIKE', '%'.$s.'%');
            $q->orWhere('code_internal', 'LIKE', '%'.$s.'%');
            $q->orWhere('address', 'LIKE', '%'.$s.'%');
            $q->orWhereHas('type', function ($e) use ($s) {
                $e->where('description', 'LIKE', '%' . $s . '%');
            });
            $q->orWhereHas('_state', function ($e) use ($s) {
                $e->where('description', 'LIKE', '%' . $s . '%');
            });
        });
    }

    public function all()
    {
        return $this->model->all();
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
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }
      public function allActive()
    {
        return $this->model->where('state', self::$_ACTIVE)->get();
    }

    public function findByCode($code)
    {
        return $this->model->where('code_internal', $code)->first();
    }
    public function getlocalizacione($id){
        $mostrar=DB::select("select  * from ERP_Localizacion where idAlmacen=$id");
        return $mostrar;
    }
    public function getAlmacen_usuario($usuario){
        $mostrar=DB::select("select al.id as idAlmacen, al.description as descripcion from ERP_Almacen as al inner join ERP_AlmacenUsuario as alu on al.id=alu.warehouse_id where alu.user_id=$usuario");
        return $mostrar;
    }

    public function getAlmacen_todos(){
        $mostrar=DB::select("select al.id as idAlmacen, al.description as descripcion from ERP_Almacen as al");
        return $mostrar;
    }
}
