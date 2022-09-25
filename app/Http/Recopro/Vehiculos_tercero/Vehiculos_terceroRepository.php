<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Vehiculos_tercero;
use Illuminate\Support\Facades\DB;

class Vehiculos_terceroRepository implements Vehiculos_terceroInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(Vehiculos_tercero $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    {
        return $this->model->get();
    }
     public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('idModelo', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('idMarca', 'LIKE', '%'.$s.'%');
            $q->orWhere('n_chasis', 'LIKE', '%'.$s.'%');
            $q->orWhere('anio_fabricacion', 'LIKE', '%'.$s.'%');
            $q->orWhere('color', 'LIKE', '%'.$s.'%');
            $q->orWhere('placa', 'LIKE', '%'.$s.'%');
            $q->orWhere('motor', 'LIKE', '%'.$s.'%');
            
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
    public function get_Placa_document($id)
    {
        $mostra=DB::select("SELECT 'terceros' AS tipo, mar.description as marca,ub.descripcion as modelo,*, ti.id, '' AS idproducto FROM ERP_VehTerceros as ti 
        inner join ERP_Modelo as ub on ti.idModelo=ub.idModelo 
        left join ERP_Marcas as mar on mar.id=ti.idMarca where ti.placa='$id'");
        return $mostra;
    }
     public function get_Placa_document_empresa($id)
    {
        $mostra=DB::select("SELECT 'series' AS tipo, mo.descripcion as modelo,mr.description as marca,se.idSerie as id,se.chasis as n_chasis, se.anio_fabricacion as anio_fabricacion,se.color as color,se.cPlacaVeh as placa,se.motor as motor, pr.id AS idproducto, pr.idModelo, pr.idMarca
        FROM ERP_Serie as se 
        inner join ERP_Productos as pr on pr.id=se.idArticulo 
        inner join erp_modelo as mo on mo.idModelo=pr.idModelo 
        inner join ERP_Marcas as mr on mr.id=pr.idMarca where se.cPlacaVeh='$id'");
        return $mostra;
    }
    public function get_Marca_or()
    {
        $mostra=DB::select("SELECT * FROM ERP_Marcas");
        return $mostra;
    }
     public function get_TipoVehi_or()
    {
        $mostra=DB::select("select * from ERP_TipoVehiculo where estado='A'");
        return $mostra;
    }
    public function get_Modelo_ar($id)
    {
        $mostra=DB::select("SELECT * FROM ERP_Modelo where idMarca='$id'");
        return $mostra;
    }

}