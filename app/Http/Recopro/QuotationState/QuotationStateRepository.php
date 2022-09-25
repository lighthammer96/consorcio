<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 22/06/2017
 * Time: 11:06 AM
 */

namespace App\Http\Recopro\QuotationState;

class QuotationStateRepository implements QuotationStateInterface
{
    protected $model;

    public function __construct(QuotationState $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }
}