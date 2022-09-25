<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\ReporteVentaCliente;
use Illuminate\Support\Facades\DB;

class ReporteVentaClienteRepository implements ReporteVentaClienteInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(ReporteVentaCliente $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    { 
        return $this->model->get(); 
    }
    public function allFiltro($s,$filtro_tienda,$idClienteFiltro,$idVendedorFiltro,$FechaInicioFiltro,$FechaFinFiltro,$idcategoria,$idTipoSolicitud,$idConvenio)
    {
        $dato=$this->model;
       if(!empty($FechaInicioFiltro) and !empty($FechaFinFiltro) ){
             $dato=$dato->whereDate('Fecha','>=',$FechaInicioFiltro);
             $dato=$dato->whereDate('Fecha','<=',$FechaFinFiltro);
        }  
            if(!empty($filtro_tienda)){
             $dato=$dato->Where('idtienda',$filtro_tienda);
        }
             if($idVendedorFiltro !='' ){
            $dato=$dato->where('idvendedor',$idVendedorFiltro);
        }
            if($idClienteFiltro !='' ){
            $dato=$dato->where('idCliente',$idClienteFiltro);
        }
         if(!empty($idcategoria)){
             $dato=$dato->Where('idCategoria',$idcategoria);
        }
             if($idTipoSolicitud !='' ){
            $dato=$dato->where('tipo_solicitud',$idTipoSolicitud);
        }
            if($idConvenio !='' ){
            $dato=$dato->where('idconvenio',$idConvenio);
        }

        // echo $dato->Sql(); exit;
        return $dato->get();
    }
     public function search($s,$filtro_tienda,$idClienteFiltro,$idVendedorFiltro,$FechaInicioFiltro,$FechaFinFiltro,$idcategoria,$idTipoSolicitud,$idConvenio)
    {
        $result = $this->model->where(function($q) use ($s,$filtro_tienda,$idClienteFiltro,$idVendedorFiltro,$FechaInicioFiltro,$FechaFinFiltro,$idcategoria,$idTipoSolicitud,$idConvenio){
            if(!empty($FechaInicioFiltro) and !empty($FechaFinFiltro) ){
                 $q->whereDate('Fecha','>=',$FechaInicioFiltro);
                 $q->whereDate('Fecha','<=',$FechaFinFiltro);
            }  
            if(!empty($filtro_tienda)){
              $q->Where('idtienda',$filtro_tienda);
            }
             if($idVendedorFiltro !='' ){
                  $q->where('idvendedor',$idVendedorFiltro);
            }
            if($idClienteFiltro !='' ){
                  $q->where('idCliente',$idClienteFiltro);
            }
             if(!empty($idcategoria)){
             $q->Where('idCategoria',$idcategoria);

          

        }
           if($idTipoSolicitud !='' ){
                  $q->where('tipo_solicitud',$idTipoSolicitud);
            }
            if($idConvenio !='' ){
                  $q->where('idconvenio',$idConvenio);
            }
        })->where(function ($query) {
            $query->whereNull('anulado')->orWhere('anulado','!=','S');
        });

       
        return $result;

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