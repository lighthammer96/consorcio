<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 08/06/2017
 * Time: 12:11 PM
 */

namespace App\Http\Recopro\RequirementState;

class RequirementStateRepository implements RequirementStateInterface
{
    protected $model;

    public function __construct(RequirementState $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }
}