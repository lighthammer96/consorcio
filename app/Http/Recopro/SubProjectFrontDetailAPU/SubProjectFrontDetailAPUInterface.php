<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 26/09/2017
 * Time: 12:52 PM
 */

namespace App\Http\Recopro\SubProjectFrontDetailAPU;

interface SubProjectFrontDetailAPUInterface
{
    public function createUpdate(array $data);

    public function deleteExcept($ids, $sp_fd_id);

    public function findByFrontAPU($front_id, $apu);
}