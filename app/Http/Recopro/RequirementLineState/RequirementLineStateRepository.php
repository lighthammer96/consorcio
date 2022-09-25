<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 08/06/2017
 * Time: 12:09 PM
 */

namespace App\Http\Recopro\RequirementLineState;


class RequirementLineStateRepository implements RequirementLineStateInterface
{
    protected $model;

    public function __construct(RequirementLineState $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }
}