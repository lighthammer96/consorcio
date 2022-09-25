<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\Aprobacion;

use Illuminate\Support\Facades\DB;

class AprobacionRepository implements AprobacionInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(Aprobacion $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->orWhere(function($q) use ($s){
            $q->where('nombre_aprobacion', 'LIKE', '%'.$s.'%');
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
    public function getDetalle($id)
    {   
        $mostrar=DB::select("select * from ERP_AprobacionUsuario where idAprobacion='$id'");
        return $mostrar; 
    }

    public function update_aprobacion($cod,$ncon,$comentario)
    {   
        $mostrar=DB::update("UPDATE ERP_Solicitud
SET comentario_aprobacion = '$comentario' WHERE cCodConsecutivo='$cod' and nConsecutivo='$ncon'");
        return $mostrar; 
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
        DB::table('ERP_AprobacionUsuario')->where('idAprobacion',$id)->delete();
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
     public function destroy_aprobacionSoliDetalle($id,$usua)
    {
       
        DB::table('ERP_AprobacionUsuario')->where('idAprobacion',$id)->where('idUsuario',$usua)->delete();
    }

}