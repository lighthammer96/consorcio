<?php
/**
 * Created by PhpStorm.
 * User: EVER C.R.
 * Date: 11/10/2017
 * Time: 12:37 PM
 */

namespace App\Http\Recopro\ClassificationAcquisition;


class ClassificationAcquisitionRepository implements ClassificationAcquisitionInterface
{
    protected $model;

    public function __construct(ClassificationAcquisition $model)
    {
        $this->model = $model;
    }

    public function search($s)
    {
        return $this->model->where(function ($q) use ($s) {
            $q->where('Descripcion', 'LIKE', '%' . $s . '%');
        });
    }
    
    public function all()
    {
        return $this->model->all();
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

}