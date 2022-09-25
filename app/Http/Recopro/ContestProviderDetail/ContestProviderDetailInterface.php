<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 27/07/2017
 * Time: 10:19 AM
 */

namespace App\Http\Recopro\ContestProviderDetail;

interface ContestProviderDetailInterface
{
    public function deleteExcept(array $ids, $contest_provider_id);

    public function createUpdate(array $data);

    public function UpdateCompare(array $data);

    public function findByDetail($contest_id);

    public function deleteByProvider($id, array $contest_id);
}