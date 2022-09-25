<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/6/2017
 * Time: 5:30 PM
 */

namespace App\Http\Recopro\Unity;


class UnityRepository implements UnityInterface
{
    protected $model;

    public function __construct(Unity $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }
}