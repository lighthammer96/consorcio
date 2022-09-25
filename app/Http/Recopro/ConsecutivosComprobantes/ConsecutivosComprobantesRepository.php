<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\ConsecutivosComprobantes;

use Illuminate\Support\Facades\DB;

class ConsecutivosComprobantesRepository implements ConsecutivosComprobantesInterface
{
    protected $model;
    private static $_ACTIVE = 'A';
    public function __construct(ConsecutivosComprobantes $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->orWhere(function($q) use ($s){
            $q->where('serie', 'LIKE', '%'.$s.'%')
            ->where('numero', 'LIKE', '%'.$s.'%');
        });
    }

    public function all()
    { 
        return $this->model->all();
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        // print_r($attributes); exit;
        return $this->model->create($attributes);
    }
    public function allActive()
    {
        
         return $this->model->where('estado', self::$_ACTIVE)->get();
    }

    public function update($id, array $attributes)
    {
        // print_r($attributes); exit;
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        DB::table('ERP_ConsecutivoComprobanteUsuario')->where('idConsecutivo',$id)->delete();
        $model->update($attributes);
        $model->delete();
    }
     public function getDetalle($id)
    {   
        $mostrar=DB::select("select * from ERP_ConsecutivoComprobanteUsuario as de inner join ERP_Usuarios as us on us.id=de.idUsuario where de.idConsecutivo='$id'");
        return $mostrar; 
    }
      public function getDocumentos()
    {   
        $mostrar=DB::select("SELECT * FROM ERP_TipoDocumento");
        return $mostrar; 
    }
    public function get_consecutivo($table,$id)
    {     
        $mostrar = DB::select("select top 1 * from $table order by CONVERT(INT, $id) DESC");
        $actu=0;
        if(!$mostrar) {
            $actu=0;
        } else {
            $actu=intval($mostrar[0]->$id);
        }
        $new=$actu+1;
        return $new; 
    }
     public function destroy_ConsecutivoDetalle($id,$usua)
    {
       
        DB::table('ERP_ConsecutivoComprobanteUsuario')->where('idConsecutivo',$id)->where('idUsuario',$usua)->delete();
    }

    public function obtener_consecutivo_comprobante($tipo_documento, $idtienda, $like = "") {


        if(!(empty($like))) {
            $like = " AND cc.serie LIKE '".$like."%' ";
        }

        $sql = "SELECT cc.*, (cc.actual + 1) AS actual FROM ERP_ConsecutivosComprobantes AS cc WHERE cc.IdTipoDocumento={$tipo_documento} AND idtienda={$idtienda} {$like} ORDER BY id_consecutivo ASC";
        // die($sql);
        $result = DB::select($sql);

        return $result;
    }

    public function actualizar_correlativo($serie, $actual)
    {
        $r = DB::table("ERP_ConsecutivosComprobantes")
            ->where("serie", $serie)
            ->update(array("actual" => $actual));
        
        return $r;
    }
}