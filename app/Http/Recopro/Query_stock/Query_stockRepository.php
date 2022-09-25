<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Query_stock;
use Illuminate\Support\Facades\DB;

class Query_stockRepository implements Query_stockInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(Query_stock $model)
    {
        $this->model = $model; 
       
    }
    public function getSimboloMoneda(){
          $mostrar2=DB::select("select * from ERP_Moneda where idMoneda='1'");
          return $mostrar2;
    }
    public function getSimboloMonedaDolar(){
          $mostrar2=DB::select("select * from ERP_Moneda where idMoneda='2'");
          return $mostrar2;
    }
    public function getUsuario($idusurio){
          $mostrar2=DB::select("select * from ERP_Usuarios where id='$idusurio'");
          return $mostrar2;
    }
    public function all()
    {
        return $this->model->get();
    }
    public function allFiltro($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate)
    {       $dato=$this->model->Where('Total','>',0);
            if(!empty($filtro_art)){ 
            // $dato=$dato->Where('Articulo',$filtro_art)->Where('Total','>',0); 
            $dato=$dato->Where('code_article',$filtro_art)->Where('Total','>',0); 
            } 
            if(!empty($filtro_idAlm)){
             $dato=$dato->Where('Almacen',$filtro_idAlm)->Where('Total','>',0);
            }
            if(!empty($filtro_idLoc)){
             $dato=$dato->Where('Localizacion',$filtro_idLoc)->Where('Total','>',0);
            }
            if(!empty($filtro_cate)){
             $dato=$dato->Where('Categoria',$filtro_cate)->Where('Total','>',0);
            }
          return $dato->get();
    }
     public function search($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate)
    {   

        $model = $this->model;

        if(!empty($filtro_art)){
            //  $q->Where('Articulo',$filtro_art);
            $model = $model->Where('code_article', 'LIKE', '%'.$filtro_art.'%');
            }
        $model = $model->where(function($q) use ($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate) {
            
            // $q->where('Articulo', 'LIKE', '%'.$s.'%')->Where('Total','>',0)->orderByRaw('Articulo DESC');
            $q->Where('Total','>',0)->orderByRaw('Articulo DESC');
            if(!empty($filtro_idAlm)){
             $q->Where('Almacen',$filtro_idAlm);
            }
            if(!empty($filtro_idLoc)){
             $q->Where('Localizacion',$filtro_idLoc);
            }
            if(!empty($filtro_cate)){
             $q->Where('Categoria',$filtro_cate);
            }
            // $q->orWhere('Almacen', 'LIKE', '%'.$s.'%');
            // $q->orWhere('Categoria', 'LIKE', '%'.$s.'%');
        });
        // echo $model->toSql();
        return $model;
    }
    //  public function get_data_complete()
    // {
    //     $destroy=DB::select("SET NOCOUNT ON; exec AL_Consulta_Stock 0,0,0,0");
    //     $collection = collect($destroy);
    //      return $collection;
    // }
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
    public function get_almacen(){
          $mostrar2=DB::select("select * from ERP_Almacen");
          return $mostrar2;
    }
    public function get_localizacion(){
          $mostrar2=DB::select("select * from ERP_Localizacion");
          return $mostrar2;
    }
     public function get_localizacion_almacen($id){
          $mostrar2=DB::select("select * from ERP_Localizacion where idAlmacen='$id'");
          return $mostrar2;
    }
     public function get_id_almacen($descrip){
          $mostrar2=DB::select("select * from ERP_Almacen where description='$descrip'");
          return $mostrar2;
    }
     public function get_categoria(){
          $mostrar2=DB::select("select * from ERP_Categoria");
          return $mostrar2;
    }
     public function get_articulo(){
          $mostrar2=DB::select("select * from ERP_Productos");
          return $mostrar2;
    }
    // public function getDetalleKit(){
    //       $mostrar2=DB::select("select  * from ERP_Articulo_kit as ak inner join ERP_Productos as pr on ak.idArticulo=pr.id  where idArticuloKit=$idkit");
    //       return $mostrar2;
    // }
    // public function getDetalleKit(){
    //       $mostrar2=DB::select("select  * from ERP_Articulo_kit as ak inner join ERP_Productos as pr on ak.idArticulo=pr.id  where idArticuloKit=$idkit");
    //       return $mostrar2;
    // }

}