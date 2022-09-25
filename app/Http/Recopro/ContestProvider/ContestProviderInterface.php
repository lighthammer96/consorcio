<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 27/07/2017
 * Time: 10:10 AM
 */

namespace App\Http\Recopro\ContestProvider;

interface ContestProviderInterface
{
    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function UpdateCompare(array $data);

    public function find($id);

    public function findOrContest($id);

    public function deleteByQuotation($id, array $attributes);

    public function destroy($id);


}