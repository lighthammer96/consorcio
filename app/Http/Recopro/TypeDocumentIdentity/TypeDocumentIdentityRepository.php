<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/6/2017
 * Time: 10:36 AM
 */

namespace App\Http\Recopro\TypeDocumentIdentity;

class TypeDocumentIdentityRepository implements TypeDocumentIdentityInterface
{
    protected $model;

    public function __construct(TypeDocumentIdentity $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }
}