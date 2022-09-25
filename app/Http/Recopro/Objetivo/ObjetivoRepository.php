<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Objetivo;
use Illuminate\Support\Facades\DB;

class ObjetivoRepository implements ObjetivoInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(Objetivo $model)
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
            $q->orWhere('id_tipoobj', 'LIKE', '%'.$s.'%');
            $q->orWhere('iEstado', 'LIKE', '%'.$s.'%');
            $q->orWhere('IdMoneda', 'LIKE', '%'.$s.'%');
            $q->orWhere('nAno', 'LIKE', '%'.$s.'%');
        });

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
    public function get_tipoObjetivo()
    {   $mostrar=DB::select("select * from ERP_TipoObjetivos");
        return $mostrar;
    }
     public function getGrupoDet_obje($id_ob,$nPeriodo,$id_tipoPersona,$id_Persona)
    {   $mostrar=DB::select("select * from ERP_ObjetivosDetalle where id_obj='$id_ob' and nPeriodo='$nPeriodo' and id_TipoPers='$id_tipoPersona' and id_Persona='$id_Persona' ");
        return $mostrar;
    }
     public function get_Asesor()
    {   $mostrar=DB::select("select * from ERP_Asesores where estado='A'");
        return $mostrar;
    }
     public function get_tecnico()
    {   $mostrar=DB::select("select * from ERP_Tecnico where estado='A'");
        return $mostrar;
    }
    public function get_tipoPersona()
    {   $mostrar=DB::select("select * from ERP_TipoPersonaObj where estado='A'");
        return $mostrar;
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
        $attributes['cIdUsuMod'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }
    public function destroy($id)
    {
        $attributes = [];
        $model = $this->model->findOrFail($id);
        DB::table('ERP_ObjetivosDetalle')->where('id_obj',$id)->delete();
        $model->update($attributes);
        $model->delete();
     
    }
    public function find($id)
    {
        return $this->model->find($id);
    }
      public function getGrupoDet_obje_asesor($id,$nPeriodo,$id_TipoPers,$id_Persona)
    {   $mostrar=DB::select("select tp.descripcion as tipo_persona,pa.descripcion as persona,* from ERP_ObjetivosDetalle as ob inner join ERP_TipoPersonaObj as tp on tp.id=ob.id_TipoPers  inner join ERP_Asesores as pa on pa.id=ob.id_Persona where ob.id_obj='$id' and ob.nPeriodo='$nPeriodo' and ob.id_TipoPers='$id_TipoPers' and ob.id_Persona='$id_Persona'");
        return $mostrar;
    }
     public function getGrupoDet_obje_tecnico($id,$nPeriodo,$id_TipoPers,$id_Persona)
    {   $mostrar=DB::select("select tp.descripcion as tipo_persona,pa.descripcion as persona,* from ERP_ObjetivosDetalle as ob inner join ERP_TipoPersonaObj as tp on tp.id=ob.id_TipoPers  inner join ERP_Tecnico as pa on pa.id=ob.id_Persona where ob.id_obj='$id' and ob.nPeriodo='$nPeriodo' and ob.id_TipoPers='$id_TipoPers' and ob.id_Persona='$id_Persona'");
        return $mostrar;
    }
    public function getGrupoDet_obje_total($id_ob)
    {   $mostrar=DB::select("select tp.descripcion as tipo_persona,pa.descripcion as persona,* from ERP_ObjetivosDetalle as ob inner join ERP_TipoPersonaObj as tp on tp.id=ob.id_TipoPers  inner join ERP_Tecnico as pa on pa.id=ob.id_Persona where ob.id_obj='$id_ob' ");
        return $mostrar;
    }

}