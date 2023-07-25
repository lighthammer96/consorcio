<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 13/10/2017
 * Time: 04:34 PM
 */

namespace App\Http\Recopro\CostCenter;

class CostCenterRepository implements CostCenterInterface
{
    protected $model;

    public function __construct(CostCenter $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes)
    {
        $c = $this->model->count();
        if ($c == 0) {
            $code = '001';
        } else {
            $m = (int)$this->model->max('IdCentroCosto');
            $m++;
            $code = str_pad($m, 3, '0', STR_PAD_LEFT);
        }
        $attributes['IdCentroCosto'] = $code;
        $this->model->create($attributes);
        return $code;
    }

    public function allByActive()
    {
        return $this->model->where('Estado', 'A')
            ->get();
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function search($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('Descripcion', textLIKE(), '%' . $s . '%');
        })->where('Estado', 'A');
    }

}