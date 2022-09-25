<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\ViewPersona;
use Illuminate\Support\Facades\DB;

class ViewPersonaRepository implements ViewPersonaInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(ViewPersona $model)
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
            $q->where('TipoPersona', 'LIKE', '%'.$s.'%');
            $q->orWhere('TipoDocumento', 'LIKE', '%'.$s.'%');
            $q->orWhere('cNumerodocumento', 'LIKE', '%'.$s.'%');
            $q->orWhere('cRazonsocial', 'LIKE', '%'.$s.'%');
            $q->orWhere('cNombrePersona', 'LIKE', '%'.$s.'%');
            $q->orWhere('cDistrito', 'LIKE', '%'.$s.'%');
        })->orderBy('created_at', 'DESC');

    }
     public function find($id)
    {
        $mostra=DB::select("SELECT ti.*, ub.*, DATEDIFF(yy,ti.dFechanacimiento, GETDATE()) AS edad, FORMAT(ti.dFechanacimiento, 'dd/MM/yyyy') AS dFechanacimiento FROM ERP_ViewPersona as ti left join ERP_Ubigeo as ub on ti.cUbigeo=ub.cCodUbigeo where ti.idViewPersona=$id");
        return $mostra;
    }
     public function findByCode($code)
    {
        return $this->model->where('cNumerodocumento', $code)->first();
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
        DB::table('ERP_Clientes')->where('idViewPersona',$id)->delete();
        $model->update($attributes);
        $model->delete();
     
    }

    public function get_ViewPersona_documento($id) {
        $mostra=DB::select("SELECT * 
        FROM ERP_ViewPersona 
        where cNumerodocumento='$id'");
        return $mostra;
    }

}