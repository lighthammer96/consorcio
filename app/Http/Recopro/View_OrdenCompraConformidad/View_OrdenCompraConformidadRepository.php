<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\View_OrdenCompraConformidad;
use Illuminate\Support\Facades\DB;

class View_OrdenCompraConformidadRepository implements View_OrdenCompraConformidadInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(View_OrdenCompraConformidad $model)
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
            $q->where('Conformidad', 'LIKE', '%'.$s.'%');
            $q->orWhere('Codigo', 'LIKE', '%'.$s.'%');
         $q->orWhere('Consecutivo', 'LIKE', '%'.$s.'%');
          $q->orWhere('Usuario', 'LIKE', '%'.$s.'%');
           $q->orWhere('EstadoAprob', 'LIKE', '%'.$s.'%');
            $q->orWhere('Fecha', 'LIKE', '%'.$s.'%');
            $q->orWhere('FechaReq', 'LIKE', '%'.$s.'%');
           $q->orWhere('TipoDoc', 'LIKE', '%'.$s.'%');
            $q->orWhere('NumeroDoc', 'LIKE', '%'.$s.'%');
             $q->orWhere('TipoDoc', 'LIKE', '%'.$s.'%');
            $q->orWhere('Proveedor', 'LIKE', '%'.$s.'%');
             $q->orWhere('Moneda', 'LIKE', '%'.$s.'%');
            $q->orWhere('Total', 'LIKE', '%'.$s.'%');
        })->where('IdUsuario',auth()->id());

    }
    public function getAprobadores($cCod,$nr){
        $mostrar=DB::select("select * from ERP_OrdenCompraConformidad as sl inner join ERP_Usuarios as us on sl.nIdUsuario=us.id  where cCodConsecutivo='$cCod' AND nConsecutivo='$nr'");
         return $mostrar; 
    }
    public function update_aprobacion($cod,$ncon,$comentario)
    {   
        $mostrar=DB::update("UPDATE ERP_OrdenCompra
            SET comentarioAprobacion = '$comentario' WHERE cCodConsecutivo='$cod' and nConsecutivo='$ncon'");
        return $mostrar; 
    } 
    public function aprobarRechazar($data)

    {   
        $esta='';
        if($data["iEstado"]=='1'){
              $esta='3';
        }else if ($data["iEstado"]=='2') {
              $esta='8';
        }
        
        $id=$data["id"];
        $sql = "
        DECLARE @return_value int,
        @sMensaje varchar(250)
        SELECT  @sMensaje = N''''''

        SET NOCOUNT ON; EXEC    @return_value = [dbo].[COM_AprobarRechazarOrd]
                @nCodConformidad = '{$data["nCodConformidad"]}',
                @Usuario = " . auth()->id() . ",
                @iEstado = '{$data["iEstado"]}',
                @cComentarios = '{$data["aprobaComentario"]}',
                @sMensaje = @sMensaje OUTPUT

        SELECT  @return_value AS 'return_value', @sMensaje as 'msg'";
        // echo $sql; exit;
      $mostrar=DB::update("UPDATE ERP_OrdenCompraArticulo SET iEstado = '$esta' where idOrden='$id'");  
      $res = DB::select($sql); 

        // print_r($res);
        return $res;
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