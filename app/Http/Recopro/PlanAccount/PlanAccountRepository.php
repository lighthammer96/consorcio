<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/7/2017
 * Time: 12:25 AM
 */

namespace App\Http\Recopro\PlanAccount;

class PlanAccountRepository implements PlanAccountInterface
{
    protected $model;

    public function __construct(PlanAccount $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where('AceptaDato', '=', 'S')
            ->where(function ($q) use ($s) {
                $q->where('IdCuenta', 'LIKE', '%' . $s . '%');
                $q->orWhere('NombreCuenta', 'LIKE', '%' . $s . '%');
            });
    }
}