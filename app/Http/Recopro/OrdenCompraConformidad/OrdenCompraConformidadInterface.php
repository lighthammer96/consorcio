<?php

namespace App\Http\Recopro\OrdenCompraConformidad;

interface OrdenCompraConformidadInterface
{
    public function all();

    public function find($id);

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function destroy($id);

    public function findBy($cod_id, $nro);
}