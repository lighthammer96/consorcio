<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Descuento;
use Illuminate\Support\Facades\DB;

class DescuentoRepository implements DescuentoInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(Descuento $model)
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

 public function getUsuario(){
         $mostrar=DB::select("select * from ERP_Usuarios");
         return $mostrar;

    }
     public function getProductos(){
         $mostrar=DB::select("select * from ERP_Productos where state='1'");
         return $mostrar;

    }
     public function find_Descuento($id){
         $mostrar=DB::select("select * from ERP_Descuentos where id='$id' ");
         return $mostrar;

    }
     public function findDescuentoUsuario($id){
         $mostrar=DB::select("select * from ERP_DescuentosUsuario as du inner JOIN ERP_Usuarios as u on u.id=du.nIdUsuario where du.nIdDscto='$id'");
         return $mostrar;

    }
     public function findDescuentoProducto($id){
         $mostrar=DB::select("select * from ERP_DescuentosProducto as dp INNER JOIN ERP_Productos as p on p.id=dp.nIdProducto where dp.nIdDscto='$id'");
         return $mostrar;

    }
    public function destroyUsuarioUnico($id,$idUsuario)
    {
        
        DB::table('ERP_DescuentosUsuario')->where('nIdDscto',$id)->where('nIdUsuario',$idUsuario)->delete();
      
     
    }
    public function destroyUsuarioTotal($id)
    {
        
        DB::table('ERP_DescuentosUsuario')->where('nIdDscto',$id)->delete();
      
     
    }
    public function destroyProductoTotal($id)
    {
        
        DB::table('ERP_DescuentosProducto')->where('nIdDscto',$id)->delete();
      
     
    }
    public function destroyProductoUnico($id,$idProducto)
    {
        
        DB::table('ERP_DescuentosProducto')->where('nIdDscto',$id)->where('nIdProducto',$idProducto)->delete();
      
     
    }
    public function actualizarDescuentoUsuario($res,$idUsuario,$modo,$usuario){
         $pdo=DB::connection()->getPdo();
         $destroy=DB::update("SET NOCOUNT ON; EXEC ST_ActualizaDescuentoUsuario 
                '$res',
                '$idUsuario',
                '$modo',
                '$usuario'"
          );
       }
     public function actualizarDescuentoProducto($res,$idProducto,$modo,$usuario){
         $pdo=DB::connection()->getPdo();
         $destroy=DB::update("SET NOCOUNT ON; EXEC ST_ActualizaDescuentoProducto 
                '$res',
                '$idProducto',
                '$modo',
                '$usuario'"
          );
       }   

    public function actualizarDescuento(
                 $id,
                $descripcion ,
                $idTipo ,
                $nPorcDescuento,
                $idMoneda,
                $nMonto,
                $estado,
                $dFecIni,
                $dFecFin,
                $nLimiteUso,
                $nCantUso,
                $nSaldoUso,
                $nTodosUsusarios,
                $cTipoAplica,
                $Modo,
                $Usuario, $todos_articulos){
         $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC ST_ActualizaDescuento 
                '$id',
                '$descripcion',
                '$idTipo',
                '$nPorcDescuento',
                '$idMoneda',
                '$nMonto',
                '$estado',
                '$dFecIni',
                '$dFecFin',
                '$nLimiteUso',
                '$nCantUso',
                '$nSaldoUso',
                '$nTodosUsusarios',
                '$cTipoAplica',
                '$Modo',
                '$Usuario', '$todos_articulos'");
         return $destroy;
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
        DB::table('ERP_DescuentosUsuario')->where('nIdDscto',$id)->delete();
        DB::table('ERP_DescuentosProducto')->where('nIdDscto',$id)->delete();
        $model->update($attributes);
        $model->delete();
     
    }

}