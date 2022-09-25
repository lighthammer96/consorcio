<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/6/2017
 * Time: 10:26 AM
 */

namespace App\Http\Recopro\TypePerson;

class TypePersonRepository implements TypePersonInterface
{
    protected $model;

    public function __construct(TypePerson $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }
}