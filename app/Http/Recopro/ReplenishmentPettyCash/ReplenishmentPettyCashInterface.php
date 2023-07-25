<?php
/**
 * Created by PhpStorm.
 * User: EVER C.R
 * Date: 24/11/2017
 * Time: 05:37 PM
 */

namespace App\Http\Recopro\ReplenishmentPettyCash;

interface ReplenishmentPettyCashInterface
{
    public function search($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);

    public function forceDelete($id);

    public function lastByPCState($pc_id, $state, array $except);
}