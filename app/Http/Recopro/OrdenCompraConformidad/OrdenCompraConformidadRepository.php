<?php

namespace App\Http\Recopro\OrdenCompraConformidad;

class OrdenCompraConformidadRepository implements OrdenCompraConformidadInterface
{
    protected $model;

    public function __construct(OrdenCompraConformidad $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function max()
    {
        return $this->model->max('nIdConformidad');
    }

    public function create(array $attributes)
    {
        $max = $this->max();
        $id = ($max) ? (int)$max + 1 : 1;
        $attributes['nIdConformidad'] = $id;
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->create($attributes);
        return $this->find($model->id);
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        return $this->find($id);
    }

    public function destroy($id)
    {
        $this->model->find($id)->delete();
    }

    public function findBy($cod_id, $nro)
    {
        return $this->model->where('cCodConsecutivo', $cod_id)
            ->where('nConsecutivo', $nro)
            ->get();
    }

    public function findByUser($cod_id, $nro, $user)
    {
        return $this->model->where('cCodConsecutivo', $cod_id)
            ->where('nConsecutivo', $nro)
            ->where('nIdUsuario', $user)
            ->first();
    }
}