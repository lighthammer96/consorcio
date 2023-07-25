<?php

/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Compania;

use Illuminate\Support\Facades\DB;

class CompaniaRepository implements CompaniaInterface
{
    protected $model;

    private static $_ACTIVE = 'A';

    public function __construct(Compania $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->get();
    }

    public function search($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('IdCompania', 'LIKE', '%' . $s . '%')->orderByRaw('created_at DESC');
            $q->orWhere('RutaData', 'LIKE', '%' . $s . '%');
            $q->orWhere('RutaLog', 'LIKE', '%' . $s . '%');
            $q->orWhere('FechaUltBackup', 'LIKE', '%' . $s . '%');
            $q->orWhere('Estado', 'LIKE', '%' . $s . '%');
            $q->orWhere('Base', 'LIKE', '%' . $s . '%');
            $q->orWhere('Correo', 'LIKE', '%' . $s . '%');
            $q->orWhere('Contacto', 'LIKE', '%' . $s . '%');
            $q->orWhere('Telefono4', 'LIKE', '%' . $s . '%');
            $q->orWhere('Telefono3', 'LIKE', '%' . $s . '%');
            $q->orWhere('Telefono2', 'LIKE', '%' . $s . '%');
            $q->orWhere('RazonSocial', 'LIKE', '%' . $s . '%');
            $q->orWhere('NombreComercial', 'LIKE', '%' . $s . '%');
            $q->orWhere('Direccion', 'LIKE', '%' . $s . '%');
            $q->orWhere('Ruc', 'LIKE', '%' . $s . '%');
            $q->orWhere('Telefono1', 'LIKE', '%' . $s . '%');
        });
    }

    public function allActive()
    {
        return $this->model->where('estado', self::$_ACTIVE)->get();
    }

    public function findByCode($code)
    {
        return $this->model->where('Ruc', $code)->first();
    }

    // public function find($id)
    // {
    //     return $this->model->find($id);
    // }

    public function find($id)
    {
        // return $this->model->find($id);

        $mostra = DB::select("SELECT * 
        FROM ERP_Compania as c 
        left join ERP_Ubigeo as ub on c.ubigeo=ub.cCodUbigeo 
        
        where c.IdCompania=$id");
        return $mostra[0];
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        return $this->model->create($attributes);
    }

    public function get_consecutivo($table, $id)
    {
        $mostrar = DB::select("select top 1 * from $table order by CONVERT(INT, $id) DESC");
        $actu = 0;
        if (!$mostrar) {
            $actu = 0;
        } else {
            $actu = intval($mostrar[0]->$id);
        };
        $new = $actu + 1;
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

    public function first()
    {
        return $this->model->first();
    }
}
