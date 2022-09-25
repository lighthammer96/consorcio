<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 22/06/2017
 * Time: 06:00 PM
 */

namespace App\Http\Recopro\Quotation;

class QuotationRepository implements QuotationInterface
{
    protected $model;

    public function __construct(Quotation $model)
    {
        $this->model = $model;
    }

    public function search($filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';

        return $this->model
            ->where(function ($q) use ($s) {
                $q->where('code', 'LIKE', '%' . $s . '%');
                $q->orWhere('created_at', 'LIKE', '%' . $s . '%');
                $q->orWhereHas('user_c', function ($uc) use ($s) {
                    $uc->where('name', 'LIKE', '%' . $s . '%');
                });
                $q->orWhereHas('quotation_state', function ($rs) use ($s) {
                    $rs->where('description', 'LIKE', '%' . $s . '%');
                });
            })->where(function ($q) use ($filter) {
                if ($filter['check'] == 'true') {
                    $from = $filter['from'] . ' 00:00:00';
                    $to = $filter['to'] . ' 23:59:59';
                    $q->whereBetween('created_at', [$from, $to]);
                }
                $state = (isset($filter['state'])) ? $filter['state'] : '';
                if ($state != '') {
                    $q->where('quotation_state_id', $state);
                }
            });
    }

    public function all()
    {
        return $this->model->all();
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->create($attributes);
        $count = $this->model->withTrashed()->count();
        $this->update($model->id, [
            'code' => 'CZ' . str_pad($count, 8, "0", STR_PAD_LEFT)
        ]);
        return $this->find($model->id);
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


    public function findApprovalQuotation($id)
    {
        return $this->model
            ->join('ERP_ConcursoProveedor', 'ERP_Concursos.id', '=', 'ERP_ConcursoProveedor.contest_id')
            ->join('ERP_ConcursoProveedorDetalle', 'ERP_ConcursoProveedorDetalle.contest_provider_id', '=', 'ERP_ConcursoProveedor.id')
            ->join('ERP_ConcursoConsolidado', 'ERP_ConcursoConsolidado.id', '=', 'ERP_ConcursoProveedorDetalle.contest_consolidated_id')
            ->join('TipoCambio', 'TipoCambio.Fecha', '=', 'ERP_Concursos.type_change_id')
            ->select('ERP_ConcursoProveedorDetalle.id as detail_id', 'ERP_Concursos.id', 'ERP_ConcursoProveedor.id as provider_id', 'ERP_ConcursoProveedorDetalle.contest_consolidated_id',
                'ERP_ConcursoProveedorDetalle.description', 'ERP_ConcursoProveedorDetalle.price', 'ERP_ConcursoProveedorDetalle.quantity',
                'ERP_ConcursoProveedorDetalle.price_buyer', 'ERP_ConcursoProveedorDetalle.price_system', 'ERP_ConcursoConsolidado.reference_project',
                'ERP_ConcursoConsolidado.reference_quantity', 'ERP_ConcursoProveedorDetalle.price',
                'ERP_ConcursoProveedorDetalle.discount_percentage', 'ERP_ConcursoProveedorDetalle.discount',
                'ERP_ConcursoProveedorDetalle.total', 'ERP_ConcursoProveedorDetalle.total_local',
                'ERP_ConcursoProveedorDetalle.total_dollar', 'ERP_ConcursoProveedorDetalle.description',
                'ERP_ConcursoProveedor.type_change_id', 'ERP_ConcursoProveedor.currency_id', 'TipoCambio.Compra',
                'ERP_ConcursoProveedor.payment_condition_id', 'ERP_ConcursoProveedor.payment_advance',
                'ERP_ConcursoProveedor.is_igv')
            ->where('ERP_Concursos.id', $id)
            ->Where(function ($query) {
                $query->where('price_buyer', '<>', 0)
                    ->orwhere('price_system', '<>', 0);

            })
            ->orderBy('ERP_ConcursoProveedorDetalle.price_buyer', 'desc')
            ->get();
    }
//    public function findByCompareQuotation($id, array $filter)
//    {
//        return $this->model
//            ->join('ERP_ConcursoConsolidado', 'ERP_ConcursoConsolidado.contest_id', '=', 'ERP_Concursos.id')
//            ->join('ERP_Productos', 'ERP_Productos.id', '=', 'ERP_ConcursoConsolidado.article_id')
//            ->leftJoin('ERP_ConcursoProveedorDetalle', 'ERP_ConcursoProveedorDetalle.contest_consolidated_id', '=', 'ERP_ConcursoConsolidado.id')
//            ->leftJoin('ERP_ConcursoProveedor', 'ERP_ConcursoProveedor.id', '=', 'ERP_ConcursoProveedorDetalle.contest_provider_id')
//            ->leftJoin('Entidad', 'Entidad.IdEntidad', '=', 'ERP_ConcursoProveedor.provider_id')
//            ->select('ERP_ConcursoProveedorDetalle.*')
//            ->where('ERP_Concursos.id', '=', $id)
////            ->distinct()
//            ->select('ERP_ConcursoProveedorDetalle.*')
//            ->get();
//    }
//
//    public function findByCompareQuotationProvider($id)
//    {
//        return $this->model
//            ->join('ERP_ConcursoConsolidado', 'ERP_ConcursoConsolidado.contest_id', '=', 'ERP_Concursos.id')
//            ->join('ERP_Productos', 'ERP_Productos.id', '=', 'ERP_ConcursoConsolidado.article_id')
//            ->leftJoin('ERP_ConcursoProveedorDetalle', 'ERP_ConcursoProveedorDetalle.contest_consolidated_id', '=', 'ERP_ConcursoConsolidado.id')
//            ->leftJoin('ERP_ConcursoProveedor', 'ERP_ConcursoProveedor.id', '=', 'ERP_ConcursoProveedorDetalle.contest_provider_id')
//            ->leftJoin('Entidad', 'Entidad.IdEntidad', '=', 'ERP_ConcursoProveedor.provider_id')
//            ->select('ERP_ConcursoProveedorDetalle.*')
//            ->where('ERP_Concursos.id', '=', $id)
//            ->get();
//    }

    public
    function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }
}