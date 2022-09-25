<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Query_movements;
use Illuminate\Support\Facades\DB;

class Query_movementsRepository implements Query_movementsInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(Query_movements $model)
    {
        $this->model = $model; 
       
    }

    public function all()
    { 
        return $this->model->get();
    }
      public function allFiltro($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate,$filtro_nat,$filtro_oper,$n_movimiento,$cod_lote,$cod_serie,$fecha_inicio,$fecha_fin)
    {
           $dato=$this->model;
            if(!empty($fecha_inicio) and !empty($fecha_fin) ){
                $dato=$dato->whereDate('fecha_registro','>=',$fecha_inicio);
                $dato=$dato->whereDate('fecha_registro','<=',$fecha_fin);
            }
            if(!empty($filtro_art)){
            $dato=$dato->Where('Articulo',$filtro_art);
            }
            if(!empty($filtro_idAlm)){
             $dato=$dato->Where('Almacen',$filtro_idAlm);
            }
            if(!empty($filtro_idLoc)){
             $dato=$dato->Where('Localizacion',$filtro_idLoc);
            }
            if(!empty($filtro_cate)){
             $dato=$dato->Where('Categoria',$filtro_cate);
            }
            if(!empty($filtro_nat)){
              $dato=$dato->Where('Naturaleza',$filtro_nat);
            }
            if(!empty($filtro_oper)){
              $dato=$dato->Where('Tipo_Operacion',$filtro_oper);
            }
            if(!empty($n_movimiento)){
              $dato=$dato->Where('idOrigen',$n_movimiento);
            }
            if(!empty($cod_lote)){
              $dato=$dato->Where('Lote',$cod_lote);
            }
             if(!empty($cod_serie)){
              $dato=$dato->Where('Serie',$cod_serie);
            }

           return $dato->get();
    }
     public function search($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate,$filtro_nat,$filtro_oper,$n_movimiento,$cod_lote,$cod_serie,$fecha_inicio,$fecha_fin)
    {
        return $this->model->where(function($q) use ($s,$filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate,$filtro_nat,$filtro_oper,$n_movimiento,$cod_lote,$cod_serie,$fecha_inicio,$fecha_fin){
            $q->orderByRaw('fecha_registro DESC');
            if(!empty($fecha_inicio) and !empty($fecha_fin) ){
                $q->whereDate('fecha_registro','>=',$fecha_inicio);
                $q->whereDate('fecha_registro','<=',$fecha_fin);
            }
            if(!empty($filtro_art)){
            //  $q->Where('Articulo',$filtro_art);
             $q->Where('code_article', 'LIKE', '%'.$filtro_art.'%');
            }
            if(!empty($filtro_idAlm)){
             $q->Where('Almacen',$filtro_idAlm);
            }
            if(!empty($filtro_idLoc)){
             $q->Where('Localizacion',$filtro_idLoc);
            }
            if(!empty($filtro_cate)){
             $q->Where('Categoria',$filtro_cate);
            }
            if(!empty($filtro_nat)){
             $q->Where('Naturaleza',$filtro_nat);
            }
            if(!empty($filtro_oper)){
             $q->Where('Tipo_Operacion',$filtro_oper);
            }
            if(!empty($n_movimiento)){
             $q->Where('idOrigen',$n_movimiento);
            }
            if(!empty($cod_lote)){
             $q->Where('Lote',$cod_lote);
            }
             if(!empty($cod_serie)){
             $q->Where('Serie',$cod_serie);
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
    public function getSimboloMoneda(){
          $mostrar2=DB::select("select * from ERP_Moneda where idMoneda='1'");
          return $mostrar2;
    }
    public function getSimboloMonedaTotal(){
          $mostrar2=DB::select("select * from ERP_Moneda where Estado='A'");
          return $mostrar2;
    }
    
    public function get_almacen(){
          $mostrar2=DB::select("select * from ERP_Almacen");
          return $mostrar2;
    }
    public function get_localizacion(){
          $mostrar2=DB::select("select * from ERP_Localizacion");
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
    public function get_tipoOperacion(){
          $mostrar2=DB::select("select * from ERP_TipoOperacion");
          return $mostrar2;
    }
    public function get_naturaleza(){
          $mostrar2=DB::select("select * from ERP_Naturaleza_Operacion");
          return $mostrar2;
    }
    // public function getDataPDF($filtro_art,$filtro_idAlm,$filtro_idLoc,$filtro_cate,$filtro_nat,$filtro_oper,$n_movimiento,$cod_lote,$cod_serie,$fecha_inicio,$fecha_fin){
    //        $dato=$this->model;
    //         if(!empty($fecha_inicio) and !empty($fecha_fin) ){
    //             $dato=$dato->whereDate('fecha_registro','>=',$fecha_inicio);
    //             $dato=$dato->whereDate('fecha_registro','<=',$fecha_fin);
    //         }
    //         if(!empty($filtro_art)){
    //         $dato=$dato->Where('Articulo',$filtro_art);
    //         }
    //         if(!empty($filtro_idAlm)){
    //          $dato=$dato->Where('Almacen',$filtro_idAlm);
    //         }
    //         if(!empty($filtro_idLoc)){
    //          $dato=$dato->Where('Localizacion',$filtro_idLoc);
    //         }
    //         if(!empty($filtro_cate)){
    //          $dato=$dato->Where('Categoria',$filtro_cate);
    //         }
    //         if(!empty($filtro_nat)){
    //           $dato=$dato->Where('Naturaleza',$filtro_nat);
    //         }
    //         if(!empty($filtro_oper)){
    //           $dato=$dato->Where('Tipo_Operacion',$filtro_oper);
    //         }
    //         if(!empty($n_movimiento)){
    //           $dato=$dato->Where('idOrigen',$n_movimiento);
    //         }
    //         if(!empty($cod_lote)){
    //           $dato=$dato->Where('Lote',$cod_lote);
    //         }
    //          if(!empty($cod_serie)){
    //           $dato=$dato->Where('Serie',$cod_serie);
    //         }
    //        return $dato->get();
    // }

}