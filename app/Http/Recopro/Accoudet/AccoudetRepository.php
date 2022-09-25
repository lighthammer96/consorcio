<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Accoudet;
use Illuminate\Support\Facades\DB;

class AccoudetRepository implements AccoudetInterface
{
    protected $model;

    public function __construct(Accoudet $model)
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
            $q->where('idGrupoContableCabecera', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('idTipoOperacion', 'LIKE', '%'.$s.'%');
            $q->orWhere('Cuenta', 'LIKE', '%'.$s.'%');
            $q->orWhere('centrocosto', 'LIKE', '%'.$s.'%');
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
    public function update($ida,$idb, array $attributes)
    {
      $this->model->where('idGrupoContableCabecera', $ida)->where('idTipoOperacion', $idb)->update($attributes);
    }
    public function destroy($ida)
    {
        $this->model->where('identificador',$ida)->delete();
    }
     public function destroy_detalle($idgrCa,$idOper)
    {
        $this->model->where('idGrupoContableCabecera',$idgrCa)->where('idTipoOperacion',$idOper)->delete();
    }
   public function deleteByContable($id){
        $this->model->where('idGrupoContableCabecera',$id)->delete();
    }
    public function getGrupoDet($idOperacion,$idGrupo){
         $mostrar=DB::select("select * from ERP_GruContableDetalle where idGrupoContableCabecera='$idGrupo' and idTipoOperacion=$idOperacion");
         return $mostrar;

    }

}