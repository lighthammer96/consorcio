<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 23/08/2017
 * Time: 10:41 AM
 */

namespace App\Http\Recopro\ProjectSubState;

class ProjectSubStateRepository implements ProjectSubStateInterface
{
    protected $model;

    public function __construct(ProjectSubState $model)
    {
        $this->model = $model;
    }

    public function find($id)
    {
        return $this->model->find($id);
    }
}