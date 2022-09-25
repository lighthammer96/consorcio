<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Shop;
use Illuminate\Support\Facades\DB;

class ShopRepository implements ShopInterface
{
    protected $model;

    private static $_ACTIVE = 'A';

    public function __construct(Shop $model)
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
            $q->orWhere('direccion', 'LIKE', '%'.$s.'%');
            $q->orWhere('ubigeo', 'LIKE', '%'.$s.'%');
            $q->orWhere('estado', 'LIKE', '%'.$s.'%');
        });

    }
     public function search2($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('descripcion', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC')->where('estado', self::$_ACTIVE);
            $q->orWhere('direccion', 'LIKE', '%'.$s.'%')->where('estado', self::$_ACTIVE);
            $q->orWhere('ubigeo', 'LIKE', '%'.$s.'%')->where('estado', self::$_ACTIVE);
            $q->orWhere('estado', 'LIKE', '%'.$s.'%')->where('estado', self::$_ACTIVE);
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
        $attributes['user_deleted'] = auth()->id();
        $attributes['Estado'] ='I';
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
     
    }
    public function find($id)
    {
        $mostra=DB::select("SELECT * FROM ERP_Tienda as ti inner join ERP_Ubigeo as ub on ti.ubigeo=ub.cCodUbigeo where ti.idTienda=$id");
        return $mostra;
    }

    public function getTiendas(){
        $mostrar2=DB::select("select * from ERP_Tienda where estado='A'");
        return $mostrar2;
    }

}