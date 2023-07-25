<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/07/2017
 * Time: 10:43 AM
 */

namespace App\Http\Recopro\DocumentType;


use App\Http\Controllers\Controller;

class DocumentTypeRepository implements DocumentTypeInterface
{
    protected $model;

    public function __construct(DocumentType $model)
    {
        $this->model = $model;
    }

    public function search($filter)
    {
        $s = (isset($filter['search'])) ? $filter['search'] : '';

        return $this->model->where(function ($q) use ($s) {
            $q->where('Descripcion', 'LIKE', '%' . $s . '%');
        })->where(function ($q) use ($filter) {
            if (isset($filter['without_letter']) && $filter['without_letter'] == 'true') {
                $q->where('IdTipoDocumento', '<>', Controller::$_TYPE_DOCUMENT_EXCHANGE_LETTER);
                $q->where('IdTipoDocumento', '<>', Controller::$_TYPE_DOCUMENT_OUT_NOTE);
            }
            if (isset($filter['without_notes']) && $filter['without_notes'] == 'true') {
                $q->where('IdTipoDocumento', '<>', Controller::$_TYPE_DOCUMENT_CREDIT_NOTE);
                $q->where('IdTipoDocumento', '<>', Controller::$_TYPE_DOCUMENT_CREDIT_NOTE_NOT_FISCAL);
                $q->where('IdTipoDocumento', '<>', Controller::$_TYPE_DOCUMENT_CREDIT_NOTE_SPECIAL);
                $q->where('IdTipoDocumento', '<>', Controller::$_TYPE_DOCUMENT_DEBIT_NOTE);
                $q->where('IdTipoDocumento', '<>', Controller::$_TYPE_DOCUMENT_DEBIT_NOTE_NOT_FISCAL);
                $q->where('IdTipoDocumento', '<>', Controller::$_TYPE_DOCUMENT_DEBIT_NOTE_SPECIAL);
            }
        });
    }

    public function all()
    {
        return $this->model->all();
    }

    public function create(array $attributes)
    {
        $attributes['user_created'] = auth()->id();
        $attributes['user_updated'] = auth()->id();
        $attributes['user_id'] = auth()->id();
        return $this->model->create($attributes);
    }

    public function update($id, array $attributes)
    {
        $attributes['user_updated'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function destroy($id)
    {
        $attributes = [];
        $attributes['user_deleted'] = auth()->id();
        $model = $this->model->findOrFail($id);
        $model->update($attributes);
        $model->delete();
    }

}