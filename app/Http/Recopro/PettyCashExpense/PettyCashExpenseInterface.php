<?php
/**
 * Created by PhpStorm.
 * User: EVER C.R
 * Date: 24/10/2017
 * Time: 06:35 PM
 */

namespace App\Http\Recopro\PettyCashExpense;

interface PettyCashExpenseInterface
{
    public function search($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);

    public function findByCode($code);

    public function findByPCState($pc_id, $state);

    public function lastByPCState($pc_id, $state);
}