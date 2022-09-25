<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Ubigeo;
use Illuminate\Support\Facades\DB;

class UbigeoRepository implements UbigeoInterface
{
    protected $model;

    public function __construct(Ubigeo $model)
    {
        $this->model = $model; 
    }

    public function all()
    {
        return $this->model->get();
    }
    //  public function search($s)
    // {
    //     return $this->model->where(function($q) use ($s){
    //         $q->where('descripcion', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
    //         $q->orWhere('estado', 'LIKE', '%'.$s.'%');
    //     });

    // }
     public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        return $this->model->create($attributes);
    }

     public function TraerDepartamentos()
    {
        $mostrar=DB::select("SELECT DISTINCT cDepartamento FROM ERP_Ubigeo");
        return $mostrar;
    }
     public function TraerProvincias($id)
    {
        $mostrar=DB::select("SELECT DISTINCT cProvincia FROM ERP_Ubigeo where cDepartamento='$id'");
        return $mostrar;
    }

    public function TraerDistritos($id)
    {
        $mostrar=DB::select("SELECT DISTINCT cDistrito,cCodUbigeo FROM ERP_Ubigeo where cProvincia='$id'");
        return $mostrar;
    }

    public function TraerSectores($id)
    {
        $mostrar=DB::select("SELECT * FROM ERP_Sector where ubigeo='$id' and estado='A'");
        return $mostrar;
    }


    // public function get_consecutivo($table,$id)
    // {     $mostrar=DB::select("select top 1 * from $table order by CONVERT(INT, $id) DESC");
    //      $actu=intval($mostrar[0]->$id);
    //      if(!$actu){
    //         $actu=0;
    //      };
    //     $new=$actu+1;
    //     return $new; 
    // }
    // public function update($id, array $attributes)
    // {
    //     $attributes['user_updated'] = auth()->id();
    //     $model = $this->model->findOrFail($id);
    //     $model->update($attributes);
    // }
    // public function destroy($id)
    // {
    //     $attributes = [];
    //     $model = $this->model->findOrFail($id);
    //     $model->update($attributes);
    //     $model->delete();
     
    // }

}