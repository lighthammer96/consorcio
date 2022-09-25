<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/6/2017
 * Time: 5:17 PM
 */

namespace App\Http\Recopro\Type;


class TypeRepository implements TypeInterface
{
    protected $model;

    public function __construct(Type $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }
}