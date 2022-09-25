<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Register_Transfer_Articulo;
use Illuminate\Support\Facades\DB;

class Register_Transfer_ArticuloRepository implements Register_Transfer_ArticuloInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(Register_Transfer_Articulo $model)
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
            $q->where('descripcion', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('estado', 'LIKE', '%'.$s.'%');
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
    public function delete_articulo_detalle($id)
    {
        $mostrar=DB::table('ERP_TransferenciaProducto')->where('idTransferencia', $id)->delete();
     
    }
    public function traerTipo($idArticulo){
         $mostrar=DB::select("select serie from ERP_Productos where id='$idArticulo'");
         return $mostrar;

    }
     public function traerTipoLo($idArticulo){
         $mostrar=DB::select("select lote from ERP_Productos where id='$idArticulo'");
         return $mostrar;

    }
     public function traerKit($idArticulo){
         $mostrar=DB::select("select type_id from ERP_Productos where id='$idArticulo'");
         return $mostrar;

    }
    public function delete_detalle($id){
        $mostrar=DB::table('ERP_Transferencia_Detalle')->where('idTransferencia', $id)->delete();
    }
    public function validarStockKit($idAl,$idLoca,$idAr,$cant){
        $pdo=DB::connection()->getPdo();
        $destroy=DB::select("SET NOCOUNT ON; EXEC AL_Valida_Stock_Alm_Loc '$idAl' , '$idLoca', '$idAr' , '$cant' ");
        return $destroy;
    }
     public function validarStock($idAl,$idLoca,$idAr,$valotLote,$valoSrie,$cant){
        $pdo=DB::connection()->getPdo();
        $destroy=DB::select("SET NOCOUNT ON; EXEC AL_Valida_Stock '$idAl' , '$idLoca', '$idAr','$valotLote','$valoSrie', '$cant' ");
        return $destroy;
    }
      public function traerDescripcionArticulo($idA){
         $mostrar=DB::select("select description from ERP_Productos where id='$idA'");
         return $mostrar; 
    }


}