<?php

namespace App\Http\Recopro\AccountPay;

interface AccountPayInterface
{
    public function find($id);

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function destroy($id);

    public function deleteByPettyCashExpense($id, array $pce_id);

    public function getByDocumentAndTypeProvider($provider, $document, $type);
}