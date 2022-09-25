<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Localizacion;
use Illuminate\Support\Facades\DB;

class LocalizacionRepository implements LocalizacionInterface
{
    protected $model;

    public function __construct(Localizacion $model)
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

    public function deleteBywarehose($id){
        DB::table('ERP_Localizacion')->where('idAlmacen', $id)->delete();
    }
    public function delete_localizacion($id){
        DB::table('ERP_Localizacion')->where('idLocalizacion', $id)->delete();
    }

   public function getLocalizacion($id)
    {
        $mostrar=DB::select("SELECT * FROM ERP_Localizacion where idAlmacen='$id' AND estado='A'");
        return $mostrar;
    }

}