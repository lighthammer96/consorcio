<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\CuentasBancarias;

use Illuminate\Support\Facades\DB;

class CuentasBancariasRepository implements CuentasBancariasInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(CuentasBancarias $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->orWhere(function($q) use ($s){
            $q->where('numero_cuenta', 'LIKE', '%'.$s.'%')
            ->where('descripcion_cuenta', 'LIKE', '%'.$s.'%');
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

    public function get_consecutivo($table,$id)
    {     
        $mostrar = DB::select("select top 1 * from $table order by CONVERT(INT, $id) DESC");
        $actu=0;
        if(!$mostrar) {
            $actu=0;
        } else {
            $actu=intval($mostrar[0]->$id);
        }
        $new=$actu+1;
        return $new; 
    }
}