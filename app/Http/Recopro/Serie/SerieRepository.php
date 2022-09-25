<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Serie;
use Illuminate\Support\Facades\DB;

class SerieRepository implements SerieInterface
{
    protected $model;

    public function __construct(Serie $model)
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
            $q->where('nombreserie', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('chasis', 'LIKE', '%'.$s.'%');
            $q->orWhere('motor', 'LIKE', '%'.$s.'%');
            $q->orWhere('anio_fabricacion', 'LIKE', '%'.$s.'%');
        });

    }
     public function searchMovi($s,$idProducto)
    {
        return $this->model->where(function($q) use ($s,$idProducto){
            $q->where('nombreserie', 'LIKE', '%'.$s.'%')->where('idArticulo',$idProducto)->orderByRaw('created_at DESC');
            $q->orWhere('chasis', 'LIKE', '%'.$s.'%')->where('idArticulo',$idProducto);
            $q->orWhere('motor', 'LIKE', '%'.$s.'%')->where('idArticulo',$idProducto);
            $q->orWhere('anio_fabricacion', 'LIKE', '%'.$s.'%')->where('idArticulo',$idProducto);
            $q->orWhere('anio_modelo', 'LIKE', '%'.$s.'%')->where('idArticulo',$idProducto);
            $q->orWhere('color', 'LIKE', '%'.$s.'%')->where('idArticulo',$idProducto);

        });

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
        return $this->model->where('nombreSerie', $code)->first();
    }

    public function find($id)
    {
        $mostra=DB::select("SELECT pr.id as idArticulo,pr.description as Articulo,Se.idSerie as idSerie,Se.nombreSerie AS nombreSerie,Se.cPlacaVeh as cPlacaVeh, Se.chasis as chasis,Se.idTipoCompraVenta as idTipoCompraVenta,Se.nPoliza as nPoliza, Se.nLoteCompra as nLoteCompra, Se.motor as motor, Se.anio_fabricacion as anio_fabricacion, Se.anio_modelo as anio_modelo, Se.color as color FROM ERP_Serie as Se inner join ERP_Productos as pr on Se.idArticulo=pr.id where Se.idSerie=$id");
        return $mostra;
    }
     public function get_tipoCompraVenta(){
        $mostrar=DB::select("select * from ERP_TipoCompraVenta where estado='A'");
        return $mostrar;
    }
    public function getSeries($idArticulo){
        $mostra=DB::select("select idArticulo from ERP_Serie where idArticulo=$idArticulo");
        return $mostra;
    }

}