<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 9:29 PM
 */

namespace App\Http\Recopro\Entity;


use Carbon\Carbon;

class EntityRepository implements EntityInterface
{
    protected $model;

    public function __construct(Entity $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function($q) use ($s) {
            $q->where('NombreEntidad', 'LIKE', '%'.$s.'%');
            $q->orWhere('DireccionLegal', 'LIKE', '%'.$s.'%');
            $q->orWhere('ApellidoPaterno', 'LIKE', '%'.$s.'%');
            $q->orWhere('ApellidoMaterno', 'LIKE', '%'.$s.'%');
            $q->orWhere('Nombres', 'LIKE', '%'.$s.'%');
            $q->orWhere('Documento', 'LIKE', '%'.$s.'%');
            $q->orWhere('RazonSocial', 'LIKE', '%'.$s.'%');
            $q->orWhereHas('typePerson', function($tp) use ($s){
                $tp->where('Descripcion', 'LIKE', '%'.$s.'%');
            });
            $q->orWhereHas('typeDocumentIdentity', function($td) use ($s){
                $td->where('Descripcion', 'LIKE', '%'.$s.'%');
            });
        });
    }

    public function providers($s)
    {
        return $this->model
            ->where(function($q) use ($s) {
                $q->where('NombreEntidad', 'LIKE', '%'.$s.'%');
                $q->orWhere('DireccionLegal', 'LIKE', '%'.$s.'%');
                $q->orWhere('Documento', 'LIKE', '%'.$s.'%');
//                $q->orWhere('contact', 'LIKE', '%'.$s.'%');
//                $q->orWhere('contact_phone', 'LIKE', '%'.$s.'%');
            });
//        })->where('is_provider', 1);
    }

    public function clients($s)
    {
        return $this->model->where(function($q) use ($s) {
            $q->where('NombreEntidad', 'LIKE', '%'.$s.'%');
            $q->orWhere('DireccionLegal', 'LIKE', '%'.$s.'%');
            $q->orWhere('Documento', 'LIKE', '%'.$s.'%');
        })->where('is_client', 1);
    }

    public function all()
    {
        return $this->model->all();
//        return $this->model->take(250)->get();
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        return $this->model->create($attributes);
    }

    public function update($id, array $attributes)
    {
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
        $attributes['deleted_at'] = Carbon::now('America/Lima');
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
//        $model->delete();
    }

    public function last()
    {
        $all = $this->model->withTrashed()->get();
        if (count($all) > 0) {
            return $all[count($all) - 2]->IdEntidad;
        }
        return 0;
    }

    public function findByDocument($type, $document)
    {
        return $this->model->where('IdTipoDocumentoIdentidad', $type)
                            ->where('Documento', $document)
                            ->first();
    }
}