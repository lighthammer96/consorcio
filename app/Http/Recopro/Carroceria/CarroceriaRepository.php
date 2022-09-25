<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\Carroceria;

use Illuminate\Support\Facades\DB;

class CarroceriaRepository implements CarroceriaInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(Carroceria $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('descripcion', 'LIKE', '%'.$s.'%');
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

    public function getCarrocerias()
    {
          $sql = "SELECT * FROM ERP_Carroceria";
      //     echo $sql;
            $mostrar3=DB::select($sql);
            return $mostrar3;
    }
}