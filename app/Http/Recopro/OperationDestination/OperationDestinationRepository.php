<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 11/10/2017
 * Time: 03:37 PM
 */

namespace App\Http\Recopro\OperationDestination;


class OperationDestinationRepository implements OperationDestinationInterface
{
    protected $model;

    public function __construct(OperationDestination $model)
    {
        $this->model = $model;
    }

    public function findByRegister()
    {
        return $this->model->where('IdRegistro', 'C')
            ->where(function ($q) {
//                $q->where('IdDestinoOperacion', 'A');
//                $q->orWhere('IdDestinoOperacion', 'N');
            })
            ->get();
    }

    public function findBy($od_id, $registry)
    {
        return $this->model->where('IdDestinoOperacion', $od_id)
            ->where('IdRegistro', $registry)
            ->first();
    }

}