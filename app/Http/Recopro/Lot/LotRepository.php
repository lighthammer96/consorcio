<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Lot;
use Illuminate\Support\Facades\DB;

class LotRepository implements LotInterface
{
    protected $model;

    public function __construct(Lot $model)
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
            $q->where('Lote', 'LIKE', '%'.$s.'%')->orderByRaw('created_at DESC');
            $q->orWhere('fechaIngreso', 'LIKE', '%'.$s.'%');
            $q->orWhere('FechaVencimiento', 'LIKE', '%'.$s.'%');
            $q->orWhere('cantidad', 'LIKE', '%'.$s.'%');
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
        $model->delete();
     
    }
     public function findByCode($code)
    {
        return $this->model->where('Lote', $code)->first();
    }
    public function find($id)
    {
        $mostra=DB::select("SELECT * FROM ERP_Lote as lo inner join ERP_Productos as pr on lo.idArticulo=pr.id where lo.idLote=$id");
        return $mostra;
    }

}