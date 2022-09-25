<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\List_precio;
use Illuminate\Support\Facades\DB;

class List_precioRepository implements List_precioInterface
{
    protected $model;
 private static $_ACTIVE = '1';
    public function __construct(List_precio $model)
    {
        $this->model = $model; 
       
    }
      public function valida_lista($idTipoCli,$idMone,$feI,$fFin)
    {
         $pdo=DB::connection()->getPdo();
         $destroy=DB::select("SET NOCOUNT ON; EXEC ST_Valida_ListaPrecio '$idTipoCli','$idMone','$feI','$fFin'");
         return $destroy;
    }
    public function all()
    {
        return $this->model->get();
    }
     public function search($s)
    {
        return $this->model->where(function($q) use ($s){
            $q->where('descripcion', 'LIKE', '%'.$s.'%')->orderByRaw('dFecCre DESC');
            $q->orWhere('iEstado', 'LIKE', '%'.$s.'%');
            $q->orWhere('id_tpocli', 'LIKE', '%'.$s.'%');
            $q->orWhere('IdMoneda', 'LIKE', '%'.$s.'%');
            $q->orWhere('dFecVigIni', 'LIKE', '%'.$s.'%');
            $q->orWhere('dFecVigFin', 'LIKE', '%'.$s.'%');

        });

    }
    public function allAprobada()
    {
       return $this->model->where('iEstado', self::$_ACTIVE)->get();
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
    public function update($id, array $attributes)
    {
        $attributes['cIdUsuMod'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }
     public function destroy($id)
    {
        DB::table('ERP_ListaPrecios')->where('id',$id)->delete();
        DB::table('ERP_ListaPreciosDetalle')->where('id_lista',$id)->delete();
    }
     public function find($id)
    {
        return $this->model->find($id);
    }
    public function getGrupoDet($idlista,$idProducto){
         $mostrar=DB::select("select * from ERP_ListaPreciosDetalle where id_lista='$idlista' and idProducto=$idProducto");
         return $mostrar;

    }
    public function getProductos($id){
        $mostrar=DB::select("select  * from ERP_ListaPreciosDetalle as lid INNER JOIN ERP_Productos as pr on pr.id=lid.idProducto where lid.id_lista=$id");
        return $mostrar;
    }

}