<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Cobrador;
use Illuminate\Support\Facades\DB;

class CobradorRepository implements CobradorInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(Cobrador $model)
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
            $q->where('descripcion', 'LIKE', '%'.$s.'%')->orderByRaw('dFecCre DESC');
            $q->orWhere('estado', 'LIKE', '%'.$s.'%');
        });

    } 
    public function asignar_cobrador($codCons,$nCod,$idCobrador)
    {

        $sql = "UPDATE ERP_Solicitud SET idCobrador = '$idCobrador' WHERE cCodConsecutivo='$codCons' and nConsecutivo='$nCod'";
        $result = DB::update($sql);

        return $result;
    }
    public function asignar_cobrador_total($idCobrador,$cod,$nco)
    {

        $sql = " UPDATE ERP_Solicitud
                 SET idCobrador = '$idCobrador'
                 where cCodConsecutivo in ($cod) and  nConsecutivo in ($nco)";
        $result = DB::update($sql);

        return $result;
    }
    public function getCobrador(){
          $mostrar2=DB::select("select * from ERP_Cobrador where estado='A'");
          return $mostrar2;
    }
    public function getCategorias(){
          $mostrar2=DB::select("select * from ERP_Categoria where estado='A'");
          return $mostrar2;
    }
    public function getCliente(){
          $mostrar2=DB::select("select * from ERP_Clientes");
          return $mostrar2;
    }
     public function getTienda(){
          $mostrar2=DB::select("select * from ERP_Tienda where estado='A'");
          return $mostrar2;
    }
    public function allActive()
    {
       return $this->model->where('estado', self::$_ACTIVE)->get();
    }
     public function create(array $attributes)
    {
        $attributes['cIdUsuCre'] = auth()->id(); 
        $attributes['cIdUsuMod'] = auth()->id();
        return $this->model->create($attributes);
    }
    public function getUsuarios(){
          $mostrar2=DB::select("select * from ERP_Usuarios ");
          return $mostrar2;
    }
     public function getVendedor(){
          $mostrar2=DB::select("select * from ERP_Vendedores where estado='A'");
          return $mostrar2;
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