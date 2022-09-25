<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/6/2017
 * Time: 5:39 PM
 */

namespace App\Http\Recopro\TypeRetention;

class TypeRetentionRepository implements TypeRetentionInterface
{
    protected $model;

    public function __construct(TypeRetention $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }
}