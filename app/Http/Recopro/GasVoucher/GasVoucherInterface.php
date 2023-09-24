<?php

namespace App\Http\Recopro\GasVoucher;

interface GasVoucherInterface
{
    public function find($id);

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function destroy($id);

    public function deleteByPettyCashExpense($id, array $pce_id);
}