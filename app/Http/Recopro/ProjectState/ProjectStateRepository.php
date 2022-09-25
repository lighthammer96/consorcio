<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 31/07/2017
 * Time: 10:45 AM
 */

namespace App\Http\Recopro\ProjectState;

class ProjectStateRepository implements ProjectStateInterface
{
    protected $model;

    public function __construct(ProjectState $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }
}