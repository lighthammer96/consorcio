<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Operation;
use Illuminate\Support\Facades\DB;

class OperationRepository implements OperationInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(Operation $model)
    {
        $this->model = $model; 
    }

    public function all()
    { 
         return $this->model->where('estado', self::$_ACTIVE)->get();
    }
     public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('descripcion', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('estado', 'LIKE', '%'.$s.'%');
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
        DB::table('ERP_TipoOperacionUsuario')->where('idTipoOperacion',$id)->delete();
        $model->delete();
     
    }
     public function allActive()
    {
     return $this->model->where('estado', self::$_ACTIVE)->get();
    }
    public function find($id)
    {
        return $this->model->find($id);
    }
    public function getOperationTranfer($usuario){
        $sql = "select op.IdTipoOperacion,op.descripcion,op.idNaturaleza from ERP_TipoOperacion as op INNER JOIN ERP_TipoOperacionUsuario as opu on op.idTipoOperacion=opu.IdTipoOperacion and  opu.idUsuario=$usuario where op.estado='A' and  op.idNaturaleza='N' or  op.idNaturaleza='R'";
        $mostrar=DB::select($sql);
        // die($sql);
        return $mostrar;
    }
    public function getOperation($usuario){
        $mostrar=DB::select("select op.IdTipoOperacion,op.descripcion,op.idNaturaleza from ERP_TipoOperacion as op INNER JOIN ERP_TipoOperacionUsuario as opu on op.idTipoOperacion=opu.IdTipoOperacion where opu.idUsuario=$usuario  and op.estado='A' and  op.idNaturaleza Not in ('N','R')");
        return $mostrar;
    }
    public function getOperation_total($usuario){
        $mostrar=DB::select("select op.IdTipoOperacion,op.descripcion,op.idNaturaleza from ERP_TipoOperacion as op INNER JOIN ERP_TipoOperacionUsuario as opu on op.idTipoOperacion=opu.IdTipoOperacion where opu.idUsuario=$usuario  and op.estado='A'");
        return $mostrar;
    }
     public function getOperation_total_entrega($usuario){
        $mostrar=DB::select("select op.IdTipoOperacion,op.descripcion,op.idNaturaleza from ERP_TipoOperacion as op  where   op.estado='A'");
        return $mostrar;
    }
     
      public function getOperation_entra($usuario){
        $mostrar=DB::select("select op.IdTipoOperacion,op.descripcion,op.idNaturaleza from ERP_TipoOperacion as op INNER JOIN ERP_TipoOperacionUsuario as opu on op.idTipoOperacion=opu.IdTipoOperacion  where opu.idUsuario=$usuario");
        return $mostrar;
    }
}