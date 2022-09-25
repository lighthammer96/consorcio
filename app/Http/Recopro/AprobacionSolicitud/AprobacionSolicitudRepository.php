<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\AprobacionSolicitud;
use Illuminate\Support\Facades\DB;

class AprobacionSolicitudRepository implements AprobacionSolicitudInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(AprobacionSolicitud $model)
    {
        $this->model = $model; 
       
    }
      public function getVentasAproba($id){
        $mostrar=DB::select("select cp.description as condicion_pago_text , td.Descripcion as tipoDocumento, mo.Descripcion as moneda,* from ERP_Venta as ve inner join ERP_Clientes as cl on cl.id = ve.idCliente inner join ERP_TipoDocumento as td on ve.IdTipoDocumento=td.IdTipoDocumento inner join ERP_Moneda as mo on mo.IdMoneda=ve.IdMoneda inner join ERP_CondicionPago as cp on cp.id=ve.condicion_pago where idCliente='$id'");
         return $mostrar; 
    }
       public function getAprobadores($cCod,$nr){
        $mostrar=DB::select("select * from ERP_SolicitudConformidad as sl inner join ERP_Usuarios as us on sl.nIdUsuario=us.id  where cCodConsecutivo='$cCod' AND nConsecutivo='$nr'");
         return $mostrar; 
    }
    public function all()
    {
        return $this->model->get();
    }
    public function aprobarRechazar($data)

    {

        
        
        $sql = "
        DECLARE @return_value int,
        @sMensaje varchar(250)
        SELECT  @sMensaje = N''''''

        SET NOCOUNT ON; EXEC    @return_value = [dbo].[VTA_AprobarRechazarSol]
                @nCodConformidad = '{$data["nCodConformidad"]}',
                @Usuario = " . auth()->id() . ",
                @iEstado = '{$data["iEstado"]}',
                @cComentarios = '{$data["aprobaComentario"]}',
                @sMensaje = @sMensaje OUTPUT

        SELECT  @return_value AS 'return_value', @sMensaje as 'msg'";
        // echo $sql; exit;
      $res = DB::select($sql);

        // print_r($res);
        return $res;
    }
     public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('Conformidad', 'LIKE', '%'.$s.'%')->where('IdUsuario',auth()->id());
            $q->orWhere('Codigo', 'LIKE', '%'.$s.'%')->where('IdUsuario',auth()->id());
            $q->orWhere('Consecutivo', 'LIKE', '%'.$s.'%')->where('IdUsuario',auth()->id());
            $q->orWhere('IdUsuario', 'LIKE', '%'.$s.'%')->where('IdUsuario',auth()->id()); 
            $q->orWhere('Usuario', 'LIKE', '%'.$s.'%')->where('IdUsuario',auth()->id());      
            $q->orWhere('EstadoAprob', 'LIKE', '%'.$s.'%')->where('IdUsuario',auth()->id()); 
            $q->orWhere('Fecha', 'LIKE', '%'.$s.'%')->where('IdUsuario',auth()->id()); 
            $q->orWhere('FechaVenc', 'LIKE', '%'.$s.'%')->where('IdUsuario',auth()->id()); 
            $q->orWhere('EstadoSol', 'LIKE', '%'.$s.'%')->where('IdUsuario',auth()->id()); 
            $q->orWhere('Saldo', 'LIKE', '%'.$s.'%')->where('IdUsuario',auth()->id()); 
            $q->orWhere('Total', 'LIKE', '%'.$s.'%')->where('IdUsuario',auth()->id()); 
            $q->orWhere('Moneda', 'LIKE', '%'.$s.'%')->where('IdUsuario',auth()->id()); 
            $q->orWhere('Cliente', 'LIKE', '%'.$s.'%')->where('IdUsuario',auth()->id()); 
            $q->orWhere('NumeroDoc', 'LIKE', '%'.$s.'%')->where('IdUsuario',auth()->id()); 
            $q->orWhere('TipoDoc', 'LIKE', '%'.$s.'%')->where('IdUsuario',auth()->id()); 
            $q->orWhere('TipoSolicitud', 'LIKE', '%'.$s.'%')->where('IdUsuario',auth()->id()); 
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

    public function obtener_conformidad($id) {
        $mostrar=DB::select("SELECT * FROM ERP_SolicitudConformidad WHERE nIdConformidad={$id}");

        return $mostrar;
    }

}