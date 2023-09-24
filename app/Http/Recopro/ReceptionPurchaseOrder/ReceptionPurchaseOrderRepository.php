<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\ReceptionPurchaseOrder;

class ReceptionPurchaseOrderRepository implements ReceptionPurchaseOrderInterface
{
    use ReceptionPurchaseOrderTrait;

    protected $model;

    public function __construct(ReceptionPurchaseOrder $model)
    {
        $this->model = $model;
    }

    public function search($filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';

        return $this->model
            ->where(function ($q) use ($s) {
                $q->where('code', 'LIKE', '%' . $s . '%');
                $q->orWhereHas('warehouse', function ($e) use ($s) {
                    $e->where('description', 'LIKE', '%' . $s . '%');
                });
                $q->orWhereHas('purchaseOrder', function ($e) use ($s) {
                    $e->where('cCodConsecutivo', 'LIKE', '%' . $s . '%');
                    $e->orWhere('nConsecutivo', 'LIKE', '%' . $s . '%');
                    $e->orWhereHas('provider', function ($p) use ($s) {
                        $p->where('razonsocial', 'LIKE', '%' . $s . '%');
                    });
                });
            })->where(function ($q) use ($filter) {
                if (isset($filter['check']) && $filter['check'] == 'true') {
                    $from = $filter['from'] . ' 00:00:00';
                    $to = $filter['to'] . ' 23:59:59';
                    $q->whereBetween('date', [$from, $to]);
                }
                $rec = (isset($filter['rec'])) ? $filter['rec'] : '';
                if ($rec != '') {
                    $q->where('id', $rec);
                }
                $po = (isset($filter['po'])) ? $filter['po'] : '';
                if ($po != '') {
                    $q->where('purchase_order_id', $po);
                }
                if (isset($filter['return_valid'])) {
                    $q->where('state_id', 2);
//                    $q->where('state_associated', 0);
                    $q->whereHas('detail', function ($d) {
                        $d->where('balance', '>', 0);
                    });
                }
                if (isset($filter['no_associated_return'])) {
                    $q->whereDoesntHave('returnPurchaseOrder', function ($ret) {
                        $ret->where('state_id', 0);
                    });
                }
            });
    }

    public function search_roc($filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';
        $items = (isset($filter['items1'])) ? $filter['items1'] : [];

        return $this->model
            ->where(function ($q) use ($s) {
                $q->where('code', 'LIKE', '%' . $s . '%');
                $q->orWhereHas('warehouse', function ($e) use ($s) {
                    $e->where('description', 'LIKE', '%' . $s . '%');
                });
                $q->orWhereHas('user', function ($e) use ($s) {
                    $e->where('name', 'LIKE', '%' . $s . '%');
                });
            })->where(function ($q) use ($filter) {
                $oc_id = (isset($filter['purchase_order_id'])) ? $filter['purchase_order_id'] : '';
                if ($oc_id != '') {
                    $q->where('purchase_order_id', $oc_id);
                }
            })
            ->where('state_reception', 1)
            ->where('state_associated', 0)
            ->whereHas('reception_purchase_detail', function ($d) {
                $d->where('balance', '>', 0);
            })
            ->whereNotIn('id', $items);

    }

    public function all()
    {
        return $this->model->all();
    }

    public function max()
    {
        return $this->model->withTrashed()->max('id');
    }

    public function create(array $attributes)
    {
        $attributes = setIdTableByMax($this->max(), $attributes);
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->create($attributes);
        $count = $this->model->withTrashed()->count();
        $code = 'ROC' . str_pad($count, 6, "0", STR_PAD_LEFT);
        $this->update($model->id, [
            'code' => $code
        ]);
        return $this->find($model->id);
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        return $this->find($id);
    }

    public function createUpdate(array $attributes)
    {
        $model = $this->model->where('id', $attributes['roc_id'])
            ->withTrashed()
            ->first();

        $attributes['user_updated'] = auth()->id();
        if (isset($model)) {
            if ($model->trashed()) {
                $model->restore();
            }
            $model->update($attributes);
        } else {
            $attributes = setIdTableByMax($this->max(), $attributes);
            $attributes['user_created'] = auth()->id();
            $model = $this->model->create($attributes);
        }
        return $model;
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }
}
