<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Quality_control;
use Illuminate\Support\Facades\DB;

class Quality_controlRepository implements Quality_controlInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(Quality_control $model)
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
            $q->where('id', 'LIKE', '%'.$s.'%')->orderByRaw('dFecCre');
            $q->where('cCodConsecutivoOS', 'LIKE', '%'.$s.'%');
            $q->orWhere('nConsecutivoOS', 'LIKE', '%'.$s.'%');
            $q->orWhere('dFechaRegistro', 'LIKE', '%'.$s.'%');
            $q->orWhere('iEstado', 'LIKE', '%'.$s.'%');
        })->orderBy("dFecCre", "DESC");

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
    public function findProforma($cod,$cons){
         $mostrar=DB::select("
SELECT os.iEstado as est ,os.idCliente as idCliente,os.cPlacaVeh as cPlacaVeh, os.cMotor as cMotor,os.nKilometraje as nKilometraje, os.cColor as cColor,  cl.id_tipocli as idTipoCliente,cl.documento as documento,cl.razonsocial_cliente as razonsocial_cliente, os.cCodConsecutivo as cCodConsecutivo, os.nConsecutivo as nConsecutivo, os.IdMoneda as IdMoneda,mo.Descripcion as moneda,os.idcCondicionPago as idcCondicionPago,cp.description as condicionPago,os.idAsesor as idAsesor,ase.descripcion as asesor FROM ERP_OrdenServicio as os inner join ERP_Moneda as mo on os.IdMoneda=mo.IdMoneda inner join ERP_CondicionPago as cp on cp.id=os.idcCondicionPago INNER JOIN ERP_Clientes as cl on cl.id=os.idCliente INNER JOIN ERP_TipoCliente as tc on tc.id=cl.id_tipocli left join ERP_Asesores as ase on ase.id=os.idAsesor where os.cCodConsecutivo='$cod' AND os.nConsecutivo='$cons'");
         return $mostrar; 
    }
    public function find_Detalle($id){
         $mostrar=DB::select("select * from ERP_ControlCalidadRevision WHERE   idControlCalidad='$id'");
         return $mostrar; 
    }
    public function find($id){
         $mostrar=DB::select("
select * from ERP_ControlCalidad where id='$id'");
         return $mostrar; 
    }
    public function getGrupos(){
         $mostrar=DB::select("select gr.id as idGrupo,gr.nombre as nombre,rv.id as idRev, rv.nombre as revision from ERP_GruposCA as gr inner join ERP_RevisionCA as rv on gr.id=rv.idgrupo where gr.estado='A' AND rv.estado='A' ORDER BY gr.id");
         return $mostrar; 
    }
    public function update($id, array $attributes)
    {
        $attributes['cIdUsuMod'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }
    public function destroy($id)
    {
        $attributes = [];
        $model = $this->model->findOrFail($id);
        DB::table('ERP_ControlCalidadRevision')->where('idControlCalidad',$id)->delete();
        $model->update($attributes);
        $model->delete();
     
    }

}