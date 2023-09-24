<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 10/07/2017
 * Time: 11:29 AM
 */

namespace App\Http\Recopro\Proveedor;

use Illuminate\Support\Facades\DB;

class ProveedorRepository implements ProveedorInterface
{
    protected $model;
    private static $_ACTIVE = 'A';

    public function __construct(Proveedor $model)
    {
        $this->model = $model;

    }

    public function all()
    {
        return $this->model->get();
    }

    public function search($filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';

        return $this->model
            ->where(function ($q) use ($s) {
                $q->where('tipodoc', 'LIKE', '%' . $s . '%');
                $q->orWhere('documento', 'LIKE', '%' . $s . '%');
                $q->orWhere('razonsocial', 'LIKE', '%' . $s . '%');
                $q->orWhere('contacto', 'LIKE', '%' . $s . '%');
                $q->orWhere('direccion', 'LIKE', '%' . $s . '%');
                $q->orWhere('correo_electronico', 'LIKE', '%' . $s . '%');
                $q->orWhere('celular', 'LIKE', '%' . $s . '%');
                $q->orWhere('IdTipoDocumento', 'LIKE', '%' . $s . '%');
            })
            ->where(function ($q) use ($filter) {
                $active = (isset($filter['active'])) ? $filter['active'] : '';
                if ($active != '') {
                    $q->where('activo', 'S');
                }
            });
    }

    public function allActive()
    {
        return $this->model->where('estado', self::$_ACTIVE)->get();
    }

    public function create(array $attributes)
    {
        $attributes['cIdUsuCre'] = auth()->id();
        $attributes['cIdUsuMod'] = auth()->id();
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
        $attributes['cIdUsuMod'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        return $this->model->find($id);
    }

    public function destroy($id, $idPersona)
    {
        $attributes = [];
        $model = $this->model->findOrFail($id);
        DB::table('ERP_Persona')->where('idPersona', $idPersona)->delete();
        DB::table('ERP_ProveedorCuentaBanco')->where('idProveedor', $id)->delete();
        $model->update($attributes);
        $model->delete();

    }

    public function findByCode($code)
    {
        return $this->model->where('documento', $code)->first();
    }

    public function gte_tipo_doc()
    {
        $mostrar = DB::select("select cCodigo Codigo, cDescripcion TipoDocumento 
from ERP_TABLASUNAT
where cnombretabla = 'TIPO_DOCUMENTO'");
        return $mostrar;
    }

    public function tipo_clie()
    {
        $mostrar = DB::select("select * from ERP_TipoCliente where estado='A'");
        return $mostrar;
    }

    public function tipo_proveedor()
    {
        $mostrar = DB::select("select * from ERP_TipoProveedor where estado='A'");
        return $mostrar;
    }

    public function getBanco()
    {
        $mostrar = DB::select("select * from ERP_Bancos");
        return $mostrar;
    }

    public function getMoneda()
    {
        $mostrar = DB::select("select * from ERP_Moneda where Estado='A'");
        return $mostrar;
    }

    public function tipoc_doc_venta()
    {
        $mostrar = DB::select("select * from ERP_TipoDocumento
where IdTipoDocumento in ('01','03')");
        return $mostrar;
    }

    public function getPersona()
    {
        $mostrar = DB::select("Select * from ERP_TABLASUNAT where cNombretabla = 'TIPO_PERSONA'");
        return $mostrar;
    }

    public function findDetalle($id)
    {
        $mostra = DB::select("select pc.Id as idProveedorCuentaBanco,pc.Descripcion as prb_descripcion,b.descripcion as bancos_descripcion,mo.Descripcion as moneda_descripcion,* from ERP_ProveedorCuentaBanco as pc inner join ERP_Bancos as b on (b.IdBanco=pc.idbanco) inner join ERP_Moneda as mo on (mo.IdMoneda=pc.IdMoneda) where pc.idProveedor='$id'");
        return $mostra;
    }

    public function find($id)
    {
        $mostra = DB::select("SELECT ti.*, p.*, FORMAT(p.dFechanacimiento, 'dd/MM/yyyy') AS dFechanacimiento , ub.* FROM ERP_Proveedor as ti 
        left join ERP_Ubigeo as ub on ti.ubigeo=ub.cCodUbigeo 
        LEFT JOIN ERP_Persona AS p ON(p.idPersona=ti.idPersona)
        where ti.id=$id");
        return $mostra;
    }

    public function get_cliente_document($id)
    {
        $mostra = DB::select("SELECT ti.id as idCliente , tipo.descripcion as tipo_cliente_descr,* FROM ERP_Clientes as ti left join ERP_Proveedor as ub on ti.ubigeo=ub.cCodUbigeo inner join ERP_TipoCliente  as tipo on tipo.id=ti.id_tipocli  where ti.documento='$id'");
        return $mostra;
    }

}