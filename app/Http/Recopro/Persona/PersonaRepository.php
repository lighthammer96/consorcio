<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Persona;
use Illuminate\Support\Facades\DB;

class PersonaRepository implements PersonaInterface
{
    protected $model;
 private static $_ACTIVE = 'A';
    public function __construct(Persona $model)
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
            $q->where('cTipodocumento', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('cNumerodocumento', 'LIKE', '%'.$s.'%');
        });

    }
     public function find($id)
    {
        $mostra=DB::select("SELECT ti.*, ub.*, DATEDIFF(yy,ti.dFechanacimiento, GETDATE()) AS edad, FORMAT(ti.dFechanacimiento, 'dd/MM/yyyy') AS dFechanacimiento FROM ERP_Persona as ti left join ERP_Ubigeo as ub on ti.cUbigeo=ub.cCodUbigeo where ti.idPersona=$id");
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
        DB::table('ERP_Clientes')->where('idPersona',$id)->delete();
        $model->update($attributes);
        $model->delete();
     
    }

    public function get_persona_documento($id) {
        $mostra=DB::select("SELECT * 
        FROM ERP_Persona 
        where cNumerodocumento='$id'");
        return $mostra;
    }

}