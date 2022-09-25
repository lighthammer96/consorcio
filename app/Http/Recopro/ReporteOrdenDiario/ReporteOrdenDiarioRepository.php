<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\ReporteOrdenDiario;
use Illuminate\Support\Facades\DB;

class ReporteOrdenDiarioRepository implements ReporteOrdenDiarioInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(ReporteOrdenDiario $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    {
        return $this->model->get();
    }
    public function allFiltro($s,$idMarca,$idtipoveh,$FechaInicioFiltro,$FechaFinFiltro)
    {
        $dato=$this->model;
       if(!empty($FechaInicioFiltro) and !empty($FechaFinFiltro) ){
             $dato=$dato->whereDate('dFecRec','>=',$FechaInicioFiltro);
             $dato=$dato->whereDate('dFecRec','<=',$FechaFinFiltro);
        } 
           if($idtipoveh !='' ){
              
                $dato=$dato->Where('id_tipoveh',$idtipoveh);
            }
           if($idMarca !='' ){
              
                $dato=$dato->Where('idMarca_serie',$idMarca);
            }
            if($idMarca !='' ){
              
                $dato=$dato->orWhere('idMarca_vet',$idMarca);
            }      

        return $dato->get();
    }

     public function search($s,$idMarca,$idtipoveh,$FechaInicioFiltro,$FechaFinFiltro)
    {
        return $this->model->where(function($q) use ($s,$idMarca,$idtipoveh,$FechaInicioFiltro,$FechaFinFiltro){
            if(!empty($FechaInicioFiltro) and !empty($FechaFinFiltro) ){
                 $q->whereDate('dFecRec','>=',$FechaInicioFiltro);
                 $q->whereDate('dFecRec','<=',$FechaFinFiltro);
            }  
            if($idtipoveh !='' ){
                $q->where('id_tipoveh',$idtipoveh);
            }
            if($idMarca !='' ){
                // $q->orWhere('idMarca_serie',$idMarca);
                $q->Where('idMarca_serie',$idMarca);
            }
            if($idMarca !='' ){
                // $q->orWhere('idMarca_serie',$idMarca);
                $q->orWhere('idMarca_vet',$idMarca);
            }
        });

    }
     public function getMarcas()
    {
        $mostra=DB::select("select * from ERP_Marcas");
        return $mostra;
    }
    public function getTipoVehi()
    {
        $mostra=DB::select("select * from ERP_TipoVehiculo where estado='A'");
        return $mostra;
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

}