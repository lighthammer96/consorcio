<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\View_AL_Entega_ST_Cliente;
use Illuminate\Support\Facades\DB;

class View_AL_Entega_ST_ClienteRepository implements View_AL_Entega_ST_ClienteInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(View_AL_Entega_ST_Cliente $model)
    {
        $this->model = $model;

    }

    public function all()
    {
        return $this->model->get();
    }
    public function search($filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';

        return $this->model->where(function($q) use ($s){
            $q->orWhere('nro', 'LIKE', '%'.$s.'%');
            $q->orWhere('fecha', 'LIKE', '%'.$s.'%');
            $q->orWhere('tipooperacion', 'LIKE', '%'.$s.'%');
            $q->orWhere('Usuario', 'LIKE', '%'.$s.'%');
            $q->orWhere('estado', 'LIKE', '%'.$s.'%');
            $q->orWhere('documento', 'LIKE', '%'.$s.'%');
            $q->orWhere('cliente', 'LIKE', '%'.$s.'%');
        })->where(function ($q) use ($filter) {
            if (isset($filter['check']) && $filter['check'] == 'true') {
                $from = $filter['from'] . ' 00:00:00';
                $to = $filter['to'] . ' 23:59:59';
                $q->whereBetween('fecha', [$from, $to]);
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
    public function get_consecutivo($table,$id)
    {     $mostrar=DB::select("select top 1 * from $table order by CONVERT(INT, $id) DESC");
        $actu=0;
        if(!$mostrar){
            $actu=0;
        }else{
            $actu=intval($mostrar[0]->$id);
        };
        $new=$actu+1;
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
    public function findByCode($code)
    {
        return $this->model->where('periodo', $code)->where("estado", "P")->first();
    }

}